'use client';

import { Search } from 'lucide-react';
import { useState } from 'react';

export default function SearchBar() {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    // 実際には検索ページへ遷移する想定（今回は簡易的にアラート）
    alert(`「${query}」で検索するにゃ！🐾（実装予定だにゃ）`);
  };

  return (
    <form onSubmit={handleSearch} className="relative group">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="検索するにゃ...🐾"
        className="w-48 lg:w-64 pl-12 pr-6 py-2 bg-slate-50 border-2 border-slate-200 rounded-full text-sm font-bold text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white transition-all group-hover:border-slate-300"
      />
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-slate-900" />
    </form>
  );
}
