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
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
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

  const handlePlayAudio = async (): Promise<void> => {
    try {
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
        setIsPlaying(false);
        return;
      }

      if (audioUrl) {
        audioRef.current?.play();
        setIsPlaying(true);
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
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-green-200 my-8">
      {/* Header */}
      <div className="text-center p-6 bg-green-50 rounded-t-2xl">
        <div className="flex items-center justify-center gap-2 mb-2">
          <BookOpen className="h-5 w-5 text-green-600" />
          <h2 className="text-xl font-semibold text-gray-900">
            {`${childName}'s Story`}
          </h2>
        </div>
        <p className="text-gray-700">{topic}</p>
        {emotionDetection && (
          <p className="text-gray-700 italic">{emotionDetection}</p>
        )}
      </div>

      {/* Story Content */}
      <div className="p-8">
        <div className="bg-green-50/50 p-8 rounded-xl mb-8 border border-green-100">
          <div className="whitespace-pre-wrap leading-relaxed text-gray-800">
            {story}
          </div>
        </div>

        {/* Translator Component */}
        <div className="flex justify-center mb-8">
          <div className="w-full max-w-md">
            <StoryTranslator story={story} />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={handlePlayAudio}
            className="h-12 px-6 bg-green-600 text-white flex items-center gap-2"
          >
            <Volume2 className="h-4 w-4" />
            {isPlaying ? "Pause Story" : "Play Story"}
          </Button>

          <Button
            onClick={onCreateNew}
            variant="outline"
            className="h-12 px-6 border-green-300 text-green-700 hover:bg-green-50 flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Create Another Story
          </Button>

          <Button
            onClick={handleDownload}
            className="h-12 px-6 bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Save Story
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StoryDisplay;
