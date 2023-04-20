import { Configuration, OpenAIApi } from 'openai';
import { NextApiRequest, NextApiResponse } from 'next';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = "Write a short paragraph of 50 words with the topic: ";

const generateAction = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log(`API: ${basePromptPrefix}${req.body.userInput}`);
    const baseCompletion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `${basePromptPrefix}${req.body.userInput}`,
      temperature: 0.7,
      max_tokens: 250,
    });
    const basePromptOutput = baseCompletion.data.choices.pop();
    res.status(200).json({ output: basePromptOutput });
  } catch (error) {
    console.error('Error in /api/gptgenerate:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default generateAction;
