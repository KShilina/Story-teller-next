"use client";

import { useReducer } from "react";

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

export function useStoryReducer() {
  return useReducer(reducer, initialState);
}
