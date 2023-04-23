// src/pages/index.tsx
import type { NextPage } from 'next';
import Head from 'next/head';
import UserForm from './components/UserForm';
import { callOpenAIAPI } from './services/openaiAPI';
import { callElevenLabsAPI } from './services/elevenLabsAPI';
import { callDIDAPI, getVideoObject } from './services/didAPI';
import { useState } from 'react';

const Home: NextPage = () => {
  const [videoURL, setVideoURL] = useState<string | null>(null);

  // read the content of the file, send it to the server, save the file temporarily, and return the path to the client.
  // these files are temporary and will be removed when the server restarts or after some time
  const saveFileLocally = async (file: File): Promise<string> => {
    console.log('saveFileLocally called with file:', file);
    return new Promise(async (resolve, reject) => {
      try {
        const reader = new FileReader();
        reader.onload = async (event) => {
          if (event.target?.result) {
            const base64Data = event.target.result;
            const response = await fetch('/api/saveTempFile', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ fileName: file.name, data: base64Data }),
            });
            const { path } = await response.json();
            resolve(path);
          } else {
            reject('Error reading file');
          }
        };
        reader.readAsDataURL(file);
      } catch (error) {
        reject(error);
      }
    });
  };
  

  const handleSubmit = async (formData: FormData) => {
    try {
      const prompt = formData.get('questions') as string;
      // Save the audioFile to a temporary local directory
      const audioFile = formData.get('audioFile') as File;
      console.log("audioFile: ", audioFile);
      const audioPath = await saveFileLocally(audioFile);
      console.log("audioPath: ", audioPath);

      // Save the photo to a temporary local directory
      const photoFile = formData.get('photo') as File;
      console.log("photoFile: ", photoFile);
      const photoPath = await saveFileLocally(photoFile);
      console.log("photoPath: ", photoPath);
      
      // Call OpenAI API
      const gptGeneratedText = await callOpenAIAPI(prompt);
      // Call Eleven Labs API
      const generatedAudio = await callElevenLabsAPI(gptGeneratedText, audioFile.name, audioPath);

      // Call D-ID API
      const generatedVideo = await callDIDAPI(generatedAudio, photoPath);
      const videoSrc = await getVideoObject(generatedVideo['id']);
      console.log("videoURL: ", videoURL);

      // Display generated video
      setVideoURL(videoSrc);
    } catch (error) {
      console.error('Error processing the form data:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <Head>
        <title>Create Virtual Human</title>
        <meta name="description" content="Create a virtual human using AI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center gap-4">
        <h1 className="text-4xl font-semibold">Create a virtual human using AI</h1>
        <UserForm onSubmit={handleSubmit} />
        {videoURL && (
          <video src={videoURL} controls className="mt-8">
            Your browser does not support the video tag.
          </video>
        )}
      </main>
    </div>
  );
};

export default Home;
