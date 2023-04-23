// pages/api/saveTempFile.ts
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import fs from 'fs';
import path from 'path';

const handler = nextConnect()
  // Increase the body size limit to 10mb (or any other value you need)
  .use((req: NextApiRequest, res: NextApiResponse, next) => {
    const sizeLimit = 10 * 1024 * 1024; // 10 MB
    if (req.headers['content-length'] && parseInt(req.headers['content-length']) > sizeLimit) {
      return res.status(413).send('Body size limit exceeded');
    }
    next();
  })
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { fileName, data } = req.body;
      if (!fileName || !data) {
        res.status(400).json({ error: 'File name or data is missing' });
        return;
      }

      const base64Data = data.replace(/^data:.+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');

      const tempDir = path.join(process.cwd(), 'temp');
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
      }

      const filePath = path.join(tempDir, fileName);
      fs.writeFileSync(filePath, buffer);

      res.status(200).json({ path: filePath });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // Set the same value as in the custom middleware
    },
  },
};

export default handler;
