"use client";

import { useStoryReducer } from "./hooks/useStoryReducer";
import StoryDisplay from "./components/StoryDisplay";
import { generateStory as generateStoryAPI } from "./components/StoryGenerator";
import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import TipsSection from "./components/TipsSection";
import Footer from "./components/Footer";
import './globals.css';

export interface StoryData {
  childName: string;
  age: number;
  topic?: string;
  length: string;
  emotionDetection?: string;
}

export default function App() {
  const [state, dispatch] = useStoryReducer();

  const handleGenerateStory = async (data: StoryData) => {
    dispatch({ type: "START_GENERATION", payload: data });
    try {
      const story = await generateStoryAPI(data);
      dispatch({ type: "SET_STORY", payload: story });
    } catch (error) {
      console.error(error);
      dispatch({ type: "SET_STORY", payload: "Error generating story. Try again!" });
    }
  };

  const handleCreateNew = () => dispatch({ type: "RESET" });

  return (
    <div className="min-h-screen bg-green-50">
      <NavBar />
      {!state.story ? (
        <>
          <HeroSection onGenerateStory={handleGenerateStory} isGenerating={state.isGenerating} />
          <TipsSection />
        </>
      ) : (
        <StoryDisplay
          story={state.story}
          childName={state.storyData?.childName ?? ""}
          topic={state.storyData?.topic ?? ""}
          emotionDetection={state.storyData?.emotionDetection}
          onCreateNew={handleCreateNew}
        />
      )}
      <Footer />
    </div>
  );
}
