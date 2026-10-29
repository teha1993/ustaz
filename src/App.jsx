import React, { useState, useRef } from 'react';
import { Search, Heart, PlayCircle, PauseCircle, X, BookOpen, Home, ArrowLeft } from 'lucide-react';

// Structured data mapped with your GitHub Release audio URLs
const categoriesData = {
  "የቁርኣን ትምህርት": {
    "ለመሐፈዝ የሚረዱ ነገሮች": [
      { id: 2, title: "ለመሐፈዝ የሚረዱ ነገሮች (1)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/_.1_._._.mp3" },
      { id: 3, title: "ለመሐፈዝ የሚረዱ ነገሮች (2)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/_.2_._._.mp3" },
      { id: 4, title: "ለመሐፈዝ የሚረዱ ነገሮች (3)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/_._3_._._.m4a" },
      { id: 5, title: "ለመሐፈዝ የሚረዱ ነገሮች (4)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/_.4_._._.mp3" },
      { id: 6, title: "ለመሐፈዝ የሚረዱ ነገሮች (5)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/5_._._._._._1.mp3" },
      { id: 7, title: "ለመሐፈዝ የሚረዱ ነገሮች (6)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/AUD-20170428-WA0059.mp3" },
      { id: 8, title: "ለመሐፈዝ የሚረዱ ነገሮች (7)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/7._._._._.mp3" },
      { id: 9, title: "ለመሐፈዝ የሚረዱ ነገሮች (8)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/8_._._._._.mp3" },
      { id: 10, title: "ለመሐፈዝ የሚረዱ ነገሮች (9)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/9._._._._.mp3" },
      { id: 11, title: "ለመሐፈዝ የሚረዱ ነገሮች (10)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/10_._._._._.mp3" },
      { id: 12, title: "ለመሐፈዝ የሚረዱ ነገሮች (11)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/11._._._._.mp3" },
      { id: 13, title: "ለመሐፈዝ የሚረዱ ነገሮች (12)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/12._._._._._1.mp3" },
      { id: 14, title: "ለመሐፈዝ የሚረዱ ነገሮች (13)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/13_._._._._._1.mp3" },
      { id: 15, title: "ለመሐፈዝ የሚረዱ ነገሮች (14)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/14._._._._.mp3" },
      { id: 16, title: "ለመሐፈዝ የሚረዱ ነገሮች (15)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/15_._._._._._1.mp3" },
      { id: 17, title: "ለመሐፈዝ የሚረዱ ነገሮች (16)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/17._._._._._1.mp3" },
      { id: 18, title: "ለመሐፈዝ የሚረዱ ነገሮች (17)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/18._._._._._1.mp3" },
      { id: 19, title: "ለመሐፈዝ የሚረዱ ነገሮች (18)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/19_._._._._._.mp3" },
      { id: 20, title: "ለመሐፈዝ የሚረዱ ነገሮች (19)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/20_._._._._._1.amr" },
      { id: 30, title: "ለመሐፈዝ የሚረዱ ነገሮች (20)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/30_._._._._._1.mp3" },
      { id: 31, title: "ለመሐፈዝ የሚረዱ ነገሮች (21)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/31._._._._._1.mp3" },
      { id: 32, title: "ለመሐፈዝ የሚረዱ ነገሮች (22)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/32._._._._._1.mp3" },
      { id: 33, title: "ለመሐፈዝ የሚረዱ ነገሮች (23)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/33._._._._._1.mp3" },
      { id: 34, title: "ለመሐፈዝ የሚረዱ ነገሮች (24)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/34._._._._._1.mp3" },
      { id: 35, title: "ለመሐፈዝ የሚረዱ ነገሮች (25)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/35._._._._._1.mp3" },
      { id: 36, title: "ለመሐፈዝ የሚረዱ ነገሮች (26)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/36_._._._._.mp3" },
      { id: 37, title: "ለመሐፈዝ የሚረዱ ነገሮች (27)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/37._._._._.mp3" },
      { id: 38, title: "ለመሐፈዝ የሚረዱ ነገሮች (28)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/38._._._._.mp3" },
      { id: 39, title: "ለመሐፈዝ የሚረዱ ነገሮች (29)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/39_._._._._._1.mp3" },
      { id: 40, title: "ለመሐፈዝ የሚረዱ ነገሮች (30)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/40._._._._.mp3" },
      { id: 41, title: "ለመሐፈዝ የሚረዱ ነገሮች (31)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/41_._._._._.mp3" },
      { id: 42, title: "ለመሐፈዝ የሚረዱ ነገሮች (32)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/42._._._._.mp3" },
      { id: 43, title: "ለመሐፈዝ የሚረዱ ነገሮች (33)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/43._._._._.mp3" },
      { id: 44, title: "ለመሐፈዝ የሚረዱ ነገሮች (34)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/44_._._._._.mp3" },
      { id: 45, title: "ለመሐፈዝ የሚረዱ ነገሮች (35)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/45_._._._._.mp3" },
      { id: 46, title: "ለመሐፈዝ የሚረዱ ነገሮች (36)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/46._._._._.mp3" },
      { id: 47, title: "ለመሐፈዝ የሚረዱ ነገሮች (37)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/47._._._._.mp3" },
      { id: 48, title: "ለመሐፈዝ የሚረዱ ነገሮች (38)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/48._._._._._.mp3" },
      { id: 50, title: "ለመሐፈዝ የሚረዱ ነገሮች (39)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/50._._._._._.mp3" },
      { id: 51, title: "ለመሐፈዝ የሚረዱ ነገሮች (40)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/51_._._._._.mp3" },
      { id: 52, title: "ለመሐፈዝ የሚረዱ ነገሮች (41)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/52_._._._._.mp3" },
      { id: 53, title: "ለመሐፈዝ የሚረዱ ነገሮች (42)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/53._._._._._.mp3" },
      { id: 54, title: "ለመሐፈዝ የሚረዱ ነገሮች (43)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/54_._._._._.mp3" },
      { id: 55, title: "ለመሐፈዝ የሚረዱ ነገሮች (44)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/55._._._._.mp3" },
      { id: 56, title: "ለመሐፈዝ የሚረዱ ነገሮች (45)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/56._._._._.mp3" },
      { id: 57, title: "ለመሐፈዝ የሚረዱ ነገሮች (46)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/57._._._._.mp3" }
    ]
  }
};

