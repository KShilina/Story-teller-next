"use client";

import { useState } from "react";
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
import { Wand2, Sparkles } from "lucide-react";

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
  "Surprised",
  "Adventurous",
  "Scared",
  "Sad",
  "Lonely",
  "Proud",
  "Grateful",
];

export default function StoryForm({ onGenerateStory, isGenerating }) {
  const [childName, setChildName] = useState("");
  const [age, setAge] = useState("");
  const [topic, setTopic] = useState("");
  const [length, setLength] = useState("");
  const [customTopic, setCustomTopic] = useState("");
  const [emotionDetection, setEmotionDetection] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (childName && age) {
      const finalTopic = customTopic.trim() || topic || "Surprise Adventure";
      const storyEmotion = emotionDetection.trim();
      onGenerateStory({
        childName: childName.trim(),
        age: parseInt(age),
        topic: finalTopic,
        length,
        emotionDetection: storyEmotion,
      });
    }
  };

  const isValid =
    childName.trim() && age && parseInt(age) >= 1 && parseInt(age) <= 18;

  return (
    <div className="w-full max-w-lg mx-auto bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200 overflow-hidden">
      {/* Header */}
      <div className="text-center p-6 bg-green-50 rounded-t-3xl">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="h-5 w-5 text-[#BD8581]" />
          <h2 className="text-lg font-semibold text-gray-900">
            Create Your Story
          </h2>
        </div>
        <p className="text-gray-700 text-sm">
          Tell us about your child for a personalized adventure
        </p>
      </div>

      {/* Form */}
      <div className="p-6 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Child Name */}
          <div className="space-y-1">
            <Label htmlFor="childName" className="text-gray-900 font-medium">
              {"Child's Name"}
            </Label>
            <Input
              id="childName"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              placeholder="Enter your child's name"
              className="h-12 border-green-300 focus:border-green-600 focus:ring-green-600/10"
              required
            />
          </div>

          {/* Age */}
          <div className="space-y-1">
            <Label htmlFor="age" className="text-gray-900 font-medium">
              Age
            </Label>
            <Input
              id="age"
              type="number"
              min="1"
              max="18"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Age (1-18)"
              className="h-12 border-green-300 focus:border-green-600 focus:ring-green-600/10"
              required
            />
            <p className="text-xs text-gray-500 text-left">
              Stories are automatically tailored to be age-appropriate
            </p>
          </div>

          {/* Topic Select */}
          <div className="space-y-1">
            <Label htmlFor="topic" className="text-gray-900 font-medium">
              Adventure Theme
            </Label>
            <Select value={topic} onValueChange={setTopic}>
              <SelectTrigger className="w-full border-green-200 focus:ring-green-500">
                <SelectValue placeholder="Select Topic" />
              </SelectTrigger>
              <SelectContent className="z-[9999] bg-white shadow-lg border border-green-100 rounded-xl max-h-60 overflow-auto">
                {storyTopics.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500 text-left">
              Each theme creates unique story variations
            </p>
          </div>

          {/* Custom Topic */}
          <div className="space-y-1">
            <Label htmlFor="customTopic" className="text-gray-900 font-medium">
              Create Your Own Theme
            </Label>
            <Input
              id="customTopic"
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              placeholder="Type your own story idea (optional)"
              className="h-12 border-green-300 focus:border-green-600 focus:ring-green-600/10"
            />
            <p className="text-xs text-gray-500 text-left">
              If filled, your custom theme will replace the selected one
            </p>
          </div>

          {/* Emotion Detection */}
          <div className="space-y-1">
            <Label
              htmlFor="emotionDetection"
              className="text-gray-900 font-medium"
            >
              Emotion Detection
            </Label>
            <Select
              value={emotionDetection}
              onValueChange={setEmotionDetection}
            >
              <SelectTrigger className="w-full border-green-200 focus:ring-green-500">
                <SelectValue placeholder="Select Emotion" />
              </SelectTrigger>
              <SelectContent className="z-[9999] bg-white shadow-lg border border-green-100 rounded-xl max-h-60 overflow-auto">
                {emotionList.map((emotion) => (
                  <SelectItem key={emotion} value={emotion}>
                    {emotion}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500 text-left">
              Each emotion creates unique story variations
            </p>
          </div>

          {/* Story Length */}
          <StoryLength value={length} onChange={setLength} />

          {/* Submit */}
          <Button
            type="submit"
            disabled={!isValid || isGenerating}
            className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <Wand2 className="animate-spin h-4 w-4" />
                Creating your story...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Generate Story
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
