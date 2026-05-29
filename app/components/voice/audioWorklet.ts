/**
 * Source code for the PCM recorder AudioWorkletProcessor.
 * This runs in a separate high-priority audio thread.
 * It converts the Float32 samples from the browser mic input to Int16 PCM bytes.
 */
export const pcmProcessorCode = `
class PCMSingleChannelProcessor extends AudioWorkletProcessor {
  process(inputs, outputs, parameters) {
    const input = inputs[0];
    if (!input || input.length === 0) return true;
    const channel = input[0];
    if (!channel || channel.length === 0) return true;

    // Convert Float32Array (-1.0 to 1.0) to Int16Array (-32768 to 32767)
    const pcm = new Int16Array(channel.length);
    for (let i = 0; i < channel.length; i++) {
      const sample = Math.max(-1, Math.min(1, channel[i]));
      pcm[i] = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
    }
    
    // Send raw ArrayBuffer to main thread as transferable
    this.port.postMessage(pcm.buffer, [pcm.buffer]);
    return true;
  }
}
registerProcessor("pcm-processor", PCMSingleChannelProcessor);
`;

/**
 * Generates a local Blob URL for the AudioWorklet.
 */
export function getAudioWorkletBlobUrl(): string {
  const blob = new Blob([pcmProcessorCode], { type: "application/javascript" });
  return URL.createObjectURL(blob);
}
