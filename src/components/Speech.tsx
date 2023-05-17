// src/components/Speech.tsx
// the speech component does not support synchronous talking. It cannot interact with users.
import { callOpenAIAPI } from '../services/openaiAPI';
import { callElevenLabsAPI } from '../services/elevenLabsAPI';
import { callDIDAPI, getVideoObject } from '../services/didAPI';
import TalkingHead from './TalkingHead';
import { FormEvent, useState } from 'react';
import UserForm from './UserForm';
import { Typography } from '@mui/material';

const Speech = () => {
  const [videoURL, setVideoURL] = useState<string | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [question, setQuestion] = useState<string>('');


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
  

  const generateTalkingHead = async (formData: FormData) => {
    setIsLoading(true);

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
      setImageURL(photoPath);
      
      // Call OpenAI API
      const gptGeneratedText = await callOpenAIAPI(prompt);
      // Call Eleven Labs API
      const generatedAudio = await callElevenLabsAPI(gptGeneratedText, audioFile.name, audioPath);

      // Call D-ID API
      const generatedVideo = await callDIDAPI(generatedAudio, photoPath);
      const videoSrc = await getVideoObject(generatedVideo['id']);
      console.log("videoSrc: ", videoSrc);

      // Display generated video
      setVideoURL(videoSrc);
      setIsLoading(false);
    } catch (error) {
      console.error('Error processing the form data:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <Typography variant="h2" style={{ color: 'white', marginBottom: '1rem', fontWeight: 'bold' }}>
        Create Your Custom Speech!
      </Typography>
      { videoURL ? (
        <TalkingHead videoURL={videoURL} />
      ) : (
        <UserForm onSubmit={generateTalkingHead} isLoading={isLoading} />
      )}
    </div>
  );
};
  
export default Speech;