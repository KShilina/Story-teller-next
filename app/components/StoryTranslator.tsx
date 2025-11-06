"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Languages } from "lucide-react";
import ActionButton from "./ActionButton";
import { Wand2 } from "lucide-react";

interface LanguageDetectorResult {
  detectedLanguage: string;
  confidence: number;
}

interface LanguageDetector {
  detect: (text: string) => Promise<LanguageDetectorResult[]>;
}

interface TranslatorAvailabilityParams {
  sourceLanguage: string;
  targetLanguage: string;
}

interface Translator {
  translate: (text: string) => Promise<string>;
}

interface TranslatorAPI {
  availability: (
    params: TranslatorAvailabilityParams
  ) => Promise<"available" | "unavailable">;
  create: (params: TranslatorAvailabilityParams) => Promise<Translator>;
}

interface ExtendedWindow extends Window {
  LanguageDetector?: {
    create: () => Promise<LanguageDetector>;
  };
  Translator?: TranslatorAPI;
}

export default function StoryTranslator({ story }: { story: string }) {
  const [supported, setSupported] = useState(true);
  const [targetLang, setTargetLang] = useState("");
  const [translatedStory, setTranslatedStory] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [showTranslationUI, setShowTranslationUI] = useState(false);

  useEffect(() => {
    if (!("LanguageDetector" in window) || !("Translator" in window)) {
      setSupported(false);
    }
  }, []);

  const handleTranslate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetLang) return;

    setIsTranslating(true);
    try {
      const extendedWindow = window as ExtendedWindow;
      const detector = await extendedWindow.LanguageDetector?.create();
      if (!detector) throw new Error("LanguageDetector not available");

      const detected = await detector.detect(story.trim());
      const sourceLanguage = detected[0]?.detectedLanguage || "en";

      const availability = await extendedWindow.Translator?.availability({
        sourceLanguage,
        targetLanguage: targetLang,
      });

      if (availability === "unavailable") {
        setTranslatedStory("⚠️ This language pair is not supported.");
        return;
      }

      const translator = await extendedWindow.Translator?.create({
        sourceLanguage,
        targetLanguage: targetLang,
      });

      if (!translator) throw new Error("Translator creation failed");

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
      <p className="text-gray-700">
        Your browser doesn’t support the Language Detector or Translator API.
      </p>
    );
  }

  return (
    <div className="flex justify-center mb-8">
      <div className="mb-6 space-y-5">
        {/* Show question until user clicks Yes */}
        {!showTranslationUI ? (
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <p className="text-md font-medium text-[#3E4A2B] italic">
              Is your family multilingual?
            </p>
            <ActionButton
              label="Yes, I want to traslate!"
              loadingIcon={Wand2}
              variant="secondary"
              onClick={() => setShowTranslationUI(true)}
            />
          </div>
        ) : (
          <>
            {/* Translation Form */}
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <form
                onSubmit={handleTranslate}
                className="flex flex-col sm:flex-row items-center gap-3 p-4 rounded-md transition-all"
              >
                <div className="relative w-full sm:w-auto flex-1">
                  <select
                    value={targetLang}
                    onChange={(e) => setTargetLang(e.target.value)}
                    className="w-40 h-11 px-4 rounded-md bg-white border border-[#B7C8A1] text-[#3E4A2B] font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-[#94A77A] focus:border-transparent transition-all appearance-none"
                  >
                    <option value="">🌍 Language</option>
                    <option value="fr">🇫🇷 French</option>
                    <option value="ja">🇯🇵 Japanese</option>
                    <option value="pt">🇵🇹 Portuguese</option>
                    <option value="es">🇪🇸 Spanish</option>
                  </select>

                  {/* Dropdown arrow */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7A8E5F] pointer-events-none"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>

                <Button
                  type="submit"
                  disabled={isTranslating || !targetLang}
                  className="h-11 w-40 px-5 flex items-center gap-2 rounded-md bg-gradient-to-r from-[#6F8056] to-[#5E7047] text-white font-semibold shadow-sm hover:shadow-md hover:brightness-110 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Languages className="h-4 w-4" />
                  {isTranslating ? "Translating..." : "Translate"}
                </Button>
              </form>
            </div>
            {/* Translated Story */}
            {translatedStory && (
              <div className="bg-white p-8 rounded-xl mb-8">
                <h3 className="font-semibold text-[#5A6645] mb-2">
                  Translated Story:
                </h3>
                <div className="whitespace-pre-wrap leading-loose">
                  {translatedStory}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
