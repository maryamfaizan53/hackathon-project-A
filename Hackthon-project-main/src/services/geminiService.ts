// frontend/src/services/geminiService.ts
import { GoogleGenerativeAI } from '@google/generative-ai';
import { UserPreferences } from '../types/user';

// Get API key from window (injected by Root component)
const getGeminiApiKey = (): string => {
  if (typeof window !== 'undefined') {
    return (window as any).GEMINI_API_KEY;
  }
  return '';
};

export const getPersonalizedContent = async (
  originalContent: string,
  userPreferences: UserPreferences,
  pageTitle: string
): Promise<string> => {
  const GEMINI_API_KEY = getGeminiApiKey();

  if (!GEMINI_API_KEY) {
    throw new Error("Gemini API Key is not configured. Please add GEMINI_API_KEY to your .env file.");
  }

  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' }); // CORRECT MODEL

  // Clean HTML - remove all tags and extra whitespace
  const cleanContent = originalContent
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove scripts
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '') // Remove styles
    .replace(/<[^>]+>/g, ' ') // Remove all HTML tags
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim()
    .substring(0, 5000); // Limit to 5000 chars

  if (!cleanContent || cleanContent.length < 50) {
    throw new Error("Content is too short or empty to personalize.");
  }

  // Level-specific instructions
  let levelInstructions = '';
  switch (userPreferences.level) {
    case 'beginner':
      levelInstructions = `
- Use very simple, everyday language
- Break down complex ideas into small, easy steps
- Add lots of real-world examples and analogies
- Explain technical terms in simple words
- Use encouraging and friendly tone`;
      break;
    case 'intermediate':
      levelInstructions = `
- Use clear technical language but explain advanced concepts
- Balance theory with practical examples
- Include code snippets in ${userPreferences.languages.join(' or ')}
- Reference related concepts briefly
- Maintain professional but accessible tone`;
      break;
    case 'advanced':
      levelInstructions = `
- Use precise technical terminology freely
- Include implementation details and optimization strategies
- Add performance considerations and edge cases
- Reference research papers or advanced techniques
- Assume strong foundational knowledge`;
      break;
  }

  const prompt = `You are rewriting technical documentation about "${pageTitle}" for a ${userPreferences.level} level audience.

User Profile:
- Level: ${userPreferences.level}
- Languages: ${userPreferences.languages.join(', ')}
- AI Experience: ${userPreferences.aiExperience}
- Hardware Knowledge: ${userPreferences.hardwareKnowledge}

Instructions:${levelInstructions}

IMPORTANT: 
- Return ONLY the rewritten content in clean HTML format
- Use proper HTML tags: <h2>, <h3>, <p>, <ul>, <li>, <code>, <pre>, <strong>
- Do NOT include markdown code blocks or backticks
- Do NOT add introductory phrases like "Here is..." or "Rewritten content:"
- Start directly with the content

Original Content:
${cleanContent}

Rewritten HTML:`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    let text = response.text();

    // Clean up the response
    text = text
      .replace(/```html\n?/gi, '')
      .replace(/```\n?/g, '')
      .replace(/^#+\s+.*$/gm, '') // Remove markdown headers
      .trim();

    // Ensure we have actual content
    if (!text || text.length < 100) {
      throw new Error("Generated content is too short or empty.");
    }

    return text;
  } catch (error: any) {
    console.error("Error calling Gemini API:", error);

    if (error.message?.includes('API_KEY_INVALID') || error.message?.includes('API key')) {
      throw new Error("Invalid Gemini API Key. Please check your .env file.");
    }

    if (error.message?.includes('not found')) {
      throw new Error("Gemini model not available. Using 'gemini-pro' model.");
    }

    throw new Error(`Personalization failed: ${error.message}`);
  }
};