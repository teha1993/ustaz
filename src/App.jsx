import React, { useState, useRef } from 'react';
import { Search, PlayCircle, PauseCircle, X, BookOpen, ArrowLeft, Mic, Home, Heart, FileText, Layers } from 'lucide-react';

// 1. THE DATA
const categoriesData = {
  "የቁርኣን ትምህርት": {
    "ለመሐፈዝ የሚረዱ ነገሮች": [
      { id: 1, title: "በቁርኣን ለመጠቀምና እሱንም ለመሐፈዝ የሚረዱ ነገሮች (1)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/01.mp3" },
      { id: 2, title: "በቁርኣን ለመጠቀምና እሱንም ለመሐፈዝ የሚረዱ ነገሮች (2)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/02.mp3" },
      { id: 3, title: "በቁርኣን ለመጠቀምና እሱንም ለመሐፈዝ የሚረዱ ነገሮች (3)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/03.m4a" },
      { id: 4, title: "በቁርኣን ለመጠቀምና እሱንም ለመሐፈዝ የሚረዱ ነገሮች (4)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/04.mp3" },
      { id: 5, title: "በቁርኣን ለመጠቀምና እሱንም ለመሐፈዝ የሚረዱ ነገሮች (5)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/05.mp3" },
      { id: 6, title: "በቁርኣን ለመጠቀምና እሱንም ለመሐፈዝ የሚረዱ ነገሮች (6)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/06.mp3" },
      { id: 7, title: "በቁርኣን ለመጠቀምና እሱንም ለመሐፈዝ የሚረዱ ነገሮች (7)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/07.mp3" },
      { id: 8, title: "በቁርኣን ለመጠቀምና እሱንም ለመሐፈዝ የሚረዱ ነገሮች (8)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/08.mp3" },
      { id: 9, title: "በቁርኣን ለመጠቀምና እሱንም ለመሐፈዝ የሚረዱ ነገሮች (9)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/09.mp3" },
      { id: 10, title: "በቁርኣን ለመጠቀምና እሱንም ለመሐፈዝ የሚረዱ ነገሮች (10)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/10.mp3" },
      { id: 11, title: "በቁርኣን ለመጠቀምና እሱንም ለመሐፈዝ የሚረዱ ነገሮች (11)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/11.mp3" },
      { id: 12, title: "በቁርኣን ለመጠቀምና እሱንም ለመሐፈዝ የሚረዱ ነገሮች (12)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/12.mp3" },
      { id: 13, title: "በቁርኣን ለመጠቀምና እሱንም ለመሐፈዝ የሚረዱ ነገሮች (13)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/13.mp3" },
      { id: 14, title: "በቁርኣን ለመጠቀምና እሱንም ለመሐፈዝ የሚረዱ ነገሮች (14)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/14.mp3" },
      { id: 15, title: "በቁርኣን ለመጠቀምና እሱንም ለመሐፈዝ የሚረዱ ነገሮች (15)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/15.mp3" },
      { id: 16, title: "በቁርኣን ለመጠቀምና እሱንም ለመሐፈዝ የሚረዱ ነገሮች (16)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/16.mp3" },
      { id: 17, title: "በቁርኣን ለመጠቀምና እሱንም ለመሐፈዝ የሚረዱ ነገሮች (17)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/17.mp3" },
      { id: 18, title: "በቁርኣን ለመጠቀምና እሱንም ለመሐፈዝ የሚረዱ ነገሮች (18)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/18.mp3" },
      { id: 19, title: "በቁርኣን ለመጠቀምና እሱንም ለመሐፈዝ የሚረዱ ነገሮች (19)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/19.mp3" },
      { id: 20, title: "በቁርኣን ለመጠቀምና እሱንም ለመሐፈዝ የሚረዱ ነገሮች (20)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/20.amr" },
      { id: 21, title: "በቁርኣን ለመጠቀምና እሱንም ለመሐፈዝ የሚረዱ ነገሮች (21)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/21.mp3" },
      { id: 22, title: "በቁርኣን ለመጠቀምና እሱንም ለመሐፈዝ የሚረዱ ነገሮች (22)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/22.mp3" },
      { id: 23, title: "በቁርኣን ለመጠቀምና እሱንም ለመሐፈዝ የሚረዱ ነገሮች (23)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/23.mp3" },
      { id: 24, title: "በቁርኣን ለመጠቀምና እሱንም ለመሐፈዝ የሚረዱ ነገሮች (24)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/24.mp3" },
      { id: 25, title: "በቁርኣን ለመጠቀምና እሱንም ለመሐፈዝ የሚረዱ ነገሮች (25)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/25.mp3" },
      { id: 26, title: "በቁርኣን ለመጠቀምና እሱንም ለመሐፈዝ የሚረዱ ነገሮች (26)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/26.mp3" },
      { id: 27, title: "በቁርኣን ለመጠቀምና እሱንም ለመሐፈዝ የሚረዱ ነገሮች (27)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/27.mp3" },
      { id: 28, title: "በቁርኣን ለመጠቀምና እሱንም ለመሐፈዝ የሚረዱ ነገሮች (28)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/28.mp3" },
      { id: 29, title: "በቁርኣን ለመጠቀምና እሱንም ለመሐፈዝ የሚረዱ ነገሮች (29)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/29.mp3" },
      { id: 30, title: "በቁርኣን ለመጠቀምና እሱንም ለመሐፈዝ የሚረዱ ነገሮች (30)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/30.mp3" },
      { id: 31, title: "በቁርኣን ለመጠቀምና እሱንም ለመሐፈዝ የሚረዱ ነገሮች (31)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/31.mp3" },
      { id: 32, title: "በቁርኣን ለመጠቀምና እሱንም ለመሐፈዝ የሚረዱ ነገሮች (32)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/32.mp3" },
      { id: 33, title: "በቁርኣን ለመጠቀምና እሱንም ለመሐፈዝ የሚረዱ ነገሮች (33)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/33.mp3" },
      { id: 34, title: "በቁርኣን ለመጠቀምና እሱንም ለመሐፈዝ የሚረዱ ነገሮች (34)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/34.mp3" },
      { id: 35, title: "በቁርኣን ለመጠቀምና እሱንም ለመሐፈዝ የሚረዱ ነገሮች (35)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/35.mp3" },
      { id: 36, title: "በቁርኣን ለመጠቀምና እሱንም ለመሐፈዝ የሚረዱ ነገሮች (36)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/36.mp3" },
      { id: 37, title: "በቁርኣን ለመጠቀምና እሱንም ለመሐፈዝ የሚረዱ ነገሮች (37)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/37.mp3" },
      { id: 38, title: "በቁርኣን ለመጠቀምና እሱንም ለመሐፈዝ የሚረዱ ነገሮች (38)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/38.mp3" },
      { id: 39, title: "በቁርኣን ለመጠቀምና እሱንም ለመሐፈዝ የሚረዱ ነገሮች (39)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/39.mp3" },
      { id: 40, title: "በቁርኣን ለመጠቀምና እሱንም ለመሐፈዝ የሚረዱ ነገሮች (40)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/40.mp3" },
      { id: 41, title: "በቁርኣን ለመጠቀምና እሱንም ለመሐፈዝ የሚረዱ ነገሮች (41)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/41.mp3" },
      { id: 42, title: "በቁርኣን ለመጠቀምና እሱንም ለመሐፈዝ የሚረዱ ነገሮች (42)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/42.mp3" },
      { id: 43, title: "በቁርኣን ለመጠቀምና እሱንም ለመሐፈዝ የሚረዱ ነገሮች (43)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/43.mp3" },
      { id: 44, title: "በቁርኣን ለመጠቀምና እሱንም ለመሐፈዝ የሚረዱ ነገሮች (44)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/44.mp3" },
      { id: 45, title: "በቁርኣን ለመጠቀምና እሱንም ለመሐፈዝ የሚረዱ ነገሮች (45)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/45.mp3" },
      { id: 46, title: "በቁርኣን ለመጠቀምና እሱንም ለመሐፈዝ የሚረዱ ነገሮች (46)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/46.mp3" },
      { id: 47, title: "በቁርኣን ለመጠቀምና እሱንም ለመሐፈዝ የሚረዱ ነገሮች (47)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/47.mp3" },
      { id: 48, title: "በቁርኣን ለመጠቀምና እሱንም ለመሐፈዝ የሚረዱ ነገሮች (48)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/48.mp3" },
      { id: 49, title: "በቁርኣን ለመጠቀምና እሱንም ለመሐፈዝ የሚረዱ ነገሮች (49)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/49.mp3" },
      { id: 50, title: "በቁርኣን ለመጠቀምና እሱንም ለመሐፈዝ የሚረዱ ነገሮች (50)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/50.mp3" },
      { id: 51, title: "በቁርኣን ለመጠቀምና እሱንም ለመሐፈዝ የሚረዱ ነገሮች (51)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/51.mp3" },
      { id: 52, title: "በቁርኣን ለመጠቀምና እሱንም ለመሐፈዝ የሚረዱ ነገሮች (52)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/52.mp3" },
      { id: 53, title: "በቁርኣን ለመጠቀምና እሱንም ለመሐፈዝ የሚረዱ ነገሮች (53)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/53.mp3" },
      { id: 54, title: "በቁርኣን ለመጠቀምና እሱንም ለመሐፈዝ የሚረዱ ነገሮች (54)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/54.mp3" },
      { id: 55, title: "በቁርኣን ለመጠቀምና እሱንም ለመሐፈዝ የሚረዱ ነገሮች (55)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/55.mp3" },
      { id: 56, title: "በቁርኣን ለመጠቀምና እሱንም ለመሐፈዝ የሚረዱ ነገሮች (56)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/56.mp3" },
      { id: 57, title: "በቁርኣን ለመጠቀምና እሱንም ለመሐፈዝ የሚረዱ ነገሮች (57)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/audio-files/57.mp3" }
    ],
    "ቱሕፈቱል አጥፋል": [
      { id: 1, title: "የተጅዊድ ትምህርት መግቢያ (Introduction)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/tuhfatul-atfal/01.1.mp3" },
      { id: 2, title: "የተጅዊድ ትምህርት ቱሕፈቱል አጥፋል 1", audioUrl: "https://github.com/teha1993/ustaz/releases/download/tuhfatul-atfal/01.mp3" },
      { id: 3, title: "የተጅዊድ ትምህርት ቱሕፈቱል አጥፋል 2", audioUrl: "https://github.com/teha1993/ustaz/releases/download/tuhfatul-atfal/02.mp3" },
      { id: 4, title: "የተጅዊድ ትምህርት ቱሕፈቱል አጥፋል 3", audioUrl: "https://github.com/teha1993/ustaz/releases/download/tuhfatul-atfal/03.mp3" },
      { id: 5, title: "የተጅዊድ ትምህርት ቱሕፈቱል አጥፋል 4", audioUrl: "https://github.com/teha1993/ustaz/releases/download/tuhfatul-atfal/04.mp3" },
      { id: 6, title: "የተጅዊድ ትምህርት ቱሕፈቱል አጥፋል 5", audioUrl: "https://github.com/teha1993/ustaz/releases/download/tuhfatul-atfal/05.mp3" },
      { id: 7, title: "የተጅዊድ ትምህርት ቱሕፈቱል አጥፋል 6", audioUrl: "https://github.com/teha1993/ustaz/releases/download/tuhfatul-atfal/06.mp3" },
      { id: 8, title: "የተጅዊድ ትምህርት ቱሕፈቱል አጥፋል 7", audioUrl: "https://github.com/teha1993/ustaz/releases/download/tuhfatul-atfal/07.mp3" },
      { id: 9, title: "የተጅዊድ ትምህርት ቱሕፈቱል አጥፋል 8", audioUrl: "https://github.com/teha1993/ustaz/releases/download/tuhfatul-atfal/08.mp3" },
      { id: 10, title: "የተጅዊድ ትምህርት ቱሕፈቱል አጥፋል 9", audioUrl: "https://github.com/teha1993/ustaz/releases/download/tuhfatul-atfal/09.mp3" },
      { id: 11, title: "የተጅዊድ ትምህርት ቱሕፈቱል አጥፋል 10", audioUrl: "https://github.com/teha1993/ustaz/releases/download/tuhfatul-atfal/10.mp3" },
      { id: 12, title: "የተጅዊድ ትምህርት ቱሕፈቱል አጥፋል 11", audioUrl: "https://github.com/teha1993/ustaz/releases/download/tuhfatul-atfal/11.mp3" },
      { id: 13, title: "የተጅዊድ ትምህርት ቱሕፈቱል አጥፋል 12", audioUrl: "https://github.com/teha1993/ustaz/releases/download/tuhfatul-atfal/12.mp3" },
      { id: 14, title: "የተጅዊድ ትምህርት ቱሕፈቱል አጥፋል 13", audioUrl: "https://github.com/teha1993/ustaz/releases/download/tuhfatul-atfal/13.mp3" },
      { id: 15, title: "የተጅዊድ ትምህርት ቱሕፈቱል አጥፋል 14", audioUrl: "https://github.com/teha1993/ustaz/releases/download/tuhfatul-atfal/14.mp3" }
    ]
 
    // Add your other 2 subfolders for Quran here
    "ሌላ ንዑስ ምድብ 3": [],
    "ሌላ ንዑስ ምድብ 4": [],
  },
  // The other 5 main folders from your screenshot
  "የክታብ ቁራእት ድርስ": {},
  "የፍቅህ ትምህርት": {},
  "የዛዱል መዓድ ፈታዋ": {},
  "ትሩፋት": {},
  "ልዩ ወቅታዊ ትምህርት": {}
};

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedMainCategory, setSelectedMainCategory] = useState(null); // Level 1
  const [selectedSubCategory, setSelectedSubCategory] = useState(null); // Level 2
  const [currentLesson, setCurrentLesson] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const audioRef = useRef(null);

  const togglePlay = (lesson) => {
    if (currentLesson?.id === lesson.id && currentLesson?.title === lesson.title) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
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
        <p className="text-xs text-emerald-200 mt-1">6 ምድቦች • 406 ትምህርቶች</p>

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
              {filteredLessons.map((lesson, index) => (
                <div key={`${lesson.id}-${index}`} className="bg-slate-800 p-4 rounded-2xl flex items-center justify-between border border-slate-700">
                  <span className="text-sm font-medium">{lesson.title}</span>
                  <button onClick={() => togglePlay(lesson)} className="text-emerald-400 hover:text-emerald-300">
                    {currentLesson?.id === lesson.id && currentLesson?.title === lesson.title && isPlaying ? <PauseCircle size={30} /> : <PlayCircle size={30} />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : selectedSubCategory ? (
          /* LEVEL 3: Lessons View (Audio List) */
          <div>
            <button 
              onClick={() => setSelectedSubCategory(null)}
              className="flex items-center gap-2 text-emerald-400 text-sm mb-4 font-medium"
            >
              <ArrowLeft size={18} /> ወደ ንዑስ ምድቦች ተመለስ
            </button>
            <h2 className="text-lg font-bold mb-4">{selectedSubCategory}</h2>
            <div className="space-y-3">
              {categoriesData[selectedMainCategory][selectedSubCategory].map((lesson) => (
                <div key={lesson.id} className="bg-slate-800 p-4 rounded-2xl flex items-center justify-between border border-slate-700 shadow">
                  <div className="flex-1 pr-3">
                    <span className="text-sm font-medium">{lesson.title}</span>
                  </div>
                  <button onClick={() => togglePlay(lesson)} className="text-emerald-400 hover:text-emerald-300">
                    {currentLesson?.id === lesson.id && currentLesson?.title === lesson.title && isPlaying ? <PauseCircle size={32} /> : <PlayCircle size={32} />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : selectedMainCategory ? (
          /* LEVEL 2: Subcategories View (e.g. የቁርኣን ትምህርት selected) */
          <div>
            <button 
              onClick={() => setSelectedMainCategory(null)}
              className="flex items-center gap-2 text-emerald-400 text-sm mb-4 font-medium"
            >
              <ArrowLeft size={18} /> ወደ ዋና ምድቦች ተመለስ
            </button>
            <h2 className="text-lg font-bold mb-4">{selectedMainCategory}</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(categoriesData[selectedMainCategory]).map((subCat) => (
                <div 
                  key={subCat}
                  onClick={() => setSelectedSubCategory(subCat)}
                  className="bg-slate-800 p-4 rounded-3xl border border-slate-700 cursor-pointer hover:border-emerald-500 transition-all shadow-lg flex flex-col justify-between h-32"
                >
                  <Layers className="text-emerald-400" size={28} />
                  <div>
                    <h3 className="text-sm font-bold line-clamp-2">{subCat}</h3>
                    <p className="text-[11px] text-slate-400 mt-1">
                      {categoriesData[selectedMainCategory][subCat].length} ትምህርቶች
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* LEVEL 1: Main Categories View (The Home Screen from your screenshot) */
          <div>
            <h2 className="text-sm font-semibold text-slate-400 mb-3">ምድቦች</h2>
            <div className="grid grid-cols-2 gap-4">
              
              {Object.keys(categoriesData).map((mainCat, index) => {
                // Just a visual helper to alternate icons
                const icons = [<BookOpen size={32} className="text-blue-400" />, <BookOpen size={32} className="text-red-400" />, <BookOpen size={32} className="text-yellow-400" />, <BookOpen size={32} className="text-slate-400" />, <BookOpen size={32} className="text-emerald-400" />, <BookOpen size={32} className="text-purple-400" />];
                const totalLessons = Object.values(categoriesData[mainCat]).flat().length;
                
                return (
                  <div 
                    key={mainCat}
                    onClick={() => setSelectedMainCategory(mainCat)}
                    className="bg-slate-800 p-4 rounded-3xl border border-slate-700 cursor-pointer hover:border-emerald-500 transition-all shadow-lg flex flex-col justify-between h-32"
                  >
                    {icons[index % icons.length]}
                    <div>
                      <h3 className="text-sm font-bold">{mainCat}</h3>
                      <p className="text-[11px] text-slate-400 mt-1">
                        {Object.keys(categoriesData[mainCat]).length} ንዑስ ምድቦች • {totalLessons} ትምህርቶች
                      </p>
                    </div>
                  </div>
                )
              })}

            </div>
          </div>
        )}
      </div>

      {/* Sticky Player Bar */}
      {currentLesson && (
        <div className="fixed bottom-20 left-4 right-4 bg-emerald-700 text-white p-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-500 z-50">
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

      {/* Bottom Navigation (Matching your screenshot) */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-slate-900 border-t border-slate-800 p-3 flex justify-around items-center z-40 rounded-t-3xl shadow-2xl">
        <button onClick={() => { setActiveTab('home'); setSelectedMainCategory(null); setSelectedSubCategory(null); setSearchQuery(""); }} className={`p-3 rounded-full ${activeTab === 'home' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white'}`}>
          <Home size={24} />
        </button>
        <button className="text-slate-400 hover:text-white p-3">
          <Heart size={24} />
        </button>
        <button className="text-slate-400 hover:text-white p-3 relative">
          <FileText size={24} />
          <span className="absolute top-1 right-1 bg-blue-500 text-[10px] font-bold px-1.5 py-0.5 rounded-full">10</span>
        </button>
        <button className="text-slate-400 hover:text-white p-3">
          <Layers size={24} />
        </button>
      </div>

    </div>
  );
  }
