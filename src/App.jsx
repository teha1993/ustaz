import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, PlayCircle, PauseCircle, X, BookOpen, ArrowLeft, Home, 
  SkipForward, SkipBack, ChevronDown, ListMusic, RotateCcw, RotateCw,
  Heart, FolderOpen
} from 'lucide-react';

// ሙሉው የምድቦች እና የንዑስ ምድቦች መዋቅር (Data Structure)
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
      { id: 101, title: "የተጅዊድ ትምህርት መግቢያ (Introduction)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/tuhfatul-atfal/01.1.mp3" },
      { id: 102, title: "የተጅዊድ ትምህርት ቱሕፈቱል አጥፋል 1", audioUrl: "https://github.com/teha1993/ustaz/releases/download/tuhfatul-atfal/01.mp3" },
      { id: 103, title: "የተጅዊድ ትምህርት ቱሕፈቱል አጥፋል 2", audioUrl: "https://github.com/teha1993/ustaz/releases/download/tuhfatul-atfal/02.mp3" },
      { id: 104, title: "የተጅዊድ ትምህርት ቱሕፈቱል አጥፋል 3", audioUrl: "https://github.com/teha1993/ustaz/releases/download/tuhfatul-atfal/03.mp3" },
      { id: 105, title: "የተጅዊድ ትምህርት ቱሕፈቱል አጥፋል 4", audioUrl: "https://github.com/teha1993/ustaz/releases/download/tuhfatul-atfal/04.mp3" },
      { id: 106, title: "የተጅዊድ ትምህርት ቱሕፈቱል አጥፋል 5", audioUrl: "https://github.com/teha1993/ustaz/releases/download/tuhfatul-atfal/05.mp3" },
      { id: 107, title: "የተጅዊድ ትምህርት ቱሕፈቱል አጥፋል 6", audioUrl: "https://github.com/teha1993/ustaz/releases/download/tuhfatul-atfal/06.mp3" },
      { id: 108, title: "የተጅዊድ ትምህርት ቱሕፈቱል አጥፋል 7", audioUrl: "https://github.com/teha1993/ustaz/releases/download/tuhfatul-atfal/07.mp3" },
      { id: 109, title: "የተጅዊድ ትምህርት ቱሕፈቱል አጥፋል 8", audioUrl: "https://github.com/teha1993/ustaz/releases/download/tuhfatul-atfal/08.mp3" },
      { id: 110, title: "የተጅዊድ ትምህርት ቱሕፈቱል አጥፋል 9", audioUrl: "https://github.com/teha1993/ustaz/releases/download/tuhfatul-atfal/09.mp3" },
      { id: 111, title: "የተጅዊድ ትምህርት ቱሕፈቱል አጥፋል 10", audioUrl: "https://github.com/teha1993/ustaz/releases/download/tuhfatul-atfal/10.mp3" },
      { id: 112, title: "የተጅዊድ ትምህርት ቱሕፈቱል አጥፋል 11", audioUrl: "https://github.com/teha1993/ustaz/releases/download/tuhfatul-atfal/11.mp3" },
      { id: 113, title: "የተጅዊድ ትምህርት ቱሕፈቱል አጥፋል 12", audioUrl: "https://github.com/teha1993/ustaz/releases/download/tuhfatul-atfal/12.mp3" },
      { id: 114, title: "የተጅዊድ ትምህርት ቱሕፈቱል አጥፋል 13", audioUrl: "https://github.com/teha1993/ustaz/releases/download/tuhfatul-atfal/13.mp3" },
      { id: 115, title: "የተጅዊድ ትምህርት ቱሕፈቱል አጥፋል 14", audioUrl: "https://github.com/teha1993/ustaz/releases/download/tuhfatul-atfal/14.mp3" }
    ],
    "የቁርኣን ተፍሲር": [],
    "አል ጀዘሪያ የተጅዊድ ትምህርት": [
      { id: 116, title: "የተጅዊድ ትምህርት አል ጀዘሪያ (1)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Aljzeria/1.mp3" },
      { id: 117, title: "የተጅዊድ ትምህርት አል ጀዘሪያ (2)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Aljzeria/2.mp3" },
      { id: 118, title: "የተጅዊድ ትምህርት አል ጀዘሪያ (3)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Aljzeria/3.mp3" },
      { id: 119, title: "የተጅዊድ ትምህርት አል ጀዘሪያ (4)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Aljzeria/4.mp3" },
      { id: 120, title: "የተጅዊድ ትምህርት አል ጀዘሪያ (5)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Aljzeria/5.mp3" },
      { id: 121, title: "የተጅዊድ ትምህርት አል ጀዘሪያ (6)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Aljzeria/6.mp3" },
      { id: 122, title: "የተጅዊድ ትምህርት አል ጀዘሪያ (7)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Aljzeria/7.mp3" },
      { id: 123, title: "የተጅዊድ ትምህርት አል ጀዘሪያ (8)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Aljzeria/8.mp3" },
      { id: 124, title: "የተጅዊድ ትምህርት አል ጀዘሪያ (9)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Aljzeria/9.mp3" },
      { id: 125, title: "የተጅዊድ ትምህርት አል ጀዘሪያ (10)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Aljzeria/10.mp3" },
      { id: 126, title: "የተጅዊድ ትምህርት አል ጀዘሪያ (11)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Aljzeria/11.mp3" },
      { id: 127, title: "የተጅዊድ ትምህርት አል ጀዘሪያ (12)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Aljzeria/12.mp3" },
      { id: 128, title: "የተጅዊድ ትምህርት አል ጀዘሪያ (13)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Aljzeria/13.mp3" },
      { id: 129, title: "የተጅዊድ ትምህርት አል ጀዘሪያ (14)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Aljzeria/14.mp3" },
      { id: 130, title: "የተጅዊድ ትምህርት አል ጀዘሪያ (15)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Aljzeria/15.mp3" },
      { id: 131, title: "የተጅዊድ ትምህርት አል ጀዘሪያ (16)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Aljzeria/16.mp3" },
      { id: 132, title: "የተጅዊድ ትምህርት አል ጀዘሪያ (17)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Aljzeria/17.mp3" },
      { id: 133, title: "የተጅዊድ ትምህርት አል ጀዘሪያ (18)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Aljzeria/18.mp3" },
      { id: 134, title: "የተጅዊድ ትምህርት አል ጀዘሪያ (19)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Aljzeria/19.mp3" },
      { id: 135, title: "የተጅዊድ ትምህርት አል ጀዘሪያ (20)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Aljzeria/20.mp3" },
      { id: 136, title: "የተጅዊድ ትምህርት አል ጀዘሪያ (21)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Aljzeria/21.mp3" },
      { id: 137, title: "የተጅዊድ ትምህርት አል ጀዘሪያ (22)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Aljzeria/22.mp3" },
      { id: 138, title: "የተጅዊድ ትምህርት አል ጀዘሪያ (23)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Aljzeria/23.mp3" },
      { id: 139, title: "የተጅዊድ ትምህርት አል ጀዘሪያ (24)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Aljzeria/24.mp3" },
      { id: 140, title: "የተጅዊድ ትምህርት አል ጀዘሪያ (25)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Aljzeria/25.mp3" },
      { id: 141, title: "የተጅዊድ ትምህርት አል ጀዘሪያ (26)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Aljzeria/26.mp3" },
      { id: 142, title: "የተጅዊድ ትምህርት አል ጀዘሪያ (27)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Aljzeria/27.mp3" },
      { id: 143, title: "የተጅዊድ ትምህርት አል ጀዘሪያ (28)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Aljzeria/28.mp3" },
      { id: 144, title: "የተጅዊድ ትምህርት አል ጀዘሪያ (29)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Aljzeria/29.mp3" }
    ]
  },
  "የኪታብ ቂርኣት ደርስ": {
    "40 በትዳር ህይወት ደስተኛ ለመሆን የሚያግዙ ሐዲሦች" : [
      { id: 145, title: "40 በትዳር ህይወት ደስተኛ ለመሆን የሚያግዙ ሐዲሦች (1)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/40-tedar/01.mp3" },
      { id: 146, title: "40 በትዳር ህይወት ደስተኛ ለመሆን የሚያግዙ ሐዲሦች (2)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/40-tedar/02.mp3" },
      { id: 147, title: "40 በትዳር ህይወት ደስተኛ ለመሆን የሚያግዙ ሐዲሦች (3)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/40-tedar/03.mp3" },
      { id: 148, title: "40 በትዳር ህይወት ደስተኛ ለመሆን የሚያግዙ ሐዲሦች (4)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/40-tedar/04.mp3" },
      { id: 149, title: "40 በትዳር ህይወት ደስተኛ ለመሆን የሚያግዙ ሐዲሦች (5)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/40-tedar/05.mp3" },
      { id: 150, title: "40 በትዳር ህይወት ደስተኛ ለመሆን የሚያግዙ ሐዲሦች (6)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/40-tedar/06.mp3" },
      { id: 151, title: "40 በትዳር ህይወት ደስተኛ ለመሆን የሚያግዙ ሐዲሦች (7)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/40-tedar/07.mp3" },
      { id: 152, title: "40 በትዳር ህይወት ደስተኛ ለመሆን የሚያግዙ ሐዲሦች (8)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/40-tedar/08.mp3" },
      { id: 153, title: "40 በትዳር ህይወት ደስተኛ ለመሆን የሚያግዙ ሐዲሦች (9)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/40-tedar/09.mp3" },
      { id: 154, title: "40 በትዳር ህይወት ደስተኛ ለመሆን የሚያግዙ ሐዲሦች (10)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/40-tedar/10.mp3" },
      { id: 155, title: "40 በትዳር ህይወት ደስተኛ ለመሆን የሚያግዙ ሐዲሦች (11)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/40-tedar/11.mp3" },
      { id: 156, title: "40 በትዳር ህይወት ደስተኛ ለመሆን የሚያግዙ ሐዲሦች (12)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/40-tedar/12.mp3" },
      { id: 157, title: "40 በትዳር ህይወት ደስተኛ ለመሆን የሚያግዙ ሐዲሦች (13)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/40-tedar/13.mp3" },
      { id: 158, title: "40 በትዳር ህይወት ደስተኛ ለመሆን የሚያግዙ ሐዲሦች (14)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/40-tedar/14.mp3" },
      { id: 159, title: "40 በትዳር ህይወት ደስተኛ ለመሆን የሚያግዙ ሐዲሦች (15)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/40-tedar/15.mp3" },
      { id: 160, title: "40 በትዳር ህይወት ደስተኛ ለመሆን የሚያግዙ ሐዲሦች (16)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/40-tedar/16.mp3" },
      { id: 161, title: "40 በትዳር ህይወት ደስተኛ ለመሆን የሚያግዙ ሐዲሦች (17)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/40-tedar/17.mp3" },
      { id: 162, title: "40 በትዳር ህይወት ደስተኛ ለመሆን የሚያግዙ ሐዲሦች (18)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/40-tedar/18.mp3" },
      { id: 163, title: "40 በትዳር ህይወት ደስተኛ ለመሆን የሚያግዙ ሐዲሦች (19)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/40-tedar/19.mp3" },
      { id: 164, title: "40 በትዳር ህይወት ደስተኛ ለመሆን የሚያግዙ ሐዲሦች (20)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/40-tedar/20.mp3" },
      { id: 165, title: "40 በትዳር ህይወት ደስተኛ ለመሆን የሚያግዙ ሐዲሦች (21)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/40-tedar/21.mp3" },
      { id: 166, title: "40 በትዳር ህይወት ደስተኛ ለመሆን የሚያግዙ ሐዲሦች (22)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/40-tedar/22.mp3" },
      { id: 167, title: "40 በትዳር ህይወት ደስተኛ ለመሆን የሚያግዙ ሐዲሦች (23)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/40-tedar/23.mp3" }
    ],
    "ትልልቅ ድልቦች": [
      { id: 168, title: "ትልልቅ ድልቦች (1)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/telelek-delboch/01.mp3" },
      { id: 169, title: "ትልልቅ ድልቦች (2)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/telelek-delboch/02.mp3" },
      { id: 170, title: "ትልልቅ ድልቦች (3)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/telelek-delboch/03.mp3" },
      { id: 171, title: "ትልልቅ ድልቦች (4)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/telelek-delboch/04.mp3" },
      { id: 172, title: "ትልልቅ ድልቦች (5)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/telelek-delboch/05.mp3" },
      { id: 173, title: "ትልልቅ ድልቦች (6)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/telelek-delboch/06.mp3" },
      { id: 174, title: "ትልልቅ ድልቦች (7)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/telelek-delboch/07.mp3" },
      { id: 175, title: "ትልልቅ ድልቦች (8)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/telelek-delboch/08.mp3" },
      { id: 176, title: "ትልልቅ ድልቦች (9)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/telelek-delboch/09.mp3" },
      { id: 177, title: "ትልልቅ ድልቦች (10)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/telelek-delboch/10.mp3" },
      { id: 178, title: "ትልልቅ ድልቦች (11)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/telelek-delboch/11.mp3" },
      { id: 179, title: "ትልልቅ ድልቦች (12)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/telelek-delboch/12.mp3" },
      { id: 180, title: "ትልልቅ ድልቦች (13)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/telelek-delboch/13.mp3" },
      { id: 181, title: "ትልልቅ ድልቦች (14)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/telelek-delboch/14.mp3" },
      { id: 182, title: "ትልልቅ ድልቦች (15)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/telelek-delboch/15.mp3" },
      { id: 183, title: "ትልልቅ ድልቦች (16)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/telelek-delboch/16.mp3" },
      { id: 184, title: "ትልልቅ ድልቦች (17)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/telelek-delboch/17.mp3" },
      { id: 185, title: "ትልልቅ ድልቦች (18)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/telelek-delboch/18.mp3" },
      { id: 186, title: "ትልልቅ ድልቦች (19)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/telelek-delboch/19.mp3" }
    ],
    "አል ኡስለሰላሳ": [
      { id: 187, title: "አል ኡስለሰላሳ (1)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/usul-thelata/01.mp3" },
      { id: 188, title: "አል ኡስለሰላሳ (2)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/usul-thelata/02.mp3" },
      { id: 189, title: "አል ኡስለሰላሳ (3)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/usul-thelata/03.mp3" },
      { id: 190, title: "አል ኡስለሰላሳ (4)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/usul-thelata/04.mp3" },
      { id: 191, title: "አል ኡስለሰላሳ (5)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/usul-thelata/05.mp3" },
      { id: 192, title: "አል ኡስለሰላሳ (6)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/usul-thelata/06.mp3" },
      { id: 193, title: "አል ኡስለሰላሳ (7)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/usul-thelata/07.mp3" },
      { id: 194, title: "አል ኡስለሰላሳ (8)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/usul-thelata/08.mp3" },
      { id: 195, title: "አል ኡስለሰላሳ (9)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/usul-thelata/09.mp3" },
      { id: 196, title: "አል ኡስለሰላሳ (10)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/usul-thelata/10.mp3" },
      { id: 197, title: "አል ኡስለሰላሳ (11)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/usul-thelata/11.mp3" },
      { id: 198, title: "አል ኡስለሰላሳ (12)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/usul-thelata/12.mp3" },
      { id: 199, title: "አል ኡስለሰላሳ (13)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/usul-thelata/13.mp3" },
      { id: 200, title: "አል ኡስለሰላሳ (14)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/usul-thelata/14.mp3" },
      { id: 201, title: "አል ኡስለሰላሳ (15)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/usul-thelata/15.mp3" },
      { id: 202, title: "አል ኡስለሰላሳ (16)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/usul-thelata/16.mp3" },
      { id: 203, title: "አል ኡስለሰላሳ (17)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/usul-thelata/17.mp3" },
      { id: 204, title: "አል ኡስለሰላሳ (18)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/usul-thelata/18.mp3" },
      { id: 205, title: "አል ኡስለሰላሳ (19)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/usul-thelata/19.mp3" },
      { id: 206, title: "አል ኡስለሰላሳ (20)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/usul-thelata/20.mp3" },
      { id: 207, title: "አል ኡስለሰላሳ (21)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/usul-thelata/21.mp3" },
      { id: 208, title: "አል ኡስለሰላሳ (22)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/usul-thelata/22.mp3" },
      { id: 209, title: "አል ኡስለሰላሳ (23)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/usul-thelata/23.mp3" }
    ],
    "(ኡሱል አል-ኢማን(የእምነት መሰረቶች))": [
      { id: 210, title: "ኡሱል አል-ኢማን (የእምነት መሰረቶች) (1)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Usul-eman/01.mp3" },
      { id: 211, title: "ኡሱል አል-ኢማን (የእምነት መሰረቶች) (2)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Usul-eman/02.mp3" },
      { id: 212, title: "ኡሱል አል-ኢማን (የእምነት መሰረቶች) (3)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Usul-eman/03.mp3" },
      { id: 213, title: "ኡሱል አል-ኢማን (የእምነት መሰረቶች) (4)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Usul-eman/04.mp3" },
      { id: 214, title: "ኡሱል አል-ኢማን (የእምነት መሰረቶች) (5)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Usul-eman/05.mp3" },
      { id: 215, title: "ኡሱል አል-ኢማን (የእምነት መሰረቶች) (6)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Usul-eman/06.mp3" },
      { id: 216, title: "ኡሱል አል-ኢማን (የእምነት መሰረቶች) (7)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Usul-eman/07.mp3" },
      { id: 217, title: "ኡሱል አል-ኢማን (የእምነት መሰረቶች) (8)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Usul-eman/08.mp3" },
      { id: 218, title: "ኡሱል አል-ኢማን (የእምነት መሰረቶች) (9)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Usul-eman/09.mp3" },
      { id: 219, title: "ኡሱል አል-ኢማን (የእምነት መሰረቶች) (10)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Usul-eman/10.mp3" },
      { id: 220, title: "ኡሱል አል-ኢማን (የእምነት መሰረቶች) (11)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Usul-eman/11.mp3" },
      { id: 221, title: "ኡሱል አል-ኢማን (የእምነት መሰረቶች) (12)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Usul-eman/12.mp3" },
      { id: 222, title: "ኡሱል አል-ኢማን (የእምነት መሰረቶች) (13)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Usul-eman/13.mp3" },
      { id: 223, title: "ኡሱል አል-ኢማን (የእምነት መሰረቶች) (14)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Usul-eman/14.mp3" },
      { id: 224, title: "ኡሱል አል-ኢማን (የእምነት መሰረቶች) (15)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Usul-eman/15.mp3" },
      { id: 225, title: "ኡሱል አል-ኢማን (የእምነት መሰረቶች) (16)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Usul-eman/16.mp3" },
      { id: 226, title: "ኡሱል አል-ኢማን (የእምነት መሰረቶች) (17)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Usul-eman/17.mp3" },
      { id: 227, title: "ኡሱል አል-ኢማን (የእምነት መሰረቶች) (18)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Usul-eman/18.mp3" },
      { id: 228, title: "ኡሱል አል-ኢማን (የእምነት መሰረቶች) (19)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Usul-eman/19.mp3" },
      { id: 229, title: "ኡሱል አል-ኢማን (የእምነት መሰረቶች) (20)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Usul-eman/20.mp3" },
      { id: 230, title: "ኡሱል አል-ኢማን (የእምነት መሰረቶች) (21)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Usul-eman/21.mp3" },
      { id: 231, title: "ኡሱል አል-ኢማን (የእምነት መሰረቶች) (22)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Usul-eman/22.mp3" },
      { id: 232, title: "ኡሱል አል-ኢማን (የእምነት መሰረቶች) (23)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Usul-eman/23.mp3" },
      { id: 233, title: "ኡሱል አል-ኢማን (የእምነት መሰረቶች) (24)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Usul-eman/24.mp3" },
      { id: 234, title: "ኡሱል አል-ኢማን (የእምነት መሰረቶች) (25)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Usul-eman/25.mp3" },
      { id: 235, title: "ኡሱል አል-ኢማን (የእምነት መሰረቶች) (26)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Usul-eman/26.mp3" },
      { id: 236, title: "ኡሱል አል-ኢማን (የእምነት መሰረቶች) (27)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Usul-eman/27.mp3" },
      { id: 237, title: "ኡሱል አል-ኢማን (የእምነት መሰረቶች) (28)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Usul-eman/28.mp3" },
      { id: 238, title: "ኡሱል አል-ኢማን (የእምነት መሰረቶች) (29)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Usul-eman/29.mp3" },
      { id: 239, title: "ኡሱል አል-ኢማን (የእምነት መሰረቶች) (30)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Usul-eman/30.mp3" }
    ],
    "ኹዝ ዐቂደተክ": [
      { id: 252, title: "ኹዝ ዐቂደተክ (1)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Huzakida/1.mp3" },
      { id: 253, title: "ኹዝ ዐቂደተክ (2)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Huzakida/2.mp3" },
      { id: 254, title: "ኹዝ ዐቂደተክ (3)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Huzakida/3.mp3" },
      { id: 255, title: "ኹዝ ዐቂደተክ (4)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Huzakida/4.mp3" },
      { id: 256, title: "ኹዝ ዐቂደተክ (5)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Huzakida/5.mp3" },
      { id: 257, title: "ኹዝ ዐቂደተክ (6)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Huzakida/6.mp3" },
      { id: 258, title: "ኹዝ ዐቂደተክ (7)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Huzakida/7.mp3" },
      { id: 259, title: "ኹዝ ዐቂደተክ (8)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Huzakida/8.mp3" },
      { id: 260, title: "ኹዝ ዐቂደተክ (9)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Huzakida/9.mp3" },
      { id: 261, title: "ኹዝ ዐቂደተክ (10)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Huzakida/10.mp3" }
    ],
    "ፈድሉል ኢስላም": [
      { id: 262, title: "ፈድሉል ኢስላም (1)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Fadlul-islam/01.mp3" },
      { id: 263, title: "ፈድሉል ኢስላም (2)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Fadlul-islam/02.mp3" },
      { id: 264, title: "ፈድሉል ኢስላም (3)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Fadlul-islam/03.mp3" },
      { id: 265, title: "ፈድሉል ኢስላም (4)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Fadlul-islam/04.mp3" },
      { id: 266, title: "ፈድሉል ኢስላም (5)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Fadlul-islam/05.mp3" },
      { id: 267, title: "ፈድሉል ኢስላም (6)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Fadlul-islam/06.mp3" },
      { id: 268, title: "ፈድሉል ኢስላም (7)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Fadlul-islam/07.mp3" },
      { id: 269, title: "ፈድሉል ኢስላም (8)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Fadlul-islam/08.mp3" },
      { id: 270, title: "ፈድሉል ኢስላም (9)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Fadlul-islam/09.mp3" },
      { id: 271, title: "ፈድሉል ኢስላም (10)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Fadlul-islam/10.mp3" },
      { id: 272, title: "ፈድሉል ኢስላም (11)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Fadlul-islam/11.mp3" },
      { id: 273, title: "ፈድሉል ኢስላም (12)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Fadlul-islam/12.mp3" },
      { id: 274, title: "ፈድሉል ኢስላም (13)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Fadlul-islam/13.mp3" },
      { id: 275, title: "ፈድሉል ኢስላም (14)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Fadlul-islam/14.mp3" },
      { id: 276, title: "ፈድሉል ኢስላም (15)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Fadlul-islam/15.mp3" },
      { id: 277, title: "ፈድሉል ኢስላም (16)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Fadlul-islam/16.mp3" },
      { id: 278, title: "ፈድሉል ኢስላም (17)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Fadlul-islam/17.mp3" },
      { id: 279, title: "ፈድሉል ኢስላም (18)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Fadlul-islam/18.mp3" },
      { id: 280, title: "ፈድሉል ኢስላም (19)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Fadlul-islam/19.mp3" },
      { id: 281, title: "ፈድሉል ኢስላም (20)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Fadlul-islam/20.mp3" },
      { id: 282, title: "ፈድሉል ኢስላም (21)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Fadlul-islam/21.mp3" },
      { id: 283, title: "ፈድሉል ኢስላም (22)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Fadlul-islam/22.mp3" },
      { id: 284, title: "ፈድሉል ኢስላም (23)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Fadlul-islam/23.mp3" },
      { id: 285, title: "ፈድሉል ኢስላም (24)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Fadlul-islam/24.mp3" },
      { id: 286, title: "ፈድሉል ኢስላም (25)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Fadlul-islam/25.mp3" },
      { id: 287, title: "ፈድሉል ኢስላም (26)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Fadlul-islam/26.mp3" },
      { id: 288, title: "ፈድሉል ኢስላም (27)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Fadlul-islam/27.mp3" }
    ],
    "የአህሉ ሱንናህ ዐቂዳህ": [
      { id: 240, title: "የአህሉሱንናህ ዐቂዳህ (1)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Akidha-Ahelelsunah/01.mp3" },
      { id: 241, title: "የአህሉሱንናህ ዐቂዳህ (2)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Akidha-Ahelelsunah/02.mp3" },
      { id: 242, title: "የአህሉሱንናህ ዐቂዳህ (3)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Akidha-Ahelelsunah/03.mp3" },
      { id: 243, title: "የአህሉሱንናህ ዐቂዳህ (4)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Akidha-Ahelelsunah/04.mp3" },
      { id: 244, title: "የአህሉሱንናህ ዐቂዳህ (5)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Akidha-Ahelelsunah/05.mp3" },
      { id: 245, title: "የአህሉሱንናህ ዐቂዳህ (6)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Akidha-Ahelelsunah/06.mp3" },
      { id: 246, title: "የአህሉሱንናህ ዐቂዳህ (7)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Akidha-Ahelelsunah/07.mp3" },
      { id: 247, title: "የአህሉሱንናህ ዐቂዳህ (8)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Akidha-Ahelelsunah/08.mp3" },
      { id: 248, title: "የአህሉሱንናህ ዐቂዳህ (9)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Akidha-Ahelelsunah/09.mp3" },
      { id: 249, title: "የአህሉሱንናህ ዐቂዳህ (10)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Akidha-Ahelelsunah/10.mp3" },
      { id: 250, title: "የአህሉሱንናህ ዐቂዳህ (11)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Akidha-Ahelelsunah/11.mp3" },
      { id: 251, title: "የአህሉሱንናህ ዐቂዳህ (12)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Akidha-Ahelelsunah/12.mp3" }
    ],
    "የቡሉጉል መራም ኪታብ ማብራሪያ": [
      { id: 336, title: "የቡሉጉል መራም ኪታብ ማብራሪያ (1)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Bulug-almeram/1.mp3" },
      { id: 337, title: "የቡሉጉል መራም ኪታብ ማብራሪያ (2)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Bulug-almeram/2.mp3" },
      { id: 338, title: "የቡሉጉል መራም ኪታብ ማብራሪያ (3)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Bulug-almeram/3.mp3" },
      { id: 339, title: "የቡሉጉል መራም ኪታብ ማብራሪያ (4)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Bulug-almeram/4.mp3" },
      { id: 340, title: "የቡሉጉል መራም ኪታብ ማብራሪያ (5)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Bulug-almeram/5.mp3" }
    ],
    "የቀልብ መድረቅ አደገኝነት፣ መንስኤና መፍትሄ": [
      { id: 289, title: "የቀልብ መድረቅ አደገኝነት መንስኤና መፍትሄ (1)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Kaswetul-kaleb/1.mp3" },
      { id: 290, title: "የቀልብ መድረቅ አደገኝነት መንስኤና መፍትሄ (2)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Kaswetul-kaleb/2.mp3" },
      { id: 291, title: "የቀልብ መድረቅ አደገኝነት መንስኤና መፍትሄ (3)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Kaswetul-kaleb/3.mp3" },
      { id: 292, title: "የቀልብ መድረቅ አደገኝነት መንስኤና መፍትሄ (4)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Kaswetul-kaleb/4.mp3" },
      { id: 293, title: "የቀልብ መድረቅ አደገኝነት መንስኤና መፍትሄ (5)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Kaswetul-kaleb/5.mp3" },
      { id: 294, title: "የቀልብ መድረቅ አደገኝነት መንስኤና መፍትሄ (6)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Kaswetul-kaleb/6.mp3" },
      { id: 295, title: "የቀልብ መድረቅ አደገኝነት መንስኤና መፍትሄ (7)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Kaswetul-kaleb/7.mp3" },
      { id: 296, title: "የቀልብ መድረቅ አደገኝነት መንስኤና መፍትሄ (8)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Kaswetul-kaleb/8.mp3" }
    ], 
    "የላሚየቱ ኢብኑል ወርዲ ማብራሪያ": [
      { id: 323, title: "የላሚየቱ ኢብኑል ወርዲ ማብራሪያ (1)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Lamyah-wardi/1.mp3" },
      { id: 324, title: "የላሚየቱ ኢብኑል ወርዲ ማብራሪያ (2)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Lamyah-wardi/2.mp3" },
      { id: 325, title: "የላሚየቱ ኢብኑል ወርዲ ማብራሪያ (3)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Lamyah-wardi/3.mp3" },
      { id: 326, title: "የላሚየቱ ኢብኑል ወርዲ ማብራሪያ (4)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Lamyah-wardi/4.mp3" },
      { id: 327, title: "የላሚየቱ ኢብኑል ወርዲ ማብራሪያ (5)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Lamyah-wardi/5.mp3" },
      { id: 328, title: "የላሚየቱ ኢብኑል ወርዲ ማብራሪያ (6)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Lamyah-wardi/6.mp3" },
      { id: 329, title: "የላሚየቱ ኢብኑል ወርዲ ማብራሪያ (7)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Lamyah-wardi/7.mp3" },
      { id: 330, title: "የላሚየቱ ኢብኑል ወርዲ ማብራሪያ (8)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Lamyah-wardi/8.mp3" },
      { id: 331, title: "የላሚየቱ ኢብኑል ወርዲ ማብራሪያ (9)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Lamyah-wardi/9.mp3" },
      { id: 332, title: "የላሚየቱ ኢብኑል ወርዲ ማብራሪያ (10)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Lamyah-wardi/10.mp3" },
      { id: 333, title: "የላሚየቱ ኢብኑል ወርዲ ማብራሪያ (11)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Lamyah-wardi/11.mp3" },
      { id: 334, title: "የላሚየቱ ኢብኑል ወርዲ ማብራሪያ (12)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Lamyah-wardi/12.mp3" },
      { id: 335, title: "የላሚየቱ ኢብኑል ወርዲ ማብራሪያ (13)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Lamyah-wardi/13.mp3" }
    ],  
    "ሰፊነቱ ሰላት": [
      { id: 348, title: "ሰፊነቱ ሰላት (1)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Safintu-salat/1.mp3" },
      { id: 349, title: "ሰፊነቱ ሰላት (2)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Safintu-salat/2.mp3" },
      { id: 350, title: "ሰፊነቱ ሰላት (3)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Safintu-salat/3.mp3" },
      { id: 351, title: "ሰፊነቱ ሰላት (4)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Safintu-salat/4.mp3" },
      { id: 352, title: "ሰፊነቱ ሰላት (5)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Safintu-salat/5.mp3" }
    ],
    "የሰፊነቱን ነጃት ማብራሪያ": [
      { id: 297, title: "የሰፊነቱን' ነጃት ማብራሪያ (1)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Safintu-nejat/1.mp3" },
      { id: 298, title: "የሰፊነቱን' ነጃት ማብራሪያ (2)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Safintu-nejat/2.mp3" },
      { id: 299, title: "የሰፊነቱን' ነጃት ማብራሪያ (3)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Safintu-nejat/3.mp3" },
      { id: 300, title: "የሰፊነቱን' ነጃት ማብራሪያ (4)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Safintu-nejat/4.mp3" },
      { id: 301, title: "የሰፊነቱን' ነጃት ማብራሪያ (5)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Safintu-nejat/5.mp3" },
      { id: 302, title: "የሰፊነቱን' ነጃት ማብራሪያ (6)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Safintu-nejat/6.mp3" },
      { id: 303, title: "የሰፊነቱን' ነጃት ማብራሪያ (7)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Safintu-nejat/7.mp3" },
      { id: 304, title: "የሰፊነቱን' ነጃት ማብራሪያ (8)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Safintu-nejat/8.mp3" },
      { id: 305, title: "የሰፊነቱን' ነጃት ማብራሪያ (9)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Safintu-nejat/9.mp3" },
      { id: 306, title: "የሰፊነቱን' ነጃት ማብራሪያ (10)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Safintu-nejat/10.mp3" },
      { id: 307, title: "የሰፊነቱን' ነጃት ማብራሪያ (11)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Safintu-nejat/11.mp3" },
      { id: 308, title: "የሰፊነቱን' ነጃት ማብራሪያ (12)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Safintu-nejat/12.mp3" },
      { id: 309, title: "የሰፊነቱን' ነጃት ማብራሪያ (13)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Safintu-nejat/13.mp3" },
      { id: 310, title: "የሰፊነቱን' ነጃት ማብራሪያ (14)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Safintu-nejat/14.mp3" },
      { id: 311, title: "የሰፊነቱን' ነጃት ማብራሪያ (15)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Safintu-nejat/15.mp3" },
      { id: 312, title: "የሰፊነቱን' ነጃት ማብራሪያ (16)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Safintu-nejat/16.mp3" },
      { id: 313, title: "የሰፊነቱን' ነጃት ማብራሪያ (17)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Safintu-nejat/17.mp3" },
      { id: 314, title: "የሰፊነቱን' ነጃት ማብራሪያ (18A)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Safintu-nejat/18A.mp3" },
      { id: 315, title: "የሰፊነቱን' ነጃት ማብራሪያ (18B)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Safintu-nejat/18B.mp3" },
      { id: 316, title: "የሰፊነቱን' ነጃት ማብራሪያ (19A)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Safintu-nejat/19A.mp3" },
      { id: 317, title: "የሰፊነቱን' ነጃት ማብራሪያ (19B)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Safintu-nejat/19B.mp3" },
      { id: 318, title: "የሰፊነቱን' ነጃት ማብራሪያ (20)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Safintu-nejat/20.mp3" },
      { id: 319, title: "የሰፊነቱን' ነጃት ማብራሪያ (21)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Safintu-nejat/21.mp3" },
      { id: 320, title: "የሰፊነቱን' ነጃት ማብራሪያ (22)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Safintu-nejat/22.mp3" },
      { id: 321, title: "የሰፊነቱን' ነጃት ማብራሪያ (23)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Safintu-nejat/23.mp3" },
      { id: 322, title: "የሰፊነቱን' ነጃት ማብራሪያ (24)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Safintu-nejat/24.mp3" }
    ], 
    "የልብ መስፋትና መረጋጋትን ለማግኘት የሚረዱ ነገሮች": [
      { id: 341, title: "የልብ መስፋትና መረጋጋትን ለማግኘት የሚረዱ ነገሮች (1)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Shaher-sader/1.mp3" },
      { id: 342, title: "የልብ መስፋትና መረጋጋትን ለማግኘት የሚረዱ ነገሮች (2)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Shaher-sader/2.mp3" },
      { id: 343, title: "የልብ መስፋትና መረጋጋትን ለማግኘት የሚረዱ ነገሮች (3)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Shaher-sader/3.mp3" },
      { id: 344, title: "የልብ መስፋትና መረጋጋትን ለማግኘት የሚረዱ ነገሮች (4)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Shaher-sader/4.mp3" },
      { id: 345, title: "የልብ መስፋትና መረጋጋትን ለማግኘት የሚረዱ ነገሮች (5)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Shaher-sader/5.mp3" },
      { id: 346, title: "የልብ መስፋትና መረጋጋትን ለማግኘት የሚረዱ ነገሮች (6)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Shaher-sader/6.mp3" },
      { id: 347, title: "የልብ መስፋትና መረጋጋትን ለማግኘት የሚረዱ ነገሮች (7)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Shaher-sader/7.mp3" }
    ]
  },
  "አጫጭር ምክሮች በኡስታዝ አህመድ አደም": {
    "አጫጭር ምክሮች": []
  },
  "የዛዱል መዓድ ፈታዋ": {
    "የዛዱል መዓድ ፈታዋ (1)": [],
    "የዛዱል መዓድ ፈታዋ2)": []
  },
  "የጁሙዓ ኹጥባዎች": [
    { id: 426, title: "(7)✨ ተከተሉ አዲስ ነገር አትፍጠሩ", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/7.aac" },
    { id: 396, title: "(11)✨ ዚክር ትርፋማው ንግድ", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/11.mp3" },
    { id: 397, title: "(12) የሂጅራ አቆጣጠር አስፈላጊነትና ጠቀሜታዎች", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/12.mp3" },
    { id: 398, title: "(13)✨ ደስተኛ ህይወት", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/13.mp3" },
    { id: 399, title: "(14)✨ ልጆቻችን ወዴት እየሄዱ ነው?!", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/14.mp3" },
    { id: 400, title: "(15) ✨ ልጆችን ማሳደግ ላይ የወላጆች ሚና", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/15.mp3" },
    { id: 401, title: "(16)✨ ልጆች ላይ የትምህርት ቤትና የአስተማሪዎች ተጽዕኖ", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/16.mp3" },
    { id: 402, title: "(17) ጥቂት ስለ ነቢያችን ﷺ", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/17.mp3" },
    { id: 403, title: "(18) እውነተኛው ህይወት", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/18.mp3" },
    { id: 404, title: "(19) ትክክለኛ አማኝ መሆን", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/19.mp3" },
    { id: 405, title: "(20) በአላህ መመካት (التَّوَكُّلْ على الله)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/20.mp3" },
    { id: 406, title: "(21) ዕውቀትና ተግባር", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/21.mp3" },
    { id: 407, title: "(22) በረጀብ ወር የሚሰሩ ቢድዓዎች", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/22.mp3" },
    { id: 408, title: "(23) ነቢዩ صلى الله عليه وسلم ላይ ሰለዋት ማውረድና ትሩፋቶቹ", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/23.mp3" },
    { id: 409, title: "(24) የሰሓቦች (የነቢዩ ሰለላሁ ዐለይሂ ወሰለም ባልደረቦች) ትሩፋትና ደረጃ", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/24.mp3" },
    { id: 410, title: "(25) ጠቃሚ ነጥቦች ስለ ሰሓባዎች", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/25.mp3" },
    { id: 411, title: "(26) የሻእባን ትሩፋትና ህግጋት", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/26.mp3" },
    { id: 412, title: "(27) ትልቁ የረመዷን ዝግጅት", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/27.mp3" },
    { id: 413, title: "(28) ረመዷን ከመቼው ደረሰ?! ባለፈው ዓመት ምን ሰራን? በቀጣይስ ምን አቀድን?!", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/28.mp3" },
    { id: 414, title: "(29) የረመዷን ስጦታዎች", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/29.mp3" },
    { id: 415, title: "(30) ጾምን የሚመለከቱ የተወሰኑ ነጥቦችና ጾም የሚያፈርሱ ነገሮች", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/30.mp3" },
    { id: 416, title: "(31) የኢኽላስ አንገብጋቢነትና አጋዥ ነገሮች", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/31.mp3" },
    { id: 417, title: "(32) የዘካተል-ማል አጠር ጠቅለል ያለ ማብራሪያ", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/32.mp3" },
    { id: 418, title: "(33) ኢዕቲካፍ ህግጋትና አዳቦቹ", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/33.mp3" },
    { id: 419, title: "(34) የሙስሊሞች ትስስር", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/34.mp3" },
    { id: 420, title: "(35) ከረመዷን በኋላ ዒባዳ ላይ መጽናት፤ አንገብጋቢነቱና አጋዥ ነገሮች", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/35.mp3" },
    { id: 421, title: "(36) ጥቂት ስለ 5ኛው የኢስላም ማዕዘን", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/36.mp3" },
    { id: 422, title: "(37) ምላስን መጠበቅ", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/37.mp3" },
    { id: 423, title: "(38) ልጆችና የዕረፍት ጊዜ", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/38.mp3" },
    { id: 424, title: "(39) ከሐጅ የምናገኛቸው ትምህርቶች", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/39.mp3" },
    { id: 425, title: "(40) በፈተና ጊዜ መጠበቅ ያለባቸው ነገሮች", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/40.mp3" },
    { id: 427, title: "(41) የዙል-ሒጃ 10 ቀናት ትሩፋት፣ ህግጋትና ተወዳጅ ስራዎች", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/41.mp3" },
    { id: 428, title: "(42) የውሙ ዓረፈህ - የትሩፋትና የቃል ኪዳን ቀን", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/42.mp3" },
    { id: 429, title: "(43) እውነተኝነትና የእውነተኞች ማዕረግ", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/43.mp3" },
    { id: 430, title: "(44) ለሚመከር ሞት ይበቃዋል", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/44.mp3" },
    { id: 431, title: "(45) የሀሜትና ወሬ የማመላለስ አደገኝነት", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/45.mp3" },
    { id: 432, title: "(46) ከሐጅ በኋላስ?", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/46.mp3" },
    { id: 433, title: "(47) የሙሐረም ወር፤ ትሩፋትና ትምህርቶች", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/47.mp3" },
    { id: 434, title: "(48) የሺርክ ዓይነቶችና አደገኝነቱ", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/48.mp3" },
    { id: 435, title: "(49) ከካፊሮች ጋር መመሳሰልና አደገኛነቱ", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/49.mp3" },
    { id: 436, title: "(50) ልጆችን ማሳደግ ላይ የወላጆች ክፍተት", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/50.mp3" },
    { id: 437, title: "(51) የዐቅል ጸጋና ዐቅል ያለው ሰው መገለጫ", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/51.mp3" },
    { id: 438, title: "(52) ♻የመልካምና ወደ አላህ የሚያቃርቡ ስራዎች ብዛት", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/52.mp3" },
    { id: 439, title: "(53) ♻የኻቲማ ማማርና ሰበቦቹ", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/53.mp3" },
    { id: 440, title: "(54) ♻ቁርኣን የችግሮች ሁሉ መፍትሄ", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/54.mp3" },
    { id: 441, title: "(55) ♻የቢድዓ መዘዝና አደገኛነቱ", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/55.mp3" },
    { id: 442, title: "(56) 🔷እውነተኛው የነቢዩ ውዴታ እና ምልክቶቹ", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/56.mp3" },
    { id: 443, title: "(57) 🔷እራስን ማስተካከል", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/57.mp3" },
    { id: 444, title: "(58) 🔶የአላህ ፍራቻና ጥቅሞቹ", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/58.mp3" },
    { id: 445, title: "(59) 🔶 የጉቦ/ሙስና አደገኛነትና መዘዞቹ", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/59.mp3" },
    { id: 446, title: "(60) 🔶 የሰላት ሰፍ/ሰልፍ ማስተካከልና አንገብጋቢነቱ", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/60.mp3" },
    { id: 447, title: "(61) ♻የቤተ-ሰብና የትዳር ግጭት መንስኤና መፍትሄ", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/61.mp3" },
    { id: 448, title: "(62) ♻ከዲን ፈተና መጠበቂያ መንገዶች", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/62.mp3" },
    { id: 449, title: "(63) 🔶ዲንን መርዳት የሚቻልባቸው መንገዶች", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/63.mp3" },
    { id: 450, title: "(64A) 🔸የሙስሊሞች መድከም፤ መንስኤ ውጤትና መፍትሄ", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/64A.mp3" },
    { id: 451, title: "(64B) 🔸ከአላህ መልካምን ነገር መጠበቅ", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/64B.mp3" },
    { id: 452, title: "(65) 💠የኸይርና የሸር በሮች", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/65.mp3" },
    { id: 453, title: "(66) 🔸አላህንና መልእክተኛውን መታዘዝ እና ጥቅሙ", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/66.mp3" },
    { id: 454, title: "(67) 🔹የእዝነት ሀይማኖትና ነቢይ", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/67.mp3" },
    { id: 455, title: "(68) 🔹ከህመምና ህክምና ጋር ተያያዥ ጥቂት ነጥቦች", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/68.mp3" },
    { id: 456, title: "(69) 🔹የሴቶች መገላለጥ እና አደጋዎቹ", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/69.mp3" },
    { id: 457, title: "(70) 🔹የወረርሽኝ በሽታ/ኮሮና መንስኤና መፍትሄ", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/70.mp3" },
    { id: 458, title: "(71) 🔹ለኮሮና እና ለሌሎችም በሽታዎች ነቢያዊ ፈውሶች", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/71.mp3" },
    { id: 459, title: "(72) 🔹ከችግር በኋላ ምቾት አለ", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/72.mp3" },
    { id: 460, title: "(73) 🔹የዱዓእ መስፈርትና ዱዓእ ተቀባይነት እንዳይኖረው የሚያደርጉ ነገሮች", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/73.mp3" },
    { id: 461, title: "(74) 🔹አላህን መፍራትና እራስን መገምገም", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/74.mp3" },
    { id: 462, title: "(75) 🔹ለሰው ልጆች በሙሉ በጎ መሆን", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/75.mp3" },
    { id: 463, title: "(76) 🔹የበዓል ቀን የሚወሰነው በማን ነው?(ሰሓባዎች ተወያይተው ያጸደቁት የዘመን አቆጣጠርስ የትኛው ነው?)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/76.mp3" },
    { id: 464, title: "(77) 🔹እራስንም ይሁን ሌሎችን በበሽታ የመጉዳት ወንጀል ክብደት", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/77.mp3" },
    { id: 465, title: "(78) 🔹የጅህልና መዘዝ", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/78.mp3" },
    { id: 466, title: "(79) ♻️የተውሒድ አንገብጋቢነትና የሺርክ አደገኝነት", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/79.mp3" },
    { id: 467, title: "(80) ♻️ሞትና መቃብር", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/80.mp3" },
    { id: 468, title: "(81) ♻️የቀብር ቅጣት ምክንያቶችና መዳኛ መንገዶች", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/81.mp3" },
    { id: 469, title: "(82) ♻️አምበጣ፣ጎርፍና ኮሮና ለምንድነው የሚፈራረቁብን?", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/82.mp3" },
    { id: 470, title: "(83) ♻️ኢስላምንና ነቢዩንﷺ ለምንድነው የሚጠሉት?", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/83.mp3" },
    { id: 471, title: "(84) ♻️የሰላም አንገብጋቢነት እና ሰላም ማስፈኛ መንገዶች", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/84.mp3" },
    { id: 472, title: "(85) 🔹የዘረኝነት መዘዝና መፍትሄዎቹ", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/85.mp3" },
    { id: 473, title: "(86) ♻️ችግርና አደጋዎችን የማስወገጃ መንገዶች", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/86.mp3" },
    { id: 474, title: "(87) ♻️ሰውን በመጥፎ መጠርጠር፥መንስኤና መፍትሄ", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/87.mp3" },
    { id: 475, title: "(88) ♻️ጀነትና ጸጋዎቿ", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/88.mp3" },
    { id: 476, title: "(89) ♻️ከ20 በላይ ጀነት መግቢያ ሰበቦች/መንገዶች", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/89.mp3" },
    { id: 477, title: "(90) ♻️ጀነት መግባት የሚከለክሉ24 እንቅፋቶች", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/90.mp3" },
    { id: 478, title: "(91) 💠ወላጆች በልጆቻቸው ጉዳይ ላይ ፍትሃዊ መሆን", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/91.mp3" },
    { id: 479, title: "(92) 💠ቁርኣንን ትተን ወዴት ነው የምንሄደው?", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/92.mp3" },
    { id: 480, title: "(93) 💠የወንጀሎች መብዛትና የአላህ ቻይነት", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/93.mp3" },
    { id: 481, title: "(94) 🔅የመቃናትና የመስተካከል ሰበቦች", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/94.mp3" },
    { id: 482, title: "(95) 🔅የመቃናት እንቅፋትና የጥመት ምክንያቶች", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/95.mp3" },
    { id: 483, title: "(96) 🔅ጥቂት የመስጂድ ህግጋትና ስነ ስርዓቶች", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/96.mp3" },
    { id: 484, title: "(97) 💠7ቱ ማንኛውንም ነገር የመሸጥና የመግዛት መስፈርቶች", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/97.mp3" },
    { id: 485, title: "(98) 🔅መጥፎ ሰዎች", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/98.mp3" },
    { id: 486, title: "(99) 🔅ጥሩ ሰዎች", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/99.mp3" },
    { id: 487, title: "(100) ♻🔅ምርጡ ልብስና ቀለብ", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Jummah/100.mp3" }
  ],
  "ልዩ ወቅታዊ ትምህርት": {
    "ዚክርና ዱዓእ": [
      { id: 353, title: "🔅የዚክርና ዱዓእ ትሩፋትና ዚክርን ችላ የማለት መዘዞች 1", audioUrl: "https://github.com/teha1993/ustaz/releases/download/ziker-and-dua/01.mp3" },
      { id: 354, title: "🔅ወሳኝ ዚክርና ዱዓን የሚመለከቱ ህግጋት 2", audioUrl: "https://github.com/teha1993/ustaz/releases/download/ziker-and-dua/02.mp3" },
      { id: 355, title: "🔅ዚክርን በሚስበሐ መቁጠር  እንዴት ይታያል? 3", audioUrl: "https://github.com/teha1993/ustaz/releases/download/ziker-and-dua/03.mp3" },
      { id: 356, title: "🔅የማለዳ በረከት 4", audioUrl: "https://github.com/teha1993/ustaz/releases/download/ziker-and-dua/04.mp3" },
      { id: 357, title: "🔅ትክክለኛ የማለዳና የምሽት ዚክሮች፤ ከትሩፋታቸውና ትርጉማቸው 5", audioUrl: "https://github.com/teha1993/ustaz/releases/download/ziker-and-dua/05.mp3" },
      { id: 358, title: "💠የማለዳና የምሽት  ዚክሮች ማብራሪያ(1) 6", audioUrl: "https://github.com/teha1993/ustaz/releases/download/ziker-and-dua/06.mp3" },
      { id: 359, title: "💠የማለዳና የምሽት  ዚክሮች ማብራሪያ(2) 7", audioUrl: "https://github.com/teha1993/ustaz/releases/download/ziker-and-dua/07.mp3" },
      { id: 360, title: "💠የማለዳና የምሽት  ዚክሮች  ማብራሪያ(3) 8", audioUrl: "https://github.com/teha1993/ustaz/releases/download/ziker-and-dua/08.mp3" },
      { id: 361, title: "💠የማለዳና የምሽት ዚክሮች ማብራሪያ (4) 9", audioUrl: "https://github.com/teha1993/ustaz/releases/download/ziker-and-dua/09.mp3" },
      { id: 362, title: "💠የማለዳና የምሽት ዚክሮች ማብራሪያ(5) 10", audioUrl: "https://github.com/teha1993/ustaz/releases/download/ziker-and-dua/10.mp3" },
      { id: 363, title: "💠የማለዳና የምሽት  ዚክሮች ማብራሪያ (6) 11", audioUrl: "https://github.com/teha1993/ustaz/releases/download/ziker-and-dua/11.mp3" },
      { id: 364, title: "💠የማለዳና የምሽት  ዚክሮች ማብራሪያ (7) 12", audioUrl: "https://github.com/teha1993/ustaz/releases/download/ziker-and-dua/12.mp3" },
      { id: 365, title: "💠የማለዳና የምሽት  ዚክሮችማብራሪያ  (8) 13", audioUrl: "https://github.com/teha1993/ustaz/releases/download/ziker-and-dua/13.mp3" },
      { id: 366, title: "💠የማለዳና የምሽት  ዚክሮች ማብራሪያ  (9) 14", audioUrl: "https://github.com/teha1993/ustaz/releases/download/ziker-and-dua/14.mp3" },
      { id: 367, title: "💠በመኝታ(በእንቅልፍ)ጊዜ የሚደረግ ዚክር (1) 15", audioUrl: "https://github.com/teha1993/ustaz/releases/download/ziker-and-dua/15.mp3" },
      { id: 368, title: "💠በመኝታ(በእንቅልፍ)ጊዜ የሚደረግ ዚክር (2) 16", audioUrl: "https://github.com/teha1993/ustaz/releases/download/ziker-and-dua/16.mp3" },
      { id: 369, title: "💠በመኝታ(በእንቅልፍ)ጊዜ የሚደረግ ዚክር (3) 17", audioUrl: "https://github.com/teha1993/ustaz/releases/download/ziker-and-dua/17.mp3" },
      { id: 370, title: " 💠በመኝታ(በእንቅልፍ)ጊዜ የሚደረግ ዚክር (4) 18", audioUrl: "https://github.com/teha1993/ustaz/releases/download/ziker-and-dua/18.mp3" },
      { id: 371, title: "🔅ሌሊት በየመሃሉ ሲነቁ የሚደረግ ልዩ ዚክር እና ማታ ላይ የመፍራትና (5) 19", audioUrl: "https://github.com/teha1993/ustaz/releases/download/ziker-and-dua/19.mp3" },
      { id: 372, title: "🔅አስፈሪ(መጥፎ) ህልም ሲታይ የሚደረግ   ዚክርና ህልምን የሚመለከቱ ወሳኝ ነጥቦች 20", audioUrl: "https://github.com/teha1993/ustaz/releases/download/ziker-and-dua/20.mp3" },
      { id: 373, title: "🔅ከእንቅልፍ ሲነቃ የሚደረግ ዚክርና አደብ 21", audioUrl: "https://github.com/teha1993/ustaz/releases/download/ziker-and-dua/21.mp3" },
      { id: 374, title: "🔅የመፀዳጃ ቤት ዚክርና አደብ 22", audioUrl: "https://github.com/teha1993/ustaz/releases/download/ziker-and-dua/22.mp3" },
      { id: 375, title: "🔅የልብስ ዚክርና አደብ 23", audioUrl: "https://github.com/teha1993/ustaz/releases/download/ziker-and-dua/23.mp3" },
      { id: 376, title: "🔅ከቤት ሲወጣና ወደ ቤት ሲገባ የሚደረግ ዚክርና አደብ 24", audioUrl: "https://github.com/teha1993/ustaz/releases/download/ziker-and-dua/24.mp3" },
      { id: 377, title: "🔅የውዱእ ዚክርና ዱዓእ 25", audioUrl: "https://github.com/teha1993/ustaz/releases/download/ziker-and-dua/25.mp3" },
      { id: 378, title: "🔅ከአዛንና ከመስጂድ ጋር የተያያዙ ዚክርና አደቦች 26", audioUrl: "https://github.com/teha1993/ustaz/releases/download/ziker-and-dua/26.mp3" },
      { id: 379, title: "🔅የሰላት መክፈቻ ዱዓና ዚክር  27", audioUrl: "https://github.com/teha1993/ustaz/releases/download/ziker-and-dua/27.mp3" },
      { id: 380, title: "🔅ከሩኩዕና ከሱጁድ ጋር የተያያዙ ዱዓዎች 28", audioUrl: "https://github.com/teha1993/ustaz/releases/download/ziker-and-dua/28.mp3" },
      { id: 381, title: "🔅የተሸሁድ/ተሒያ ትርጉምና ተያያዥ ዱዓዎች 29", audioUrl: "https://github.com/teha1993/ustaz/releases/download/ziker-and-dua/29.mp3" },
      { id: 382, title: "🔅ከፈርድና ሱና ሰላቶች በኋላ  የሚደረጉ ዚክርና ዱዓዎች 30", audioUrl: "https://github.com/teha1993/ustaz/releases/download/ziker-and-dua/30.mp3" },
      { id: 383, title: "🔅የዊትር ሰላት አንገብጋቢነትና የቁኑት ዱዓእ ትርጉምና ህግጋት 31", audioUrl: "https://github.com/teha1993/ustaz/releases/download/ziker-and-dua/31.mp3" },
      { id: 384, title: "🔅የኢስቲኻራ ዚክርና ሰላት 32", audioUrl: "https://github.com/teha1993/ustaz/releases/download/ziker-and-dua/32.mp3" },
      { id: 385, title: "🔅የሰላተል-ጀናዛና ከቀብር ጋር የተያያዙ ዱዓዎች 33", audioUrl: "https://github.com/teha1993/ustaz/releases/download/ziker-and-dua/33.mp3" },
      { id: 386, title: "🔅ዝናብ ሲጠፋ፣ሲበዛ እና ንፋስና ነጎድጓድ ሲኖር የሚደረጉ ዚክሮች 34", audioUrl: "https://github.com/teha1993/ustaz/releases/download/ziker-and-dua/34.mp3" },
      { id: 387, title: "🔅በጭንቀትና በችግር ጊዜ የሚደረግ ዚክር 35", audioUrl: "https://github.com/teha1993/ustaz/releases/download/ziker-and-dua/35.mp3" },
      { id: 388, title: "🔅ከጠላት ጋር ሲገናኙ.. እና በአደጋ ጊዜ የሚደረግ ዚክር 36", audioUrl: "https://github.com/teha1993/ustaz/releases/download/ziker-and-dua/36.mp3" },
      { id: 389, title: "🔅እዳና ድህነትን የሚመለከቱ ዚክርና ዱዓዎች 37", audioUrl: "https://github.com/teha1993/ustaz/releases/download/ziker-and-dua/37.mp3" },
      { id: 390, title: "🔅ከህመምና ህሙማን ጋር ተያያዥ የሆኑ ዚክርና ዱዓዎች 38", audioUrl: "https://github.com/teha1993/ustaz/releases/download/ziker-and-dua/38.mp3" },
      { id: 391, title: "♻️ ከጉዞና መጓጓዣ ጋር ተያያዥ ዚክርና ዱዓዎች 39", audioUrl: "https://github.com/teha1993/ustaz/releases/download/ziker-and-dua/39.mp3" },
      { id: 392, title: "♻️ ከምግብና መጠጥ ጋር የተያያዙ ዚክርና ዱዓዎች 40", audioUrl: "https://github.com/teha1993/ustaz/releases/download/ziker-and-dua/40.mp3" },
      { id: 393, title: "🔅ከጋብቻና ከሕጻናት ጋር ተያያዥ የሆኑ ዚክርና ዱዓዎች 41", audioUrl: "https://github.com/teha1993/ustaz/releases/download/ziker-and-dua/41.mp3" },
      { id: 394, title: "🔹ከማስነጠስ ጋር የሚያያዙ ዚክርና አዳቦች 42", audioUrl: "https://github.com/teha1993/ustaz/releases/download/ziker-and-dua/42.mp3" },
      { id: 395, title: "🔹 በተለያዩ አጋጣሚዎች የሚባሉ 9 ዚክርና ዱዓዎች 43", audioUrl: "https://github.com/teha1993/ustaz/releases/download/ziker-and-dua/43.mp3" }
    ]
  },
  "ሙሓደራዎች": []
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
  const [showQueue, setShowQueue] = useState(false); 
  
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const audioRef = useRef(null);

  // Flatten all lessons for search
  const allLessons = [];
  Object.values(categoriesData).forEach(cat => {
    if (Array.isArray(cat)) {
      cat.forEach(l => allLessons.push(l));
    } else {
      Object.values(cat).forEach(sub => {
        sub.forEach(l => allLessons.push(l));
      });
    }
  });

  const filteredLessons = searchQuery 
    ? allLessons.filter(l => l.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : null;

  // Get current queue
  let currentQueue = allLessons;
  if (selectedCategory && selectedSubCategory) {
    currentQueue = categoriesData[selectedCategory][selectedSubCategory];
  } else if (selectedCategory && Array.isArray(categoriesData[selectedCategory])) {
    currentQueue = categoriesData[selectedCategory];
  }

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
      setShowQueue(false);
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

  const goToFolder = () => {
    setIsPlayerOpen(false);
    if (currentLesson && selectedCategory && selectedSubCategory) {
       // Already there
    } else {
       for (const cat in categoriesData) {
         if (Array.isArray(categoriesData[cat])) {
           if (categoriesData[cat].some(l => l.audioUrl === currentLesson.audioUrl)) {
             setSelectedCategory(cat);
             return;
           }
         } else {
           for (const sub in categoriesData[cat]) {
             if (categoriesData[cat][sub].some(l => l.audioUrl === currentLesson.audioUrl)) {
               setSelectedCategory(cat);
               setSelectedSubCategory(sub);
               return;
             }
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
              {categoriesData[selectedCategory][selectedSubCategory].map(lesson => (
                <div key={lesson.id} className="bg-[#0b3b2d] p-4 rounded-2xl flex items-center justify-between border border-emerald-800/60 shadow">
                  <div className="flex-1 pr-3"><span className="text-sm font-medium">{lesson.title}</span></div>
                  <button onClick={() => playLesson(lesson)} className="text-emerald-400 hover:text-emerald-300">
                    {currentLesson?.audioUrl === lesson.audioUrl && isPlaying ? <PauseCircle size={32} /> : <PlayCircle size={32} />}
                  </button>
                </div>
              ))}
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

            {/* SMART CHECK: If the category is an Array (like Jummah), show the audio list immediately */}
            {Array.isArray(categoriesData[selectedCategory]) ? (
              <div className="space-y-3">
                {categoriesData[selectedCategory].map(lesson => (
                  <div key={lesson.id} className="bg-[#0b3b2d] p-4 rounded-2xl flex items-center justify-between border border-emerald-800/60 shadow">
                    <div className="flex-1 pr-3"><span className="text-sm font-medium">{lesson.title}</span></div>
                    <button onClick={() => playLesson(lesson)} className="text-emerald-400 hover:text-emerald-300">
                      {currentLesson?.audioUrl === lesson.audioUrl && isPlaying ? <PauseCircle size={32} /> : <PlayCircle size={32} />}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              /* Otherwise show the subfolder grid */
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
            )}
          </div>
        ) : (
          <div>
            <h2 className="text-sm font-semibold text-emerald-300/80
