import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';
import FormData from 'form-data';

function getDIDAuthorizationHeader(): string {
  const apiKey = process.env.DID_API_KEY;
  if (!apiKey) {
    throw new Error('DID_API_KEY is missing in the environment variables.');
  }
  return `Basic ${apiKey}`;
}

async function uploadAudio(audioPath: string): Promise<string> {
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
  const data = await response.json();

  if (response.ok) {
    return data.url;
  } else {
    throw new Error(`Failed to upload audio: ${data.description || 'Unknown error'}`);
  }
}

const createVideo = async (req: NextApiRequest, res: NextApiResponse) => {
  const { audio, photo } = req.body;
  const audioPath = path.join(process.cwd(), 'public', 'audio', `${audio}`);
  console.log("audioPath: ", audioPath);

  try {
    const audioUrl = await uploadAudio(audioPath);

    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'Authorization': getDIDAuthorizationHeader(),
      },
      body: JSON.stringify({
        source_url: photo,
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
      res.status(500).json({ message: `Failed to create video: ${data.description || 'Unknown error'}` });
    }
  } catch (error) {
    console.error('Error in /api/createVideo:', error);
    res.status(500).json({ message: 'Internal Server Error (DID)' });
  }
};

export default createVideo;
