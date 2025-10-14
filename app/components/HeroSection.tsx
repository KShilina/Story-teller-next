"use client";
import { Sparkles } from "lucide-react";
import StoryForm from "./StoryForm";
import WhyChildrenLoveIt from "./WhyChildrenLoveIt";
import ParentsLoveIt from "./ParentsLoveIt";

export default function HeroSection({ onGenerateStory, isGenerating }) {
  return (
    <section className="relative bg-gradient-to-b from-green-50 to-green-100 overflow-hidden">
      {/* Subtle glowing background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-24 h-24 bg-green-600 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-green-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-green-400 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Intro text */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-green-100 px-4 py-2 rounded-full mb-6">
            <Sparkles className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">AI-Powered Storytelling</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Create magical stories<br />
            for your child
          </h1>

          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            Personalized, age-appropriate stories generated instantly. Perfect for bedtime,
            quiet time, or sparking your child's imagination anytime.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            {["Age-appropriate content", "Instant generation", "Safe & inclusive"].map((text) => (
              <div key={text} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Layout grid */}
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          <div className="hidden lg:block sticky top-24">
            <WhyChildrenLoveIt />
          </div>

          <div>
            <StoryForm onGenerateStory={onGenerateStory} isGenerating={isGenerating} />
          </div>

          <div className="hidden lg:block sticky top-24">
            <ParentsLoveIt />
          </div>
        </div>
      </div>
    </section>
  );
}
