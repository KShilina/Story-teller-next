import { ImageWithFallback } from "./figma/ImageWithFallback";

export default function WhyChildrenLoveIt() {
  return (
    <>
      <div className="relative rounded-2xl overflow-hidden mb-6 shadow-lg">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1659184619594-ef7e655b843e?crop=entropy&fit=max&q=80&w=1080"
          alt="Children reading together outdoors"
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-green-900/30 to-transparent"></div>
      </div>
      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-green-200">
        <h3 className="font-semibold text-gray-900 mb-3">Why children love it</h3>
        <ul className="space-y-2 text-gray-700">
          {[
            "They become the main character",
            "Choose their own adventure",
            "Stories grow with them",
          ].map((item) => (
            <li key={item} className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
