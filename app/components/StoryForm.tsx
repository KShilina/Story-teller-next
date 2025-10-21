"use client";

import { useState, FC } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import StoryLength from "./StoryLength";
import { Wand2, Sparkles, Shuffle } from "lucide-react";

const storyTopics = [
  "Adventure in Space",
  "Magical Forest",
  "Underwater Kingdom",
  "Dinosaur Discovery",
  "Superhero Mission",
  "Pirate Treasure Hunt",
  "Fairy Tale Castle",
  "Animal Safari",
  "Time Travel Adventure",
  "Robot Friends",
  "Flying Dragons",
  "Secret Garden",
];

const emotionList = [
  "Happy",
  "Curious",
  "Excited",
  "Brave",
  "Playful",
  "Dreamy",
  "Magical",
  "Mysterious",
  "Calm",
  "Peaceful",
  "Hopeful",
  "Kind",
  "Funny",
  "Adventurous",
  "Proud",
  "Grateful",
];

interface StoryFormProps {
  onGenerateStory: (data: {
    childName: string;
    age: number;
    topic?: string;
    length: string;
    emotionDetection?: string;
  }) => void;
  isGenerating: boolean;
}

const StoryForm: FC<StoryFormProps> = ({ onGenerateStory, isGenerating }) => {
  const [childName, setChildName] = useState("");
  const [age, setAge] = useState("");
  const [topic, setTopic] = useState("");
  const [length, setLength] = useState("medium");
  const [customTopic, setCustomTopic] = useState("");
  const [emotionDetection, setEmotionDetection] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (childName && age) {
      const finalTopic = customTopic.trim() || topic || "Surprise Adventure";
      onGenerateStory({
        childName: childName.trim(),
        age: parseInt(age),
        topic: finalTopic,
        length,
        emotionDetection,
      });
    }
  };

  const handleRandomTopic = () => {
    const random = storyTopics[Math.floor(Math.random() * storyTopics.length)];
    setTopic(random);
  };

  const isValid =
    childName.trim() &&
    age &&
    parseInt(age) >= 1 &&
    parseInt(age) <= 18 &&
    length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg border border-[#F6EFEF] p-5 sm:p-6"
    >
      {/* Header */}
      <div className="text-center mb-5">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Sparkles className="h-4 w-4 text-[#BD8581]" />
          <h2 className="text-base sm:text-lg font-semibold text-gray-900">
            Create Your Story
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-gray-500">
          Personalize your child’s adventure in seconds.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Child Name */}
        <div className="grid gap-1.5">
          <Label htmlFor="childName" className="text-sm font-medium text-gray-800 italic">
            Child’s Name*
          </Label>
          <Input
            id="childName"
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
            placeholder="Enter name"
            className="h-10 text-sm border-[#F6EFEF]"
            required
          />
        </div>

        {/* Age */}
        <div className="grid gap-1.5">
          <Label htmlFor="age" className="text-sm font-medium text-gray-800 italic">
            Age*
          </Label>
          <Input
            id="age"
            type="number"
            min="1"
            max="18"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="1–12"
            className="h-10 text-sm border-[#F6EFEF]"
            required
          />
        </div>

         {/* Story Length */}
         <StoryLength value={length} onChange={setLength} />

        {/* Topic */}
        <div className="grid gap-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="topic" className="text-sm font-medium text-gray-800 italic">
              Adventure Theme
            </Label>
            <button
              type="button"
              onClick={handleRandomTopic}
              className="text-xs text-[#BD8581] flex items-center gap-1 hover:underline"
            >
              <Shuffle className="h-3 w-3" />
              Surprise me
            </button>
          </div>
          <Select value={topic} onValueChange={setTopic}>
            <SelectTrigger className="h-10 text-sm border-[#F6EFEF] focus:ring-[#F6EFEF]">
              <SelectValue placeholder="Select or surprise theme" />
            </SelectTrigger>
            <SelectContent className="bg-white border-[#F6EFEF] rounded-lg shadow-md">
              {storyTopics.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Custom Topic */}
        <div className="grid gap-1.5">
          <Label htmlFor="customTopic" className="text-sm font-medium text-gray-800 italic">
            Custom Theme
          </Label>
          <Input
            id="customTopic"
            value={customTopic}
            onChange={(e) => setCustomTopic(e.target.value)}
            placeholder="Type your idea"
            className="h-10 text-sm border-[#F6EFEF] focus:ring-green-500"
          />
        </div>

        {/* Emotion */}
        <div className="grid gap-1.5">
          <Label htmlFor="emotionDetection" className="text-sm font-medium text-gray-800 italic">
            Emotion
          </Label>
          <Select value={emotionDetection} onValueChange={setEmotionDetection}>
            <SelectTrigger className="h-10 text-sm border-[#F6EFEF] focus:ring-[#F6EFEF]">
              <SelectValue placeholder="Select emotion" />
            </SelectTrigger>
            <SelectContent className="bg-white border-[#F6EFEF] rounded-lg shadow-md">
              {emotionList.map((emotion) => (
                <SelectItem key={emotion} value={emotion}>
                  {emotion}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={!isValid || isGenerating}
          className={`w-full h-10 mt-2 text-sm font-medium rounded-lg flex items-center justify-center gap-2 ${
            isGenerating
              ? "bg-[#8F5E5E] cursor-wait"
              : "bg-[#BD8581] hover:bg-[#8F5E5E] text-white"
          }`}
        >
          {isGenerating ? (
            <>
              <Wand2 className="animate-spin h-4 w-4" />
              Creating story...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Generate Story
            </>
          )}
        </Button>
      </form>
    </motion.div>
  );
};

export default StoryForm;
