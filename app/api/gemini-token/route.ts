import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
  const token = await ai.authTokens.create({
    config: { uses: 1, expireTime: new Date(Date.now() + 60_000).toISOString() },
  });
  return NextResponse.json({ token: token.name });
}