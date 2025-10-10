import { Lightbulb, Heart, BookOpen, Clock } from "lucide-react";

const tips = [
  {
    icon: BookOpen,
    title: "Interactive Reading",
    description:
      'Pause during the story to ask "What do you think happens next?" This engages your child\'s imagination and creativity.',
  },
  {
    icon: Clock,
    title: "Perfect Timing",
    description:
      "2-3 minute stories are ideal for bedtime routines, car rides, or any quiet moment when you want to spark imagination.",
  },
  {
    icon: Heart,
    title: "Values & Learning",
    description:
      "Every story includes positive themes like kindness, courage, and friendship while being educational and entertaining.",
  },
  {
    icon: Lightbulb,
    title: "Extend the Fun",
    description:
      "Encourage your child to draw scenes from the story, act out parts, or even create their own sequel adventures.",
  },
];

export default function ParentTips() {
  return (
    <div className="grid gap-6 md:grid-cols-2 my-8">
      {tips.map(({ icon: Icon, title, description }, index) => (
        <div
          key={index}
          className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-green-200"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-green-100 rounded-xl">
              <Icon className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>
              <p className="text-gray-700 leading-relaxed">{description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
