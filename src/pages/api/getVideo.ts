// pages/api/getVideo.ts

import { NextApiRequest, NextApiResponse } from 'next';

function getDIDAuthorizationHeader(): string {
  const apiKey = process.env.DID_API_KEY;
  if (!apiKey) {
    throw new Error('DID_API_KEY is missing in the environment variables.');
  }
  return `Basic ${apiKey}`;
}

const getVideo = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.body;

  console.log("api/getVideo id: ", id)

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'Authorization': getDIDAuthorizationHeader(),
    },
  };

  try {
    const response = await fetch(`https://api.d-id.com/talks/${id}`, options);
    const data = await response.json();
    console.log("getVideo response data: ", data);
    res.status(200).json(data);
  } catch (error) {
    console.error('Error in /api/getVideo:', error);
    res.status(500).json({ message: 'Internal Server Error (DID)' });
  }
};

export default getVideo;
