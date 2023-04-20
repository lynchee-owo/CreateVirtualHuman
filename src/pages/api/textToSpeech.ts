import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from 'next';

export async function textToSpeech(req: NextApiRequest, res: NextApiResponse) {
  const { message, voice } = req.body;

  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voice}`,
      {
        method: "POST",
        headers: {
          accept: "audio/mpeg",
          "Content-Type": "application/json",
          "xi-api-key": process.env.XI_API_KEY,
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
    res.status(500).json({ error: error.message });
  }
}

export default textToSpeech;
