import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';
import FormData from 'form-data';
import fetch from 'node-fetch';

function getDIDAuthorizationHeader(): string {
  const apiKey = process.env.DID_API_KEY;
  if (!apiKey) {
    throw new Error('DID_API_KEY is missing in the environment variables.');
  }
  return `Basic ${apiKey}`;
}

async function uploadAudio(audioPath: string): Promise<string> {
  console.log("Upload audio");
  const formData = new FormData();
  formData.append('audio', fs.createReadStream(audioPath));

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Authorization': getDIDAuthorizationHeader(),
      ...formData.getHeaders(),
    },
    body: formData,
  };

  const response = await fetch('https://api.d-id.com/audios', options);
  if (!response.ok) {
    throw new Error('Failed to upload audio');
  }

  const data = await response.json() as { url: string };
  return data.url;
}


async function uploadImage(imagePath: string): Promise<string> {
  console.log("Upload image");
  const formData = new FormData();
  formData.append('image', fs.createReadStream(imagePath));

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Authorization': getDIDAuthorizationHeader(),
      ...formData.getHeaders(),
    },
    body: formData,
  };

  try {
    const response = await fetch('https://api.d-id.com/images', options);
    if (!response.ok) {
      throw new Error(`Failed to upload image: ${response.statusText}`);
    }
    const data = await response.json() as { url: string };
    return data.url;
  } catch (error) {
    console.error('Error in /api/uploadImage:', error);
    throw error;
  }
};

const createVideo = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("executing createVideo...");
  try {
    const { audio, image } = req.body;
    const audioPath = path.join(process.cwd(), 'public', 'audio', `${audio}`);
    console.log("audioPath: ", audioPath);
    console.log("imagePath: ", image);
    const audioUrl = await uploadAudio(audioPath);
    console.log("audioUrl: ", audioUrl);
    const imageUrl = await uploadImage(image);
    console.log("imageUrl: ", imageUrl);

    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'Authorization': getDIDAuthorizationHeader(),
      },
      body: JSON.stringify({
        source_url: imageUrl,
        script: {
          type: 'audio',
          audio_url: audioUrl,
        },
      }),
    };

    const response = await fetch('https://api.d-id.com/talks', options);
    const data = await response.json();
    console.log("createVideo data: ", data);

    if (response.ok) {
      res.status(200).json(data);
    } else {
      res.status(500).json({ message: 'Failed to create video' });
    }
  } catch (error) {
    console.error('Error in /api/createVideo:', error);
    res.status(500).json({ message: 'Internal Server Error (DID)' });
  }
};

export default createVideo;
