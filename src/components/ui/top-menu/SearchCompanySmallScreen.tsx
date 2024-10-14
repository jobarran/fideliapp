"use client"

import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export const SearchCompanySmallScreen = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/companies?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="block sm:hidden w-full pt-2 pb-4 bg-gray-100" style={{ backgroundColor: '#F8F8F8' }}>
      <form onSubmit={handleSearch} className="flex items-center space-x-2 w-full">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          id="simple-search-sm"
          className="bg-gray-50 border border-gray-300 text-slate-800 text-sm rounded-lg p-2 pl-4 w-full"
          placeholder="Buscar locales"
          required
        />
        <button
          type="submit"
          className="p-2 text-sm font-medium text-white bg-slate-800 rounded-lg hover:bg-slate-950"
        >
          <FaSearch />
          <span className="sr-only">Search</span>
        </button>
      </form>
    </div>
  );
};
