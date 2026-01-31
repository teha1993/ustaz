
export const formatLessonName = (name) => {
  return name.replace('.mp3', '').replace('.pdf', '');
};

export const getFileIcon = (name) => {
  if (name.toLowerCase().endsWith('.pdf')) return '📄';
  if (name.toLowerCase().endsWith('.mp3')) return '🎵';
  return '📁';
};

export const getCategoryIcon = (category) => {
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
