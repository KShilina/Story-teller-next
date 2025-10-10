"use client";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function StoryLength({ value, onChange }) {
  const listStoryLength = [
    "Short (1-2 minutes)",
    "Medium (2-3 minutes)",
    "Long (3-4 minutes)",
  ];
  return (
    <div className="space-y-2">
      <Label
        htmlFor="storyLength"
        className="w-full border-green-200 focus:ring-green-500"
      >
        Story Length
      </Label>
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger className="w-full border-green-200 focus:ring-green-500">
          <SelectValue placeholder="Choose story length" />
        </SelectTrigger>

        <SelectContent className="z-[9999] bg-white shadow-lg border border-green-100 rounded-xl">
          {listStoryLength.map((length) => (
            <SelectItem key={length} value={length}>
              {length}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-xs text-gray-500">
        Perfect for different situations and attention spans
      </p>
    </div>
  );
}
