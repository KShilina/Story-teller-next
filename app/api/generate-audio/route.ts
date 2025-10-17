import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// Maximum number of retries for 429 errors
const MAX_RETRIES = 3;
const RETRY_DELAY = 2000;

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Helper type guard to detect OpenAI APIError
function isOpenAIError(error: unknown): error is { status?: number; message?: string; response?: { data?: unknown } } {
  return typeof error === "object" && error !== null && "message" in error;
}

export async function POST(req: Request): Promise<Response> {
  try {
    const { text }: { text?: string } = await req.json();

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
      } catch (error: unknown) {
        if (isOpenAIError(error)) {
          if (error.status === 429) {
            attempt++;
            console.warn(`429 Rate limit hit, retrying attempt ${attempt}/${MAX_RETRIES}...`);
            await sleep(RETRY_DELAY);
            continue;
          }

          console.error("OpenAI TTS Error:", error);
          return NextResponse.json(
            { error: error.response?.data || error.message || "Failed to generate audio" },
            { status: error.status || 500 }
          );
        } else {
          console.error("Unknown Error:", error);
          return NextResponse.json({ error: "Unexpected error occurred" }, { status: 500 });
        }
      }
    }

    return NextResponse.json({ error: "Rate limit exceeded, please try again later." }, { status: 429 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Unexpected API Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    console.error("Unknown error during request handling:", error);
    return NextResponse.json({ error: "Failed to generate audio" }, { status: 500 });
  }
}