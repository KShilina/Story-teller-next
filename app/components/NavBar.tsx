"use client";
import { BookOpen, Clock, Users } from "lucide-react";

export default function NavBar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#5A6645]/95 backdrop-blur-sm border-b border-[#9FB694]/30 shadow-[0_2px_6px_rgba(0,0,0,0.1)] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* --- Left Section: Logo + Title --- */}
          <div className="flex items-center gap-3">
            <div className="bg-[#A7C7A1] p-2 rounded-xl shadow-sm flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-[#3B3F2E]" />
            </div>

            <div className="flex flex-col leading-tight">
              <span className="text-lg sm:text-xl font-semibold text-[#F4F5EC] tracking-tight">
                StoryTeller AI
              </span>
              <span className="text-xs text-[#C6D4B9]">
                Personalized stories for kids
              </span>
            </div>
          </div>

          {/* --- Right Section: Info items --- */}
          <div className="hidden md:flex items-center gap-6 text-sm text-[#E8E9E0]">
            <div className="flex items-center gap-2 hover:text-[#F5F6ED] transition-colors">
              <Clock className="h-4 w-4 text-[#C9DAB7]" />
              <span>2–3 min stories</span>
            </div>
            <div className="flex items-center gap-2 hover:text-[#F5F6ED] transition-colors">
              <Users className="h-4 w-4 text-[#C9DAB7]" />
              <span>Ages 1–18</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
