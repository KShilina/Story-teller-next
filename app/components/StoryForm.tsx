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
  "Grateful"
];


export default function StoryForm({ onGenerateStory, isGenerating }) {
  const [childName, setChildName] = useState("");
  const [age, setAge] = useState("");
  const [topic, setTopic] = useState("");
  const [length, setLength] = useState("medium");
  const [customTopic, setCustomTopic] = useState("");
  const [emotionDetection, setEmotionDetection] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (childName && age) {
      const finalTopic = customTopic.trim() || topic || "Surprise Adventure";
      const storyEmotion = emotionDetection.trim()
      onGenerateStory({
        childName: childName.trim(),
        age: parseInt(age),
        topic: finalTopic || topic || "Surprise Adventure",
        length,
        emotionDetection:storyEmotion,
      });
    }
  };

  const isValid =
    childName.trim() && age && parseInt(age) >= 1 && parseInt(age) <= 18;

  return (
    <div className="w-full max-w-lg mx-auto bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-green-200">
      <div className="text-center p-6 bg-green-50 rounded-t-2xl">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="h-5 w-5 text-green-600" />
          <h2 className="text-lg font-semibold text-gray-900">
            Create Your Story
          </h2>
        </div>
        <p className="text-gray-700 text-sm">
          Tell us about your child for a personalized adventure
        </p>
      </div>

      <div className="p-6 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="childName" className="text-gray-900 font-medium">
              Child's Name
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

          <div className="space-y-2">
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
            <p className="text-xs text-gray-500">
              Stories are automatically tailored to be age-appropriate
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="topic" className="text-gray-900 font-medium">
              Adventure Theme
            </Label>
            <Select value={topic} onValueChange={setTopic}>
              <SelectTrigger className="h-12 border-green-300 focus:border-green-600">
                <SelectValue placeholder="Choose an adventure theme" />
              </SelectTrigger>
              <SelectContent>
                {storyTopics.map((storyTopic) => (
                  <SelectItem key={storyTopic} value={storyTopic}>
                    {storyTopic}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">
              Each theme creates unique story variations
            </p>
          </div>

          {/* Custom Topic */}
          <div className="space-y-2">
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
            <p className="text-xs text-gray-500">
              If filled, your custom theme will replace the selected one
            </p>
          </div>

          {/* Emotion Detection */}
          <div className="space-y-2">
            <Label htmlFor="emotionDetection" className="text-gray-900 font-medium">
              Emotion Detection
            </Label>
            <Select id="emotionDetection" value={emotionDetection} onValueChange={setEmotionDetection}>
              <SelectTrigger className="h-12 border-green-300 focus:border-green-600">
                <SelectValue placeholder="Choose an emotion to apply" />
              </SelectTrigger>
              <SelectContent>
                {emotionList.map((emotion) => (
                  <SelectItem key={emotion} value={emotion}>
                    {emotion}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">
              Each emotion creates unique story variations
            </p>
          </div>

          <StoryLength value={length} onChange={setLength} />

          <Button
            type="submit"
            disabled={!isValid || isGenerating}
            className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl disabled:opacity-50 transition-colors"
          >
            {isGenerating ? (
              <>
                <Wand2 className="mr-2 h-4 w-4 animate-spin" />
                Creating your story...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Story
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
