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
    role: "Specialist in daily HR operations, working hours, leave rules, WFH approvals, employee benefits, performance cycles, and offboarding exit procedures.",
    openingStatement:
      "Hello! Welcome to FutureTech Solutions. I'm Jiya, your HR Operations Specialist. I'm here to guide you through our working hours, attendance policies, leave rules, WFH approvals, benefits, and exit procedures. What would you like to explore first?",
    accentColor: "from-emerald-400 to-teal-500",
    shadowColor: "shadow-emerald-500/20",
    bgGradient: "from-emerald-950/40 via-neutral-900 to-neutral-950",
    avatar: "👩‍💼",
    expertise: ["Leave & Attendance Policies", "Employee Benefits & Reviews", "Exit & Settlement Process"],
  },
  nikhil: {
    name: "Nikhil",
    title: "Recruitment & Onboarding Coach",
    role: "Coach guiding new HR personnel through candidate sourcing, interview pipelines, offer approvals, required documents collection, and employee onboarding checklists.",
    openingStatement:
      "Welcome aboard! I'm Nikhil, your Recruitment and Onboarding Coach. I'm ready to walk you through our hiring workflow, candidate levels, required onboarding documents, and employee IT/welcome checklists. What can I help you prepare today?",
    accentColor: "from-blue-500 to-indigo-600",
    shadowColor: "shadow-blue-500/20",
    bgGradient: "from-blue-950/40 via-neutral-900 to-neutral-950",
    avatar: "👨‍💼",
    expertise: ["Hiring Workflow & Levels", "Required Joining Documents", "Onboarding Checklists"],
  },
  tripti: {
    name: "Tripti",
    title: "Security & Compliance Officer",
    role: "Officer enforcing the company Code of Conduct, professional dress codes, IT asset protocols, and information security guidelines to protect confidential client and source data.",
    openingStatement:
      "Greetings. I am Tripti, Security and Compliance Officer at FutureTech Solutions. I can outline our company Code of Conduct, dress code rules, IT equipment guidelines, and information security protocols. How can I assist you with corporate compliance today?",
    accentColor: "from-purple-500 to-fuchsia-600",
    shadowColor: "shadow-purple-500/20",
    bgGradient: "from-purple-950/40 via-neutral-900 to-neutral-950",
    avatar: "👩‍🔬",
    expertise: ["Code of Conduct & Dress Code", "IT Security Protocols", "Information Security & NDAs"],
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
    slug: "/hiring",
    title: "Hiring Workflow & Levels",
    summary: "The candidate interview pipeline, employee grading levels, and lists of required documents for joining.",
    keywords: ["hiring", "levels", "hiring workflow", "documents", "aadhaar", "pan", "passport", "certificates"],
    content: `Employee Levels: Intern, Junior, Software Engineer, Senior Engineer, Lead, Manager, Director.
Hiring Workflow:
Step 1: Receive Resume
Step 2: Screen Candidate
Step 3: Technical Interview
Step 4: HR Interview
Step 5: Management Approval
Step 6: Offer Letter
Step 7: Document Collection
Step 8: Employee Onboarding

Required Joining Documents:
- Aadhaar Card
- PAN Card
- Passport Size Photo
- Bank Account Details
- Educational Certificates (graduation/post-graduation)
- Previous Experience Letter (from last employer)
- Relieving Letter
- Latest Resume`,
  },
  {
    slug: "/onboarding",
    title: "Onboarding Checklist",
    summary: "Checklists for new employee preparation before joining, on their first day, and during their first week.",
    keywords: ["onboarding", "checklist", "first day", "first week", "before joining", "equipment", "github", "slack"],
    content: `Before Joining checklist:
- Generate Employee ID
- Create Official Email
- Laptop Allocation
- Create HRMS Account
- Create Slack Account
- Create GitHub Account
- Prepare Offer Letter & NDA

First Day checklist:
- Welcome Meeting
- Company & Team Introduction
- Office Tour
- HR Policy Session
- IT Hardware & Account Setup
- Initial Project Allocation

First Week checklist:
- Product & Project Training
- Development Environment Setup
- Initial Team Meetings
- Detailed HR Orientation
- Internal Documentation Review`,
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
    slug: "/compliance-it",
    title: "Conduct, Dress & IT Policy",
    summary: "Professional conduct guidelines, dress codes, IT safety, and information security regulations.",
    keywords: ["conduct", "dress code", "it policy", "security", "passwords", "confidentiality", "nda"],
    content: `Code of Conduct: Respect colleagues, maintain professionalism, follow policies, protect confidential info, avoid discrimination, and report unethical behavior.
Dress Code:
- Monday to Thursday: Business Casual
- Friday: Smart Casual
- Client Meetings: Formal Wear

IT Policy:
- Never share passwords or authentication credentials.
- Always lock your computer when walking away from your desk.
- Use company-provided devices responsibly for official work.
- Install approved software only. Report security incidents immediately.

Information Security:
- Confidential data includes client details, source code, financial data, employee records, and internal docs.
- Employees must never share confidential files, upload code publicly, use personal cloud storage, or share credentials.`,
  },
  {
    slug: "/benefits",
    title: "Performance & Benefits",
    summary: "Performance review cycles, appraisal criteria, and corporate employee benefit highlights.",
    keywords: ["appraisal", "performance review", "evaluation", "benefits", "insurance", "reimbursement"],
    content: `Performance Reviews:
Frequency: Conducted every 6 months.
Evaluation is based on: Technical Skills, Communication, Teamwork, Ownership, Problem Solving, Attendance, and Learning Ability.

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
  {
    slug: "/demo-employees",
    title: "Demo Candidates & Staff",
    summary: "List of dummy employee entries used for HR training and system demonstrations.",
    keywords: ["employee list", "demo employees", "rahul", "priya", "arjun", "manager"],
    content: `Demo Employee Database:
1. Employee ID: EMP001
   Name: Rahul Sharma
   Department: Engineering
   Role: Software Engineer
   Joining Date: 10 Jan 2026
   Manager: Amit Verma

2. Employee ID: EMP002
   Name: Priya Singh
   Department: HR
   Role: HR Executive
   Joining Date: 15 Feb 2026
   Manager: Neha Kapoor

3. Employee ID: EMP003
   Name: Arjun Patel
   Department: Design
   Role: UI Designer
   Joining Date: 20 Mar 2026
   Manager: Sneha Rao`,
  },
];

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
