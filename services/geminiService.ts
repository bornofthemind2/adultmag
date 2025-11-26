import { GoogleGenAI } from "@google/genai";
import { Product, SUPPORTED_TITLES, GROUNDING_URLS } from '../types';

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const getPlaceholderImage = (seed: string) => `https://picsum.photos/seed/${seed}/400/550`;

export const fetchCuratedCatalog = async (): Promise<Product[]> => {
  if (!apiKey) {
    // Return empty array instead of mock data when no API key is present
    return [];
  }

  try {
    const prompt = `
      I need a curated list of 8 high-value vintage magazine issues from 1985 to 1995.
      Titles: ${SUPPORTED_TITLES.join(', ')}.
      
      Use Google Search to find real pre-owned market values (Condition: Very Good/Fine), featured models/actors, and specific cover details from: ${GROUNDING_URLS.join(', ')}.
      
      Focus on issues with highest collector value.
      
      OUTPUT: JSON Array ONLY. No text.
      
      Schema:
      {
        "title": string,
        "issueDate": string (e.g., "March 1992"),
        "year": number,
        "country": string,
        "description": string (Focus on cover content and articles),
        "price": number (Realistic pre-owned price in USD),
        "marketNotes": string (Why is it valuable?),
        "actors": string[] (List of 1-3 key models/actresses featured),
        "collectibleReason": string (Specific reason for collectibility, e.g., "First appearance of...")
      }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      }
    });

    let jsonStr = response.text || '';
    
    const startIndex = jsonStr.indexOf('[');
    const endIndex = jsonStr.lastIndexOf(']');
    
    if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
        jsonStr = jsonStr.substring(startIndex, endIndex + 1);
    } else {
        return [];
    }
    
    const rawData = JSON.parse(jsonStr);
    
    return rawData.map((item: any, index: number) => ({
      id: `gen-${Date.now()}-${index}`,
      ...item,
      // In a real scenario, we would use an image search API here. 
      // For now, we generate a consistent seed or use a placeholder if no URL found.
      imageUrl: item.imageUrl || getPlaceholderImage(`${item.title}-${item.year}-${index}`),
      isFeatured: index < 3, 
      actors: item.actors || [],
      collectibleReason: item.collectibleReason || item.marketNotes
    }));

  } catch (error) {
    console.error("Gemini API Error:", error);
    return [];
  }
};
