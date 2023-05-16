// src/components/Conversation.tsx
// the conversation component supports synchronous talking. It can interact with users.
// currently only show people talking with the figure and hear the voice, no animation

// src/components/Speech.tsx
// the speech component does not support synchronous talking. It cannot interact with users.
import { callOpenAIAPI } from '../services/openaiAPI';
import { callElevenLabsAPI } from '../services/elevenLabsAPI';
import { callDIDAPI, getVideoObject } from '../services/didAPI';
import { useState } from 'react';
import NavBar from './NavBar';
import TalkingHead from './TalkingHead';

const Speech = () => {
  const [ videoURL, setVideoURL ] = useState<string | null>(null);
  const [ isLoading, setIsLoading ] = useState<boolean>(false);

  const voiceToText = () => {
    console.log("turn user voice into text");
  }

  const textToVoice = () => {
    console.log("turn text into AI talking")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
        <NavBar />
        <TalkingHead />
        {/* button "Let's Talk". On click, shows the text "we are listening..." with a microphone icon*/}
        {/* animation of sound to show we are receiving user voice input */}
        {/* once user stops talking, voiceToText, show what user said in text as a message bubble (like Siri) */}
        {/* AI receives the text -> generate a response based on this text -> textToVoice, and AI's script is also shown as a message bubble. */}
        {/* A button at the bottom of the screen "End Conversation" */}
    </div>
  );
};

export default Speech;