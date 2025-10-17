import { useReducer, Dispatch } from "react";

interface StoryData {
  childName: string;
  age: number;
  topic?: string;
  length: string;
  emotionDetection?: string;
}

interface State {
  story: string;
  storyData: StoryData | null;
  isGenerating: boolean;
}

type Action =
  | { type: "START_GENERATION"; payload: StoryData }
  | { type: "SET_STORY"; payload: string }
  | { type: "RESET" };

const initialState: State = {
  story: "",
  storyData: null,
  isGenerating: false,
};

function reducer(state: State, action: Action): State {
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

export function useStoryReducer(): [State, Dispatch<Action>] {
  return useReducer(reducer, initialState);
}
