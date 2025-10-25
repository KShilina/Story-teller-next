import { BookOpen } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#5A6645] text-[#F4F5EC] py-12 border-t border-[#9FB694]/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* --- Logo & Title --- */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="bg-[#A7C7A1] p-2 rounded-xl shadow-sm flex items-center justify-center">
            <BookOpen className="h-5 w-5 text-[#BD8581]" />
          </div>
          <div className="text-left">
            <span className="text-xl font-semibold tracking-tight">
            AI-Powered Storytelling
            </span>
            <div className="text-xs text-[#C6D4B9]">
              Making bedtime magical for every family
            </div>
          </div>
        </div>

        {/* --- Subtitle --- */}
        <p className="text-[#E8E9E0] mb-6">
          Crafted with care for families who love inclusive storytelling
        </p>

        {/* --- Features --- */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-[#D9E4CC] mb-6">
          {[
            "Unlimited stories",
            "100% safe & inclusive",
            "No data collection",
          ].map((item) => (
            <span key={item} className="flex items-center gap-1">
              <span className="text-[#A7C7A1]">✓</span> {item}
            </span>
          ))}
        </div>

        {/* --- Tagline --- */}
        <div className="text-xs text-[#C6D4B9]">
          Where imagination meets technology for every child
        </div>
      </div>
    </footer>
  );
}
