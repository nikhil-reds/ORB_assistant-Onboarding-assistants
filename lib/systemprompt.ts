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