import React, { useState } from 'react';

// Assuming you're using SweetAlert for notifications
import Swal from 'sweetalert2';

const AddInterviewFAQ = () => {
    const questionTypes = [
        "HTML", "CSS", "JavaScript", "React.js", "Next.js", "Vue.js", "Angular",
        "Svelte", "Node.js", "Express.js", "NestJS", "MongoDB", "MySQL",
        "PostgreSQL", "Firebase", "REST API", "GraphQL", "Web Security",
        "TypeScript", "Data Structures & Algorithms", "System Design",
        "Design Patterns", "Performance Optimization", "DevOps", "Testing & Debugging"
    ];

    const questionModes = [
        "Beginner", "Basic", "Easy", "Medium", "Normal", "Hard", "Advanced",
        "Problem-Solving", "Complex", "Expert"
    ];

    // ✅ State for answer field
    const [answer, setAnswer] = useState("");

    // ✅ Handle answer input change
    const handleAnswerChange = (e) => {
        setAnswer(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
   
        const form = e.target;
   
        const category = form.category.value;
        const mode = form.mode.value;
        const question = form.question.value;
        const answer = form.answer.value;
   
        // Check if any required fields are missing
        if (!category || !mode || !question || !answer) {
            console.error("Missing required fields:", { category, mode, question, answer });
            alert("Please fill in all required fields.");
            return;  // Stop further execution if fields are missing
        }
   
        const faq = { category, mode, question, answer };
   
        console.log("Submitting FAQ:", faq);
   
        fetch("https://devdiary-server.vercel.app/addInterviewFAQ", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(faq)
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Server Response:", data);
                if (data.insertedId) {
                    Swal.fire({
                        title: "Success!",
                        text: "FAQ submitted successfully!",
                        icon: "success",
                        confirmButtonText: "OK"
                    });
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
                <div className='bg-white text-black p-5 rounded-lg'>
                    <div className='flex justify-center'>
                        <h2 className='text-2xl font-bold'>Interview FAQ</h2>
                    </div>

                    {/* Select Option */}
                    <div className='flex gap-4'>
                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend">Category</legend>
                            <select name="category" className="select" required>
                                <option value="" disabled selected>Pick a Question Type</option>
                                {questionTypes.map((type, index) => (
                                    <option key={index} value={type}>{type}</option>
                                ))}
                            </select>
                            <span className="fieldset-label">Select</span>
                        </fieldset>

                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend">Mode</legend>
                            <select name="mode" className="select" required>
                                <option value="" disabled selected>Pick a Mode</option>
                                {questionModes.map((mode, index) => (
                                    <option key={index} value={mode}>{mode}</option>
                                ))}
                            </select>
                            <span className="fieldset-label">Select</span>
                        </fieldset>
                    </div>

                    {/* Input Field */}
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">What is your Question?</legend>
                        <input type="text" name='question' className="input w-full" placeholder="Type here" required />
                        <p className="fieldset-label">Write a Question</p>
                    </fieldset>

                    {/* Answer of FAQ */}
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">What is your Answer?</legend>
                        <textarea 
                            name="answer"
                            className="input w-full h-32"
                            placeholder="Type here"
                            value={answer}  // ✅ Controlled input
                            onChange={handleAnswerChange}  // ✅ Updates state as user types
                            required
                        />
                        <p className="fieldset-label">Write an Answer</p>
                    </fieldset>

                    <div className='flex justify-center mt-1'>
                        <button type="submit" className='bg-[#FB2C36] hover:rotate-2 text-white font-bold py-2 px-4 rounded cursor-pointer'>
                            Submit FAQ
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddInterviewFAQ;
