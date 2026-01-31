import React, { useState, useEffect } from 'react';
import data from './data.json';

const App = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [viewMode, setViewMode] = useState('categories'); // categories, subcategories, lessons

  // Extract all main categories
  const mainCategories = Object.keys(data);
  
  // Extract all lessons for search functionality
  const allLessons = [];
  Object.values(data).forEach(category => {
    Object.values(category).forEach(subcategory => {
      Object.entries(subcategory).forEach(([lessonName, lessonId]) => {
        allLessons.push({
          name: lessonName,
          id: lessonId,
          category: Object.keys(data).find(cat => data[cat] === category),
          subcategory: Object.keys(category).find(sub => category[sub] === subcategory)
        });
      });
    });
  });

  // Filter lessons based on search
  const filteredLessons = allLessons.filter(lesson => 
    lesson.name.toLowerCase().includes(search.toLowerCase()) ||
    lesson.category.toLowerCase().includes(search.toLowerCase()) ||
    lesson.subcategory.toLowerCase().includes(search.toLowerCase())
  );

  // Get subcategories for selected category
  const getSubcategories = () => {
    if (!selectedCategory) return [];
    return Object.keys(data[selectedCategory]);
  };

  // Get lessons for selected subcategory
  const getLessons = () => {
    if (!selectedCategory || !selectedSubcategory) return [];
    return Object.entries(data[selectedCategory][selectedSubcategory]);
  };

  // Toggle favorite
  const toggleFavorite = (lessonId) => {
    if (favorites.includes(lessonId)) {
      setFavorites(favorites.filter(id => id !== lessonId));
    } else {
      setFavorites([...favorites, lessonId]);
    }
  };

  // Generate Telegram link
  const getTelegramLink = (lessonId) => {
    return `https://t.me/c/3871669780/${lessonId}`;
  };

  // Navigation functions
  const goBack = () => {
    if (viewMode === 'lessons') {
      setViewMode('subcategories');
      setSelectedSubcategory(null);
    } else if (viewMode === 'subcategories') {
      setViewMode('categories');
      setSelectedCategory(null);
    }
  };

  // Format lesson name for display
  const formatLessonName = (name) => {
    // Remove .mp3 extension
    return name.replace('.mp3', '');
  };

  // Check if file is PDF
  const isPDF = (name) => {
    return name.toLowerCase().endsWith('.pdf');
  };

  // Statistics
  const totalCategories = mainCategories.length;
  const totalLessons = allLessons.length;
  const favoriteLessons = allLessons.filter(l => favorites.includes(l.id));

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gradient-to-b from-emerald-900 to-slate-900 text-white">
      {/* Header */}
      <div className="p-6 pt-10 bg-gradient-to-r from-emerald-700 to-emerald-800 rounded-b-[40px] shadow-2xl relative">
        {viewMode !== 'categories' && (
          <button 
            onClick={goBack}
            className="absolute left-6 top-10 bg-white/20 p-2 rounded-full hover:bg-white/30 transition"
          >
            ←
          </button>
        )}
        <h1 className="text-2xl font-bold mb-2 text-center">Ustaz Ahmed Adem</h1>
        <p className="text-emerald-200 text-sm text-center mb-4">
          {totalCategories} ምድቦች • {totalLessons} ትምህርቶች
          {favorites.length > 0 && ` • ${favorites.length} ፈቃዶች`}
        </p>
        
        <div className="relative">
          <div className="absolute left-3 top-3 text-emerald-200">
            🔍
          </div>
          <input 
            type="text" 
            placeholder="ትምህርት ይፈልጉ..." 
            className="w-full pl-10 pr-4 py-3 bg-emerald-800/60 backdrop-blur-sm rounded-2xl border border-emerald-600 placeholder-emerald-300 text-sm focus:ring-2 focus:ring-emerald-400 focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="p-5">
        {/* Search Results */}
        {search && (
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3 text-emerald-300">
              የተገኙ ትምህርቶች ({filteredLessons.length})
            </h2>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
              {filteredLessons.map(lesson => (
                <div key={lesson.id} className="bg-slate-800/50 backdrop-blur-sm p-4 rounded-2xl border border-slate-700 hover:border-emerald-500 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-bold mb-1">{formatLessonName(lesson.name)}</h3>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span className="bg-emerald-900/50 px-2 py-1 rounded-full">{lesson.category}</span>
                        <span>→</span>
                        <span className="bg-slate-700/50 px-2 py-1 rounded-full">{lesson.subcategory}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => toggleFavorite(lesson.id)}
                        className={`p-2 rounded-full ${favorites.includes(lesson.id) ? 'bg-red-500/20 text-red-400' : 'bg-slate-700/50 text-slate-400 hover:text-red-400'}`}
                      >
                        {favorites.includes(lesson.id) ? '❤️' : '🤍'}
                      </button>
                      <button 
                        onClick={() => window.open(getTelegramLink(lesson.id), '_blank')}
                        className={`p-2 rounded-full ${isPDF(lesson.name) ? 'bg-blue-500/20 text-blue-400' : 'bg-emerald-500/20 text-emerald-400'} hover:opacity-80`}
                      >
                        {isPDF(lesson.name) ? '📄' : '▶️'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Categories View */}
        {!search && viewMode === 'categories' && (
          <div>
            <h2 className="text-lg font-bold mb-4 text-emerald-400">ምድቦች</h2>
            <div className="grid grid-cols-2 gap-3">
              {mainCategories.map(category => (
                <button 
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setViewMode('subcategories');
                  }}
                  className="bg-gradient-to-br from-slate-800 to-slate-900 p-5 rounded-2xl border border-slate-700 hover:border-emerald-500 hover:scale-[1.02] transition-all text-left"
                >
                  <div className="text-2xl mb-2">
                    {category === 'የቁርኣን ትምህርት' && '📖'}
                    {category === 'የቁርኣን ተፍሲር' && '🔊'}
                    {category === 'የኪታብ ቂርኣት ደርስ' && '📚'}
                    {category === 'የፊቅህ ትምህርት' && '🕌'}
                    {category === 'የዛዱል መዓድ ፈታዋ' && '⚖️'}
                    {category === 'የጁሙዓ ኹጥባዎች' && '🕋'}
                    {category === 'ልዩ ወቅታዊ ትምህርት' && '⭐'}
                  </div>
                  <h3 className="font-bold text-sm mb-1">{category}</h3>
                  <p className="text-xs text-slate-400">
                    {Object.keys(data[category]).length} ንዑስ ምድቦች
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Subcategories View */}
        {!search && viewMode === 'subcategories' && selectedCategory && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="text-3xl">
                {selectedCategory === 'የቁርኣን ትምህርት' && '📖'}
                {selectedCategory === 'የቁርኣን ተፍሲር' && '🔊'}
                {selectedCategory === 'የኪታብ ቂርኣት ደርስ' && '📚'}
                {selectedCategory === 'የፊቅህ ትምህርት' && '🕌'}
                {selectedCategory === 'የዛዱል መዓድ ፈታዋ' && '⚖️'}
                {selectedCategory === 'የጁሙዓ ኹጥባዎች' && '🕋'}
                {selectedCategory === 'ልዩ ወቅታዊ ትምህርት' && '⭐'}
              </div>
              <div>
                <h2 className="text-lg font-bold">{selectedCategory}</h2>
                <p className="text-sm text-slate-400">ንዑስ ምድቦችን ይምረጡ</p>
              </div>
            </div>

            <div className="space-y-3">
              {getSubcategories().map(subcategory => {
                const lessonCount = Object.keys(data[selectedCategory][subcategory]).length;
                const isFirstLessonPDF = Object.keys(data[selectedCategory][subcategory])[0]?.includes('.pdf');
                
                return (
                  <button 
                    key={subcategory}
                    onClick={() => {
                      setSelectedSubcategory(subcategory);
                      setViewMode('lessons');
                    }}
                    className="w-full bg-slate-800/50 backdrop-blur-sm p-4 rounded-2xl border border-slate-700 hover:border-emerald-500 transition-colors text-left"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-sm mb-1">{subcategory}</h3>
                        <p className="text-xs text-slate-400">
                          {lessonCount} ትምህርቶች
                          {isFirstLessonPDF && ' • 📄 ፒዲኤፍ አብሮ ይገኛል'}
                        </p>
                      </div>
                      <div className="text-2xl">
                        {subcategory.includes('ሱረቱ') && '🕌'}
                        {subcategory.includes('ዐቂደተክ') && '📿'}
                        {subcategory.includes('ተጅዊድ') && '🎵'}
                        {subcategory.includes('ሐዲስ') && '📜'}
                        {!subcategory.includes('ሱረቱ') && !subcategory.includes('ዐቂደተክ') && 
                         !subcategory.includes('ተጅዊድ') && !subcategory.includes('ሐዲስ') && '📚'}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Lessons View */}
        {!search && viewMode === 'lessons' && selectedCategory && selectedSubcategory && (
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
                <span className="bg-emerald-900/50 px-2 py-1 rounded-full">{selectedCategory}</span>
                <span>→</span>
                <span className="bg-slate-700/50 px-2 py-1 rounded-full">{selectedSubcategory}</span>
              </div>
              <h2 className="text-lg font-bold">{selectedSubcategory}</h2>
              <p className="text-sm text-slate-400">
                {getLessons().length} ትምህርቶች
              </p>
            </div>

            <div className="space-y-3">
              {getLessons().map(([lessonName, lessonId]) => (
                <div key={lessonId} className="bg-slate-800/50 backdrop-blur-sm p-4 rounded-2xl border border-slate-700 hover:border-emerald-500 transition-colors">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <h3 className="font-bold text-sm mb-1">
                        {formatLessonName(lessonName)}
                        {lessonName.includes('.pdf') && (
                          <span className="ml-2 text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">PDF</span>
                        )}
                      </h3>
                      <p className="text-xs text-slate-400">
                        መለያ: {lessonId}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => toggleFavorite(lessonId)}
                        className={`p-2 rounded-full ${favorites.includes(lessonId) ? 'bg-red-500/20 text-red-400' : 'bg-slate-700/50 text-slate-400 hover:text-red-400'}`}
                      >
                        {favorites.includes(lessonId) ? '❤️' : '🤍'}
                      </button>
                      <button 
                        onClick={() => window.open(getTelegramLink(lessonId), '_blank')}
                        className={`p-3 rounded-full ${lessonName.includes('.pdf') ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30' : 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'} transition-colors`}
                      >
                        {lessonName.includes('.pdf') ? '📄' : '▶️'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Statistics */}
        {!search && viewMode === 'categories' && (
          <div className="mt-8 bg-slate-800/30 backdrop-blur-sm rounded-2xl p-5 border border-slate-700">
            <h3 className="font-bold mb-3 text-emerald-300">ስታቲስቲክስ</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{totalCategories}</div>
                <div className="text-xs text-slate-400">ምድቦች</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{totalLessons}</div>
                <div className="text-xs text-slate-400">ትምህርቶች</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{favorites.length}</div>
                <div className="text-xs text-slate-400">ፈቃዶች</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {allLessons.filter(l => l.name.includes('.pdf')).length}
                </div>
                <div className="text-xs text-slate-400">ፒዲኤፍ ፋይሎች</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] bg-slate-900/90 backdrop-blur-lg rounded-full py-3 px-6 flex justify-between items-center border border-slate-700 shadow-2xl">
        <button 
          onClick={() => {
            setViewMode('categories');
            setSelectedCategory(null);
            setSelectedSubcategory(null);
            setSearch('');
          }}
          className={`p-2 rounded-full ${viewMode === 'categories' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white'}`}
        >
          📚
        </button>
        <button 
          onClick={() => {
            // Show favorites
            setSearch('');
            // Filter favorites
            const favNames = allLessons
              .filter(l => favorites.includes(l.id))
              .map(l => l.name);
            if (favNames.length > 0) {
              setSearch(favNames[0].split(' ')[0]); // Show first favorite
            }
          }}
          className={`p-2 rounded-full ${favorites.length > 0 ? 'text-red-400' : 'text-slate-400'}`}
        >
          {favorites.length > 0 ? '❤️' : '🤍'}
          {favorites.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {favorites.length}
            </span>
          )}
        </button>
        <button 
          onClick={() => {
            // Show PDFs only
            setSearch('.pdf');
          }}
          className="p-2 rounded-full text-blue-400 hover:text-blue-300"
        >
          📄
        </button>
        <button className="p-2 rounded-full text-slate-400 hover:text-white">
          ⚙️
        </button>
      </div>
    </div>
  );
};

export default App;
