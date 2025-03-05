import React, { useState, useEffect } from "react";
import { FaMagic, FaChevronDown } from "react-icons/fa";

import FAQimage from "../../../assets/Interpersonal.svg"

const InterPersonal = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [faqs, setFaqs] = useState([]); // State to store fetched data

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Scroll to top when the page loads or when the component re-renders
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);  // Empty dependency array means this effect runs only once when the component mounts

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top on page load

    fetch("/interpersonal.json")
      .then((res) => {
        console.log("Response:", res);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setFaqs(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);  // Empty dependency array means this effect runs only once when the component mounts

  return (
    <div className=" bg-white text-black px-28 py-2">
      <div className="flex items-center justify-center gap-2 border-2 rounded-lg mb-2">
        <div className="flex justify-center">
          <img src={FAQimage} alt="" className="w-full h-52 object-top" />
        </div>

        <div>
          <h2 className="text-3xl font-bold text-center mb-6 flex items-center justify-center gap-2">
            <FaMagic className="text-yellow-400" /> Interpersonal Questions
          </h2>
        </div>
      </div>

      <div className="bg-gray-800 text-black p-4 rounded-xl">
        {faqs.length > 0 ? (
          faqs.map((faq, index) => (
            <div key={index} className="mb-2">
              <div
                className="flex justify-between items-center cursor-pointer py-2 px-4 bg-gray-700 rounded-lg"
                onClick={() => toggleAccordion(index)}
              >
                <span className="font-semibold text-white">{faq.question}</span>
                <FaChevronDown
                  className={`text-yellow-400 transform transition-transform ${openIndex === index ? "rotate-180" : ""}`}
                />
              </div>
              {openIndex === index && (
                <div className="p-4 bg-gray-100 mt-2 rounded-lg">
                  <pre className="whitespace-pre-wrap">{faq.answer}</pre>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">Loading questions...</p>
        )}
      </div>
    </div>
  );
};

export default InterPersonal;
