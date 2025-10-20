"use client";

import { FC } from "react";
import StoryForm from "./StoryForm";
import WhyChildrenLoveIt from "./WhyChildrenLoveIt";
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
    <section className="relative bg-gradient-to-b from-[#E4E9DC] to-[#F6F8F4] overflow-hidden py-20">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-64 sm:h-80 md:h-96 overflow-hidden">
        <div className="absolute top-10 left-10 w-24 h-24 rounded-full blur-3xl bg-[#BD8585]" />
        <div className="absolute top-40 right-20 w-32 h-32 rounded-full blur-3xl bg-[#BD8585]" />
        <div className="absolute bottom-20 left-1/4 w-20 h-20 rounded-full blur-3xl bg-[#BD8585]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        {/* Intro */}
        <div className="inline-flex items-center justify-center gap-2 bg-[#BCE0B0]/40 px-4 py-2 rounded-full mb-6 mx-auto">
          <Sparkles className="h-5 w-5 text-[#BD8581]" />
          <span className="text-sm font-medium text-[#353D2D]">
            AI-Powered Storytelling
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-[#353D2D] mb-6 leading-tight">
          Create magical stories
          <br />
          for your child
        </h1>

        <p className="text-lg text-[#3D4635] mb-12 leading-relaxed">
          {
            "Personalized, age-appropriate stories generated instantly. Perfect for bedtime, quiet time, or sparking your child's imagination anytime."
          }
        </p>

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

        {/* Why children love it */}
        <div className="mb-12">
          <WhyChildrenLoveIt />
        </div>

        {/* Story Form */}
        <div className="relative mb-12">
          <div className="absolute -left-66 top-86 w-36 h-38 rounded-full blur-3xl bg-[#BD8585]/40 rotate-6"></div>
          <div className="absolute -right-64 top-28 w-36 h-20 rounded-full blur-3xl bg-[#BD8585]/70 -rotate-12"></div>

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
