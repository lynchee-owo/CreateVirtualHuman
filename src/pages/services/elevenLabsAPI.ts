// src/services/elevenLabsAPI.ts

export const callElevenLabsAPI = async (text: string, voice_id: string) => {
    try {
        if (!text || text.trim() === "") {
            alert("Enter some text");
            return;
        }

        const response = await fetch('/api/textToSpeech', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                message: text, 
                voice: voice_id,
            }),
        });

        if (!response.ok) {
            console.error('Error generating speech:', response.status);
            throw new Error("Something went wrong:(");
        }
        const { file } = await response.json();
        console.log("Autio file name: ", file);

        return file;
    } catch (error) {
        console.log(error.message);
    }
};
  