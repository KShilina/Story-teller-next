import DOMPurify from "dompurify";

// Define the shape of the input data
export interface GenerateStoryData {
  childName: string;
  age: number;
  topic?: string;
  length: string;
  emotionDetection?: string;
}

// Define types for the hypothetical Writer API
interface WriterOptions {
  tone: string;
  length: string;
  format: string;
  sharedContext: string;
}

interface Writer {
  writeStreaming(prompt: string): AsyncIterable<string>;
}

interface WriterAPI {
  create(options: WriterOptions): Promise<Writer>;
}

// Extend the Window interface to include Writer
declare global {
  interface Window {
    Writer: WriterAPI;
  }
}

/**
 * Generates a story based on child data.
 * @param data Object containing childName, age, topic, length, emotionDetection
 * @returns Promise<string> Generated and sanitized story text
 */
export async function generateStory(data: GenerateStoryData): Promise<string> {
  // Check if Writer API is supported
  if (!("Writer" in window)) {
    return "Your browser doesn’t support the Writer API. Use Chrome and join the Early Preview Program.";
  }

  const context = `${data.childName}, age ${data.age}, topic: ${data.topic}`;
  const options: WriterOptions = {
    tone: "neutral",
    length: data.length,
    format: "markdown",
    sharedContext: context,
  };

  try {
    // Create writer
    const writer = await window.Writer.create(options);

    // Construct prompt
    const prompt = `Write a story for ${data.childName} about "${data.topic}" include "${data.emotionDetection || ""}". Keep it age-appropriate for age ${data.age}.`;

    // Stream and collect the response
    let fullResponse = "";
    const stream = writer.writeStreaming(prompt);

    for await (const chunk of stream) {
      fullResponse += chunk;
    }

    // Sanitize before returning
    return DOMPurify.sanitize(fullResponse);
  } catch (err) {
    console.error("Error generating story:", err);
    return "Sorry, there was an error creating your story. Please try again!";
  }
}
