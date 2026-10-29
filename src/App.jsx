import React, { useState, useRef } from 'react';
import { Search, Heart, PlayCircle, PauseCircle, X, BookOpen, ArrowLeft, Home, FileText, Layers } from 'lucide-react';

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
    "አል ጀዘሪያ የተጅዊድ ትምህርት": [{ id: 116, title: "የተጅዊድ ትምህርት አል ጀዘሪያ (1)", audioUrl: "https://github.com/teha1993/ustaz/releases/download/Aljzeria/1.mp3" },
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
    "ኹዝ ዐቂደተክ": [],
    "ፈድሉል ኢስላም": [],
     "የቡሉጉል መራም ኪታብ ማብራሪያ": [],
     "የቀልብ መድረቅ አደገኝነት፣ መንስኤና መፍትሄ": [], 
     "የላሚየቱ ኢብኑል ወርዲ ማብራሪያ":[],   
     "የልብ መስፋትና መረጋጋትን ለማግኘት የሚረዱ ነገሮች": []
 
  },
    "የፊቅህ ትምህርት": {
    "ሰፊነቱን'ነጃት": []
  },
  "የዛዱል መዓድ ፈታዋ": {
    "የዛዱል መዓድ ፈታዋ (1)": [],
    "የዛዱል መዓድ ፈታዋ2)": []
  },
  "የጁሙዓ ኹጥባዎች": {},
  "ልዩ ወቅታዊ ትምህርት": {
    "ዚክርና ዱዓእ": [],
    "ሙሓደራዎች": []
  }
};

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);       // ዋና ምድብ (ဥပ. የቁርኣን ትምህርት)
  const [selectedSubCategory, setSelectedSubCategory] = useState(null); // ንዑስ ምድብ (ဥပ. ለመሐፈዝ የሚረዱ ነገሮች)
  const [currentLesson, setCurrentLesson] = useState(null);             // አሁን እየተጫወተ ያለ ትምህርት
  const [isPlaying, setIsPlaying] = useState(false);                    // የማጫወቻ ሁኔታ
  const [searchQuery, setSearchQuery] = useState("");                   // የፍለጋ ቃላት
  const audioRef = useRef(null);

  // ድምፅ የማጫወት እና የማቆም ሎጂክ
  const togglePlay = (lesson) => {
    if (!lesson.audioUrl) {
      alert("ይህ ትምህርት ገና ኦዲዮ አልተጫነለትም!");
      return;
    }
    if (currentLesson?.audioUrl === lesson.audioUrl) {
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

  // ሁሉንም ትምህርቶች ለፍለጋ ማሰባሰብ
  const allLessons = Object.values(categoriesData).flatMap(subCats => 
    Object.values(subCats).flatMap(lessonsList => lessonsList)
  );

  const filteredLessons = searchQuery 
    ? allLessons.filter(l => l.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : null;

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#062c20] text-white pb-36 font-sans">
      
      {/* ራስጌ (Header) */}
      <div className="p-5 bg-[#084532] rounded-b-3xl shadow-lg border-b border-[#0f5c44]">
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
          {Object.keys(categoriesData).length} ምድቦች • {allLessons.length} ትምህርቶች (አዲስ የጊታፕ ኦዲዮ)
        </p>

        {/* የፍለጋ ሳጥን (Search Bar) */}
        <div className="relative">
          <Search className="absolute left-3 top-3.5 text-emerald-400/60" size={18} />
          <input 
            type="text"
            placeholder="ትምህርት ይፈልጉ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#041f17] border border-emerald-700/50 rounded-2xl pl-10 pr-4 py-3 text-sm text-white placeholder-emerald-500/60 focus:outline-none focus:border-emerald-400"
          />
        </div>
      </div>

      <div className="p-5">
        {/* 1. የፍለጋ ውጤቶች በሚኖሩበት ጊዜ */}
        {searchQuery ? (
          <div>
            <h2 className="text-sm font-semibold text-emerald-300 mb-3">የፍለጋ ውጤቶች ({filteredLessons.length})</h2>
            <div className="space-y-3">
              {filteredLessons.length > 0 ? (
                filteredLessons.map(lesson => (
                  <div key={lesson.audioUrl} className="bg-[#0b3b2d] p-4 rounded-2xl flex items-center justify-between border border-emerald-800/60 shadow">
                    <span className="text-sm font-medium flex-1 pr-3">{lesson.title}</span>
                    <button onClick={() => togglePlay(lesson)} className="text-emerald-400 hover:text-emerald-300">
                      {currentLesson?.audioUrl === lesson.audioUrl && isPlaying ? <PauseCircle size={30} /> : <PlayCircle size={30} />}
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-xs text-emerald-400/70 text-center py-10">ምንም ትምህርት አልተገኘም</p>
              )}
            </div>
          </div>
        ) : selectedSubCategory ? (
          /* 3. የንዑስ ምድብ ውስጥ ያሉ ትምህርቶች ዝርዝር ሲታይ */
          <div>
            <button 
              onClick={() => setSelectedSubCategory(null)}
              className="flex items-center gap-2 text-emerald-300 text-sm mb-4 font-medium hover:text-white"
            >
              <ArrowLeft size={18} /> ወደ ንዑስ ምድቦች ተመለስ
            </button>
            <h2 className="text-lg font-bold mb-4 text-emerald-100">{selectedSubCategory}</h2>
            <div className="space-y-3">
              {categoriesData[selectedCategory][selectedSubCategory].length > 0 ? (
                categoriesData[selectedCategory][selectedSubCategory].map(lesson => (
                  <div key={lesson.audioUrl} className="bg-[#0b3b2d] p-4 rounded-2xl flex items-center justify-between border border-emerald-800/60 shadow">
                    <div className="flex-1 pr-3">
                      <span className="text-sm font-medium">{lesson.title}</span>
                    </div>
                    <button onClick={() => togglePlay(lesson)} className="text-emerald-400 hover:text-emerald-300">
                      {currentLesson?.audioUrl === lesson.audioUrl && isPlaying ? <PauseCircle size={32} /> : <PlayCircle size={32} />}
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-[#0b3b2d]/50 rounded-2xl border border-emerald-900">
                  <p className="text-sm text-emerald-300">ይህ ንዑስ ምድብ ገና ኦዲዮ አልተጫነለትም</p>
                </div>
              )}
            </div>
          </div>
        ) : selectedCategory ? (
          /* 2. ዋና ምድብ ሲመረጥ ንዑስ ምድቦችን ማሳየት */
          <div>
            <button 
              onClick={() => setSelectedCategory(null)}
              className="flex items-center gap-2 text-emerald-300 text-sm mb-4 font-medium hover:text-white"
            >
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
                  <div 
                    key={subCat}
                    onClick={() => setSelectedSubCategory(subCat)}
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
          /* 4. ዋና ዋና ምድቦች (Home Grid View) */
          <div>
            <h2 className="text-sm font-semibold text-emerald-300/80 mb-3">ምድቦች</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(categoriesData).map(catName => {
                const subCatsCount = Object.keys(categoriesData[catName]).length;
                const totalLessonsInCat = Object.values(categoriesData[catName]).flat().length;
                return (
                  <div 
                    key={catName}
                    onClick={() => setSelectedCategory(catName)}
                    className="bg-[#0b3b2d] p-4 rounded-3xl border border-emerald-800/60 cursor-pointer hover:border-emerald-500 transition-all shadow-lg flex flex-col justify-between h-36"
                  >
                    <BookOpen className="text-emerald-400" size={26} />
                    <div>
                      <h3 className="text-sm font-bold leading-snug">{catName}</h3>
                      <p className="text-[11px] text-emerald-300/70 mt-1">
                        {subCatsCount} ንዑስ ምድቦች • {totalLessonsInCat} ትምህርቶች
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* የ Spotify አይነት ተንሳፋፊ የድምፅ ማጫወቻ (Sticky In-App Player Bar) */}
      {currentLesson && (
        <div className="fixed bottom-4 left-4 right-4 bg-[#043d2c] text-white p-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-500 z-50">
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
            <p className="text-[10px] text-emerald-300 italic">አሁን በመደመጥ ላይ...</p>
          </div>
          <button onClick={() => togglePlay(currentLesson)} className="text-white bg-emerald-600 p-2.5 rounded-full hover:bg-emerald-500 shadow">
            {isPlaying ? <PauseCircle size={24} /> : <PlayCircle size={24} />}
          </button>
          <button onClick={() => { audioRef.current.pause(); setCurrentLesson(null); setIsPlaying(false); }} className="text-emerald-300 hover:text-white p-1">
            <X size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
