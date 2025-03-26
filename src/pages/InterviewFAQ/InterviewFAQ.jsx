import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../Provider/Provider';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const InterviewFAQ = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [faqs, setFaqs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchFaqs = async () => {
            if (!user?.email) return;

            setLoading(true);
            try {
                const params = {};
                if (searchTerm) params.search = searchTerm;
                if (sortOption) params.sort = sortOption;

                const response = await axiosSecure.get('/interview-faqs', { params });
                setFaqs(response.data);
            } catch (error) {
                console.error('Error fetching FAQs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFaqs();
    }, [user, searchTerm, sortOption]);

    const handleSearchChange = (e) => setSearchTerm(e.target.value);
    const handleSortChange = (e) => setSortOption(e.target.value);

    return (
        <div className="py-6">
            <div className="w-11/12 md:w-[70%] mx-auto px-5 py-2 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-black">Interview FAQs</h2>
                <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0 md:space-x-4">
                    <div className="flex-1">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Search by question..."
                            className="w-full p-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#FB2C36] text-black bg-white"
                        />
                    </div>
                    <div>
                        <select
                            value={sortOption}
                            onChange={handleSortChange}
                            className="w-full md:w-48 p-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#FB2C36] text-black bg-white"
                        >
                            <option value="">Sort by Date (Newest)</option>
                            <option value="highest">Highest Rating</option>
                            <option value="lowest">Lowest Rating</option>
                        </select>
                    </div>
                </div>
                {loading ? (
                    <p className="text-center text-black">Loading FAQs...</p>
                ) : faqs.length === 0 ? (
                    <p className="text-center text-black">No FAQs found.</p>
                ) : (
                    <div className="space-y-6">
                        {faqs.map((faq) => (
                            <div key={faq._id} className="border border-black rounded-md p-4">
                                <h3 className="text-lg font-semibold text-black">
                                    {faq.title} <span className="text-sm text-gray-600">({faq.subject})</span>
                                </h3>
                                <div className="mt-2 text-black" dangerouslySetInnerHTML={{ __html: faq.description }} />
                                <p className="mt-2 text-sm text-black">Rating: {faq.rating}/5</p>
                                <p className="text-sm text-gray-600">
                                    Created: {new Date(faq.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default InterviewFAQ;