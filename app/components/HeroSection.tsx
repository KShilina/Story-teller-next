"use client";

import { FC } from "react";
import StoryForm from "./StoryForm";
import WhyLoveIt from "./WhyLoveIt";
import { Sparkles } from "lucide-react";

interface HeroSectionProps {
  onGenerateStory: (data: {
    childName: string;
    age: number;
    topic?: string;
    length: string;
    emotionDetection?: string;
  }) => void;
  isGenerating: boolean;
}

const HeroSection: FC<HeroSectionProps> = ({
  onGenerateStory,
  isGenerating,
}) => {
  return (
    <section className="relative bg-gradient-to-b from-[#ECEEEA] to-[#EBD9D9] overflow-hidden py-20">
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        {/* Intro */}
        <div className="inline-flex items-center justify-center gap-2 bg-[#BCE0B0]/40 px-4 py-2 rounded-full mb-6 mx-auto">
          <Sparkles className="h-5 w-5 text-[#BD8581]" />
          <span className="text-sm font-medium text-[#353D2D]">
            AI-Powered Storytelling
          </span>
        </div>

        <h2 className="text-3xl md:text-3xl font-bold text-[#353D2D] mb-6 leading-tight">
          Works offline with no data collection
        </h2>

        <h1 className="text-4xl md:text-5xl font-bold text-[#353D2D] mb-6 leading-tight">
          Magical stories for your child
        </h1>

        <div className="flex flex-wrap justify-center gap-6 text-sm text-[#3D4635] mb-12">
          {[
            "Age-appropriate content",
            "Instant generation",
            "Safe & inclusive",
          ].map((text) => (
            <div key={text} className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#97B48E] rounded-full inline-block" />
              {text}
            </div>
          ))}
        </div>

        {/* Why love it */}
        <div className="mb-12">
          <WhyLoveIt />
        </div>

        {/* Story Form */}
        <div className="relative mb-12">
          <StoryForm
            onGenerateStory={onGenerateStory}
            isGenerating={isGenerating}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
