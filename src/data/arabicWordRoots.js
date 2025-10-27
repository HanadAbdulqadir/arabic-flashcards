// Stage 6: Word Formation & Roots
// Arabic root patterns and word families

export const arabicWordRoots = [
  // Root: ك ت ب (writing)
  {
    id: 401,
    type: "root",
    arabic: "كتب",
    transliteration: "kataba",
    meaning: "to write",
    root: "ك ت ب",
    difficulty: "intermediate",
    description: "Writing root - forms words related to writing",
    examples: [
      { arabic: "كتاب", meaning: "book" },
      { arabic: "كاتب", meaning: "writer" },
      { arabic: "مكتب", meaning: "office/desk" },
      { arabic: "مكتبة", meaning: "library" }
    ],
    mastery: 0,
    streak: 0,
    lastReviewed: null,
    nextReview: null
  },
  // Root: د ر س (studying)
  {
    id: 402,
    type: "root",
    arabic: "درس",
    transliteration: "darasa",
    meaning: "to study",
    root: "د ر س",
    difficulty: "intermediate",
    description: "Studying root - forms words related to education",
    examples: [
      { arabic: "مدرسة", meaning: "school" },
      { arabic: "مدرس", meaning: "teacher" },
      { arabic: "دراسة", meaning: "study" },
      { arabic: "دروس", meaning: "lessons" }
    ],
    mastery: 0,
    streak: 0,
    lastReviewed: null,
    nextReview: null
  },
  // Root: ع م ل (working)
  {
    id: 403,
    type: "root",
    arabic: "عمل",
    transliteration: "ʿamila",
    meaning: "to work",
    root: "ع م ل",
    difficulty: "intermediate",
    description: "Working root - forms words related to work and action",
    examples: [
      { arabic: "عمل", meaning: "work/job" },
      { arabic: "عامل", meaning: "worker" },
      { arabic: "مصنع", meaning: "factory" },
      { arabic: "تعمل", meaning: "she works" }
    ],
    mastery: 0,
    streak: 0,
    lastReviewed: null,
    nextReview: null
  },
  // Root: ق ر أ (reading)
  {
    id: 404,
    type: "root",
    arabic: "قرأ",
    transliteration: "qaraʼa",
    meaning: "to read",
    root: "ق ر أ",
    difficulty: "intermediate",
    description: "Reading root - forms words related to reading and recitation",
    examples: [
      { arabic: "قرآن", meaning: "Quran" },
      { arabic: "قارئ", meaning: "reader" },
      { arabic: "مقروء", meaning: "read" },
      { arabic: "قراءة", meaning: "reading" }
    ],
    mastery: 0,
    streak: 0,
    lastReviewed: null,
    nextReview: null
  },
  // Root: س م ع (hearing)
  {
    id: 405,
    type: "root",
    arabic: "سمع",
    transliteration: "samiʿa",
    meaning: "to hear",
    root: "س م ع",
    difficulty: "intermediate",
    description: "Hearing root - forms words related to hearing and listening",
    examples: [
      { arabic: "سماعة", meaning: "headphone" },
      { arabic: "مسموع", meaning: "audible" },
      { arabic: "استمع", meaning: "listen" },
      { arabic: "سميع", meaning: "hearing" }
    ],
    mastery: 0,
    streak: 0,
    lastReviewed: null,
    nextReview: null
  },
  // Root: ن ظ ر (looking)
  {
    id: 406,
    type: "root",
    arabic: "نظر",
    transliteration: "naẓara",
    meaning: "to look",
    root: "ن ظ ر",
    difficulty: "intermediate",
    description: "Looking root - forms words related to seeing and observing",
    examples: [
      { arabic: "منظر", meaning: "view" },
      { arabic: "نظارة", meaning: "glasses" },
      { arabic: "منظور", meaning: "perspective" },
      { arabic: "ينظر", meaning: "he looks" }
    ],
    mastery: 0,
    streak: 0,
    lastReviewed: null,
    nextReview: null
  },
  // Root: ك ل م (speaking)
  {
    id: 407,
    type: "root",
    arabic: "كلم",
    transliteration: "kalama",
    meaning: "to speak",
    root: "ك ل م",
    difficulty: "intermediate",
    description: "Speaking root - forms words related to speech and words",
    examples: [
      { arabic: "كلمة", meaning: "word" },
      { arabic: "متكلم", meaning: "speaker" },
      { arabic: "مكالمة", meaning: "conversation" },
      { arabic: "يتكلم", meaning: "he speaks" }
    ],
    mastery: 0,
    streak: 0,
    lastReviewed: null,
    nextReview: null
  },
  // Root: ف ه م (understanding)
  {
    id: 408,
    type: "root",
    arabic: "فهم",
    transliteration: "fahima",
    meaning: "to understand",
    root: "ف ه م",
    difficulty: "intermediate",
    description: "Understanding root - forms words related to comprehension",
    examples: [
      { arabic: "فهم", meaning: "understanding" },
      { arabic: "مفهوم", meaning: "concept" },
      { arabic: "يفهم", meaning: "he understands" },
      { arabic: "فهمت", meaning: "I understood" }
    ],
    mastery: 0,
    streak: 0,
    lastReviewed: null,
    nextReview: null
  },
  // Root: ذ ه ب (going)
  {
    id: 409,
    type: "root",
    arabic: "ذهب",
    transliteration: "dhahaba",
    meaning: "to go",
    root: "ذ ه ب",
    difficulty: "intermediate",
    description: "Going root - forms words related to movement and travel",
    examples: [
      { arabic: "مذهب", meaning: "doctrine/school of thought" },
      { arabic: "يذهب", meaning: "he goes" },
      { arabic: "ذهبت", meaning: "I went" },
      { arabic: "ذاهب", meaning: "going" }
    ],
    mastery: 0,
    streak: 0,
    lastReviewed: null,
    nextReview: null
  },
  // Root: ج ل س (sitting)
  {
    id: 410,
    type: "root",
    arabic: "جلس",
    transliteration: "jalasa",
    meaning: "to sit",
    root: "ج ل س",
    difficulty: "intermediate",
    description: "Sitting root - forms words related to sitting and staying",
    examples: [
      { arabic: "مجلس", meaning: "council/meeting" },
      { arabic: "يجلس", meaning: "he sits" },
      { arabic: "جلست", meaning: "I sat" },
      { arabic: "جالس", meaning: "sitting" }
    ],
    mastery: 0,
    streak: 0,
    lastReviewed: null,
    nextReview: null
  },
  // Root: أ ك ل (eating)
  {
    id: 411,
    type: "root",
    arabic: "أكل",
    transliteration: "akala",
    meaning: "to eat",
    root: "أ ك ل",
    difficulty: "intermediate",
    description: "Eating root - forms words related to food and consumption",
    examples: [
      { arabic: "طعام", meaning: "food" },
      { arabic: "مأكولات", meaning: "foods" },
      { arabic: "يأكل", meaning: "he eats" },
      { arabic: "أكلت", meaning: "I ate" }
    ],
    mastery: 0,
    streak: 0,
    lastReviewed: null,
    nextReview: null
  },
  // Root: ش ر ب (drinking)
  {
    id: 412,
    type: "root",
    arabic: "شرب",
    transliteration: "shariba",
    meaning: "to drink",
    root: "ش ر ب",
    difficulty: "intermediate",
    description: "Drinking root - forms words related to drinking and beverages",
    examples: [
      { arabic: "مشروب", meaning: "drink" },
      { arabic: "يشرب", meaning: "he drinks" },
      { arabic: "شربت", meaning: "I drank" },
      { arabic: "شارب", meaning: "drinker" }
    ],
    mastery: 0,
    streak: 0,
    lastReviewed: null,
    nextReview: null
  },
  // Root: ح ب (loving)
  {
    id: 413,
    type: "root",
    arabic: "حب",
    transliteration: "ḥabba",
    meaning: "to love",
    root: "ح ب",
    difficulty: "intermediate",
    description: "Loving root - forms words related to love and affection",
    examples: [
      { arabic: "حب", meaning: "love" },
      { arabic: "محبوب", meaning: "beloved" },
      { arabic: "يحب", meaning: "he loves" },
      { arabic: "حبيبي", meaning: "my love" }
    ],
    mastery: 0,
    streak: 0,
    lastReviewed: null,
    nextReview: null
  },
  // Root: خ ر ج (exiting)
  {
    id: 414,
    type: "root",
    arabic: "خرج",
    transliteration: "kharaja",
    meaning: "to exit",
    root: "خ ر ج",
    difficulty: "intermediate",
    description: "Exiting root - forms words related to leaving and going out",
    examples: [
      { arabic: "خارج", meaning: "outside" },
      { arabic: "يخرج", meaning: "he exits" },
      { arabic: "خرجت", meaning: "I exited" },
      { arabic: "مخرج", meaning: "exit" }
    ],
    mastery: 0,
    streak: 0,
    lastReviewed: null,
    nextReview: null
  },
  // Root: د خ ل (entering)
  {
    id: 415,
    type: "root",
    arabic: "دخل",
    transliteration: "dakhala",
    meaning: "to enter",
    root: "د خ ل",
    difficulty: "intermediate",
    description: "Entering root - forms words related to entering and coming in",
    examples: [
      { arabic: "داخل", meaning: "inside" },
      { arabic: "يدخل", meaning: "he enters" },
      { arabic: "دخلت", meaning: "I entered" },
      { arabic: "مدخل", meaning: "entrance" }
    ],
    mastery: 0,
    streak: 0,
    lastReviewed: null,
    nextReview: null
  }
];