export default function App() {
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const audioRef = useRef(null);

  // Handle play/pause logic inside the app
  const togglePlay = (lesson) => {
    if (currentLesson?.id === lesson.id) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      setCurrentLesson(lesson);
      setIsPlaying(true);
    }
  };

  // Flatten lessons for global search
  const allLessons = Object.values(categoriesData).flatMap(subCats => 
    Object.values(subCats).flat()
  );

  const filteredLessons = searchQuery 
    ? allLessons.filter(l => l.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : null;

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-900 text-white pb-36 font-sans">
      
      {/* Header */}
      <div className="p-5 bg-emerald-800 rounded-b-3xl shadow-lg">
        <h1 className="text-xl font-bold">Ustaz Ahmed Adem</h1>
        <p className="text-xs text-emerald-200 mt-1">ኦዲዮ ላይብረሪ (In-App Player)</p>

        {/* Search Bar */}
        <div className="mt-4 relative">
          <Search className="absolute left-3 top-3 text-slate-400" size={18} />
          <input 
            type="text"
            placeholder="ትምህርት ይፈልጉ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/60 border border-emerald-600/50 rounded-2xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400"
          />
        </div>
      </div>

      <div className="p-5">
        {/* Search Results View */}
        {searchQuery ? (
          <div>
            <h2 className="text-sm font-semibold text-slate-400 mb-3">የፍለጋ ውጤቶች ({filteredLessons.length})</h2>
            <div className="space-y-3">
              {filteredLessons.map(lesson => (
                <div key={lesson.id} className="bg-slate-800 p-4 rounded-2xl flex items-center justify-between border border-slate-700">
                  <span className="text-sm font-medium">{lesson.title}</span>
                  <button onClick={() => togglePlay(lesson)} className="text-emerald-400 hover:text-emerald-300">
                    {currentLesson?.id === lesson.id && isPlaying ? <PauseCircle size={30} /> : <PlayCircle size={30} />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : selectedSubCategory ? (
          /* Subcategory Lessons View */
          <div>
            <button 
              onClick={() => setSelectedSubCategory(null)}
              className="flex items-center gap-2 text-emerald-400 text-sm mb-4 font-medium"
            >
              <ArrowLeft size={18} /> ወደ ምድቦች ተመለስ
            </button>
            <h2 className="text-lg font-bold mb-4">{selectedSubCategory}</h2>
            <div className="space-y-3">
              {categoriesData["የቁርኣን ትምህርት"][selectedSubCategory].map(lesson => (
                <div key={lesson.id} className="bg-slate-800 p-4 rounded-2xl flex items-center justify-between border border-slate-700 shadow">
                  <div className="flex-1 pr-3">
                    <span className="text-sm font-medium">{lesson.title}</span>
                  </div>
                  <button onClick={() => togglePlay(lesson)} className="text-emerald-400 hover:text-emerald-300">
                    {currentLesson?.id === lesson.id && isPlaying ? <PauseCircle size={32} /> : <PlayCircle size={32} />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Main Categories View */
          <div>
            <h2 className="text-sm font-semibold text-slate-400 mb-3">ምድቦች</h2>
            <div className="grid grid-cols-2 gap-4">
              <div 
                onClick={() => setSelectedSubCategory("ለመሐፈዝ የሚረዱ ነገሮች")}
                className="bg-slate-800 p-4 rounded-3xl border border-slate-700 cursor-pointer hover:border-emerald-500 transition-all shadow-lg flex flex-col justify-between h-32"
              >
                <BookOpen className="text-emerald-400" size={28} />
                <div>
                  <h3 className="text-sm font-bold">ለመሐፈዝ የሚረዱ ነገሮች</h3>
                  <p className="text-[11px] text-slate-400 mt-1">20 ትምህርቶች</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Spotify-Style Sticky Player Bar */}
      {currentLesson && (
        <div className="fixed bottom-4 left-4 right-4 bg-emerald-700 text-white p-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-500 z-50">
          <audio 
            ref={audioRef} 
            src={currentLesson.audioUrl} 
            autoPlay 
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
          />
          <div className="flex-1 overflow-hidden">
            <p className="text-xs font-bold truncate">{currentLesson.title}</p>
            <p className="text-[10px] text-emerald-200 italic">አሁን በመደመጥ ላይ...</p>
          </div>
          <button onClick={() => togglePlay(currentLesson)} className="text-white bg-emerald-600 p-2 rounded-full hover:bg-emerald-500">
            {isPlaying ? <PauseCircle size={26} /> : <PlayCircle size={26} />}
          </button>
          <button onClick={() => { audioRef.current.pause(); setCurrentLesson(null); setIsPlaying(false); }} className="text-emerald-200 hover:text-white p-1">
            <X size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
