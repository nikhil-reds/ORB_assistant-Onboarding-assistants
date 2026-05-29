import { Orb } from "@/components/orb/orb";
import { VoiceAgent } from "@/components/voice/voiceAgent";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 bg-black text-white">
      <Orb />
      <VoiceAgent />
      <p className="opacity-60 text-sm">Tap the ORB and ask about Rubenius.</p>
    </main>
  );
}