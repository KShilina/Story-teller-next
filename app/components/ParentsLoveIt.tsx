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
    </>
  );
}
