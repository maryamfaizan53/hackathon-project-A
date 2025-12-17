# ingest.py - chunk docs, get embeddings, and upsert to Qdrant
import os, glob, json, math
from pathlib import Path
from typing import List

OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
QDRANT_URL = os.getenv('QDRANT_URL')
QDRANT_API_KEY = os.getenv('QDRANT_API_KEY')
COLLECTION = os.getenv('QDRANT_COLLECTION_NAME','calcu_book')

def read_markdown_files(docs_dir='../book/docs'):
    md_files = glob.glob(os.path.join(docs_dir, '**', '*.md'), recursive=True)
    contents = []
    for p in md_files:
        with open(p, 'r', encoding='utf-8') as f:
            contents.append({'path': p, 'text': f.read()})
    return contents

def chunk_text(text, max_tokens=500):
    # naive splitter by paragraphs - adjust as needed
    paras = [p.strip() for p in text.split('\n\n') if p.strip()]
    chunks = []
    cur = ''
    for p in paras:
        if len(cur) + len(p) > 4000:
            chunks.append(cur)
            cur = p
        else:
            cur = (cur + '\n\n' + p).strip()
    if cur:
        chunks.append(cur)
    return chunks

def embed_texts(texts: List[str]):
    # use REST OpenAI embeddings
    import requests
    if not OPENAI_API_KEY:
        raise RuntimeError('OPENAI_API_KEY not set')
    url = 'https://api.openai.com/v1/embeddings'
    headers = {'Authorization': f'Bearer {OPENAI_API_KEY}', 'Content-Type': 'application/json'}
    payload = {'model':'text-embedding-3-small','input': texts}
    r = requests.post(url, headers=headers, json=payload)
    r.raise_for_status()
    data = r.json()
    return [d['embedding'] for d in data['data']]

def upsert_to_qdrant(points):
    import requests
    if not QDRANT_URL:
        raise RuntimeError('QDRANT_URL not set')
    url = QDRANT_URL.rstrip('/') + f"/collections/{COLLECTION}/points?wait=true"
    headers = {'Content-Type': 'application/json'}
    if QDRANT_API_KEY:
        headers['api-key'] = QDRANT_API_KEY
    payload = {'points': points}
    r = requests.put(url, headers=headers, json=payload)
    r.raise_for_status()
    return r.json()

def main():
    docs = read_markdown_files()
    all_chunks = []
    for doc in docs:
        chunks = chunk_text(doc['text'])
        for i,c in enumerate(chunks):
            all_chunks.append({'id': f"{Path(doc['path']).stem}_{i}", 'text': c, 'meta': {'path': doc['path']}})
    texts = [c['text'] for c in all_chunks]
    print('Embedding', len(texts), 'chunks')
    embeddings = embed_texts(texts)
    points = []
    for i,chunk in enumerate(all_chunks):
        points.append({'id': chunk['id'], 'vector': embeddings[i], 'payload': {'text': chunk['text'], 'meta': chunk['meta']}})
    print('Upserting to Qdrant...')
    res = upsert_to_qdrant(points)
    print('Upsert result:', res)

if __name__ == '__main__':
    main()
