import { ImageWithFallback } from "./figma/ImageWithFallback";

export default function ParentsLoveIt() {
  return (
    <>
      <div className="relative rounded-2xl overflow-hidden mb-6 shadow-lg">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1714646793141-11802dc4820f?crop=entropy&fit=max&q=80&w=1080"
          alt="Gentle parenting moment with children"
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-green-900/30 to-transparent"></div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-green-200">
        <h3 className="font-semibold text-gray-900 mb-3">Parents love it too</h3>
        <div className="space-y-3">
          {[
            `"My child asks for their personalized stories every night!"`,
            `"Finally, stories that match their imagination!"`,
          ].map((quote) => (
            <blockquote
              key={quote}
              className="text-sm italic text-gray-700 border-l-3 border-green-400 pl-3"
            >
              {quote}
            </blockquote>
          ))}
        </div>
      </div>
    </>
  );
}
