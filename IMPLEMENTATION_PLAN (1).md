# Live Voice ORB — Rubenius-style Site Assistant

A talking ORB on a Next.js page that listens, thinks, and answers questions
about a website (services, pages, FAQs) using Google **Gemini Live**.
All knowledge lives in a single `knowledge.ts` file (including a `pageIndex`).

ORB visual is ported from the CodePen reference:
https://codepen.io/mubangadv/pen/poGRRoe

Voice pipeline pattern follows the same approach used on
https://www.rubenius.in/ — bidirectional audio streaming with the
Gemini Live API.

---

## Step 1 — Create the GitHub repo

**Repo name:**

```
rubenius-orb-assistant
```

**Description:**

```
Live voice ORB built with Next.js + Gemini Live. A talking sphere that
answers questions about the site using a local knowledge.ts file.
```

**Commands:**

```bash
gh repo create rubenius-orb-assistant \
  --public \
  --description "Live voice ORB built with Next.js + Gemini Live. A talking sphere that answers questions about the site using a local knowledge.ts file." \
  --confirm
```

---

## Step 2 — Scaffold the Next.js app

```bash
npx create-next-app@latest rubenius-orb-assistant \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --no-turbopack

cd rubenius-orb-assistant
```

Link the local repo to the remote:

```bash
git remote add origin git@github.com:<your-username>/rubenius-orb-assistant.git
git branch -M main
git push -u origin main
```

---

## Step 3 — Install dependencies

```bash
# Gemini Live SDK (browser-friendly WebSocket client)
npm install @google/genai

# UI helpers (optional but recommended)
npm install framer-motion lucide-react clsx tailwind-merge
npm install class-variance-authority

# Dev: types
npm install class-variance-authority
```

> The ORB itself is pure CSS/Canvas — no extra 3D library required.
> If you decide to use shaders/WebGL later, add `three` and `@react-three/fiber`.

---

## Step 4 — Environment variables

Create `.env.local`:

```env
# Server-side only — never expose to client directly
GEMINI_API_KEY=your_google_ai_studio_key

# Live model
NEXT_PUBLIC_GEMINI_LIVE_MODEL=gemini-2.5-flash-native-audio-preview
```

Add `.env.local` to `.gitignore` (Next.js does this by default).

---

## Step 5 — Project structure

Create these files/folders:

```
src/
├── app/
│   ├── page.tsx                # landing page hosting the ORB
│   ├── api/
│   │   └── gemini-token/
│   │       └── route.ts        # mints ephemeral token for browser
│   └── layout.tsx
├── components/
│   ├── orb/
│   │   ├── Orb.tsx             # React port of the CodePen ORB
│   │   ├── orb.module.css      # ORB styles (gradient, animation)
│   │   └── useOrbState.ts      # idle | listening | thinking | speaking
│   └── voice/
│       ├── VoiceAgent.tsx      # mic capture + Gemini Live socket
│       └── audioWorklet.ts     # PCM16 capture + playback helpers
├── lib/
│   ├── knowledge.ts            # ⭐ source of truth for answers
│   ├── systemPrompt.ts         # builds system instruction from knowledge
│   └── gemini.ts               # client factory + session config
└── types/
    └── gemini.d.ts
```

---

## Step 6 — Build `knowledge.ts` (with `pageIndex`)

`src/lib/knowledge.ts`:

```ts
export type SitePage = {
  slug: string;          // "/services/web-design"
  title: string;
  summary: string;       // 1–2 sentences
  keywords: string[];    // helps retrieval & guides the model
  content: string;       // full text the model can quote
};

export type FAQ = { q: string; a: string };

export const company = {
  name: "Rubenius",
  tagline: "Design & development studio",
  location: "India",
  contact: {
    email: "hello@rubenius.in",
    website: "https://www.rubenius.in",
  },
};

export const pageIndex: SitePage[] = [
  {
    slug: "/",
    title: "Home",
    summary: "Overview of Rubenius — studio focused on design + dev.",
    keywords: ["home", "studio", "overview"],
    content: `Rubenius is a design and development studio that...`,
  },
  {
    slug: "/services",
    title: "Services",
    summary: "Branding, web design, web development, motion.",
    keywords: ["services", "offerings", "what we do"],
    content: `We offer branding, web design, web development...`,
  },
  {
    slug: "/work",
    title: "Work",
    summary: "Selected client projects and case studies.",
    keywords: ["portfolio", "case studies", "projects"],
    content: `Selected projects include...`,
  },
  {
    slug: "/contact",
    title: "Contact",
    summary: "How to reach the team.",
    keywords: ["contact", "reach", "email"],
    content: `Email hello@rubenius.in or use the form on /contact.`,
  },
];

export const faqs: FAQ[] = [
  { q: "What services do you offer?", a: "Branding, web design, web dev, motion." },
  { q: "How long does a project take?", a: "Typically 4–8 weeks depending on scope." },
];
```

---

## Step 7 — Build the system prompt from knowledge

`src/lib/systemPrompt.ts`:

