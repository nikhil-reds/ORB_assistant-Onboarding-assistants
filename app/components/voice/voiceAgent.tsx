const session = await ai.live.connect({
     model: process.env.NEXT_PUBLIC_GEMINI_LIVE_MODEL!,
     config: {
       responseModalities: ["AUDIO"],
       systemInstruction: buildSystemInstruction(),
     },
     callbacks: {
       onmessage: handleServerMessage,
       onerror, onclose,
     },
   });