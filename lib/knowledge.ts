// ============================================================
//  FutureTech Solutions Pvt. Ltd. — Onboarding Knowledge Base
//  Single source of truth for the HR Onboarding Voice Assistant.
// ============================================================

export type SitePage = {
  slug: string;
  title: string;
  summary: string;
  keywords: string[];
  content: string;
};

export type FAQ = { q: string; a: string };

// ------------------------------------------------------------
//  The assistant fallback persona (Jiya)
// ------------------------------------------------------------
export const assistant = {
  name: "Jiya",
  openingStatement:
    "Hello! Welcome to FutureTech Solutions. I'm Jiya, your HR Operations Specialist. I can guide you through our leave policies, attendance, payroll basics, and daily working hours. What would you like to explore first?",
};

// ------------------------------------------------------------
//  The three specialized HR onboarding assistants
// ------------------------------------------------------------
export const agents = {
  jiya: {
    name: "Jiya",
    title: "HR Operations Specialist",
    role: "Specialist in general company operations, working hours, leave rules, attendance tracking, WFH guidelines, employee performance reviews, and exit clearance procedures.",
    openingStatement:
      "Hello! Welcome to FutureTech Solutions. I'm Jiya, your HR Operations Specialist. I'm here to guide you through our general company overview, leaves, WFH, performance reviews, and exit procedures. What would you like to cover first?",
    accentColor: "from-emerald-400 to-teal-500",
    shadowColor: "shadow-emerald-500/20",
    bgGradient: "from-emerald-950/40 via-neutral-900 to-neutral-950",
    avatar: "👩‍💼",
    expertise: ["General Company Overview", "Leave & WFH Rules", "Performance & Exits"],
    modules: ["/overview", "/leave-policy", "/attendance-policy", "/benefits", "/exit-process"],
  },
  nikhil: {
    name: "Nikhil",
    title: "Software Onboarding Coach",
    role: "Coach guiding new HR personnel through candidate sourcing pipelines, tech screening, software engineer grading levels, required document checklists, and IDE/dev-environment welcome guides.",
    openingStatement:
      "Welcome aboard! I'm Nikhil, your Software Onboarding Coach. I'm ready to walk you through our software engineer interview stages, engineering grading levels, laptop setups, and coding standard workflows. What shall we explore first?",
    accentColor: "from-blue-500 to-indigo-600",
    shadowColor: "shadow-blue-500/20",
    bgGradient: "from-blue-950/40 via-neutral-900 to-neutral-950",
    avatar: "👨‍💼",
    expertise: ["Software Hiring Pipelines", "Technical Onboarding Setup", "Coding Standards & Git"],
    modules: ["/overview", "/software-hiring", "/software-onboarding", "/software-standards"],
  },
  tripti: {
    name: "Tripti",
    title: "UI/UX & Design Onboarding Coach",
    role: "Coach guiding new HR personnel through portfolio evaluations, design challenge guidelines, product designer grading levels, design software access (Figma/Adobe), and branding system compliance.",
    openingStatement:
      "Greetings. I am Tripti, UI/UX and Design Onboarding Coach at FutureTech Solutions. I can walk you through our design team structure, designer hiring workflow, design tools setup, and brand compliance guidelines. What would you like to review first?",
    accentColor: "from-purple-500 to-fuchsia-600",
    shadowColor: "shadow-purple-500/20",
    bgGradient: "from-purple-950/40 via-neutral-900 to-neutral-950",
    avatar: "👩‍🔬",
    expertise: ["Design Hiring & Portfolios", "Figma & Creative Onboarding", "Brand & Design Guidelines"],
    modules: ["/overview", "/design-hiring", "/design-onboarding", "/design-standards"],
  },
};

