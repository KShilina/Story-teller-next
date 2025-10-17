"use client";

import { useState, useEffect, FormEvent } from "react";
import { Button } from "./ui/button";
import { Languages } from "lucide-react";

interface StoryTranslatorProps {
  story: string;
}

// These APIs are experimental; define minimal types to satisfy TS
declare const LanguageDetector: {
  create: () => Promise<{
    detect: (text: string) => Promise<{ detectedLanguage: string }[]>;
  }>;
};

declare const Translator: {
  availability: (params: {
    sourceLanguage: string;
    targetLanguage: string;
  }) => Promise<"available" | "unavailable">;

  create: (params: {
    sourceLanguage: string;
    targetLanguage: string;
  }) => Promise<{
    translate: (text: string) => Promise<string>;
  }>;
};

export default function StoryTranslator({ story }: StoryTranslatorProps) {
  const [supported, setSupported] = useState(true);
  const [targetLang, setTargetLang] = useState<string>("");
  const [translatedStory, setTranslatedStory] = useState<string>("");
  const [isTranslating, setIsTranslating] = useState<boolean>(false);

  useEffect(() => {
    if (!("LanguageDetector" in self) || !("Translator" in self)) {
      setSupported(false);
    }
  }, []);

  const handleTranslate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!targetLang) return;

    setIsTranslating(true);
    try {
      const detector = await LanguageDetector.create();
      const detected = await detector.detect(story.trim());
      const sourceLanguage = detected[0]?.detectedLanguage || "en";

      const availability = await Translator.availability({
        sourceLanguage,
        targetLanguage: targetLang,
      });

      if (availability === "unavailable") {
        setTranslatedStory("⚠️ This language pair is not supported.");
        return;
      }

      const translator = await Translator.create({
        sourceLanguage,
        targetLanguage: targetLang,
      });

      const translation = await translator.translate(story.trim());
      setTranslatedStory(translation);
    } catch (error) {
      console.error("Translation failed:", error);
      setTranslatedStory("⚠️ An error occurred during translation.");
    } finally {
      setIsTranslating(false);
    }
  };

  if (!supported) {
    return (
      <p>Your browser doesn’t support the Language Detector or Translator API.</p>
    );
  }

  return (
    <div className="mb-6">
      <form
        onSubmit={handleTranslate}
        className="flex flex-col sm:flex-row gap-4 items-center"
      >
        <select
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
          className="border border-green-300 rounded-xl h-12 px-4 focus:ring-green-500 focus:border-green-500"
        >
          <option value="">Choose your language</option>
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="ja">Japanese</option>
          <option value="pt">Portuguese</option>
          <option value="es">Spanish</option>
        </select>

        <Button
          type="submit"
          disabled={isTranslating || !targetLang}
          className="h-12 px-6 bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
        >
          <Languages className="h-4 w-4" />
          {isTranslating ? "Translating..." : "Translate"}
        </Button>
      </form>

      {translatedStory && (
        <div className="bg-yellow-50/70 p-6 rounded-xl mt-4 border border-yellow-200">
          <h3 className="font-semibold text-yellow-800 mb-2">
            Translated Story:
          </h3>
          <div className="whitespace-pre-wrap text-gray-800">
            {translatedStory}
          </div>
        </div>
      )}
    </div>
  );
}
