import axios from 'axios'
import { Loader2Icon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

const QuestionList = ({ formData }) => {

  const [loading, setLoading] = useState(true)
  const [questionList, setQuestionList] = useState()

  console.log("Came to questionList");

  const generateQuestionList = async () => {
    setLoading(true)

    try {
      console.log("Calling model with data:", formData);

      const result = await axios.post('/api/ai-model', {
        ...formData
      });
      
      console.log("API response:", result.data);
      
      // Check if we have content before trying to parse it
      if (result.data && result.data.content) {
        try {
          // Handle different response formats
          let final_content;
          const rawContent = result.data.content;
          
          console.log("Raw content:", rawContent);
          
          if (typeof rawContent === 'string') {
            // Extract JSON array from the content
            // Look for patterns like: interviewQuestions = [ ... ] or just [ ... ]
            const jsonMatch = rawContent.match(/interviewQuestions\s*=\s*(\[[\s\S]*?\])/);
            
            if (jsonMatch && jsonMatch[1]) {
              // We found the array pattern
              try {
                // Clean up the JSON string to fix common formatting issues
                let jsonText = jsonMatch[1]
                  .replace(/'/g, '"')         // Replace single quotes with double quotes
                  .replace(/,\s*]/g, ']')     // Remove trailing commas
                  .replace(/,\s*}/g, '}')     // Remove trailing commas in objects
                  .replace(/(\w+):/g, '"$1":') // Add quotes to property names
                  .replace(/\\"/g, '\\"');    // Preserve escaped quotes
                  
                // Fix missing commas between objects in arrays
                jsonText = jsonText.replace(/}\s*{/g, '},{');
                
                console.log("Cleaned JSON text:", jsonText);
                
                try {
                  final_content = JSON.parse(jsonText);
                } catch (e) {
                  console.error("First parse attempt failed:", e);
                  
                  // Try a more aggressive cleanup approach
                  jsonText = jsonText.replace(/([{,]\s*)(\w+)(\s*:)/g, '$1"$2"$3');
                  console.log("Second cleanup attempt:", jsonText);
                  
                  try {
                    final_content = JSON.parse(jsonText);
                  } catch (e2) {
                    console.error("Second parse attempt failed:", e2);
                    
                    // Try with a JSON5 parsing approach (if available) or as a last resort
                    // manually fix specific issue
                    const fixedText = fixJsonErrors(jsonText);
                    final_content = JSON.parse(fixedText);
                  }
                }
              } catch (e) {
                console.error("Error parsing extracted JSON:", e);
              }
            } else {
              // Try to find any JSON array in the content
              const arrayMatch = rawContent.match(/\[\s*\{\s*"question"/);
              if (arrayMatch) {
                const startIdx = rawContent.indexOf(arrayMatch[0]);
                let bracketCount = 0;
                let endIdx = startIdx;
                
                // Find the matching closing bracket
                for (let i = startIdx; i < rawContent.length; i++) {
                  if (rawContent[i] === '[') bracketCount++;
                  if (rawContent[i] === ']') bracketCount--;
                  if (bracketCount === 0) {
                    endIdx = i + 1;
                    break;
                  }
                }
                
                // Extract the array
                const jsonText = rawContent.substring(startIdx, endIdx);
                try {
                  final_content = JSON.parse(jsonText);
                } catch (e) {
                  console.error("Error parsing array:", e);
                }
              }
            }
            
            // If we still don't have valid content, try a simpler approach
            if (!final_content) {
              // Extract questions manually
              const questions = [];
              const lines = rawContent.split('\n');
              
              for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                if (line.includes('"question":')) {
                  const question = line.match(/"question":\s*"([^"]+)"/)?.[1];
                  const typeLine = lines[i+1] || '';
                  const type = typeLine.match(/"type":\s*"([^"]+)"/)?.[1] || 'General';
                  
                  if (question) {
                    questions.push({ question, type });
                  }
                }
              }
              
              if (questions.length > 0) {
                final_content = questions;
              }
            }
          } else if (typeof rawContent === 'object') {
            // If it's already an object, extract interviews if available
            final_content = rawContent.interviewQuestions;
          }
          
          console.log("Parsed content:", final_content);
          
          if (Array.isArray(final_content) && final_content.length > 0) {
            setQuestionList(final_content);
          } else {
            // If all parsing methods fail, create a simple list from the response
            const questions = extractQuestionsFromText(rawContent);
            if (questions.length > 0) {
              setQuestionList(questions);
            } else {
              toast('No interview questions were generated. Please try again.');
            }
          }
        } catch (parseError) {
          console.error("JSON parsing error:", parseError);
          
          // Try to extract questions from text as fallback
          const questions = extractQuestionsFromText(result.data.content);
          if (questions.length > 0) {
            setQuestionList(questions);
          } else {
            toast('Error parsing the AI response. Please try again.');
          }
        }
      } else if (result.data && result.data.error) {
        console.error("API returned error:", result.data.error);
        toast(`Error: ${result.data.error}`);
      } else {
        console.error("Unexpected API response:", result.data);
        toast('Unexpected response from the server. Please try again.');
      }
      
    } catch (error) {
      console.error("Request error:", error);
      toast('Server Error, Try Again!');
    } finally {
      setLoading(false);
    }
  }

  // Helper function to extract questions from text
  const extractQuestionsFromText = (text) => {
    const questions = [];
    const lines = text.split('\n');
    let currentQuestion = null;
    
    // Look for patterns like: "question": "What is...", or numbered lists like "1. What is..."
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Check for JSON-like question pattern
      const jsonMatch = line.match(/"question":\s*"([^"]+)"/);
      if (jsonMatch) {
        const question = jsonMatch[1];
        const typeMatch = lines[i+1]?.match(/"type":\s*"([^"]+)"/) || [];
        const type = typeMatch[1] || 'General';
        
        questions.push({ 
          question: question, 
          type: type 
        });
        continue;
      }
      
      // Check for numbered question pattern
      const numberedMatch = line.match(/^\d+\.\s+(.+)/);
      if (numberedMatch) {
        const question = numberedMatch[1];
        let type = 'General';
        
        // Look for type in the next line
        if (i + 1 < lines.length && lines[i+1].toLowerCase().includes('type:')) {
          type = lines[i+1].split(':')[1].trim();
        }
        
        questions.push({ 
          question: question, 
          type: type 
        });
      }
    }
    
    return questions;
  }

  // Add this helper function to fix common JSON errors
  const fixJsonErrors = (jsonString) => {
    // Log the position of the error to help debug
    try {
      JSON.parse(jsonString);
      return jsonString; // If it parses, return as is
    } catch (e) {
      const match = e.message.match(/position (\d+)/);
      if (match) {
        const pos = parseInt(match[1]);
        console.log("Error at position:", pos);
        console.log("Characters around error:", jsonString.substring(Math.max(0, pos - 20), pos + 20));
        
        // Find the line where the error occurs
        const lines = jsonString.split('\n');
        let charCount = 0;
        for (let i = 0; i < lines.length; i++) {
          charCount += lines[i].length + 1; // +1 for the newline
          if (charCount > pos) {
            console.log("Error in line:", i + 1, "content:", lines[i]);
            break;
          }
        }
      }
    }
    
    // Fix common JSON syntax errors
    let fixed = jsonString;
    
    // Fix missing quotes around property names
    fixed = fixed.replace(/([{,]\s*)(\w+)(\s*:)/g, '$1"$2"$3');
    
    // Fix trailing commas in objects and arrays
    fixed = fixed.replace(/,(\s*[}\]])/g, '$1');
    
    // Fix missing commas between array elements
    fixed = fixed.replace(/}(\s*){/g, '},\n$1{');
    
    return fixed;
  }

  useEffect(() => {
    if (formData) generateQuestionList()
  }, [formData])

  return (
    <div>
      {
        loading && <div>
          <Loader2Icon />
          <div>
            <h2>Generating Interview Questions</h2>
            <p>Gemini is crafting personalized questions based on your entered details.</p>
          </div>
        </div>
      }
      {
        questionList?.length > 0 &&
        <div>
          {
            questionList.map((item, index) => (
              <div key={index}>
                <h2>{item.question}</h2>
                <h2>Type: {item?.type}</h2>
              </div>
            ))
          }
        </div>
      }


    </div>
  )
}

export default QuestionList