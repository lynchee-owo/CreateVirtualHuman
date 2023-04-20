// src/pages/index.tsx

import type { NextPage } from 'next';
import Head from 'next/head';
import UserForm from './components/UserForm';
import { callOpenAIAPI } from './services/openaiAPI';
import { callElevenLabsAPI } from './services/elevenLabsAPI';
import { callDIDAPI } from './services/dIDAPI';

const Home: NextPage = () => {
  const handleSubmit = async (formData: FormData) => {
    try {
      const prompt = formData.get('questions') as string;
      const audioFile = formData.get('audioFile') as File;
      const photo = formData.get('photo') as File;

      // Call OpenAI API
      const gptGeneratedText = await callOpenAIAPI(prompt);
      // // Call Eleven Labs API
      // const generatedAudio = await callElevenLabsAPI(gptGeneratedText, audioFile);

      // // Call D-ID API
      // const generatedVideo = await callDIDAPI(generatedAudio, photo);

      // // Display generated video
      // const videoBlob = new Blob([generatedVideo], { type: 'video/mp4' });
      // const videoURL = URL.createObjectURL(videoBlob);
      // const videoElement = document.createElement('video');
      // videoElement.src = videoURL;
      // videoElement.controls = true;
      // document.body.appendChild(videoElement);
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
      </main>
    </div>
  );
};

export default Home;
