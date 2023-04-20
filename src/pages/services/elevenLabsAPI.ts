// src/services/elevenLabsAPI.ts

import axios from 'axios';

export const callElevenLabsAPI = async (text: string, audioFile: File): Promise<Blob> => {
  try {
    const formData = new FormData();
    formData.append('text', text);
    formData.append('audioFile', audioFile);

    const response = await axios.post('https://api.eleven-labs.com/generate-audio', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${process.env.ELEVEN_LABS_API_KEY}`,
      },
    });

    return response.data.audio;
  } catch (error) {
    console.error('Error calling Eleven Labs API:', error);
    throw error;
  }
};
