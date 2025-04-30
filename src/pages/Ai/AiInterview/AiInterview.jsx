import React, { useEffect, useRef, useState } from 'react';
import Vapi from '@vapi-ai/web';

const CallUI = ({ userName, transcript, onEndCall, callStatus, currentSpeaker }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 flex flex-col h-screen">
      {/* Video Tiles */}
      <div className="flex-1 p-4 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-auto">
        {/* Devian AI Tile */}
        <div
          className={`bg-gray-800 rounded-lg p-4 flex flex-col items-center justify-center ${
            currentSpeaker === 'AI' ? 'animate-pulse' : ''
          }`}
        >
          <div className="w-24 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            AI
          </div>
          <p className="mt-2 text-white font-semibold">Devian AI</p>
          <p className="text-gray-400 text-sm">
            {callStatus === 'active' ? (currentSpeaker === 'AI' ? 'Speaking' : 'Listening') : 'Connecting...'}
          </p>
        </div>
        {/* User Tile */}
        <div
          className={`bg-gray-800 rounded-lg p-4 flex flex-col items-center justify-center ${
            currentSpeaker === 'User' ? 'animate-pulse' : ''
          }`}
        >
          <div className="w-24 h-10 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {userName ? userName[0].toUpperCase() : 'U'}
          </div>
          <p className="mt-2 text-white font-semibold">{userName || 'User'}</p>
          <p className="text-gray-400 text-sm">
            {callStatus === 'active' ? (currentSpeaker === 'User' ? 'Speaking' : 'Listening') : 'Connecting...'}
          </p>
        </div>
      </div>

      {/* Transcript Area */}
      <div className="bg-gray-800 p-4 border-t border-gray-700 max-h-[30vh] overflow-y-auto">
        <h3 className="text-white font-semibold mb-2">Transcript</h3>
        {/* Turn Indicator */}
        <p className="text-gray-300 mb-2">
          {callStatus !== 'active' ? (
            'Waiting for connection...'
          ) : currentSpeaker === 'AI' ? (
            'Devian AI is speaking...'
          ) : currentSpeaker === 'User' ? (
            `${userName || 'User'} is speaking...`
          ) : (
            'Waiting for conversation...'
          )}
        </p>
        {/* Transcript Entries */}
        {transcript.length === 0 ? (
          <p className="text-gray-400 italic">No conversation yet...</p>
        ) : (
          transcript.map((entry, index) => (
            <div
              key={index}
              className={`mb-2 p-2 rounded-lg ${
                entry.speaker === 'AI' ? 'bg-blue-700 text-white' : 'bg-green-700 text-white'
              }`}
            >
              <strong>{entry.speaker === 'AI' ? 'Devian AI' : userName || 'User'}:</strong> {entry.text}
            </div>
          ))
        )}
      </div>

      {/* Controls */}
      <div className="bg-gray-900 p-4 flex justify-center">
        <button
          onClick={onEndCall}
          className="bg-[#FB2C36] text-white py-2 px-6 rounded-full hover:bg-[#e0242e] focus:outline-none focus:ring-2 focus:ring-[#FB2C36]"
          disabled={callStatus === 'loading'}
        >
          {callStatus === 'loading' ? 'Connecting...' : 'End Call'}
        </button>
      </div>
    </div>
  );
};

