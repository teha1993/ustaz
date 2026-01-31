import React, { useState, useEffect, useRef } from 'react';
import { Search, Heart, PlayCircle, PauseCircle, X } from 'lucide-react';

const App = () => {
  const [currentLesson, setCurrentLesson] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Function to handle play/pause without leaving the app
  const playInApp = (lesson) => {
    if (currentLesson?.id === lesson.id) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      // Set new lesson and play
      setCurrentLesson(lesson);
      setIsPlaying(true);
      // In a real app, lesson.link would be a direct .mp3 URL
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-900 pb-32">
      {/* ... (Keep your Search and Header code here) ... */}

      {/* Lesson List */}
      <div className="px-5 space-y-4 mt-8">
        {lessons.map(lesson => (
          <div key={lesson.id} className="bg-slate-800 p-4 rounded-3xl flex items-center gap-4">
            <div onClick={() => playInApp(lesson)} className="cursor-pointer text-emerald-500">
              {currentLesson?.id === lesson.id && isPlaying ? 
                <PauseCircle size={32} /> : <PlayCircle size={32} />
              }
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-white">{lesson.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Floating In-App Player Bar */}
      {currentLesson && (
        <div className="fixed bottom-24 left-4 right-4 bg-emerald-600 p-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-bounce-in">
          <audio 
            ref={audioRef} 
            src={currentLesson.link} // Needs to be a direct .mp3 link
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            autoPlay 
          />
          <div className="flex-1 overflow-hidden">
            <p className="text-xs font-bold text-white truncate">{currentLesson.title}</p>
            <p className="text-[10px] text-emerald-100 italic">አሁን በመደመጥ ላይ...</p>
          </div>
          <button onClick={() => setIsPlaying(!isPlaying)} className="text-white">
            {isPlaying ? <PauseCircle /> : <PlayCircle />}
          </button>
          <button onClick={() => setCurrentLesson(null)} className="text-emerald-200">
            <X size={18} />
          </button>
        </div>
      )}

      {/* ... (Keep your Navigation code here) ... */}
    </div>
  );
};
