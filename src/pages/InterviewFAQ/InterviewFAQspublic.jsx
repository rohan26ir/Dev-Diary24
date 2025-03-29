import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Filter from "../../components/Custom/Filter";

const InterviewFAQ = () => {
  const axiosPublic = useAxiosPublic();
  const [faqs, setFaqs] = useState([]);
  const [selectedFaq, setSelectedFaq] = useState(null);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedMode, setSelectedMode] = useState("");

  useEffect(() => {
    axiosPublic
      .get("/interview-faqs")
      .then((res) => {
        const publicFaqs = res.data.filter((faq) => faq.visibility === "Public");
        setFaqs(publicFaqs);
      })
      .catch((err) => console.error("Error fetching public FAQs:", err));
  }, [axiosPublic]);

  // Group FAQs by category
  const groupedFaqs = faqs.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push(faq);
    return acc;
  }, {});

  // Filtered FAQs based on search, category, and mode
  const filteredFaqs = Object.entries(groupedFaqs).map(([category, faqList]) => ({
    category,
    faqs: faqList.filter((faq) => {
      return (
        (selectedCategory === "" || faq.category === selectedCategory) &&
        (selectedMode === "" || faq.mode === selectedMode) &&
        (faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }),
  }));

  // Categories and modes for filtering
  const categories = [...new Set(faqs.map((faq) => faq.category))];
  const modes = [...new Set(faqs.map((faq) => faq.mode))];

  // Function to open the modal with the selected FAQ
  const openModal = (faq) => {
    setSelectedFaq(faq);
    document.getElementById("faq_modal").showModal();
  };

  // Function to handle line breaks in answers
  const renderAnswerWithLineBreaks = (answer) => {
    return answer.split("\n").map((str, index) => (
      <span key={index}>
        {str}
        <br />
      </span>
    ));
  };

  return (
    <div className="container mx-auto p-4 bg-black text-white min-h-screen">
      <h2 className="text-2xl font-bold text-white mb-6 border-b-2 border-[#FB2C36] pb-2">
        Interview FAQs
      </h2>

      {/* Filter Component */}
      <Filter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedMode={selectedMode}
        setSelectedMode={setSelectedMode}
        categories={categories}
        modes={modes}
      />

      {/* Display filtered FAQs */}
      {filteredFaqs.map(
        ({ category, faqs }, categoryIndex) =>
          faqs.length > 0 && (
            <div
              key={categoryIndex}
              className="border border-[#FB2C36] p-4 mb-4 rounded-lg shadow-lg bg-black"
            >
              <h3 className="font-bold text-xl text-[#FB2C36] mb-4">{category}</h3>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={faq._id}
                    className="flex items-center p-4 border border-gray-300 rounded-md mb-2 bg-black text-white hover:bg-white/10 transition-all"
                    onClick={() => openModal(faq)}
                  >
                    {/* Serial Number */}
                    <span className="mr-4 text-[#FB2C36] font-bold">{index + 1}</span>
                    <span>{faq.question}</span>
                  </div>
                ))}
              </div>
            </div>
          )
      )}

      {/* DaisyUI Modal */}
      <dialog id="faq_modal" className="modal">
        <div className="modal-box bg-black text-white border border-[#FB2C36]">
          <h3 className="font-bold text-xl text-[#FB2C36] mb-4">
            {selectedFaq?.question}
          </h3>
          <p className="text-white mb-2">
            {selectedFaq ? renderAnswerWithLineBreaks(selectedFaq.answer) : ""}
          </p>
          <p className="text-sm text-gray-300">
            Category: <span className="text-[#FB2C36]">{selectedFaq?.category}</span> | Mode:{" "}
            <span className="text-[#FB2C36]">{selectedFaq?.mode}</span>
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Posted: {selectedFaq && new Date(selectedFaq.timestamp).toLocaleString()}
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="px-3 py-1 rounded-lg bg-[#FB2C36] text-white border-none hover:bg-white hover:text-black">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default InterviewFAQ;
