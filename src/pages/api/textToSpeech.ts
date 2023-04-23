import fs from 'fs';
import path from "path";
import { NextApiRequest, NextApiResponse } from 'next';
import FormData from 'form-data';
import fetch from 'node-fetch';

export const addVoiceToElevenLabs = async (name: string, audioPath: string): Promise<string> => {
  console.log("executing addVoiceToElevenLabs...");

  const xiApiKey = process.env.XI_API_KEY;
  if (!xiApiKey) {
    throw new Error('XI_API_KEY is missing in the environment variables.');
  }

  try {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('files', fs.createReadStream(audioPath));

    const response = await fetch('https://api.elevenlabs.io/v1/voices/add', {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "xi-api-key": xiApiKey,
      },
      body: formData,
    });

    if (!response.ok) {
      console.error('Error adding voice:', response.status);
      throw new Error('Something went wrong while adding voice.');
    }

    const { voice_id } = await response.json() as { voice_id: string };
    return voice_id;
  } catch (error) {
    console.error('Error adding voice:', error);
    throw error;
  }
};

export async function textToSpeech(req: NextApiRequest, res: NextApiResponse) {
  const { message, audioPath, name } = req.body;
  const xiApiKey = process.env.XI_API_KEY;
  if (!xiApiKey) {
    throw new Error('XI_API_KEY is missing in the environment variables.');
  }

  try {
    const voice_id = await addVoiceToElevenLabs(name, audioPath);
    // const voice_id = "UMzJQ6nsCTd5djzDuOwV";
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voice_id}`,
      {
        method: "POST",
        headers: {
          accept: "audio/mpeg",
          "Content-Type": "application/json",
          "xi-api-key": xiApiKey,
        },
        body: JSON.stringify({
          text: message,
          voice_settings: {
            stability: 0,
            similarity_boost: 0,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const file = Math.random().toString(36).substring(7);

    fs.writeFile(path.join('public', 'audio', `${file}.mp3`), buffer, (err) => {
      if (err) {
        console.error('Error writing file:', err);
      } else {
        console.log('File written successfully');
      }
    });

    res.status(200).json({ file: `${file}.mp3` });
  } catch (error) {
    console.error('Error in /api/textToSpeech:', error);
    res.status(500).json({ message: 'Internal Server Error (XI)' });
  }
}

export default textToSpeech;