```ts
import { company, pageIndex, faqs } from "./knowledge";

export function buildSystemInstruction(): string {
  const pages = pageIndex
    .map((p) => `- ${p.title} (${p.slug}): ${p.summary}\n  ${p.content}`)
    .join("\n");

  const faqBlock = faqs.map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n\n");

  return `
You are the voice assistant for ${company.name} — ${company.tagline}.
Speak warmly, concisely (1–3 sentences per turn), and naturally.
Never invent services, pricing, or pages that are not listed below.
If asked something out of scope, politely redirect to ${company.contact.email}.

# Site pages
${pages}

# FAQs
${faqBlock}

# Contact
Email: ${company.contact.email}
Website: ${company.contact.website}
  `.trim();
}
```

---

## Step 8 — Port the CodePen ORB to React

The CodePen pen (poGRRoe) is HTML + CSS + a small JS animation loop.
Port it as follows:

1. Copy the pen's HTML structure into JSX inside `Orb.tsx`.
2. Move the CSS into `orb.module.css` (rename classes to module-style).
3. Convert any JS that mutates the DOM into React refs + `useEffect`.
4. Drive visual state from a hook:

`src/components/orb/useOrbState.ts`:

```ts
import { create } from "zustand";

export type OrbState = "idle" | "listening" | "thinking" | "speaking";

type Store = { state: OrbState; set: (s: OrbState) => void };

export const useOrbState = create<Store>((set) => ({
  state: "idle",
  set: (state) => set({ state }),
}));
```

`src/components/orb/Orb.tsx` (sketch):

```tsx
"use client";
import { useOrbState } from "./useOrbState";
import styles from "./orb.module.css";
import clsx from "clsx";

export function Orb() {
  const state = useOrbState((s) => s.state);
  return (
    <div className={clsx(styles.orb, styles[state])}>
      <div className={styles.core} />
      <div className={styles.ring} />
      <div className={styles.ring2} />
    </div>
  );
}
```

Then add CSS keyframes per state (`.listening` pulses faster,
`.speaking` distorts/waves, `.thinking` shimmers, `.idle` slow breathe).

---

## Step 9 — Mint an ephemeral Gemini Live token (server)

`src/app/api/gemini-token/route.ts`:

```ts
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
  const token = await ai.authTokens.create({
    config: { uses: 1, expireTime: new Date(Date.now() + 60_000).toISOString() },
  });
  return NextResponse.json({ token: token.name });
}
```

This avoids shipping the long-lived API key to the browser.

---

## Step 10 — VoiceAgent: mic in → Gemini Live → audio out

`src/components/voice/VoiceAgent.tsx` (high level):

1. On "Start", `POST /api/gemini-token` to get an ephemeral token.
2. Open a Live session:
   ```ts
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
   ```
3. Capture mic via `getUserMedia({ audio: true })` →
   downsample to 16 kHz PCM16 in an AudioWorklet → `session.sendRealtimeInput({ audio: { data, mimeType: "audio/pcm;rate=16000" } })`.
4. On incoming audio chunks from the server, queue them into a Web Audio
   `AudioBufferSourceNode` (24 kHz output) and play sequentially.
5. Drive ORB state:
   - mic open, no model audio → `listening`
   - server thinking (no audio yet, no text) → `thinking`
   - model audio playing → `speaking`
   - idle/disconnected → `idle`

---

## Step 11 — Wire the page

`src/app/page.tsx`:

```tsx
import { Orb } from "@/components/orb/Orb";
import { VoiceAgent } from "@/components/voice/VoiceAgent";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 bg-black text-white">
      <Orb />
      <VoiceAgent />
      <p className="opacity-60 text-sm">Tap the ORB and ask about Rubenius.</p>
    </main>
  );
}
```

---

## Step 12 — Test the golden path

```bash
npm run dev
```

Open http://localhost:3000 and verify:

- [ ] ORB renders and animates in `idle` state
- [ ] Clicking the ORB asks for mic permission
- [ ] Speaking causes ORB → `listening`
- [ ] Reply audio plays; ORB → `speaking`
- [ ] Asking about a page in `pageIndex` returns grounded answer
- [ ] Asking out-of-scope question gets a redirect to contact email
- [ ] Hanging up returns ORB to `idle`

---

## Step 13 — Deploy

```bash
# from project root
vercel
```

Set `GEMINI_API_KEY` and `NEXT_PUBLIC_GEMINI_LIVE_MODEL` in the Vercel
project's Environment Variables, then `vercel --prod`.

---

## Step 14 — Iterate on knowledge

Anything the ORB gets wrong → fix it by editing `knowledge.ts`
(add a page, expand `content`, add an FAQ). No retraining needed —
the system instruction is rebuilt from the file on each session.

---

## Open questions to resolve before coding

1. Which CodePen license? `poGRRoe` — confirm you can reuse the visuals.
2. Voice: which preset (Puck, Charon, Kore, …) and language?
3. Should the ORB also show captions (text track of the conversation)?
4. Need a "barge-in" (interrupt while model is speaking)? Gemini Live
   supports VAD interruption — enable in session config if yes.
