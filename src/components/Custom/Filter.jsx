import React from 'react';

const Filter = ({ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, selectedMode, setSelectedMode, categories, modes }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4 w-full">
      {/* Search Field */}
      <div className="flex items-center w-full sm:w-1/2">
        <input
          type="text"
          placeholder="Search FAQs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md w-full bg-black text-white placeholder-gray-400"
        />
      </div>

      {/* Category and Mode Container */}
      <div className="flex flex-row justify-between gap-4 w-full sm:w-1/2">
        {/* Category Filter */}
        <div className="flex items-center w-1/2 sm:w-full">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md bg-black text-white w-full"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Mode Filter */}
        <div className="flex items-center w-1/2 sm:w-full">
          <select
            value={selectedMode}
            onChange={(e) => setSelectedMode(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md bg-black text-white w-full"
          >
            <option value="">All Modes</option>
            {modes.map((mode) => (
              <option key={mode} value={mode}>
                {mode}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filter;