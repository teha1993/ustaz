import React, { useState, useEffect } from 'react';
import data from './data.json';

const App = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [viewMode, setViewMode] = useState('categories'); // categories, subcategories, lessons
  const [recentLessons, setRecentLessons] = useState([]);

  // Extract all main categories
  const mainCategories = Object.keys(data);
  
  // Extract all lessons for search functionality
  const allLessons = [];
  Object.entries(data).forEach(([categoryName, category]) => {
    Object.entries(category).forEach(([subcategoryName, subcategory]) => {
      Object.entries(subcategory).forEach(([lessonName, lessonId]) => {
        allLessons.push({
          name: lessonName,
          id: lessonId,
          category: categoryName,
          subcategory: subcategoryName
        });
      });
    });
  });

  // Initialize Telegram Web App
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
      window.Telegram.WebApp.setHeaderColor('#047857'); // Emerald color
    }
    
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('ustaz_favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    
    // Load recent lessons
    const savedRecent = localStorage.getItem('ustaz_recent');
    if (savedRecent) {
      setRecentLessons(JSON.parse(savedRecent));
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('ustaz_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Save recent lessons
  const addToRecent = (lesson) => {
    const newRecent = [lesson, ...recentLessons.filter(l => l.id !== lesson.id)].slice(0, 10);
    setRecentLessons(newRecent);
    localStorage.setItem('ustaz_recent', JSON.stringify(newRecent));
  };

  // Filter lessons based on search
  const filteredLessons = allLessons.filter(lesson => 
    lesson.name.toLowerCase().includes(search.toLowerCase()) ||
    lesson.category.toLowerCase().includes(search.toLowerCase()) ||
    lesson.subcategory.toLowerCase().includes(search.toLowerCase())
  );

  // Get subcategories for selected category
  const getSubcategories = () => {
    if (!selectedCategory) return [];
    return Object.keys(data[selectedCategory] || {});
  };

  // Get lessons for selected subcategory
  const getLessons = () => {
    if (!selectedCategory || !selectedSubcategory) return [];
    const subcatData = data[selectedCategory]?.[selectedSubcategory];
    if (!subcatData) return [];
    return Object.entries(subcatData);
  };

  // Toggle favorite
  const toggleFavorite = (lessonId, e) => {
    e?.stopPropagation();
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

  // Open lesson
  const openLesson = (lessonName, lessonId) => {
    window.open(getTelegramLink(lessonId), '_blank');
    addToRecent({ name: lessonName, id: lessonId });
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
    return name.replace('.mp3', '').replace('.pdf', '');
  };

  // Check if file is PDF
  const isPDF = (name) => {
    return name.toLowerCase().endsWith('.pdf');
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    const icons = {
      'የቁርኣን ትምህርት': '📖',
      'የቁርኣን ተፍሲር': '🔊',
      'የኪታብ ቂርኣት ደርስ': '📚',
      'የፊቅህ ትምህርት': '🕌',
      'የዛዱል መዓድ ፈታዋ': '⚖️',
      'የጁሙዓ ኹጥባዎች': '🕋',
      'ልዩ ወቅታዊ ትምህርት': '⭐'
    };
    return icons[category] || '📁';
  };

  // Statistics
  const totalCategories = mainCategories.length;
  const totalLessons = allLessons.length;
  const pdfCount = allLessons.filter(l => isPDF(l.name)).length;

  // Clear search
  const clearSearch = () => {
    setSearch("");
  };

  // Go to home
  const goHome = () => {
    setViewMode('categories');
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setSearch("");
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gradient-to-b from-emerald-900 to-slate-900 text-white pb-24">
      {/* Header */}
      <div className="p-6 pt-10 bg-gradient-to-r from-emerald-700 to-emerald-800 rounded-b-[40px] shadow-2xl relative">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Ustaz Ahmed Adem</h1>
          <button 
            onClick={goHome}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20"
          >
            🏠
          </button>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-emerald-200 mb-4">
          <span>{totalCategories} ምድቦች</span>
          <span>•</span>
          <span>{totalLessons} ትምህርቶች</span>
          {favorites.length > 0 && (
            <>
              <span>•</span>
              <span className="text-red-300">{favorites.length} ፈቃዶች</span>
            </>
          )}
        </div>
        
        <div className="relative">
          <div className="absolute left-3 top-3 text-emerald-200">
            🔍
          </div>
          <input 
            type="text" 
            placeholder="ትምህርት ፈልግ..." 
            className="w-full pl-10 pr-10 py-3 bg-emerald-800/60 backdrop-blur-sm rounded-2xl border border-emerald-600 placeholder-emerald-300 text-sm focus:ring-2 focus:ring-emerald-400 focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button 
              onClick={clearSearch}
              className="absolute right-3 top-3 text-emerald-300 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-5">
        {/* Recent Lessons */}
        {!search && recentLessons.length > 0 && viewMode === 'categories' && (
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3 text-emerald-300 flex items-center gap-2">
              <span>🕐</span> በቅርብ ጊዜ ያየሃቸው
            </h2>
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
              {recentLessons.slice(0, 5).map(lesson => (
                <button
                  key={lesson.id}
                  onClick={() => openLesson(lesson.name, lesson.id)}
                  className="flex-shrink-0 bg-slate-800/50 backdrop-blur-sm p-3 rounded-xl border border-slate-700 hover:border-emerald-500 transition-colors"
                >
                  <div className="text-xs font-bold truncate w-24">
                    {formatLessonName(lesson.name)}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    #{lesson.id}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {search && (
          <div className="mb-6 fade-in">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-bold text-emerald-300">
                የተገኙ ትምህርቶች ({filteredLessons.length})
              </h2>
              <button
                onClick={clearSearch}
                className="text-sm text-emerald-400 hover:text-emerald-300"
              >
                አጽዳ
              </button>
            </div>
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
                        onClick={(e) => toggleFavorite(lesson.id, e)}
                        className={`p-2 rounded-full ${favorites.includes(lesson.id) ? 'bg-red-500/20 text-red-400' : 'bg-slate-700/50 text-slate-400 hover:text-red-400'}`}
                      >
                        {favorites.includes(lesson.id) ? '❤️' : '🤍'}
                      </button>
                      <button 
                        onClick={() => openLesson(lesson.name, lesson.id)}
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
          <div className="fade-in">
            <h2 className="text-lg font-bold mb-4 text-emerald-400">ምድቦች</h2>
            <div className="grid grid-cols-2 gap-3">
              {mainCategories.map(category => {
                const subcatCount = Object.keys(data[category] || {}).length;
                const lessonCount = Object.values(data[category] || {}).reduce((sum, subcat) => 
                  sum + Object.keys(subcat).length, 0);
                
                return (
                  <button 
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setViewMode('subcategories');
                    }}
                    className="bg-gradient-to-br from-slate-800 to-slate-900 p-4 rounded-2xl border border-slate-700 hover:border-emerald-500 hover:scale-[1.02] transition-all text-left"
                  >
                    <div className="text-2xl mb-2">
                      {getCategoryIcon(category)}
                    </div>
                    <h3 className="font-bold text-sm mb-1 truncate">{category}</h3>
                    <p className="text-xs text-slate-400">
                      {subcatCount} ንዑስ ምድቦች • {lessonCount} ትምህርቶች
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Statistics */}
            <div className="mt-8 bg-slate-800/30 backdrop-blur-sm rounded-2xl p-5 border border-slate-700">
              <h3 className="font-bold mb-3 text-emerald-300">ስታቲስቲክስ</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-emerald-900/20 rounded-xl">
                  <div className="text-2xl font-bold">{totalCategories}</div>
                  <div className="text-xs text-emerald-300">ምድቦች</div>
                </div>
                <div className="text-center p-3 bg-blue-900/20 rounded-xl">
                  <div className="text-2xl font-bold">{totalLessons}</div>
                  <div className="text-xs text-blue-300">ትምህርቶች</div>
                </div>
                <div className="text-center p-3 bg-red-900/20 rounded-xl">
                  <div className="text-2xl font-bold">{favorites.length}</div>
                  <div className="text-xs text-red-300">ፈቃዶች</div>
                </div>
                <div className="text-center p-3 bg-purple-900/20 rounded-xl">
                  <div className="text-2xl font-bold">{pdfCount}</div>
                  <div className="text-xs text-purple-300">ፒዲኤፍ</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Subcategories View */}
        {!search && viewMode === 'subcategories' && selectedCategory && (
          <div className="fade-in">
            <div className="flex items-center gap-3 mb-6">
              <button 
                onClick={goBack}
                className="p-2 rounded-full bg-slate-700/50 hover:bg-slate-600/50"
              >
                ←
              </button>
              <div className="text-2xl">
                {getCategoryIcon(selectedCategory)}
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold">{selectedCategory}</h2>
                <p className="text-sm text-slate-400">ንዑስ ምድቦችን ይምረጡ</p>
              </div>
            </div>

            <div className="space-y-3">
              {getSubcategories().map(subcategory => {
                const subcatData = data[selectedCategory][subcategory];
                const lessonCount = Object.keys(subcatData).length;
                const hasPDF = Object.keys(subcatData).some(name => isPDF(name));
                
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
                      <div className="flex-1">
                        <h3 className="font-bold text-sm mb-1">{subcategory}</h3>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <span>{lessonCount} ትምህርቶች</span>
                          {hasPDF && <span className="text-blue-400">📄 ፒዲኤፍ አብሮ ይገኛል</span>}
                        </div>
                      </div>
                      <div className="text-xl">
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
          <div className="fade-in">
            <div className="flex items-center gap-3 mb-6">
              <button 
                onClick={goBack}
                className="p-2 rounded-full bg-slate-700/50 hover:bg-slate-600/50"
              >
                ←
              </button>
              <div>
                <div className="flex items-center gap-2 text-sm text-slate-400 mb-1">
                  <span className="bg-emerald-900/50 px-2 py-1 rounded-full">{selectedCategory}</span>
                  <span>→</span>
                  <span className="bg-slate-700/50 px-2 py-1 rounded-full">{selectedSubcategory}</span>
                </div>
                <h2 className="text-lg font-bold">{selectedSubcategory}</h2>
              </div>
            </div>

            <div className="space-y-3">
              {getLessons().map(([lessonName, lessonId]) => (
                <div key={lessonId} className="bg-slate-800/50 backdrop-blur-sm p-4 rounded-2xl border border-slate-700 hover:border-emerald-500 transition-colors group">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <h3 className="font-bold text-sm mb-1 flex items-center gap-2">
                        {formatLessonName(lessonName)}
                        {isPDF(lessonName) && (
                          <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">PDF</span>
                        )}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span>መለያ: {lessonId}</span>
                        <span className={`px-2 py-1 rounded-full ${isPDF(lessonName) ? 'bg-blue-500/20 text-blue-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                          {isPDF(lessonName) ? '📄 የሚነበብ' : '🔊 የሚሰማ'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={(e) => toggleFavorite(lessonId, e)}
                        className={`p-2 rounded-full ${favorites.includes(lessonId) ? 'bg-red-500/20 text-red-400' : 'bg-slate-700/50 text-slate-400 hover:text-red-400'}`}
                      >
                        {favorites.includes(lessonId) ? '❤️' : '🤍'}
                      </button>
                      <button 
                        onClick={() => openLesson(lessonName, lessonId)}
                        className={`p-3 rounded-full ${isPDF(lessonName) ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30' : 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'} transition-colors`}
                      >
                        {isPDF(lessonName) ? '📄' : '▶️'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {search && filteredLessons.length === 0 && (
          <div className="text-center py-10">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-lg font-bold text-slate-300 mb-2">ትምህርት አልተገኘም</h3>
            <p className="text-slate-400">ሌላ ቃል ይፈትሹ</p>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] bg-slate-900/90 backdrop-blur-lg rounded-full py-3 px-6 flex justify-between items-center border border-slate-700 shadow-2xl">
        <button 
          onClick={goHome}
          className={`p-2 rounded-full ${viewMode === 'categories' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white'}`}
          title="መነሻ"
        >
          🏠
        </button>
        <button 
          onClick={() => {
            const favLessons = allLessons.filter(l => favorites.includes(l.id));
            if (favLessons.length > 0) {
              setSearch(favLessons[0].name.split(' ')[0]);
            } else {
              setSearch("ፈቃድ ትምህርቶች");
            }
          }}
          className={`p-2 rounded-full relative ${favorites.length > 0 ? 'text-red-400 hover:text-red-300' : 'text-slate-400'}`}
          title="ፈቃዶች"
        >
          {favorites.length > 0 ? '❤️' : '🤍'}
          {favorites.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {favorites.length}
            </span>
          )}
        </button>
        <button 
          onClick={() => setSearch('.pdf')}
          className="p-2 rounded-full text-blue-400 hover:text-blue-300 relative"
          title="ፒዲኤፍ ፋይሎች"
        >
          📄
          {pdfCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {pdfCount}
            </span>
          )}
        </button>
        <button 
          onClick={() => {
            // Show all lessons
            setSearch('');
            setViewMode('categories');
          }}
          className="p-2 rounded-full text-emerald-400 hover:text-emerald-300"
          title="ሁሉም ትምህርቶች"
        >
          📚
        </button>
      </div>
    </div>
  );
};

export default App;
