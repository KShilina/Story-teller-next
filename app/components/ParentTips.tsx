import { Lightbulb, Heart, BookOpen, Clock } from "lucide-react";
import { motion } from "framer-motion";

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
        <motion.div
          key={index}
          initial={{ opacity: 10, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: index * 0.1 }}
          whileHover={{ scale: 1.03 }}
          className="bg-gradient-to-br from-[#F8FAF5] to-[#E7EFDF] border border-[#C9D8C1] 
                   rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-[#A9C89B]/30 backdrop-blur-sm">
              <Icon className="h-6 w-6 text-[#BD8581]" />
            </div>
            <div>
              <h4 className="font-semibold text-[#353D2D] mb-2">{title}</h4>
              <p className="text-[#4B5840] leading-relaxed">{description}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
