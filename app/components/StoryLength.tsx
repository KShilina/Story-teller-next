"use client";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export default function StoryLength({ value, onChange }) {
  return (
    <div className="space-y-2">
      <Label htmlFor="storyLength" className="text-gray-900 font-medium">Story Length</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-12 border-green-300 focus:border-green-600">
          <SelectValue placeholder="Choose story length" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="short">Short (1-2 minutes)</SelectItem>
          <SelectItem value="medium">Medium (2-3 minutes)</SelectItem>
          <SelectItem value="long">Long (3-4 minutes)</SelectItem>
        </SelectContent>
      </Select>
      <p className="text-xs text-gray-500">Perfect for different situations and attention spans</p>
    </div>
  );
}
