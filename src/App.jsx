import React, { useState } from 'react';

const App = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("newest");

  // Lessons from your links.txt
  const lessons = [
    { id: 1, title: "ለመሐፈዝ የሚረዱ ነገሮች (1)", category: "Quran", link: "https://t.me/c/3871669780/2" },
    { id: 2, title: "ለመሐፈዝ የሚረዱ ነገሮች (2)", category: "Quran", link: "https://t.me/c/3871669780/3" },
    { id: 59, title: "ቱሕፈቱል አጥፋል (1)", category: "Tajweed", link: "https://t.me/c/3871669780/59" },
    { id: 60, title: "ቱሕፈቱል አጥፋል (2)", category: "Tajweed", link: "https://t.me/c/3871669780/60" },
  ];

  // Simple SVG icons
  const SearchIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );

  const FilterIcon = () => (
    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
  );

  const PlayIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" />
    </svg>
  );

  const HeartIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );

  const ClockIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const HistoryIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const SettingsIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-900 text-white pb-24">
      {/* Header */}
      <div className="p-6 pt-10 bg-emerald-600 rounded-b-[40px] shadow-2xl">
        <h1 className="text-2xl font-bold mb-4">Ustaz Ahmed Adem</h1>
        <div className="relative">
          <div className="absolute left-3 top-3 text-emerald-200">
            <SearchIcon />
          </div>
          <input 
            type="text" 
            placeholder="ትምህርት ይፈልጉ..." 
            className="w-full pl-10 pr-4 py-3 bg-emerald-700/50 rounded-2xl border-none placeholder-emerald-200 text-sm focus:ring-2 focus:ring-white"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Categories */}
      <div className="px-5 mt-8">
        <h2 className="text-lg font-bold mb-4 text-emerald-400">ምድቦች</h2>
        <div className="flex gap-3 overflow-x-auto no-scrollbar">
          {["All", "Quran", "Tajweed"].map((cat) => (
            <button key={cat} className="px-6 py-2 bg-slate-800 rounded-full text-sm font-semibold border border-slate-700 active:bg-emerald-600">
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Lesson List */}
      <div className="px-5 mt-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold">ትምህርቶች</h2>
          <button onClick={() => setFilter(filter === "newest" ? "oldest" : "newest")} className="text-emerald-400 text-sm flex items-center gap-1">
            <FilterIcon /> {filter === "newest" ? "አዲስ" : "የቆየ"}
          </button>
        </div>

        <div className="space-y-4">
          {lessons
            .filter(l => l.title.toLowerCase().includes(search.toLowerCase()))
            .sort((a, b) => filter === "newest" ? b.id - a.id : a.id - b.id)
            .map(lesson => (
              <div key={lesson.id} className="bg-slate-800 p-4 rounded-3xl flex gap-4 items-center border border-slate-700 active:scale-95 transition-transform">
                <div 
                  className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center cursor-pointer hover:bg-emerald-400"
                  onClick={() => window.open(lesson.link, '_blank')}
                >
                  <PlayIcon />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold leading-tight">{lesson.title}</h3>
                  <span className="text-[10px] text-emerald-500 font-bold uppercase mt-1 block">#{lesson.category}</span>
                </div>
                <div className="text-slate-600 hover:text-red-500 cursor-pointer">
                  <HeartIcon />
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[85%] bg-slate-800/90 backdrop-blur-lg rounded-full py-4 px-8 flex justify-between items-center border border-slate-700 shadow-2xl">
        <ClockIcon className="text-emerald-500" />
        <HeartIcon className="text-slate-500" />
        <HistoryIcon className="text-slate-500" />
        <SettingsIcon className="text-slate-500" />
      </div>
    </div>
  );
};

export default App;