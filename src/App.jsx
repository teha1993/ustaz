import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, PlayCircle, PauseCircle, X, BookOpen, ArrowLeft, Home, 
  SkipForward, SkipBack, ChevronDown, ListMusic, RotateCcw, RotateCw,
  Heart, FolderOpen
} from 'lucide-react';

// ሙሉው የምድቦች እና የንዑስ ምድቦች መዋቅር (Data Structure)
const categoriesData = {
  // ... (Paste your ENTIRE categoriesData object here as it was in the last file)
  // I've kept it short here for readability, but you MUST keep your full data.
};

// Helper to format seconds to MM:SS
const formatTime = (time) => {
  if (isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);       
  const [selectedSubCategory, setSelectedSubCategory] = useState(null); 
  const [currentLesson, setCurrentLesson] = useState(null);             
  const [isPlaying, setIsPlaying] = useState(false);                    
  const [searchQuery, setSearchQuery] = useState("");                   
  
  const [isPlayerOpen, setIsPlayerOpen] = useState(false); 
  const [showQueue, setShowQueue] = useState(false); // For the List button
  
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const audioRef = useRef(null);

  const allLessons = Object.values(categoriesData).flatMap(subCats => 
    Object.values(subCats).flatMap(lessonsList => lessonsList)
  );

  const filteredLessons = searchQuery 
    ? allLessons.filter(l => l.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : null;

  // Get current queue (if inside a folder, show folder lessons, otherwise all)
  const currentQueue = (selectedCategory && selectedSubCategory) 
    ? categoriesData[selectedCategory][selectedSubCategory] 
    : allLessons;

  const playLesson = (lesson) => {
    if (!lesson.audioUrl) {
      alert("ይህ ትምህርት ገና ኦዲዮ አልተጫነለትም!");
      return;
    }
    if (currentLesson?.audioUrl === lesson.audioUrl) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
      setIsPlaying(!isPlaying);
    } else {
      setCurrentLesson(lesson);
      setIsPlaying(true);
      setIsPlayerOpen(true);
      setShowQueue(false); // Reset queue view
    }
  };

  const handleNext = () => {
    if (!currentLesson) return;
    const currentIndex = currentQueue.findIndex(l => l.audioUrl === currentLesson.audioUrl);
    if (currentIndex < currentQueue.length - 1) playLesson(currentQueue[currentIndex + 1]);
  };

  const handlePrevious = () => {
    if (!currentLesson) return;
    const currentIndex = currentQueue.findIndex(l => l.audioUrl === currentLesson.audioUrl);
    if (currentIndex > 0) playLesson(currentQueue[currentIndex - 1]);
  };

  const skipTime = (seconds) => {
    if (audioRef.current) audioRef.current.currentTime += seconds;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => handleNext(); 

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentLesson, currentQueue]);

  const handleSeek = (e) => {
    const time = Number(e.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  // Helper to go back to folder from player
  const goToFolder = () => {
    setIsPlayerOpen(false);
    // Navigate back to the correct folder level
    if (currentLesson && selectedCategory && selectedSubCategory) {
       // Already on the right screen, just close player
    } else {
       // Find the folder this lesson belongs to
       for (const cat in categoriesData) {
         for (const sub in categoriesData[cat]) {
           if (categoriesData[cat][sub].some(l => l.audioUrl === currentLesson.audioUrl)) {
             setSelectedCategory(cat);
             setSelectedSubCategory(sub);
             return;
           }
         }
       }
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#062c20] text-white pb-32 font-sans relative overflow-hidden">
      
      {/* Header */}
      <div className="p-5 bg-gradient-to-b from-[#084532] to-[#062c20] rounded-b-3xl shadow-lg border-b border-[#0f5c44]">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-xl font-bold tracking-wide">Ustaz Ahmed Adem</h1>
          <button 
            onClick={() => { setSelectedCategory(null); setSelectedSubCategory(null); setSearchQuery(""); }}
            className="bg-[#0f5c44] p-2 rounded-full text-emerald-300 hover:text-white transition"
          >
            <Home size={18} />
          </button>
        </div>
        <p className="text-xs text-emerald-300/80 mb-4">
          {Object.keys(categoriesData).length} ምድቦች • {allLessons.length} ትምህርቶች
        </p>

        <div className="relative">
          <Search className="absolute left-3 top-3.5 text-emerald-400/60" size={18} />
          <input 
            type="text" placeholder="ትምህርት ይፈልጉ..." value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#041f17] border border-emerald-700/50 rounded-2xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-400"
          />
        </div>
      </div>

      <div className="p-5">
        {searchQuery ? (
          <div>
            <h2 className="text-sm font-semibold text-emerald-300 mb-3">የፍለጋ ውጤቶች ({filteredLessons.length})</h2>
            <div className="space-y-3">
              {filteredLessons.length > 0 ? filteredLessons.map(lesson => (
                <div key={lesson.id} className="bg-[#0b3b2d] p-4 rounded-2xl flex items-center justify-between border border-emerald-800/60 shadow">
                  <span className="text-sm font-medium flex-1 pr-3">{lesson.title}</span>
                  <button onClick={() => playLesson(lesson)} className="text-emerald-400 hover:text-emerald-300">
                    {currentLesson?.audioUrl === lesson.audioUrl && isPlaying ? <PauseCircle size={30} /> : <PlayCircle size={30} />}
                  </button>
                </div>
              )) : <p className="text-xs text-emerald-400/70 text-center py-10">ምንም ትምህርት አልተገኘም</p>}
            </div>
          </div>
        ) : selectedSubCategory ? (
          <div>
            <button onClick={() => setSelectedSubCategory(null)} className="flex items-center gap-2 text-emerald-300 text-sm mb-4 font-medium hover:text-white">
              <ArrowLeft size={18} /> ወደ ንዑስ ምድቦች ተመለስ
            </button>
            <h2 className="text-lg font-bold mb-4 text-emerald-100">{selectedSubCategory}</h2>
            <div className="space-y-3">
              {categoriesData[selectedCategory][selectedSubCategory].length > 0 ? categoriesData[selectedCategory][selectedSubCategory].map(lesson => (
                <div key={lesson.id} className="bg-[#0b3b2d] p-4 rounded-2xl flex items-center justify-between border border-emerald-800/60 shadow">
                  <div className="flex-1 pr-3"><span className="text-sm font-medium">{lesson.title}</span></div>
                  <button onClick={() => playLesson(lesson)} className="text-emerald-400 hover:text-emerald-300">
                    {currentLesson?.audioUrl === lesson.audioUrl && isPlaying ? <PauseCircle size={32} /> : <PlayCircle size={32} />}
                  </button>
                </div>
              )) : (
                <div className="text-center py-12 bg-[#0b3b2d]/50 rounded-2xl border border-emerald-900">
                  <p className="text-sm text-emerald-300">ይህ ንዑስ ምድብ ገና ኦዲዮ አልተጫነለትም</p>
                </div>
              )}
            </div>
          </div>
        ) : selectedCategory ? (
          <div>
            <button onClick={() => setSelectedCategory(null)} className="flex items-center gap-2 text-emerald-300 text-sm mb-4 font-medium hover:text-white">
              <ArrowLeft size={18} /> ወደ ዋና ምድቦች ተመለስ
            </button>
            <div className="mb-4 bg-[#084532] p-4 rounded-2xl border border-emerald-700/50">
              <h2 className="text-base font-bold">{selectedCategory}</h2>
              <p className="text-xs text-emerald-300/70 mt-1">ንዑስ ምድቦችን ይምረጡ</p>
            </div>
            <div className="space-y-3">
              {Object.keys(categoriesData[selectedCategory]).map(subCat => {
                const count = categoriesData[selectedCategory][subCat].length;
                return (
                  <div key={subCat} onClick={() => setSelectedSubCategory(subCat)}
                    className="bg-[#0b3b2d] p-4 rounded-2xl border border-emerald-800/60 cursor-pointer hover:border-emerald-500 transition shadow flex items-center justify-between"
                  >
                    <div>
                      <h3 className="text-sm font-bold">{subCat}</h3>
                      <p className="text-[11px] text-emerald-300/70 mt-1">{count} ትምህርቶች</p>
                    </div>
                    <BookOpen className="text-emerald-400" size={20} />
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-sm font-semibold text-emerald-300/80 mb-3">ምድቦች</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(categoriesData).map(catName => {
                const subCatsCount = Object.keys(categoriesData[catName]).length;
                const totalLessonsInCat = Object.values(categoriesData[catName]).flat().length;
                return (
                  <div key={catName} onClick={() => setSelectedCategory(catName)}
                    className="bg-[#0b3b2d] p-4 rounded-3xl border border-emerald-800/60 cursor-pointer hover:border-emerald-500 transition-all shadow-lg flex flex-col justify-between h-36"
                  >
                    <BookOpen className="text-emerald-400" size={26} />
                    <div>
                      <h3 className="text-sm font-bold leading-snug">{catName}</h3>
                      <p className="text-[11px] text-emerald-300/70 mt-1">{subCatsCount} ንዑስ ምድቦች • {totalLessonsInCat} ትምህርቶች</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Mini Floating Player */}
      {currentLesson && !isPlayerOpen && (
        <div onClick={() => setIsPlayerOpen(true)} className="fixed bottom-4 left-4 right-4 bg-[#0f5c44] text-white p-3 rounded-2xl shadow-2xl flex items-center justify-between border border-emerald-500/50 z-40 cursor-pointer hover:bg-[#136d51] transition">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="bg-emerald-800 p-2 rounded-lg"><ListMusic size={20} className="text-emerald-300" /></div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold truncate">{currentLesson.title}</p>
              <p className="text-[10px] text-emerald-200">{isPlaying ? "በመደመጥ ላይ..." : "ቆሟል"}</p>
            </div>
          </div>
          <button onClick={(e) => { e.stopPropagation(); playLesson(currentLesson); }} className="text-white p-1">
            {isPlaying ? <PauseCircle size={32} /> : <PlayCircle size={32} />}
          </button>
        </div>
      )}

      {/* Full Screen Player Modal */}
      {isPlayerOpen && currentLesson && (
        <div className="fixed inset-0 bg-[#041f17]/95 backdrop-blur-md z-50 flex flex-col transition-all duration-300">
          <audio ref={audioRef} src={currentLesson.audioUrl} autoPlay onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} />

          {/* Top Bar with Minimize Button */}
          <div className="flex justify-between items-center p-6 text-emerald-300">
            <button onClick={() => setIsPlayerOpen(false)} className="p-2 bg-[#0b3b2d] rounded-full hover:bg-emerald-800 transition">
              <ChevronDown size={24} />
            </button>
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">Now Playing</span>
            <div className="w-10"></div> {/* Spacer */}
          </div>

          {/* Track Info */}
          <div className="flex-1 flex flex-col items-center justify-center px-8 text-center mt-[-40px]">
            <div className="w-48 h-48 bg-gradient-to-br from-emerald-600 to-emerald-900 rounded-3xl shadow-2xl flex items-center justify-center mb-8 relative">
               <ListMusic size={64} className="text-emerald-200/50" />
            </div>
            <h2 className="text-xl font-bold leading-tight mb-2">{currentLesson.title}</h2>
            <p className="text-sm text-emerald-400">Ustaz Ahmed Adem</p>
          </div>

          {/* Controls Area */}
          <div className="p-8 pb-12 bg-[#062c20] rounded-t-[40px] shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
            
            {/* Seek Bar */}
            <div className="mb-8">
              <input type="range" min="0" max={duration || 0} value={currentTime} onChange={handleSeek}
                className="w-full h-1 bg-[#0b3b2d] rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <div className="flex justify-between text-[10px] text-emerald-400 mt-2 font-mono">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center justify-between mb-8 px-2">
              <button onClick={handlePrevious} className="text-emerald-200 hover:text-white transition">
                <SkipBack size={32} />
              </button>
              
              <button onClick={() => skipTime(-15)} className="text-emerald-300 hover:text-white flex flex-col items-center">
                <RotateCcw size={28} />
                <span className="text-[10px] font-bold mt-1">15s</span>
              </button>

              <button onClick={() => playLesson(currentLesson)} className="bg-emerald-500 text-[#041f17] p-4 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:scale-105 transition-transform">
                {isPlaying ? <PauseCircle size={48} /> : <PlayCircle size={48} />}
              </button>

              <button onClick={() => skipTime(15)} className="text-emerald-300 hover:text-white flex flex-col items-center">
                <RotateCw size={28} />
                <span className="text-[10px] font-bold mt-1">15s</span>
              </button>

              <button onClick={handleNext} className="text-emerald-200 hover:text-white transition">
                <SkipForward size={32} />
              </button>
            </div>

            {/* Bottom Actions (Queue, Heart, Folder) */}
            <div className="flex items-center justify-between px-6 pt-4 border-t border-[#0b3b2d]">
              <button onClick={() => setShowQueue(!showQueue)} className={`flex flex-col items-center ${showQueue ? 'text-emerald-400' : 'text-emerald-600 hover:text-emerald-400'} transition`}>
                <ListMusic size={24} />
              </button>
              
              <button className="flex flex-col items-center text-emerald-600 hover:text-emerald-400 transition">
                <Heart size={24} />
              </button>

              <button onClick={goToFolder} className="flex flex-col items-center text-emerald-600 hover:text-emerald-400 transition">
                <FolderOpen size={24} />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Queue/List Drawer (Optional: opens when clicking the ListMusic icon) */}
      {showQueue && isPlayerOpen && (
        <div className="fixed inset-0 bg-[#041f17]/98 z-[60] flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-[#0b3b2d]">
                <h2 className="text-lg font-bold text-white">Playing Queue</h2>
                <button onClick={() => setShowQueue(false)} className="text-emerald-400">
                    <X size={24} />
                </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {currentQueue.map((lesson, idx) => (
                    <div 
                        key={lesson.id} 
                        onClick={() => { playLesson(lesson); setShowQueue(false); }}
                        className={`p-3 rounded-xl flex items-center gap-3 cursor-pointer ${currentLesson.audioUrl === lesson.audioUrl ? 'bg-emerald-900/50 border border-emerald-700' : 'hover:bg-[#0b3b2d]'}`}
                    >
                        <span className="text-emerald-500 text-xs font-mono w-6">{idx + 1}</span>
                        <span className={`text-sm truncate ${currentLesson.audioUrl === lesson.audioUrl ? 'text-emerald-300 font-bold' : 'text-gray-300'}`}>
                            {lesson.title}
                        </span>
                    </div>
                ))}
            </div>
        </div>
      )}
    </div>
  );
}