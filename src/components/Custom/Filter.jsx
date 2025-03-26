import React from 'react';

const Filter = ({ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, selectedMode, setSelectedMode, categories, modes }) => {
  return (
    <div className="flex justify-center items-center mb-4 space-x-4">
      {/* Search Field */}
      <div className="flex items-center w-[50%]">
        <input
          type="text"
          placeholder="Search FAQs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md w-full bg-black text-white placeholder-gray-400"
        />
      </div>

      {/* Category Filter */}
      <div className="flex items-center">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md bg-black text-white"
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
      <div className="flex items-center">
        <select
          value={selectedMode}
          onChange={(e) => setSelectedMode(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md bg-black text-white"
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
  );
};

export default Filter;
