import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../Provider/Provider';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const FAQsOverview = () => {
  const axiosSecure = useAxiosSecure();
  const [faqs, setFaqs] = useState([]);
  const [faqCategories, setFaqCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  // Fetch FAQs on component mount
  useEffect(() => {
    if (!user?.email) {
      setError('User not authenticated. Please log in.');
      setLoading(false);
      return;
    }

    let isMounted = true;

    const fetchFaqs = async () => {
      try {
        setLoading(true);
        setError(null);

        const faqsResponse = await axiosSecure.get('/interview-faqs', {
          params: { email: user.email },
        });
        if (isMounted) {
          const faqsData = faqsResponse.data.filter((faq) => faq.email === user.email);
          setFaqs(faqsData);

          // Update FAQ categories
          const categories = faqsData.reduce((acc, faq) => {
            acc[faq.category] = (acc[faq.category] || 0) + 1;
            return acc;
          }, {});
          setFaqCategories(categories);
        }
      } catch (err) {
        if (isMounted) {
          if (err.response?.status === 404 || err.response?.status === 400) {
            setFaqs([]);
            setFaqCategories({});
          } else {
            const errorMessage = err.response
              ? `Server error: ${err.response.status} - ${err.response.data.message || 'Unknown error'}`
              : err.message || 'Failed to connect to the server. Please check your network or try again later.';
            setError(errorMessage);
            console.error('Error fetching FAQs:', err);
            setFaqs([]);
            setFaqCategories({});
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchFaqs();

    return () => {
      isMounted = false;
    };
  }, [axiosSecure, user]);

  // Most Active FAQ Category
  const mostActiveCategory = Object.entries(faqCategories).reduce(
    (max, [category, count]) => (count > max.count ? { category, count } : max),
    { category: 'None', count: 0 }
  );

  // Bar Chart Data for FAQ Categories
  const faqChartData = {
    labels: Object.keys(faqCategories),
    datasets: [
      {
        label: 'FAQs per Category',
        data: Object.values(faqCategories),
        backgroundColor: '#36A2EB',
        borderColor: '#36A2EB',
        borderWidth: 1,
      },
    ],
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-xl">Loading FAQs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-xl text-red-500">
          {error}
          <button
            onClick={() => window.location.reload()}
            className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="m-4 min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold mb-6">FAQ Dashboard</h1>

      {/* FAQ Overview Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Interview FAQs ({faqs.length})</h2>
          <Link
            to="/dashboard/AddInterviewFAQ"
            className="bg-[#FB2C36] text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Add FAQ
          </Link>
        </div>
        {/* FAQ Bar Chart */}
        <div className="bg-gray-800 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-medium mb-4">FAQ Category Breakdown</h3>
          <div className="max-w-2xl mx-auto">
            <Bar
              data={faqChartData}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                  y: { beginAtZero: true, title: { display: true, text: 'Number of FAQs' } },
                  x: { title: { display: true, text: 'Category' } },
                },
              }}
            />
          </div>
        </div>
        {/* Recent FAQs */}
        {faqs.length > 0 ? (
          <div className="space-y-2">
            {faqs.slice(0, 3).map((faq) => (
              <div
                key={faq._id}
                className="bg-gray-900 p-3 rounded-lg flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{faq.question}</p>
                  <p className="text-sm text-gray-400">
                    Category: {faq.category}
                  </p>
                </div>
                <Link
                  to="/dashboard/DashInterViewFAQs"
                  className="text-blue-400 hover:text-blue-300"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No FAQs found. Start by adding an FAQ!</p>
        )}
        {faqs.length > 3 && (
          <Link
            to="/dashboard/DashInterViewFAQs"
            className="block mt-4 text-blue-400 hover:text-blue-300"
          >
            View All FAQs
          </Link>
        )}
      </div>

      {/* Analysis Section (FAQ-Specific) */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">FAQ Insights</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Most Active FAQ Category</h3>
            <p className="text-gray-300">
              The category "{mostActiveCategory.category}" has the most FAQs with{' '}
              {mostActiveCategory.count} entries.{' '}
              {mostActiveCategory.count > 0
                ? 'This indicates a strong focus in this area.'
                : 'Add some FAQs to start building your knowledge base.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQsOverview;