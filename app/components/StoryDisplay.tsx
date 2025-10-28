"use client";

import { useState, useRef, FC } from "react";
import { Button } from "./ui/button";
import { BookOpen, RotateCcw, Download, Volume2 } from "lucide-react";
import StoryTranslator from "./StoryTranslator";

interface StoryDisplayProps {
  story: string;
  childName: string;
  topic?: string;
  emotionDetection?: string;
  onCreateNew: () => void;
}

const StoryDisplay: FC<StoryDisplayProps> = ({
  story,
  childName,
  topic,
  emotionDetection,
  onCreateNew,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false); // true when audio is playing
  const [audioUrl, setAudioUrl] = useState<string | null>(null); // stores generated audio file
  const [isProcessing, setIsProcessing] = useState(false); // true when audio is generating or preparing
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleDownload = (): void => {
    const element = document.createElement("a");
    const file = new Blob([story], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${childName}'s ${topic} Story.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handlePlayAudio = async () => {
    if (isProcessing) return; // prevent multiple clicks
    setIsProcessing(true);

    try {
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
        setIsPlaying(false);
        setIsProcessing(false);
        return;
      }

      if (audioUrl) {
        audioRef.current?.play();
        setIsPlaying(true);
        setIsProcessing(false);
        return;
      }

      setIsPlaying(true);
      const response = await fetch("/api/generate-audio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: story }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Failed to generate audio");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);

      const audio = new Audio(url);
      audioRef.current = audio;
      audio.play();
      audio.onended = () => setIsPlaying(false);
    } catch (error) {
      console.error("Play Audio Error:", error);
      if (error instanceof Error) alert(error.message);
      setIsPlaying(false);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section className="relative bg-gradient-to-b from-[#E4E9DC] to-[#E4C8C8] overflow-hidden py-20">
      <div className="w-full max-w-4xl mx-auto bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border-roseBorder my-8">
        {/* Header */}
        <div className="text-center p-6 bg-[#F0F2E6] rounded-t-2xl">
          <div className="flex items-center justify-center gap-2 mb-2">
            <BookOpen className="h-5 w-5 text-[#BD8581]" />
            <h2 className="text-xl font-semibold text-gray-700">
              {`${childName}'s Story`}
            </h2>
          </div>
          <p className="text-[#BD8581] font-semibold">{topic}</p>
          {emotionDetection && (
            <p className="text-gray-700 italic">{emotionDetection}</p>
          )}
        </div>

        {/* Story Content */}
        <div className="p-8">
          <div className="bg-white p-8 rounded-xl mb-8">
            <div className="whitespace-pre-wrap leading-relaxed text-gray-800">
              {story}
            </div>
          </div>

          <div className="flex flex-col sm:flex-column gap-4 justify-center">
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handlePlayAudio}
                disabled={isProcessing}
                className={`h-12 px-6 text-white font-semibold flex items-center gap-2 transition-colors justify-center rounded-lg ${
                  isProcessing
                    ? "bg-[#8F5E5E] cursor-wait"
                    : isPlaying
                    ? "bg-[#A46E6E] hover:bg-[#8F5E5E]"
                    : "bg-[#BD8581] hover:bg-[#8F5E5E]"
                }`}
              >
                {isProcessing ? (
                  <>
                    <Volume2 className="animate-spin h-4 w-4" />
                    Preparing audio...
                  </>
                ) : (
                  <>
                    <Volume2 className="h-4 w-4" />
                    {isPlaying ? "Pause Story" : "Play Story"}
                  </>
                )}
              </Button>

              <Button
                onClick={onCreateNew}
                className="h-12 px-6 bg-gradient-to-r from-[#6F8056] to-[#5E7047] shadow-sm hover:shadow-md hover:brightness-110 transition-all disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold flex items-center gap-2 transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
                Create Another Story
              </Button>

              <Button
                onClick={handleDownload}
                className="h-12 px-6 bg-gradient-to-r from-[#6F8056] to-[#5E7047] shadow-sm hover:shadow-md hover:brightness-110 transition-all disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold flex items-center gap-2 transition-colors"
              >
                <Download className="h-4 w-4" />
                Save Story
              </Button>
            </div>

            {/* Translator Component */}
            <div>
              <StoryTranslator story={story} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoryDisplay;
