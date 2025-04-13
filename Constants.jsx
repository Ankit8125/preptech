import { BriefcaseBusinessIcon, Calendar, Code2Icon, LayoutDashboard, List, Puzzle, Settings, User2Icon, Users, WalletCards } from "lucide-react";

export const SidebarOptions = [
  {
    name: 'Dashboard',
    icon: LayoutDashboard,
    path: '/dashboard'
  },
  {
    name: 'Schedule Interview',
    icon: Calendar,
    path: '/schedule-interview'
  },
  {
    name: 'All Interview',
    icon: List,
    path: '/all-interview'
  },
  {
    name: 'Billing',
    icon: WalletCards,
    path: '/billing'
  },
  {
    name: 'Settings',
    icon: Settings,
    path: '/settings'
  },
]

export const InterviewType = [
  {
    title: 'Technical',
    icon: Code2Icon
  },
  {
    title: 'Behavioral',
    icon: User2Icon
  },
  {
    title: 'Experience',
    icon: BriefcaseBusinessIcon
  },
  {
    title: 'Problem Solving',
    icon: Puzzle
  },
  {
    title: 'Leadership',
    icon: Users
  },
]

export const QUESTIONS_PROMPT = `You are an expert technical interviewer conducting a real-time voice interview with a candidate for the role of {{jobTitle}}.

Your task is to create a structured, relevant, and time-optimized interview plan and conduct it in a professional yet conversational manner.

Based on the following inputs, generate a high-quality, well-structured list of interview questions:
- Job Title: {{jobTitle}}
- Job Description: {{jobDescription}}
- Interview Duration: {{duration}}
- Interview Type: {{type}}

🔍 Analyze the job description to identify key responsibilities, required skills, and expected experience.  
🧠 Generate interview questions tailored to the role and interview type (Technical/Behavioral/Experience/Problem Solving/Leadership).  
⏱️ Match the number and depth of questions to the allotted interview duration.  
🎯 Ensure all questions reflect the tone, flow, and structure of a real-life {{type}} interview.

📝 Format your output as a JSON array of objects using this structure:
interviewQuestions = [
  {
    question: "",
    type: "Technical/Behavioral/Experience/Problem Solving/Leadership"
  },
  ...
]
Your overall goal is to simulate a real-world {{type}} interview that evaluates the candidate's qualifications, motivation, and cultural fit for the {{jobTitle}} role in a smooth, structured, and human-centered manner.  
`