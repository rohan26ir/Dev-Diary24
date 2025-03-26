import React, { useEffect, useState, useRef } from "react";
import Filter from "../../components/Custom/Filter";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import Loading from "../../Shared/Loading";

const DashInterViewFAQs = () => {
  const axiosPublic = useAxiosPublic();
  const [faqs, setFaqs] = useState([]);
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedMode, setSelectedMode] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const modalRef = useRef(null);

  // Fetch FAQs when component loads
  useEffect(() => {
    setLoading(true);
    axiosPublic
      .get("/interview-faqs")
      .then((res) => {
        setFaqs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching FAQs:", err);
        setLoading(false);
      });
  }, [axiosPublic]);

  const categories = [...new Set(faqs.map((faq) => faq.category))];
  const modes = [...new Set(faqs.map((faq) => faq.mode))];

  const handleEdit = (faq) => {
    setSelectedFaq(faq);
    modalRef.current.showModal();
  };

  const handleUpdate = () => {
    if (!selectedFaq) return;

    const { _id, question, answer, category, mode, visibility } = selectedFaq;
    const updatedData = { question, answer, category, mode, visibility };

    setLoading(true); // Set loading when updating

    axiosPublic
      .put(`/interview-faqs/${_id}`, updatedData)
      .then((res) => {
        // Update the state with the updated FAQ
        setFaqs((prevFaqs) => {
          return prevFaqs.map((faq) =>
            faq._id === _id ? { ...faq, question, answer, category, mode, visibility } : faq
          );
        });

        // Alternatively, you can refetch the data from the backend after update:
        // axiosPublic
        //   .get("/interview-faqs")
        //   .then((res) => setFaqs(res.data))
        //   .catch((err) => console.error("Error fetching FAQs:", err));

        // Close the modal after successful update
        modalRef.current.close();
        setSelectedFaq(null); // Clear selected FAQ after the update

        setLoading(false); // Set loading false after update

        Swal.fire({
          title: "Updated!",
          text: "FAQ has been updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
      })
      .catch((err) => {
        console.error("Error updating FAQ:", err.response || err.message);
        setLoading(false); // Set loading false after failure

        Swal.fire({
          title: "Error!",
          text: err.response ? err.response.data.message : "Failed to update FAQ.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  const handleDelete = (faqId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this FAQ.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true); // Set loading before deleting
        axiosPublic
          .delete(`/interview-faqs/${faqId}`)
          .then(() => {
            setFaqs((prevFaqs) =>
              prevFaqs.filter((faq) => faq._id !== faqId)
            );
            setLoading(false); // Set loading false after deletion

            Swal.fire({
              title: "Deleted!",
              text: "FAQ has been deleted successfully.",
              icon: "success",
              confirmButtonText: "OK",
            });
          })
          .catch((err) => {
            console.error("Error deleting FAQ:", err);
            setLoading(false); // Set loading false after failure

            Swal.fire({
              title: "Error!",
              text: "Failed to delete FAQ.",
              icon: "error",
              confirmButtonText: "OK",
            });
          });
      }
    });
  };

  const filteredFaqs = faqs.filter(
    (faq) =>
      (selectedCategory === "" || faq.category === selectedCategory) &&
      (selectedMode === "" || faq.mode === selectedMode) &&
      ((faq.question || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (faq.answer || "").toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="container mx-auto p-4 bg-black text-white min-h-screen">
      <h2 className="text-2xl font-bold mb-6 border-b-2 border-[#FB2C36] pb-2">Interview FAQs</h2>
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

      {/* Display loading spinner if the app is fetching data */}
      {loading ? (
        <Loading /> // Show loading component when fetching data
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#FB2C36]">
              <th className="p-2">SL</th>
              <th className="p-2">Question</th>
              <th className="p-2">Category</th>
              <th className="p-2">Mode</th>
              <th className="p-2">Visibility</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredFaqs.map((faq, index) => (
              <tr key={faq._id} className="border-b border-gray-700">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{faq.question}</td>
                <td className="p-2">{faq.category}</td>
                <td className="p-2">{faq.mode}</td>
                <td className="p-2">{faq.visibility}</td>
                <td className="p-2">
                  <button className="text-[#FB2C36]" onClick={() => handleEdit(faq)}>
                    Edit
                  </button>
                  <button
                    className="text-[#FB2C36] ml-2"
                    onClick={() => handleDelete(faq._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <dialog ref={modalRef} className="modal">
        <div className="modal-box bg-black text-white border border-[#FB2C36]">
          <h3 className="font-bold text-xl text-[#FB2C36] mb-4">Edit FAQ</h3>
          <input
            type="text"
            value={selectedFaq?.question || ""}
            onChange={(e) =>
              setSelectedFaq({ ...selectedFaq, question: e.target.value })
            }
            className="w-full p-2 mb-2 border border-gray-300 bg-black text-white"
          />
          <textarea
            value={selectedFaq?.answer || ""}
            onChange={(e) =>
              setSelectedFaq({ ...selectedFaq, answer: e.target.value })
            }
            className="w-full p-2 mb-2 border border-gray-300 bg-black text-white"
          ></textarea>
          <select
            value={selectedFaq?.category || ""}
            onChange={(e) =>
              setSelectedFaq({ ...selectedFaq, category: e.target.value })
            }
            className="w-full p-2 mb-2 border border-gray-300 bg-black text-white"
          >
            {categories.map((cat, index) => (
              <option key={cat || index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <select
            value={selectedFaq?.mode || ""}
            onChange={(e) =>
              setSelectedFaq({ ...selectedFaq, mode: e.target.value })
            }
            className="w-full p-2 mb-2 border border-gray-300 bg-black text-white"
          >
            {modes.map((mode, index) => (
              <option key={mode || index} value={mode}>
                {mode}
              </option>
            ))}
          </select>
          <select
            value={selectedFaq?.visibility || ""}
            onChange={(e) =>
              setSelectedFaq({ ...selectedFaq, visibility: e.target.value })
            }
            className="w-full p-2 mb-2 border border-gray-300 bg-black text-white"
          >
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
          <div className="modal-action">
            <button onClick={handleUpdate} className="px-3 py-1 bg-[#FB2C36] text-white">Update</button>
            <button onClick={() => modalRef.current.close()} className="px-3 py-1 bg-gray-600 text-white">Cancel</button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default DashInterViewFAQs;
