import DOMPurify from "dompurify";

/**
 * Generates a story based on child data.
 * @param {Object} data - { childName, age, topic, length }
 * @returns {Promise<string>} - Generated story
 */
export async function generateStory(data) {
  console.log("here is data:", data)
  // Check if Writer API is supported
  if (!("Writer" in window)) {
    return "Your browser doesn’t support the Writer API. Use Chrome and join the Early Preview Program.";
  }

  const context = `${data.childName}, age ${data.age}, topic: ${data.topic}`;
  const options = {
    tone: "neutral",
    length: data.length,
    format: "markdown",
    sharedContext: context,
  };

  try {
    // Create writer
    const writer = await window.Writer.create(options);

    // Construct prompt
    const prompt = `Write a story for ${data.childName} about "${data.topic}" include "${data.emotionDetection}". Keep it age-appropriate for age ${data.age}.`;

    // Start streaming response
    let fullResponse = "";
    const stream = writer.writeStreaming(prompt);

    for await (const chunk of stream) {
      fullResponse += chunk;
    }

    // Sanitize HTML output (if you plan to render it with dangerouslySetInnerHTML)
    return DOMPurify.sanitize(fullResponse);
  } catch (err) {
    console.error("Error generating story:", err);
    return "Sorry, there was an error creating your story. Please try again!";
  }
}
