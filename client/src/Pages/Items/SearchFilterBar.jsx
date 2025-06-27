import React from 'react'
import { Search } from 'lucide-react';

const SearchFilterBar = () => {
  return (
    <div className="max-w-full">
      <div className="bg-white shadow-md rounded-xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center w-full md:w-1/2">
          <Search className="text-orange-400 mr-2" />
          <input
            type="text"
            placeholder="Search for items..."
            className="w-full outline-none border-none bg-transparent"
          />
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <select className="border rounded-lg p-2">
            <option value="">All Categories</option>
            <option>Electronics</option>
            <option>Clothing</option>
            <option>Home & Garden</option>
          </select>
          <select className="border rounded-lg p-2">
            <option value="">Any Condition</option>
            <option>Excellent</option>
            <option>Good</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilterBar;
