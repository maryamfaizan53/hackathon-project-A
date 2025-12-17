import PyPDF2
import requests
import json
import time
from dotenv import load_dotenv
import os
from openai import OpenAI

load_dotenv()

# Qdrant Cloud Credentials
QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
COLLECTION_NAME = "sddhackathon5"

class QdrantPDFUploader:
    def __init__(self):
        self.headers = {
            "Content-Type": "application/json",
            "api-key": QDRANT_API_KEY
        }
        self.openai_client = OpenAI(api_key=OPENAI_API_KEY)
        print("✓ Qdrant uploader ready with OpenAI embeddings")
    
    def extract_text_from_pdf(self, pdf_path):
        print(f"📄 {pdf_path} extracting text...")
        text = ""
        try:
            with open(pdf_path, 'rb') as file:
                pdf_reader = PyPDF2.PdfReader(file)
                total_pages = len(pdf_reader.pages)
                print(f"  Total pages: {total_pages}")
                
                for page_num, page in enumerate(pdf_reader.pages, 1):
                    page_text = page.extract_text()
                    text += page_text + "\n"
                    if page_num % 5 == 0 or page_num == total_pages:
                        print(f"  ✓ {page_num}/{total_pages} pages extracted")
                
            print(f"✓ Total {len(text)} characters extracted")
            return text
        except FileNotFoundError:
            print(f"❌ File not found: {pdf_path}")
            return None
        except Exception as e:
            print(f"❌ Error: {e}")
            return None
    
    def create_chunks(self, text, chunk_size=500, overlap=50):
        chunks = []
        start = 0
        
        # Clean text
        text = ' '.join(text.split())
        
        while start < len(text):
            end = start + chunk_size
            chunk = text[start:end].strip()
            if chunk and len(chunk) > 20:
                chunks.append(chunk)
            start = end - overlap
        
        print(f"✓ {len(chunks)} chunks created")
        return chunks
    
    def ensure_collection(self):
        print(f"🔍 Collection '{COLLECTION_NAME}' is checking...")
        
        try:
            response = requests.get(
                f"{QDRANT_URL}/collections/{COLLECTION_NAME}",
                headers=self.headers,
                timeout=10
            )
            
            if response.status_code == 404:
                print("📦 Collection is being created with vector support...")
                
                create_response = requests.put(
                    f"{QDRANT_URL}/collections/{COLLECTION_NAME}",
                    headers=self.headers,
                    json={
                        "vectors": {
                            "size": 1536,  # text-embedding-3-small
                            "distance": "Cosine"
                        }
                    },
                    timeout=10
                )
                
                if create_response.status_code not in [200, 201]:
                    print(f"❌ Error: {create_response.text}")
                    return False
                
                print("✅ Collection created successfully!")
                return True
                
            elif response.status_code == 200:
                print(f"✓ Collection already exists")
                return True
            else:
                print(f"❌ Unexpected response: {response.status_code}")
                return False
                
        except Exception as e:
            print(f"❌ Connection error: {e}")
            return False
    
    def generate_embeddings_batch(self, texts):
        """Generate embeddings in batches"""
        print(f"🤖 Generating embeddings for {len(texts)} chunks...")
        
        all_embeddings = []
        batch_size = 50  # Process 50 at a time
        
        for i in range(0, len(texts), batch_size):
            batch = texts[i:i+batch_size]
            
            try:
                response = self.openai_client.embeddings.create(
                    model="text-embedding-3-small",
                    input=batch
                )
                
                batch_embeddings = [data.embedding for data in response.data]
                all_embeddings.extend(batch_embeddings)
                
                print(f"  ✓ {min(i+batch_size, len(texts))}/{len(texts)} embeddings done")
                time.sleep(0.5)  # Rate limiting
                
            except Exception as e:
                print(f"  ❌ Batch {i//batch_size + 1} failed: {e}")
                return None
        
        return all_embeddings
    
    def upload_to_qdrant(self, chunks, source_file):
        print(f"☁️  Generating embeddings and uploading to Qdrant...")
        
        # Generate embeddings for all chunks
        embeddings = self.generate_embeddings_batch(chunks)
        
        if not embeddings or len(embeddings) != len(chunks):
            print("❌ Embedding generation failed!")
            return
        
        print(f"✅ All embeddings generated! Now uploading...")
        
        total = len(chunks)
        batch_size = 100
        
        for batch_start in range(0, total, batch_size):
            batch_end = min(batch_start + batch_size, total)
            
            points = []
            for idx in range(batch_start, batch_end):
                point = {
                    "id": int(time.time() * 1000000) + idx,
                    "vector": embeddings[idx],  # ✅ Real embedding array
                    "payload": {
                        "text": chunks[idx],
                        "chunk_id": idx,
                        "source": source_file,
                        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S")
                    }
                }
                points.append(point)
            
            # Batch upload
            try:
                response = requests.put(
                    f"{QDRANT_URL}/collections/{COLLECTION_NAME}/points",
                    headers=self.headers,
                    json={"points": points},
                    timeout=30
                )
                
                if response.status_code in [200, 201]:
                    print(f"  ✓ {batch_end}/{total} chunks uploaded")
                else:
                    print(f"  ⚠️  Batch failed: {response.text[:200]}")
                    
            except Exception as e:
                print(f"  ❌ Upload error: {e}")
        
        print("🎉 Upload complete with real embeddings!")
    
    def search(self, query, top_k=5):
        """Vector search using embeddings"""
        print(f"\n🔍 Searching: '{query}'")
        
        try:
            # Generate query embedding
            embedding_response = self.openai_client.embeddings.create(
                model="text-embedding-3-small",
                input=query
            )
            query_vector = embedding_response.data[0].embedding
            print(f"✅ Query embedding generated (dim: {len(query_vector)})")
            
            # Vector search
            response = requests.post(
                f"{QDRANT_URL}/collections/{COLLECTION_NAME}/points/search",
                headers=self.headers,
                json={
                    "vector": query_vector,
                    "limit": top_k,
                    "with_payload": True,
                    "with_vector": False
                },
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                results = data.get('result', [])
                
                if not results:
                    print("\n❌ No matching results found")
                    return
                
                print(f"\n✅ {len(results)} results found:\n")
                
                for i, result in enumerate(results, 1):
                    score = result.get('score', 0)
                    payload = result.get('payload', {})
                    
                    print(f"{'='*80}")
                    print(f"Result {i}: Similarity {score:.2%} {'⭐' if score > 0.7 else ''}")
                    print(f"\n{payload.get('text', 'N/A')}")
                    print(f"\nSource: {payload.get('source', 'Unknown')} (Chunk {payload.get('chunk_id', 0)})")
                    print()
            else:
                print(f"❌ Search failed: {response.text}")
                
        except Exception as e:
            print(f"❌ Search error: {e}")
            import traceback
            traceback.print_exc()
    
    def list_all_chunks(self):
        print("\n📚 Stored chunks (first 10):")
        
        try:
            response = requests.post(
                f"{QDRANT_URL}/collections/{COLLECTION_NAME}/points/scroll",
                headers=self.headers,
                json={
                    "limit": 10,
                    "with_payload": True,
                    "with_vector": False
                },
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                points = data.get('result', {}).get('points', [])
                
                if not points:
                    print("❌ Collection is empty")
                    return
                
                print(f"✓ Total points shown: {len(points)}\n")
                for i, point in enumerate(points, 1):
                    text = point['payload']['text']
                    print(f"{i}. {text[:100]}...")
                    print(f"   Source: {point['payload']['source']}\n")
            else:
                print(f"❌ Failed: {response.text}")
                
        except Exception as e:
            print(f"❌ Error: {e}")

def main():
    print("=" * 80)
    print("🚀 Qdrant PDF Uploader - Semantic Vector Search (FIXED)")
    print("=" * 80)
    
    uploader = QdrantPDFUploader()
    
    if not uploader.ensure_collection():
        print("\n❌ Setup failed")
        return
    
    while True:
        print("\n" + "=" * 80)
        print("Options:")
        print("1. Upload PDF (with real embeddings)")
        print("2. Semantic search")
        print("3. View stored chunks")
        print("4. Exit")
        
        choice = input("\nChoice (1/2/3/4): ").strip()
        
        if choice == '1':
            pdf_path = input("\n📁 PDF path: ").strip()
            
            text = uploader.extract_text_from_pdf(pdf_path)
            if not text:
                continue
            
            chunks = uploader.create_chunks(text)
            uploader.upload_to_qdrant(chunks, pdf_path)
            
        elif choice == '2':
            query = input("\n🔍 Search query: ").strip()
            if query:
                uploader.search(query)
            else:
                print("❌ Empty query!")
                
        elif choice == '3':
            uploader.list_all_chunks()
            
        elif choice == '4':
            print("\n👋 Goodbye!")
            break
        else:
            print("❌ Invalid choice!")

if __name__ == "__main__":
    main()