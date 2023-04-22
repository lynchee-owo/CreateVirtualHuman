import { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { fileName, data } = req.body;
      const base64Data = data.replace(/^data:.+;base64,/, '');
      const tempPath = join(tmpdir(), fileName);
      await fs.writeFile(tempPath, base64Data, 'base64');
      res.status(200).send(tempPath);
    } catch (error) {
      console.error('Error saving temporary file:', error);
      res.status(500).send('Error saving temporary file');
    }
  } else {
    res.status(405).send('Method not allowed');
  }
}
