import React, { useState, useRef } from 'react';
import TalkingHead from './TalkingHead';
import { callOpenAIAPI } from '../services/openaiAPI';
import { Button, Typography } from '@mui/material';

const Speech = () => {
  const [messages, setMessages] = useState([]);
  const textareaRef = useRef();

  const handleClick = async () => {
    const userInput = textareaRef.current.value;
    setMessages(prevMessages => [...prevMessages, { text: userInput, type: 'user' }]);
    await generateResponse(userInput);
  };

  const generateResponse = async (message) => {
     const prompt = "reply to this message: " + message;
     const gptGeneratedText = await callOpenAIAPI(prompt);
     setMessages(prevMessages => [...prevMessages, { text: gptGeneratedText, type: 'bot' }]);
  }

  return (
    <div id="conversation" className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <TalkingHead />
      <textarea ref={textareaRef} className="w-full"></textarea>
      <button onClick={handleClick}>Send</button>
      {messages.map((message, index) => (
        <div key={index} className="text-base">
          <div className="items-start">
            <Typography>{message.text}</Typography>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Speech;
