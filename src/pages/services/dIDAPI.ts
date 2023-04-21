// src/services/dIDAPI.ts

export const callDIDAPI = async (text: string, photo: string) => {
  try {
    console.log("Calling DID API...");

    const response = await fetch('/api/createVideo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
          audio: text, 
          photo: photo,
      }),
    });

    if (!response.ok) {
      console.error('Error generating video:', response.status);
      throw new Error("Something went wrong:(");
  }

    const data = await response.json();
    console.log("createVideo API response: ", data);

    return data;
  } catch (err) {
    console.error(err);
    throw new Error('Error calling createVideo API');
  }
};
