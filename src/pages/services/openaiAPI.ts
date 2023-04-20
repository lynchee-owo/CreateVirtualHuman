// src/services/openaiAPI.ts

export const callOpenAIAPI = async (userInput: string) => {
    console.log("Calling OpenAI...: ", JSON.stringify({ userInput }));

    const response = await fetch('/api/gptgenerate', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)

    return output.text;
};
