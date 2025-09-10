
import { GoogleGenAI, Modality, GenerateContentResponse } from "@google/genai";

export interface RedesignResult {
  imageUrl: string;
  text: string | null;
}

const dataUrlToParts = (dataUrl: string): { mimeType: string; data: string } => {
  const parts = dataUrl.split(',');
  const mimeType = parts[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
  const data = parts[1];
  if (!data || !mimeType) {
    throw new Error('Invalid data URL format.');
  }
  return { mimeType, data };
};

export const redesignImage = async (imageDataUrl: string, prompt: string): Promise<RedesignResult> => {
  if (!process.env.API_KEY) {
    throw new Error("API key not configured. Please set the API_KEY environment variable.");
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const { mimeType, data: base64ImageData } = dataUrlToParts(imageDataUrl);

  const response: GenerateContentResponse = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image-preview',
    contents: {
      parts: [
        {
          inlineData: {
            data: base64ImageData,
            mimeType: mimeType,
          },
        },
        {
          text: prompt,
        },
      ],
    },
    config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
    },
  });

  let redesignedImageUrl: string | null = null;
  let redesignedText: string | null = null;

  if (response.candidates && response.candidates.length > 0) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64ImageBytes: string = part.inlineData.data;
          redesignedImageUrl = `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
        } else if (part.text) {
          redesignedText = part.text;
        }
      }
  }

  if (!redesignedImageUrl) {
    console.error('API Response:', JSON.stringify(response, null, 2));
    throw new Error("هوش مصنوعی نتوانست تصویر جدیدی ایجاد کند. لطفاً دوباره امتحان کنید.");
  }

  return { imageUrl: redesignedImageUrl, text: redesignedText };
};
