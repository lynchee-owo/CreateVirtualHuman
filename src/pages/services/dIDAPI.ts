// src/services/didAPI.ts
export const callDIDAPI = async (audio: string, image: string) => {
  try {
    console.log("Calling DID API...");

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ 
        audio: audio, 
        image: image,
    }),
    };

    const response = await fetch('/api/createVideo', options);

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

export async function getVideoObject(id: string): Promise<string> {
  let retries = 0;
  const maxRetries = 10;
  const delay = 10000; // 10 seconds

  while (retries < maxRetries) {
    try {
      console.log("Calling getVideo with id: ", id);
  
      const response = await fetch('/api/getVideo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id}),
      });
  
      if (!response.ok) {
        console.error('Error getting video object:', response.status);
        throw new Error("Something went wrong:(");
      } 
  
      const data = await response.json();
      console.log("getVideoObject response: ", data);
      if (data.status === 'done') {
        return data.result_url;
      } else if (data.status === 'error' || data.status === 'rejected') {
        throw new Error(`Video processing failed with status: ${data.status}`);
      }

      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, delay));
      retries++;
    } catch (error) {
      console.error('Error in didAPI.getVideo:', error);
      throw error;
    }
  }
}
