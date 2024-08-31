"use client"

import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export const SearchCompany = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e:any) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/companies?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center space-x-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        id="simple-search"
        className="bg-gray-50 border border-gray-300 text-slate-800 text-sm rounded-lg p-1 pl-3"
        placeholder="Buscar locales"
        required
      />
      <button
        type="submit"
        className="p-2 text-sm font-medium text-white bg-slate-800 rounded-lg hover:bg-slate-950">
        <FaSearch />
        <span className="sr-only">Search</span>
      </button>
    </form>
  );
};
