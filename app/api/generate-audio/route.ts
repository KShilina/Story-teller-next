import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// Maximum number of retries for 429 errors
const MAX_RETRIES = 3;
// Delay between retries in milliseconds
const RETRY_DELAY = 2000;

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text || text.trim().length === 0) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    let attempt = 0;
    while (attempt < MAX_RETRIES) {
      try {
        const mp3 = await openai.audio.speech.create({
          model: "gpt-4o-mini-tts",
          voice: "alloy",
          input: text,
        });

        const buffer = Buffer.from(await mp3.arrayBuffer());
        return new NextResponse(buffer, {
          headers: { "Content-Type": "audio/mpeg" },
        });
      } catch (error: any) {
        // If 429, retry after delay
        if (error.status === 429) {
          attempt++;
          console.warn(`429 Rate limit hit, retrying attempt ${attempt}/${MAX_RETRIES}...`);
          await sleep(RETRY_DELAY);
          continue;
        }
        // Other errors
        console.error("OpenAI TTS Error:", error);
        return NextResponse.json(
          { error: error.response?.data || error.message || "Failed to generate audio" },
          { status: error.status || 500 }
        );
      }
    }

    return NextResponse.json({ error: "Rate limit exceeded, please try again later." }, { status: 429 });
  } catch (error: any) {
    console.error("Unexpected API Error:", error);
    return NextResponse.json({ error: error.message || "Failed to generate audio" }, { status: 500 });
  }
}
