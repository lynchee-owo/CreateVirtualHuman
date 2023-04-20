// src/services/dIDAPI.ts

import axios from 'axios';

export const callDIDAPI = async (audio: Blob, photo: File): Promise<Blob> => {
  try {
    const formData = new FormData();
    formData.append('audio', audio);
    formData.append('photo', photo);

    const response = await axios.post('https://api.d-id.com/generate-video', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${process.env.D_ID_API_KEY}`,
      },
    });

    return response.data.video;
  } catch (error) {
    console.error('Error calling D-ID API:', error);
    throw error;
  }
};