const AiInterview = () => {
  const vapiRef = useRef(null);
  const [callStatus, setCallStatus] = useState('idle'); // idle, active, loading
  const [showCallUI, setShowCallUI] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    jobPosition: '',
    experience: '',
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [transcript, setTranscript] = useState([]);
  const [score, setScore] = useState(null);
  const [feedback, setFeedback] = useState('');

  // Vapi configuration
  const VAPI_PUBLIC_KEY = import.meta.env.VITE_VAPI_PUBLIC_KEY || 'your-vapi-public-key-here';

  useEffect(() => {
    console.log('Vite env:', import.meta.env);
    console.log('VAPI_PUBLIC_KEY:', VAPI_PUBLIC_KEY);

    if (!VAPI_PUBLIC_KEY || VAPI_PUBLIC_KEY.includes('your-vapi-public-key-here')) {
      setError('VAPI public key is missing or invalid. Please set VITE_VAPI_PUBLIC_KEY in .env.local.');
      return;
    }

    try {
      vapiRef.current = new Vapi(VAPI_PUBLIC_KEY);
      console.log('VAPI initialized:', vapiRef.current);

      vapiRef.current.on('call-start', () => {
        setCallStatus('active');
        setShowCallUI(true);
        setError(null);
        console.log('Interview started');
      });

      vapiRef.current.on('call-end', () => {
        setCallStatus('idle');
        setShowCallUI(false);
        console.log('Interview ended');
      });

      vapiRef.current.on('transcript', (data) => {
        console.log('Transcript data:', data);
        const entry = {
          speaker: data.role === 'assistant' ? 'AI' : data.speaker || 'User',
          text: data.transcript || data.text || 'No text available',
        };
        setTranscript((prev) => [...prev, entry]);
      });

      vapiRef.current.on('error', (err) => {
        setCallStatus('idle');
        setShowCallUI(false);
        setError('Vapi error: ' + err.message);
        console.error('Vapi error:', err);
      });

      vapiRef.current.on('message', (message) => {
        console.log('Message data:', message);
        if (message.type === 'assistant-response' && message.data?.score) {
          setScore(message.data.score);
          setFeedback(message.data.feedback || 'No specific feedback provided.');
        }
      });
    } catch (err) {
      setError('Failed to initialize Vapi: ' + err.message);
      console.error('Initialization error:', err);
      vapiRef.current = null;
    }

    return () => {
      if (vapiRef.current) {
        vapiRef.current.stop();
      }
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.jobPosition) {
      setError('Name and job position are required.');
      return;
    }
    setIsFormSubmitted(true);
    setError(null);
  };

  const startInterview = async () => {
    if (vapiRef.current) {
      try {
        setCallStatus('loading');
        await vapiRef.current.start({
          name: 'Devian AI',
          model: {
            provider: 'openai',
            model: 'gpt-4o', // Updated to gpt-4o for better reliability
            systemPrompt: `
              You are Devian AI, an AI interviewer conducting a mock interview for a ${formData.jobPosition} candidate named ${formData.name}. Your role is to:
              1. Greet the candidate warmly using their name and explain the interview process (10 questions).
              2. Ask 10 questions relevant to the job position, one at a time, waiting for the candidate’s response before proceeding. Mix behavioral and technical questions based on the job role.
              3. If no response is detected within 10 seconds, repeat the question or prompt: "Could you please share your answer?"
              4. Evaluate each response for clarity, relevance, and technical accuracy, assigning a score of 0 or 1 per question (1 for satisfactory, 0 for unsatisfactory).
              5. After 10 questions, provide the total score out of 10 and specific feedback on areas for improvement (e.g., technical depth, communication skills).
              6. Maintain a professional, encouraging tone and pause appropriately for responses.
              Example questions for a Software Engineer:
              - Behavioral: "Tell me about a time you resolved a challenging bug."
              - Technical: "Explain how a REST API works."
              Use the candidate’s name and job position dynamically. If additional info (e.g., years of experience: ${formData.experience || 'Not provided'}) is provided, tailor questions to their experience level.
              After 10 questions, return the score and feedback in a structured JSON format: { "score": X, "feedback": "Specific feedback here" }.
              If the candidate is silent, prompt them politely to respond.
            `,
          },
          voice: {
            provider: 'playht',
            voiceId: 'jennifer',
          },
          transcriber: {
            provider: 'deepgram',
            model: 'nova-2',
            language: 'en-US', // Specified en-US for accuracy
          },
          firstMessage: `Hello, ${formData.name}! I'm Devian AI, your interviewer for the ${formData.jobPosition} position. We'll go through 10 questions to simulate a mock interview. Please answer at your own pace, and I'll provide feedback at the end. Ready? Here's the first question...`,
        });
      } catch (err) {
        setCallStatus('idle');
        setShowCallUI(false);
        setError('Failed to start interview: ' + err.message);
        console.error('Start error:', err);
      }
    } else {
      setError('Vapi is not initialized. Please check VITE_VAPI_PUBLIC_KEY in .env.local.');
    }
  };

  const stopInterview = () => {
    if (vapiRef.current) {
      vapiRef.current.stop();
      setCallStatus('idle');
      setShowCallUI(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      {showCallUI ? (
        <CallUI
          userName={formData.name}
          transcript={transcript}
          onEndCall={stopInterview}
          callStatus={callStatus}
        />
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">AI Mock Interview</h2>
          <p className="text-gray-600 mb-6">
            Enter your details to start a mock interview with Devian AI.
          </p>

          {!isFormSubmitted ? (
            <form onSubmit={handleFormSubmit} className="space-y-4 text-black">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="jobPosition" className="block text-sm font-medium text-gray-700">
                  Job Position
                </label>
                <input
                  type="text"
                  id="jobPosition"
                  name="jobPosition"
                  value={formData.jobPosition}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                  Years of Experience (Optional)
                </label>
                <input
                  type="text"
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Interview Details</h3>
                <p className="text-gray-600">
                  <strong>Name:</strong> {formData.name}
                </p>
                <p className="text-gray-600">
                  <strong>Job Position:</strong> {formData.jobPosition}
                </p>
                {formData.experience && (
                  <p className="text-gray-600">
                    <strong>Experience:</strong> {formData.experience}
                  </p>
                )}
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={startInterview}
                  disabled={callStatus === 'active' || callStatus === 'loading'}
                  className={`flex-1 py-2 px-4 rounded-md text-white ${
                    callStatus === 'idle'
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-gray-400 cursor-not-allowed'
                  } focus:outline-none focus:ring-2 focus:ring-green-500`}
                >
                  {callStatus === 'loading' ? 'Starting...' : 'Start Interview'}
                </button>
                <button
                  onClick={stopInterview}
                  disabled={callStatus !== 'active'}
                  className={`flex-1 py-2 px-4 rounded-md text-white ${
                    callStatus === 'active'
                      ? 'bg-[#FB2C36] hover:bg-[#e0242e]'
                      : 'bg-gray-400 cursor-not-allowed'
                  } focus:outline-none focus:ring-2 focus:ring-[#FB2C36]`}
                >
                  Stop Interview
                </button>
              </div>

              <p className="text-gray-600">
                <strong>Status:</strong> {callStatus.charAt(0).toUpperCase() + callStatus.slice(1)}
              </p>

              {error && <p className="text-red-600">{error}</p>}

              {transcript.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-800">Conversation Transcript</h3>
                  <div className="bg-gray-50 p-4 rounded-md max-h-60 overflow-y-auto">
                    {transcript.map((entry, index) => (
                      <p key={index} className="text-gray-600">
                        <strong>{entry.speaker === 'AI' ? 'Devian AI' : formData.name}:</strong>{' '}
                        {entry.text}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {score !== null && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-800">Interview Results</h3>
                  <p className="text-gray-600">
                    <strong>Score:</strong> {score} / 10
                  </p>
                  <p className="text-gray-600">
                    <strong>Feedback:</strong> {feedback}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>  
  );
};

export default AiInterview;