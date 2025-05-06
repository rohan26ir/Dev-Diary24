import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/Provider';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AddInterviewFAQ = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const questionTypes = [
        "Interpersonal", "HTML", "CSS", "JavaScript", "React.js",
        "Next.js", "Node.js", "Express.js", "MongoDB", "MySQL",
        "Firebase", "REST API", "Error", "Web Security",
        "Performance Optimization", "DevOps", 
    ];

    const questionModes = [
        "Easy", "Medium", "Hard", "Advanced",
        "Problem-Solving", "Complex", "Expert"
    ];

    const [answer, setAnswer] = useState("");
    const [category, setCategory] = useState("");
    const [mode, setMode] = useState("");
    const [question, setQuestion] = useState("");

    const handleAnswerChange = (e) => {
        setAnswer(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleModeChange = (e) => {
        setMode(e.target.value);
    };

    const handleQuestionChange = (e) => {
        setQuestion(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const email = user?.email;
        const visibility = "Private";
        const timestamp = new Date().toISOString();

        if (!category || !mode || !question || !answer) {
            console.error("Missing required fields:", { category, mode, question, answer });
            alert("Please fill in all required fields.");
            return;
        }

        const faq = { email, visibility, mode, category, question, answer, timestamp };

        console.log("Submitting FAQ:", faq);

        axiosSecure.post("/addInterviewFAQ", faq)
            .then((data) => {
                console.log("Server Response:", data);
                if (data.data.insertedId) {
                    Swal.fire({
                        title: "Success!",
                        text: "FAQ submitted successfully!",
                        icon: "success",
                        confirmButtonText: "OK"
                    });

                    // Clear all fields after successful submission
                    setCategory("");
                    setMode("");
                    setQuestion("");
                    setAnswer("");
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: "There was an error submitting your FAQ.",
                        icon: "error",
                        confirmButtonText: "Try Again"
                    });
                }
            })
            .catch((err) => {
                console.error("Error during submission:", err);
                Swal.fire({
                    title: "Error!",
                    text: "Something went wrong. Please try again later.",
                    icon: "error",
                    confirmButtonText: "OK"
                });
            });
    };

    return (
        <div className='bg-white/10 p-5'>
            <form onSubmit={handleSubmit}>
                <div className='text-gray-200 p-5 shadow-2xl rounded-lg'>
                    <div className='flex justify-center'>
                        <h2 className='text-2xl font-bold'>Frequently Asked Question</h2>
                    </div>

                    <div className='flex flex-col md:flex-row gap-4'>
                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend text-white">Category</legend>
                            <select 
                                name="category" 
                                className="select bg-black text-white w-full" 
                                value={category}
                                onChange={handleCategoryChange}
                                required
                            >
                                <option value="" disabled selected>Pick a Question Type</option>
                                {questionTypes.map((type, index) => (
                                    <option key={index} value={type}>{type}</option>
                                ))}
                            </select>
                            <span className="fieldset-label text-white/60">Select</span>
                        </fieldset>

                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend text-white">Mode</legend>
                            <select 
                                name="mode" 
                                className="select bg-black text-white w-full" 
                                value={mode}
                                onChange={handleModeChange}
                                required
                            >
                                <option value="" disabled selected>Pick a Mode</option>
                                {questionModes.map((mode, index) => (
                                    <option key={index} value={mode}>{mode}</option>
                                ))}
                            </select>
                            <span className="fieldset-label text-white/60">Select</span>
                        </fieldset>
                    </div>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-white">What is your Question?</legend>
                        <input 
                            type="text" 
                            name='question' 
                            className="input w-full bg-black text-white" 
                            placeholder="Type here" 
                            value={question}
                            onChange={handleQuestionChange}
                            required
                        />
                        <p className="fieldset-label text-white/60">Write a Question</p>
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-white">What is your Answer?</legend>
                        <textarea
                            name="answer"
                            className="w-full h-32 p-2 bg-black text-white"
                            placeholder="Type here"
                            value={answer}
                            onChange={handleAnswerChange}
                            required
                        />
                        <p className="fieldset-label">Write an Answer</p>
                    </fieldset>

                    <div className='flex justify-center mt-1'>
                        <button 
                            type="submit" 
                            className='bg-[#FB2C36] hover:rotate-2 text-white font-bold py-2 px-4 rounded cursor-pointer'
                        >
                            Submit FAQ
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddInterviewFAQ;