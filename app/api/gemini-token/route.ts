import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
      httpOptions: { apiVersion: "v1alpha" },
    });
    const token = await ai.authTokens.create({
      config: { uses: 1, expireTime: new Date(Date.now() + 30 * 60_000).toISOString() },
    });
    return NextResponse.json({ token: token.name });
  } catch (error: any) {
    console.error("API Token Error:", error);
    return NextResponse.json({ error: error.message || String(error) }, { status: 500 });
  }
}