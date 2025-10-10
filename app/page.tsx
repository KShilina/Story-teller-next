"use client";

import { useReducer } from "react";
import StoryForm from "./components/StoryForm";
import StoryDisplay from "./components/StoryDisplay";
import ParentTips from "./components/ParentTips";
import { generateStory as generateStoryAPI } from "./components/StoryGenerator";
import { BookOpen, Clock, Users, Sparkles } from "lucide-react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
// import Translator from "./components/StoryTranslator";

const initialState = {
  story: "",
  storyData: null,
  isGenerating: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "START_GENERATION":
      return { ...state, isGenerating: true, storyData: action.payload };
    case "SET_STORY":
      return { ...state, story: action.payload, isGenerating: false };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleGenerateStory = async (data) => {
    dispatch({ type: "START_GENERATION", payload: data });
    try {
      const story = await generateStoryAPI(data);
      dispatch({ type: "SET_STORY", payload: story });
    } catch (error) {
      console.error(error);
      dispatch({ type: "SET_STORY", payload: "Error generating story. Try again!" });
    }
  };

  const handleCreateNew = () => {
    dispatch({ type: "RESET" });
  };

  return (
    // <Translator />
    <div className="min-h-screen bg-green-50">
   <nav className="bg-white/95 backdrop-blur-sm border-b border-green-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-green-600 p-2 rounded-lg">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-semibold text-gray-900">StoryTeller AI</span>
                <div className="text-xs text-green-600">Personalized stories for kids</div>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-green-600" />
                <span>2-3 min stories</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-green-600" />
                <span>Ages 1-18</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {!state.story ? (
        <>
          {/* Hero Section with Background */}
          <section className="relative bg-gradient-to-b from-green-50 to-green-100 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-10 left-10 w-24 h-24 bg-green-600 rounded-full blur-3xl"></div>
              <div className="absolute top-40 right-20 w-32 h-32 bg-green-500 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-green-400 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <div className="inline-flex items-center space-x-2 bg-green-100 px-4 py-2 rounded-full mb-6">
                  <Sparkles className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-700">AI-Powered Storytelling</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Create magical stories<br />
                  for your child
                </h1>
                
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  Personalized, age-appropriate stories generated instantly. Perfect for bedtime, 
                  quiet time, or sparking your child's imagination anytime.
                </p>

                <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Age-appropriate content</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Instant generation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Safe & inclusive</span>
                  </div>
                </div>
              </div>

              {/* Form Layout with Background Images */}
              <div className="grid lg:grid-cols-3 gap-12 items-start">
                {/* Left Image - Reading Outdoors */}
                <div className="hidden lg:block">
                  <div className="sticky top-24">
                    <div className="relative rounded-2xl overflow-hidden mb-6 shadow-lg">
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1659184619594-ef7e655b843e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHJlYWRpbmclMjBvdXRkb29ycyUyMG5hdHVyZSUyMGdlbmRlciUyMG5ldXRyYWx8ZW58MXx8fHwxNzU5NzYyMDg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                        alt="Children reading together outdoors"
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-green-900/30 to-transparent"></div>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-green-200">
                      <h3 className="font-semibold text-gray-900 mb-3">Why children love it</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                          <span>They become the main character</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                          <span>Choose their own adventure</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                          <span>Stories grow with them</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Center Form */}
                <div>
          <StoryForm onGenerateStory={handleGenerateStory} isGenerating={state.isGenerating} />
                </div>

                {/* Right Image - Family Time */}
                <div className="hidden lg:block">
                  <div className="sticky top-24">
                    <div className="relative rounded-2xl overflow-hidden mb-6 shadow-lg">
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1714646793141-11802dc4820f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZW50bGUlMjBwYXJlbnRpbmclMjBjaGlsZHJlbiUyMHBsYXlpbmclMjBpbmNsdXNpdmV8ZW58MXx8fHwxNzU5NzYyMDk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                        alt="Gentle parenting moment with children"
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-green-900/30 to-transparent"></div>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-green-200">
                      <h3 className="font-semibold text-gray-900 mb-3">Parents love it too</h3>
                      <div className="space-y-3">
                        <blockquote className="text-sm italic text-gray-700 border-l-3 border-green-400 pl-3">
                          "My child asks for their personalized stories every night!"
                        </blockquote>
                        <blockquote className="text-sm italic text-gray-700 border-l-3 border-green-400 pl-3">
                          "Finally, stories that match their imagination!"
                        </blockquote>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Tips Section with Soft Background */}
          <section className="relative bg-gradient-to-b from-green-100 to-green-50 py-20">
            {/* Hero Background Image */}
            <div className="absolute inset-0 opacity-10">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1647682212314-33376a4ec0eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0JTIwbmF0dXJlJTIwYmFja2dyb3VuZCUyMGNoaWxkcmVuJTIwYWN0aXZpdGllc3xlbnwxfHx8fDE3NTk3NjIxMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Soft nature background"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Make story time special
                </h2>
                <p className="text-gray-700">Tips to enhance your child's storytelling experience</p>
              </div>
              <ParentTips />
            </div>
          </section>
        </>
      ) : (
        /* Story Display with Background */
        <div className="relative bg-gradient-to-b from-green-50 to-white min-h-screen py-12">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 right-10 w-20 h-20 bg-green-500 rounded-full blur-2xl"></div>
            <div className="absolute bottom-40 left-10 w-24 h-24 bg-green-400 rounded-full blur-2xl"></div>
          </div>
          
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Main Story Content */}
              <div className="lg:col-span-3">
                <StoryDisplay
                  story={state.story}
                  childName={state.storyData!.childName}
                  topic={state.storyData!.topic}
                  onCreateNew={handleCreateNew}
                />
              </div>

              {/* Sidebar with Family Image */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  <div className="relative rounded-2xl overflow-hidden shadow-lg">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1585945148306-db646373834d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBzdG9yeXRlbGxpbmclMjBjb3p5JTIwbmV1dHJhbHxlbnwxfHx8fDE3NTk3NjIwOTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Family storytelling moment"
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-green-900/30 to-transparent"></div>
                  </div>
                  
                  <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-green-200">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <span>Story complete!</span>
                      <span className="text-green-600">✨</span>
                    </h4>
                    <p className="text-sm text-gray-700 mb-4">
                      Your personalized story is ready. Here are some ways to enjoy it together:
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-3 bg-green-50 rounded-xl">
                        <div className="text-2xl mb-1">📖</div>
                        <div className="text-xs text-gray-700">Read together</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-xl">
                        <div className="text-2xl mb-1">🎨</div>
                        <div className="text-xs text-gray-700">Draw scenes</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-xl">
                        <div className="text-2xl mb-1">🎭</div>
                        <div className="text-xs text-gray-700">Act it out</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-xl">
                        <div className="text-2xl mb-1">💭</div>
                        <div className="text-xs text-gray-700">Ask questions</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer with Green Theme */}
      <footer className="bg-green-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="bg-white p-2 rounded-lg">
                <BookOpen className="h-5 w-5 text-green-800" />
              </div>
              <div>
                <span className="text-xl font-semibold">StoryTeller AI</span>
                <div className="text-xs text-green-200">Making bedtime magical for every family</div>
              </div>
            </div>
            
            <p className="text-green-100 mb-6">
              Crafted with care for families who love inclusive storytelling
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm text-green-200 mb-6">
              <span className="flex items-center gap-1">
                <span className="text-green-400">✓</span> Unlimited stories
              </span>
              <span className="flex items-center gap-1">
                <span className="text-green-400">✓</span> 100% safe & inclusive
              </span>
              <span className="flex items-center gap-1">
                <span className="text-green-400">✓</span> No data collection
              </span>
            </div>
            
            <div className="text-xs text-green-300">
              Where imagination meets technology for every child
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
  // );
}



