"use client";
import ParentTips from "./ParentTips";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export default function TipsSection() {
  return (
    <section className="relative bg-gradient-to-b from-green-100 bg-[#BD8585] py-20">
      <div className="absolute inset-0 opacity-10">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1647682212314-33376a4ec0eb?crop=entropy&fit=max&q=80&w=1080"
          alt="Soft nature background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Make story time special</h2>
          <p className="text-gray-700">Tips to enhance your child&apos;s storytelling experience</p>
        </div>
        <ParentTips />
      </div>
    </section>
  );
}
