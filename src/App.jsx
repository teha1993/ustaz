import React, { useState, useEffect } from 'react';
import { Search, Filter, Clock, Heart, History, Settings, PlayCircle, BookOpen } from 'lucide-react';

const App = () => {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favs')) || []);
  const [history, setHistory] = useState(JSON.parse(localStorage.getItem('hist')) || []);

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem('favs', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('hist', JSON.stringify(history));
  }, [history]);

  // Lessons Data
  const lessons = [
    ...Array.from({ length: 57 }, (_, i) => ({
      id: i + 1,
      title: `ለመሐፈዝ የሚረዱ ነገሮች (${i + 1})`,
      category: "Quran",
      link: `https://t.me/c/3871669780/${i + 2}`,
      pdf: null
    })),
    ...Array.from({ length: 16 }, (_, i) => ({
      id: i + 58,
      title: `ቱሕፈቱል አጥፋል (${i + 1})`,
      category: "Tajweed",
      link: `https://t.me/c/3871669780/${i + 59}`,
      pdf: "https://example.com/tuhfat-al-atfal.pdf" // Example PDF link
    }))
  ];

  const handlePlay = (lesson) => {
    window.open(lesson.link, '_blank');
    // Add to History (keep only last 5)
    const newHistory = [lesson, ...history.filter(h => h.id !== lesson.id)].slice(0, 5);
    setHistory(newHistory);
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]);
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-900 text-white pb-24">
      {/* Search by Keyword Section */}
      <div className="p-6 pt-10 bg-emerald-600 rounded-b-[40px]">
        <h1 className="text-2xl font-bold mb-4">Ustaz Ahmed Adem</h1>
        <div className="relative">
          <Search className="absolute left-3 top-3 text-emerald-200" size={18} />
          <input 
            type="text" 
            placeholder="Search by keyword (e.g. 'ቱሕፈቱል')..." 
            className="w-full pl-10 pr-4 py-3 bg-emerald-700/50 rounded-2xl border-none text-sm"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* History Section (Last 5) */}
      {history.length > 0 && (
        <div className="px-5 mt-6">
          <h2 className="text-emerald-400 font-bold mb-3 flex items-center gap-2">
            <History size={18} /> የቅርብ ጊዜ ትምህርቶች (History)
          </h2>
          <div className="flex gap-3 overflow-x-auto no-scrollbar">
            {history.map(item => (
              <div key={item.id} onClick={() => handlePlay(item)} className="min-w-[140px] bg-slate-800 p-3 rounded-2xl border border-slate-700 text-xs">
                {item.title}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lesson Cards with PDF & Favorite logic */}
      <div className="px-5 mt-8 space-y-4">
        {lessons
          .filter(l => l.title.includes(search) || l.category.toLowerCase().includes(search.toLowerCase()))
          .map(lesson => (
          <div key={lesson.id} className="bg-slate-800 p-4 rounded-3xl flex gap-4 items-center border border-slate-700">
            <div onClick={() => handlePlay(lesson)} className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center cursor-pointer">
              <PlayCircle size={28} className="text-slate-900" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold">{lesson.title}</h3>
              <div className="flex gap-2 mt-2">
                {lesson.pdf && (
                  <button onClick={() => window.open(lesson.pdf)} className="flex items-center gap-1 text-[10px] bg-slate-700 px-2 py-1 rounded-lg text-emerald-400">
                    <BookOpen size={12} /> PDF
                  </button>
                )}
              </div>
            </div>
            <Heart 
              size={20} 
              onClick={() => toggleFavorite(lesson.id)}
              className={favorites.includes(lesson.id) ? "text-red-500 fill-red-500" : "text-slate-600"} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
