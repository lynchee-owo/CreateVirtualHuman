// src/services/elevenLabsAPI.ts
export const callElevenLabsAPI = async (text: string, audioName: string, audioPath: string) => {
    console.log("Executing callElevenLabsAPI...");
    try {
        if (!text || text.trim() === "") {
            alert("The script is empty");
            return;
        }

        const response = await fetch('/api/textToSpeech', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                message: text, 
                audioPath: audioPath,
                name: audioName,
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
  