// ------------------------------------------------------------
//  Company Information
// ------------------------------------------------------------
export const company = {
  name: "FutureTech Solutions Pvt. Ltd.",
  tagline: "Software Development & Interactive Experience Company",
  location: "Bangalore, India (Headquarters)",
  workingHours: "Monday to Friday, 9:30 AM – 6:30 PM (Lunch: 1:00 PM – 2:00 PM). Saturday & Sunday are holidays.",
  contact: {
    website: "https://futuretechsolutions.demo",
    enquiry: "Submit an inquiry via internal Slack channels or contact neha.k@futuretech.demo",
    social: {
      instagram: "@futuretechsol",
      facebook: "FutureTechSolutions",
      x: "@FutureTechSol",
    },
  },
};

// ------------------------------------------------------------
//  Onboarding Modules (Index of Topics)
// ------------------------------------------------------------
export const pageIndex: SitePage[] = [
  {
    slug: "/overview",
    title: "Company Overview",
    summary: "General details, working hours, headquarters, vision, mission, and department structure of FutureTech Solutions.",
    keywords: ["company name", "working hours", "headquarters", "vision", "mission", "departments", "bangalore"],
    content: `FutureTech Solutions Pvt. Ltd. is a Software Development & Interactive Experience Company based in Bangalore, India.
Working Hours: Monday to Friday, 9:30 AM – 6:30 PM. Lunch break is from 1:00 PM to 2:00 PM. Saturday and Sunday are holidays.
Vision: To build innovative digital products that improve businesses through technology and creativity.
Mission: Deliver high-quality software, encourage innovation, build a healthy work culture, promote continuous learning, and maintain transparency.
Departments:
- Human Resources: Responsible for hiring, onboarding, leaves, performance reviews, employee relations, and exits.
- Engineering: Handles frontend, backend, mobile, DevOps, and QA.
- Design: Handles UI/UX, graphics, motion graphics, and branding.
- Sales & Marketing: Handles leads, client communication, and digital branding.
- Operations: Responsible for administrative work, asset management, and daily operations.`,
  },
  {
    slug: "/software-hiring",
    title: "Software Hiring & Levels",
    summary: "Engineering interview pipeline, coding test guidelines, and technical grading levels.",
    keywords: ["software", "engineering", "hiring", "coding test", "tech screen", "pipeline", "levels"],
    content: `Engineering Grading Levels: Intern, Junior Software Engineer, Software Engineer, Senior Software Engineer, Tech Lead, Principal Engineer, Engineering Manager, Director of Engineering.
Hiring Pipeline:
1. Tech Screen: Initial 30-minute resume and basic coding evaluation.
2. Coding Challenge: Take-home challenge or 60-minute live coding session focused on Data Structures, Algorithms, and Problem Solving.
3. System Design: 60-minute discussion evaluating architectural knowledge and scaling capabilities (for Senior positions and above).
4. HR & Culture Fit: Final validation of alignment with company values.
5. Management Approval: Hiring board review and formal offer release.

Required Documents for Engineering Joiners:
- Aadhaar Card, PAN Card, Passport
- Degree / Graduation Certificates
- Relieving and Experience Letters from previous employer
- Latest payslips (last 3 months) or Form 16`,
  },
  {
    slug: "/software-onboarding",
    title: "Software Setup Checklist",
    summary: "IDE setup, code repository access, dev tools, and onboarding milestones for engineers.",
    keywords: ["ide", "git", "github", "docker", "aws", "slack", "onboarding checklist", "milestones"],
    content: `Before Joining (Engineering):
- Allocate development laptop (macOS or Linux).
- Generate Employee ID and corporate email.
- Set up accesses for GitLab/GitHub, Slack channels (#eng-announcements, #eng-support), Jira, AWS Sandbox, and VPN keys.

First Day Checklist:
- Set up local system: VS Code or WebStorm IDE.
- Clone core repositories and verify local build runs.
- Install Docker, Node.js, Python, or Go dependecies depending on team.
- Complete first day IT security orientation.

First Week Milestones:
- Understand CI/CD pipeline structures (GitLab CI / GitHub Actions).
- Commit your first small bug fix or documentation patch.
- Pair program with your onboarding buddy on a minor task.`,
  },
  {
    slug: "/software-standards",
    title: "Coding Standards & IT Safety",
    summary: "Git workflow rules, code review criteria, and security compliance for software developers.",
    keywords: ["standards", "git", "reviews", "clean code", "security", "passwords", "compliance"],
    content: `Git Branching Rules:
- Never push directly to main or dev branch. All changes must go through feature branches (e.g., feature/feature-name) or bug branches (e.g., bug/bug-name).
- Create a Pull Request (PR) and secure at least 2 peer reviews before merge.

Code Quality Standards:
- Write modular, self-documenting code.
- Maintain at least 80% unit test coverage for new files.
- Follow ESLint/Prettier formatting standards.

IT & Cybersecurity Compliance:
- Never commit secret API keys or credentials to Git repositories (use environment variables or AWS Secrets Manager).
- Lock screen whenever leaving your computer (10-minute automatic lock is enforced).
- Enable 2-Factor Authentication (2FA) on all corporate portals (Google Workspace, Slack, GitHub).`,
  },
  {
    slug: "/design-hiring",
    title: "Design Hiring & Levels",
    summary: "Design interview stages, portfolio evaluation criteria, and creative grading levels.",
    keywords: ["design", "ui/ux", "portfolio", "levels", "hiring pipeline", "challenge"],
    content: `Design Grading Levels: Design Intern, Junior UI/UX Designer, Product Designer, Senior Product Designer, Lead Product Designer, Design Director.
Hiring Pipeline:
1. Portfolio Evaluation: Review of past work, focusing on user-centered thinking, visual execution, and case study depth.
2. Design Screening: 30-minute introductory call to discuss design philosophy and past projects.
3. Design Challenge: A wireframing and interactive prototyping challenge (creating user flows and UI mockups).
4. Portfolio Review & Presentation: 60-minute session presenting the challenge solution and a deep-dive case study to the design team.
5. HR & Offer Approval.

Required Documents for Design Joiners:
- Aadhaar Card, PAN Card, Passport
- Portfolio Link / PDF case studies
- Degree / Graduation Certificates (fine arts or design preferred but not mandatory)
- Previous Experience & Relieving Letters`,
  },
  {
    slug: "/design-onboarding",
    title: "Design Setup Checklist",
    summary: "Design tool configuration, team access, and first week design review cycles.",
    keywords: ["figma", "adobe", "whimsical", "onboarding checklist", "milestones", "design team"],
    content: `Before Joining (Design):
- Allocate high-resolution display laptop (macOS MacBook Pro).
- Generate Employee ID and corporate email.
- Provision licenses for Figma Enterprise, Adobe Creative Cloud, Miro, and Whimsical.

First Day Checklist:
- Set up Figma account and request access to the FutureTech Design Workspace.
- Access the corporate Google Drive branding asset folders.
- Slack channels configuration: join #design-team, #design-system, #product-reviews.
- Meeting with Onboarding Buddy.

First Week Milestones:
- Review existing product personas and user research findings.
- Walkthrough of the global Figma Design System.
- Participate in your first design critique and review session.
- Work on a minor UX enhancement mockup.`,
  },
  {
    slug: "/design-standards",
    title: "Design System & Compliance",
    summary: "Figma design system layout, WCAG accessibility rules, and client visual assets safety.",
    keywords: ["figma", "design system", "accessibility", "wcag", "compliance", "branding"],
    content: `Figma Design System Guidelines:
- Always use the predefined color palette variables (Primary, Secondary, Neutrals, Accents).
- Follow the 8px grid layout system for component spacing and layout alignment.
- Use Outfit/Inter typography hierarchy scales for text formatting.

Accessibility Standards (WCAG):
- Design with a minimum contrast ratio of 4.5:1 for normal text (WCAG AA compliance).
- Ensure target sizes for interactive components are at least 44x44px.

Branding & Confidentiality Compliance:
- Mockups containing client branding or confidential user metrics must be kept in restricted Figma folders.
- Never upload draft designs or raw vectors to personal online clouds or public forums.
- Export all assets using corporate naming conventions (e.g., project_asset-name_state).`,
  },
  {
    slug: "/leave-policy",
    title: "Leave Policy",
    summary: "Annual leave allocations (casual, sick, paid), maternity/paternity allocations, and the approval chain.",
    keywords: ["leave", "casual leave", "sick leave", "paid leave", "maternity", "paternity", "approval"],
    content: `FutureTech Solutions Leave Allocation:
- Casual Leave: 12 days per year
- Sick Leave: 10 days per year
- Paid Leave: 18 days per year
- Maternity Leave: 26 weeks
- Paternity Leave: 7 days

Leave Approval Rules: All leaves require reporting manager approval. Approval must be requested through the HRMS platform prior to taking leave whenever possible.`,
  },
  {
    slug: "/attendance-policy",
    title: "Attendance & WFH",
    summary: "Daily login timings, late login grace periods, work-from-home rules, and minimum working hours.",
    keywords: ["attendance", "grace time", "late login", "wfh", "work from home", "minimum hours"],
    content: `Working Hours: 9:30 AM – 6:30 PM.
Grace Time: 15 minutes (employees must log in by 9:45 AM).
Late Login: Logging in after 9:45 AM is considered late login. Persistent late logins are subject to review.
Work From Home (WFH): Allowed only with prior reporting manager approval. Role-based exceptions apply.
Minimum Working Hours: Employees must log in for a minimum of 8 working hours per day to be marked present.`,
  },
  {
    slug: "/benefits",
    title: "Performance & Benefits",
    summary: "Performance review cycles, appraisal criteria, and corporate employee benefit highlights.",
    keywords: ["appraisal", "performance review", "evaluation", "benefits", "insurance", "reimbursement"],
    content: `Performance Reviews:
Frequency: Conducted every 6 months.
Evaluation is based on: Technical Skills (or Design Skills), Communication, Teamwork, Ownership, Problem Solving, Attendance, and Learning Ability.

Employee Benefits:
- Health Insurance cover for employee and dependents
- Paid annual leave policy
- Annual Learning Budget
- Professional Certification Reimbursement
- Structured Team Outings and dinners
- Festival Celebrations in the office
- Flexible Working Hours (role-based)`,
  },
  {
    slug: "/exit-process",
    title: "Exit Process",
    summary: "The steps for resignation, knowledge transfer, asset returns, and final settlement clearances.",
    keywords: ["exit", "resignation", "asset return", "settlement", "clearance", "kt", "experience letter"],
    content: `Exit Process Workflow:
Step 1: Employee submits resignation in HRMS.
Step 2: Manager discussion and notice period confirmation.
Step 3: Knowledge Transfer (KT) session and documentation.
Step 4: Asset Return (laptop, ID card, accessories).
Step 5: Exit Interview with the HR department.
Step 6: Final Settlement calculation and payment (usually within 30-45 days).
Step 7: Issue of Experience & Relieving Letters.`,
  },
];

export function getAgentModules(agentId: string): SitePage[] {
  const selectedAgent = agents[agentId as keyof typeof agents];
  const slugs = selectedAgent ? selectedAgent.modules : agents.jiya.modules;
  return pageIndex.filter((p) => slugs.includes(p.slug));
}

// ------------------------------------------------------------
//  FAQs (Copied from prompt FAQs)
// ------------------------------------------------------------
export const faqs: FAQ[] = [
  {
    q: "What are company working hours?",
    a: "FutureTech Solutions working hours are from 9:30 AM to 6:30 PM, Monday to Friday.",
  },
  {
    q: "How many casual leaves are allowed?",
    a: "Employees are allowed 12 casual leaves per year.",
  },
  {
    q: "Who approves leave?",
    a: "The respective reporting manager must approve all leave requests.",
  },
  {
    q: "What documents are required for joining?",
    a: "Required documents include PAN Card, Aadhaar Card, Bank account details, Educational Certificates, Previous Experience Letter, and a passport-size photo.",
  },
  {
    q: "Can employees work from home?",
    a: "Yes, working from home (WFH) is allowed only with prior approval from the reporting manager.",
  },
  {
    q: "When is salary credited?",
    a: "Salaries are credited on the last working day of every month.",
  },
];
