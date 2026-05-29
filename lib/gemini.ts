import { GoogleGenAI } from "@google/genai";

/**
 * Creates a GoogleGenAI client instance for the browser using an ephemeral token.
 * Note: httpOptions.apiVersion must be 'v1alpha' for the Live API connection.
 */
export function createLiveClient(token: string): GoogleGenAI {
  return new GoogleGenAI({
    apiKey: token,
    httpOptions: {
      apiVersion: "v1alpha",
    },
  });
}
