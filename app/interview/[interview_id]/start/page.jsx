'use client'
import { InterviewDataContext } from '@/context/InterviewDataContext'
import { Mic, Phone, Timer } from 'lucide-react'
import Image from 'next/image'
import React, { useContext, useEffect, useRef, useState } from 'react'
import Vapi from "@vapi-ai/web";
import AlertEndConfimation from '@/components/AlertEndConfimation'
import { toast } from 'sonner'

const StartInterview = () => {
  const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext)
  const [speakingUser, setSpeakingUser] = useState(false)
  const vapiRef = useRef(null); // store the Vapi instance here

  // We'll also compute questionList and totalQuestions and store in state
  const [questionList, setQuestionList] = useState("");
  const [totalQuestions, setTotalQuestions] = useState(0);

  // Compute the question list and total questions once the interviewInfo is available
  useEffect(() => {
    if (interviewInfo && interviewInfo.interviewData?.questionList) {
      let list = "";
      let total = 0;
      interviewInfo.interviewData.questionList.forEach(item => {
        list = item?.question + "$" + list;
        total += 1;
      });
      setQuestionList(list);
      setTotalQuestions(total);
    }
  }, [interviewInfo]);

  // Create the vapi instance only once
  useEffect(() => {
    if (!vapiRef.current && process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY) {
      vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);

      // Set up vapi event listeners
      vapiRef.current.on("call-start", () => {
        console.log("Call has started.");
        toast('Call connected...');
      });

      vapiRef.current.on("speech-start", () => {
        console.log("Assistant speech has started.");
        setSpeakingUser(false);
      });

      vapiRef.current.on("speech-end", () => {
        console.log("Assistant speech has ended.");
        setSpeakingUser(true);
      });

      vapiRef.current.on("call-end", () => {
        console.log("Call has ended.");
        toast('Interview ended');
      });
    }
  }, []); // empty dependency => runs only once

  // Build assistantOptions, using the computed questionList and totalQuestions.
  const assistantOptions = {
    name: "AI Recruiter",
    firstMessage: `Hi ${interviewInfo?.userName}, how are you? Ready for your interview on ${interviewInfo?.interviewData?.jobPosition}?`,
    transcriber: {
      provider: "deepgram",
      model: "nova-2",
      language: "en-US",
    },
    voice: {
      provider: "playht",
      voiceId: "Jennifer",
    },
    model: {
      provider: "openai",
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `
You are an AI voice assistant conducting real-time interviews for job candidates. Your goal is to assess their qualifications, motivation, technical skills, and cultural fit for the role—especially with a focus on ${interviewInfo?.interviewData?.jobPosition}.

Begin with a friendly, relaxed, yet professional introduction. Example:
"Hey there! Welcome to your ${interviewInfo?.interviewData?.jobPosition} interview. Let's get started with a few questions!"

Interview Guidelines:

1. Follow a Structured & Logical Flow:
- Use the provided list of questions: ${questionList}.
- Ask one question at a time and wait for the candidate's response before continuing.
- Keep questions clear and concise.
- Ask in a logical order to evaluate skills, experience, and motivation.

2. Engage Naturally and React Appropriately:
- Listen actively and acknowledge the candidate's response.
- If a response lacks depth or clarity, ask a brief follow-up or offer a rephrase.
- If they struggle, offer a hint without giving away the answer. Example:
  "Need a hint? Think about how React tracks component updates!"

3. Provide Encouraging Feedback:
- Use casual, supportive phrases like:
  "Nice! That's a solid answer."
  "Hmm, not quite! Want to try again?"
  "Alright, next up..."
  "Let's tackle a tricky one!"

4. Maintain a Professional Yet Approachable Tone:
- Be polite, friendly, and confident.
- Avoid robotic or overly scripted language—speak like a real person.
- Keep your responses short, natural, and engaging.

5. Answer Candidate Questions Professionally:
- If the candidate asks about the role, company, or expectations, provide a clear and relevant response.
- If you don't know the answer, kindly redirect them to HR.

6. Wrap Up the Interview Smoothly:
- After ${totalQuestions} questions, summarize their performance positively:
  "That was great! You handled some tough questions well. Keep sharpening your skills!"
- Thank them and end on a high note:
  "Thanks for chatting! Hope to see you crushing projects soon!"
  "The team will follow up soon with feedback."

Key Guidelines:
✅ Be friendly, engaging, and witty 🎉  
✅ Keep responses short and conversational  
✅ Adjust tone based on the candidate's confidence  
✅ Stay focused on assessing React-related skills  
✅ Remain professional, polite, and precise throughout  
        `.trim(),
        },
      ],
    },
  };

  // Start the call when interviewInfo is available and vapi is created
  useEffect(() => {
    if (interviewInfo && vapiRef.current) {
      vapiRef.current.start(assistantOptions);
    }
  }, [interviewInfo, assistantOptions]);

  const stopInterview = () => {
    if (vapiRef.current) {
      vapiRef.current.stop();
    }
  };

  return (
    <div>
      <h2>
        AI Interview Session
        <span> <Timer /> 00.00.00 </span>
      </h2>

      <div>
        <div>
          {!speakingUser && <span className='animate-ping' />}
          <Image src={'/ai.jpg'} alt='Ai interviewer' height={100} width={100} />
          <h2>AI Recruiter</h2>
        </div>
        <div>
          <div>
            {speakingUser && <span className='animate-ping' />}
            <h2>{interviewInfo?.userName[0]}</h2>
          </div>
          <h2>{interviewInfo?.userName}</h2>
        </div>
      </div>
      <div>
        <Mic />
        <AlertEndConfimation stopInterview={stopInterview}>
          <Phone />
        </AlertEndConfimation>
      </div>
      <h2>Interview in Progress...</h2>
    </div>
  )
}

export default StartInterview
