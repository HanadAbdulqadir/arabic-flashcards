// Comprehensive dataset for Arabic letters with short vowels
// 28 letters × 3 short vowels = 84 combinations

export const arabicLettersWithVowels = [
  // Alif (ا) - Special case (vowel carrier)
  {
    letter: "ا",
    name: "Alif",
    transliteration: "ā",
    sound: "Long 'a' sound",
    vowel: "none",
    audio: "/audio/alif.mp3",
    options: ["ا", "ب", "ت"],
    description: "Long vowel carrier"
  },
  {
    letter: "اَ",
    name: "Alif with Fatha",
    transliteration: "a",
    sound: "Short 'a' sound",
    vowel: "fatha",
    audio: "/audio/alif.mp3",
    options: ["اَ", "بَ", "تَ"],
    description: "Short 'a' sound"
  },
  {
    letter: "اِ",
    name: "Alif with Kasra",
    transliteration: "i",
    sound: "Short 'i' sound",
    vowel: "kasra",
    audio: "/audio/alif.mp3",
    options: ["اِ", "بِ", "تِ"],
    description: "Short 'i' sound"
  },
  {
    letter: "اُ",
    name: "Alif with Damma",
    transliteration: "u",
    sound: "Short 'u' sound",
    vowel: "damma",
    audio: "/audio/alif.mp3",
    options: ["اُ", "بُ", "تُ"],
    description: "Short 'u' sound"
  },

  // Ba (ب)
  {
    letter: "بَ",
    name: "Ba with Fatha",
    transliteration: "ba",
    sound: "ba",
    vowel: "fatha",
    audio: "/audio/ba.mp3",
    options: ["بَ", "تَ", "ثَ"],
    description: "Ba with short 'a'"
  },
  {
    letter: "بِ",
    name: "Ba with Kasra",
    transliteration: "bi",
    sound: "bi",
    vowel: "kasra",
    audio: "/audio/ba.mp3",
    options: ["بِ", "تِ", "ثِ"],
    description: "Ba with short 'i'"
  },
  {
    letter: "بُ",
    name: "Ba with Damma",
    transliteration: "bu",
    sound: "bu",
    vowel: "damma",
    audio: "/audio/ba.mp3",
    options: ["بُ", "تُ", "ثُ"],
    description: "Ba with short 'u'"
  },

  // Ta (ت)
  {
    letter: "تَ",
    name: "Ta with Fatha",
    transliteration: "ta",
    sound: "ta",
    vowel: "fatha",
    audio: "/audio/ta.mp3",
    options: ["تَ", "ثَ", "جَ"],
    description: "Ta with short 'a'"
  },
  {
    letter: "تِ",
    name: "Ta with Kasra",
    transliteration: "ti",
    sound: "ti",
    vowel: "kasra",
    audio: "/audio/ta.mp3",
    options: ["تِ", "ثِ", "جِ"],
    description: "Ta with short 'i'"
  },
  {
    letter: "تُ",
    name: "Ta with Damma",
    transliteration: "tu",
    sound: "tu",
    vowel: "damma",
    audio: "/audio/ta.mp3",
    options: ["تُ", "ثُ", "جُ"],
    description: "Ta with short 'u'"
  },

  // Tha (ث)
  {
    letter: "ثَ",
    name: "Tha with Fatha",
    transliteration: "tha",
    sound: "tha",
    vowel: "fatha",
    audio: "/audio/tha.mp3",
    options: ["ثَ", "جَ", "حَ"],
    description: "Tha with short 'a'"
  },
  {
    letter: "ثِ",
    name: "Tha with Kasra",
    transliteration: "thi",
    sound: "thi",
    vowel: "kasra",
    audio: "/audio/tha.mp3",
    options: ["ثِ", "جِ", "حِ"],
    description: "Tha with short 'i'"
  },
  {
    letter: "ثُ",
    name: "Tha with Damma",
    transliteration: "thu",
    sound: "thu",
    vowel: "damma",
    audio: "/audio/tha.mp3",
    options: ["ثُ", "جُ", "حُ"],
    description: "Tha with short 'u'"
  },

  // Jeem (ج)
  {
    letter: "جَ",
    name: "Jeem with Fatha",
    transliteration: "ja",
    sound: "ja",
    vowel: "fatha",
    audio: "/audio/jeem.mp3",
    options: ["جَ", "حَ", "خَ"],
    description: "Jeem with short 'a'"
  },
  {
    letter: "جِ",
    name: "Jeem with Kasra",
    transliteration: "ji",
    sound: "ji",
    vowel: "kasra",
    audio: "/audio/jeem.mp3",
    options: ["جِ", "حِ", "خِ"],
    description: "Jeem with short 'i'"
  },
  {
    letter: "جُ",
    name: "Jeem with Damma",
    transliteration: "ju",
    sound: "ju",
    vowel: "damma",
    audio: "/audio/jeem.mp3",
    options: ["جُ", "حُ", "خُ"],
    description: "Jeem with short 'u'"
  },

  // Ha (ح)
  {
    letter: "حَ",
    name: "Ha with Fatha",
    transliteration: "ḥa",
    sound: "ḥa",
    vowel: "fatha",
    audio: "/audio/ha.mp3",
    options: ["حَ", "خَ", "دَ"],
    description: "Ha with short 'a'"
  },
  {
    letter: "حِ",
    name: "Ha with Kasra",
    transliteration: "ḥi",
    sound: "ḥi",
    vowel: "kasra",
    audio: "/audio/ha.mp3",
    options: ["حِ", "خِ", "دِ"],
    description: "Ha with short 'i'"
  },
  {
    letter: "حُ",
    name: "Ha with Damma",
    transliteration: "ḥu",
    sound: "ḥu",
    vowel: "damma",
    audio: "/audio/ha.mp3",
    options: ["حُ", "خُ", "دُ"],
    description: "Ha with short 'u'"
  },

  // Kha (خ)
  {
    letter: "خَ",
    name: "Kha with Fatha",
    transliteration: "kha",
    sound: "kha",
    vowel: "fatha",
    audio: "/audio/kha.mp3",
    options: ["خَ", "دَ", "ذَ"],
    description: "Kha with short 'a'"
  },
  {
    letter: "خِ",
    name: "Kha with Kasra",
    transliteration: "khi",
    sound: "khi",
    vowel: "kasra",
    audio: "/audio/kha.mp3",
    options: ["خِ", "دِ", "ذِ"],
    description: "Kha with short 'i'"
  },
  {
    letter: "خُ",
    name: "Kha with Damma",
    transliteration: "khu",
    sound: "khu",
    vowel: "damma",
    audio: "/audio/kha.mp3",
    options: ["خُ", "دُ", "ذُ"],
    description: "Kha with short 'u'"
  },

  // Dal (د)
  {
    letter: "دَ",
    name: "Dal with Fatha",
    transliteration: "da",
    sound: "da",
    vowel: "fatha",
    audio: "/audio/dal.mp3",
    options: ["دَ", "ذَ", "رَ"],
    description: "Dal with short 'a'"
  },
  {
    letter: "دِ",
    name: "Dal with Kasra",
    transliteration: "di",
    sound: "di",
    vowel: "kasra",
    audio: "/audio/dal.mp3",
    options: ["دِ", "ذِ", "رِ"],
    description: "Dal with short 'i'"
  },
  {
    letter: "دُ",
    name: "Dal with Damma",
    transliteration: "du",
    sound: "du",
    vowel: "damma",
    audio: "/audio/dal.mp3",
    options: ["دُ", "ذُ", "رُ"],
    description: "Dal with short 'u'"
  },

  // Dhal (ذ)
  {
    letter: "ذَ",
    name: "Dhal with Fatha",
    transliteration: "dha",
    sound: "dha",
    vowel: "fatha",
    audio: "/audio/dhal.mp3",
    options: ["ذَ", "رَ", "زَ"],
    description: "Dhal with short 'a'"
  },
  {
    letter: "ذِ",
    name: "Dhal with Kasra",
    transliteration: "dhi",
    sound: "dhi",
    vowel: "kasra",
    audio: "/audio/dhal.mp3",
    options: ["ذِ", "رِ", "زِ"],
    description: "Dhal with short 'i'"
  },
  {
    letter: "ذُ",
    name: "Dhal with Damma",
    transliteration: "dhu",
    sound: "dhu",
    vowel: "damma",
    audio: "/audio/dhal.mp3",
    options: ["ذُ", "رُ", "زُ"],
    description: "Dhal with short 'u'"
  },

  // Ra (ر)
  {
    letter: "رَ",
    name: "Ra with Fatha",
    transliteration: "ra",
    sound: "ra",
    vowel: "fatha",
    audio: "/audio/ra.mp3",
    options: ["رَ", "زَ", "سَ"],
    description: "Ra with short 'a'"
  },
  {
    letter: "رِ",
    name: "Ra with Kasra",
    transliteration: "ri",
    sound: "ri",
    vowel: "kasra",
    audio: "/audio/ra.mp3",
    options: ["رِ", "زِ", "سِ"],
    description: "Ra with short 'i'"
  },
  {
    letter: "رُ",
    name: "Ra with Damma",
    transliteration: "ru",
    sound: "ru",
    vowel: "damma",
    audio: "/audio/ra.mp3",
    options: ["رُ", "زُ", "سُ"],
    description: "Ra with short 'u'"
  },

  // Zay (ز)
  {
    letter: "زَ",
    name: "Zay with Fatha",
    transliteration: "za",
    sound: "za",
    vowel: "fatha",
    audio: "/audio/zay.mp3",
    options: ["زَ", "سَ", "شَ"],
    description: "Zay with short 'a'"
  },
  {
    letter: "زِ",
    name: "Zay with Kasra",
    transliteration: "zi",
    sound: "zi",
    vowel: "kasra",
    audio: "/audio/zay.mp3",
    options: ["زِ", "سِ", "شِ"],
    description: "Zay with short 'i'"
  },
  {
    letter: "زُ",
    name: "Zay with Damma",
    transliteration: "zu",
    sound: "zu",
    vowel: "damma",
    audio: "/audio/zay.mp3",
    options: ["زُ", "سُ", "شُ"],
    description: "Zay with short 'u'"
  },

  // Seen (س)
  {
    letter: "سَ",
    name: "Seen with Fatha",
    transliteration: "sa",
    sound: "sa",
    vowel: "fatha",
    audio: "/audio/seen.mp3",
    options: ["سَ", "شَ", "صَ"],
    description: "Seen with short 'a'"
  },
  {
    letter: "سِ",
    name: "Seen with Kasra",
    transliteration: "si",
    sound: "si",
    vowel: "kasra",
    audio: "/audio/seen.mp3",
    options: ["سِ", "شِ", "صِ"],
    description: "Seen with short 'i'"
  },
  {
    letter: "سُ",
    name: "Seen with Damma",
    transliteration: "su",
    sound: "su",
    vowel: "damma",
    audio: "/audio/seen.mp3",
    options: ["سُ", "شُ", "صُ"],
    description: "Seen with short 'u'"
  },

  // Sheen (ش)
  {
    letter: "شَ",
    name: "Sheen with Fatha",
    transliteration: "sha",
    sound: "sha",
    vowel: "fatha",
    audio: "/audio/sheen.mp3",
    options: ["شَ", "صَ", "ضَ"],
    description: "Sheen with short 'a'"
  },
  {
    letter: "شِ",
    name: "Sheen with Kasra",
    transliteration: "shi",
    sound: "shi",
    vowel: "kasra",
    audio: "/audio/sheen.mp3",
    options: ["شِ", "صِ", "ضِ"],
    description: "Sheen with short 'i'"
  },
  {
    letter: "شُ",
    name: "Sheen with Damma",
    transliteration: "shu",
    sound: "shu",
    vowel: "damma",
    audio: "/audio/sheen.mp3",
    options: ["شُ", "صُ", "ضُ"],
    description: "Sheen with short 'u'"
  },

  // Sad (ص)
  {
    letter: "صَ",
    name: "Sad with Fatha",
    transliteration: "ṣa",
    sound: "ṣa",
    vowel: "fatha",
    audio: "/audio/sad.mp3",
    options: ["صَ", "ضَ", "طَ"],
    description: "Sad with short 'a'"
  },
  {
    letter: "صِ",
    name: "Sad with Kasra",
    transliteration: "ṣi",
    sound: "ṣi",
    vowel: "kasra",
    audio: "/audio/sad.mp3",
    options: ["صِ", "ضِ", "طِ"],
    description: "Sad with short 'i'"
  },
  {
    letter: "صُ",
    name: "Sad with Damma",
    transliteration: "ṣu",
    sound: "ṣu",
    vowel: "damma",
    audio: "/audio/sad.mp3",
    options: ["صُ", "ضُ", "طُ"],
    description: "Sad with short 'u'"
  },

  // Dad (ض)
  {
    letter: "ضَ",
    name: "Dad with Fatha",
    transliteration: "ḍa",
    sound: "ḍa",
    vowel: "fatha",
    audio: "/audio/dad.mp3",
    options: ["ضَ", "طَ", "ظَ"],
    description: "Dad with short 'a'"
  },
  {
    letter: "ضِ",
    name: "Dad with Kasra",
    transliteration: "ḍi",
    sound: "ḍi",
    vowel: "kasra",
    audio: "/audio/dad.mp3",
    options: ["ضِ", "طِ", "ظِ"],
    description: "Dad with short 'i'"
  },
  {
    letter: "ضُ",
    name: "Dad with Damma",
    transliteration: "ḍu",
    sound: "ḍu",
    vowel: "damma",
    audio: "/audio/dad.mp3",
    options: ["ضُ", "طُ", "ظُ"],
    description: "Dad with short 'u'"
  },

  // Ta (ط)
  {
    letter: "طَ",
    name: "Ta with Fatha",
    transliteration: "ṭa",
    sound: "ṭa",
    vowel: "fatha",
    audio: "/audio/ta2.mp3",
    options: ["طَ", "ظَ", "عَ"],
    description: "Ta with short 'a'"
  },
  {
    letter: "طِ",
    name: "Ta with Kasra",
    transliteration: "ṭi",
    sound: "ṭi",
    vowel: "kasra",
    audio: "/audio/ta2.mp3",
    options: ["طِ", "ظِ", "عِ"],
    description: "Ta with short 'i'"
  },
  {
    letter: "طُ",
    name: "Ta with Damma",
    transliteration: "ṭu",
    sound: "ṭu",
    vowel: "damma",
    audio: "/audio/ta2.mp3",
    options: ["طُ", "ظُ", "عُ"],
    description: "Ta with short 'u'"
  },

  // Dha (ظ)
  {
    letter: "ظَ",
    name: "Dha with Fatha",
    transliteration: "ẓa",
    sound: "ẓa",
    vowel: "fatha",
    audio: "/audio/dha.mp3",
    options: ["ظَ", "عَ", "غَ"],
    description: "Dha with short 'a'"
  },
  {
    letter: "ظِ",
    name: "Dha with Kasra",
    transliteration: "ẓi",
    sound: "ẓi",
    vowel: "kasra",
    audio: "/audio/dha.mp3",
    options: ["ظِ", "عِ", "غِ"],
    description: "Dha with short 'i'"
  },
  {
    letter: "ظُ",
    name: "Dha with Damma",
    transliteration: "ẓu",
    sound: "ẓu",
    vowel: "damma",
    audio: "/audio/dha.mp3",
    options: ["ظُ", "عُ", "غُ"],
    description: "Dha with short 'u'"
  },

  // Ayn (ع)
  {
    letter: "عَ",
    name: "Ayn with Fatha",
    transliteration: "ʿa",
    sound: "ʿa",
    vowel: "fatha",
    audio: "/audio/ayn.mp3",
    options: ["عَ", "غَ", "فَ"],
    description: "Ayn with short 'a'"
  },
  {
    letter: "عِ",
    name: "Ayn with Kasra",
    transliteration: "ʿi",
    sound: "ʿi",
    vowel: "kasra",
    audio: "/audio/ayn.mp3",
    options: ["عِ", "غِ", "فِ"],
    description: "Ayn with short 'i'"
  },
  {
    letter: "عُ",
    name: "Ayn with Damma",
    transliteration: "ʿu",
    sound: "ʿu",
    vowel: "damma",
    audio: "/audio/ayn.mp3",
    options: ["عُ", "غُ", "فُ"],
    description: "Ayn with short 'u'"
  },

  // Ghayn (غ)
  {
    letter: "غَ",
    name: "Ghayn with Fatha",
    transliteration: "gha",
    sound: "gha",
    vowel: "fatha",
    audio: "/audio/ghayn.mp3",
    options: ["غَ", "فَ", "قَ"],
    description: "Ghayn with short 'a'"
  },
  {
    letter: "غِ",
    name: "Ghayn with Kasra",
    transliteration: "ghi",
    sound: "ghi",
    vowel: "kasra",
    audio: "/audio/ghayn.mp3",
    options: ["غِ", "فِ", "قِ"],
    description: "Ghayn with short 'i'"
  },
  {
    letter: "غُ",
    name: "Ghayn with Damma",
    transliteration: "ghu",
    sound: "ghu",
    vowel: "damma",
    audio: "/audio/ghayn.mp3",
    options: ["غُ", "فُ", "قُ"],
    description: "Ghayn with short 'u'"
  },

  // Fa (ف)
  {
    letter: "فَ",
    name: "Fa with Fatha",
    transliteration: "fa",
    sound: "fa",
    vowel: "fatha",
    audio: "/audio/fa.mp3",
    options: ["فَ", "قَ", "كَ"],
    description: "Fa with short 'a'"
  },
  {
    letter: "فِ",
    name: "Fa with Kasra",
    transliteration: "fi",
    sound: "fi",
    vowel: "kasra",
    audio: "/audio/fa.mp3",
    options: ["فِ", "قِ", "كِ"],
    description: "Fa with short 'i'"
  },
  {
    letter: "فُ",
    name: "Fa with Damma",
    transliteration: "fu",
    sound: "fu",
    vowel: "damma",
    audio: "/audio/fa.mp3",
    options: ["فُ", "قُ", "كُ"],
    description: "Fa with short 'u'"
  },

  // Qaf (ق)
  {
    letter: "قَ",
    name: "Qaf with Fatha",
    transliteration: "qa",
    sound: "qa",
    vowel: "fatha",
    audio: "/audio/qaf.mp3",
    options: ["قَ", "كَ", "لَ"],
    description: "Qaf with short 'a'"
  },
  {
    letter: "قِ",
    name: "Qaf with Kasra",
    transliteration: "qi",
    sound: "qi",
    vowel: "kasra",
    audio: "/audio/qaf.mp3",
    options: ["قِ", "كِ", "لِ"],
    description: "Qaf with short 'i'"
  },
  {
    letter: "قُ",
    name: "Qaf with Damma",
    transliteration: "qu",
    sound: "qu",
    vowel: "damma",
    audio: "/audio/qaf.mp3",
    options: ["قُ", "كُ", "لُ"],
    description: "Qaf with short 'u'"
  },

  // Kaf (ك)
  {
    letter: "كَ",
    name: "Kaf with Fatha",
    transliteration: "ka",
    sound: "ka",
    vowel: "fatha",
    audio: "/audio/kaf.mp3",
    options: ["كَ", "لَ", "مَ"],
    description: "Kaf with short 'a'"
  },
  {
    letter: "كِ",
    name: "Kaf with Kasra",
    transliteration: "ki",
    sound: "ki",
    vowel: "kasra",
    audio: "/audio/kaf.mp3",
    options: ["كِ", "لِ", "مِ"],
    description: "Kaf with short 'i'"
  },
  {
    letter: "كُ",
    name: "Kaf with Damma",
    transliteration: "ku",
    sound: "ku",
    vowel: "damma",
    audio: "/audio/kaf.mp3",
    options: ["كُ", "لُ", "مُ"],
    description: "Kaf with short 'u'"
  },

  // Lam (ل)
  {
    letter: "لَ",
    name: "Lam with Fatha",
    transliteration: "la",
    sound: "la",
    vowel: "fatha",
    audio: "/audio/lam.mp3",
    options: ["لَ", "مَ", "نَ"],
    description: "Lam with short 'a'"
  },
  {
    letter: "لِ",
    name: "Lam with Kasra",
    transliteration: "li",
    sound: "li",
    vowel: "kasra",
    audio: "/audio/lam.mp3",
    options: ["لِ", "مِ", "نِ"],
    description: "Lam with short 'i'"
  },
  {
    letter: "لُ",
    name: "Lam with Damma",
    transliteration: "lu",
    sound: "lu",
    vowel: "damma",
    audio: "/audio/lam.mp3",
    options: ["لُ", "مُ", "نُ"],
    description: "Lam with short 'u'"
  },

  // Meem (م)
  {
    letter: "مَ",
    name: "Meem with Fatha",
    transliteration: "ma",
    sound: "ma",
    vowel: "fatha",
    audio: "/audio/meem.mp3",
    options: ["مَ", "نَ", "هَ"],
    description: "Meem with short 'a'"
  },
  {
    letter: "مِ",
    name: "Meem with Kasra",
    transliteration: "mi",
    sound: "mi",
    vowel: "kasra",
    audio: "/audio/meem.mp3",
    options: ["مِ", "نِ", "هِ"],
    description: "Meem with short 'i'"
  },
  {
    letter: "مُ",
    name: "Meem with Damma",
    transliteration: "mu",
    sound: "mu",
    vowel: "damma",
    audio: "/audio/meem.mp3",
    options: ["مُ", "نُ", "هُ"],
    description: "Meem with short 'u'"
  },

  // Noon (ن)
  {
    letter: "نَ",
    name: "Noon with Fatha",
    transliteration: "na",
    sound: "na",
    vowel: "fatha",
    audio: "/audio/noon.mp3",
    options: ["نَ", "هَ", "و"],
    description: "Noon with short 'a'"
  },
  {
    letter: "نِ",
    name: "Noon with Kasra",
    transliteration: "ni",
    sound: "ni",
    vowel: "kasra",
    audio: "/audio/noon.mp3",
    options: ["نِ", "هِ", "و"],
    description: "Noon with short 'i'"
  },
  {
    letter: "نُ",
    name: "Noon with Damma",
    transliteration: "nu",
    sound: "nu",
    vowel: "damma",
    audio: "/audio/noon.mp3",
    options: ["نُ", "هُ", "و"],
    description: "Noon with short 'u'"
  },

  // Ha (ه)
  {
    letter: "هَ",
    name: "Ha with Fatha",
    transliteration: "ha",
    sound: "ha",
    vowel: "fatha",
    audio: "/audio/ha2.mp3",
    options: ["هَ", "و", "يَ"],
    description: "Ha with short 'a'"
  },
  {
    letter: "هِ",
    name: "Ha with Kasra",
    transliteration: "hi",
    sound: "hi",
    vowel: "kasra",
    audio: "/audio/ha2.mp3",
    options: ["هِ", "و", "يِ"],
    description: "Ha with short 'i'"
  },
  {
    letter: "هُ",
    name: "Ha with Damma",
    transliteration: "hu",
    sound: "hu",
    vowel: "damma",
    audio: "/audio/ha2.mp3",
    options: ["هُ", "و", "يُ"],
    description: "Ha with short 'u'"
  },

  // Waw (و)
  {
    letter: "و",
    name: "Waw",
    transliteration: "w",
    sound: "w",
    vowel: "none",
    audio: "/audio/waw.mp3",
    options: ["و", "ي", "ا"],
    description: "Consonant 'w'"
  },
  {
    letter: "وَ",
    name: "Waw with Fatha",
    transliteration: "wa",
    sound: "wa",
    vowel: "fatha",
    audio: "/audio/waw.mp3",
    options: ["وَ", "يَ", "اَ"],
    description: "Waw with short 'a'"
  },
  {
    letter: "وِ",
    name: "Waw with Kasra",
    transliteration: "wi",
    sound: "wi",
    vowel: "kasra",
    audio: "/audio/waw.mp3",
    options: ["وِ", "يِ", "اِ"],
    description: "Waw with short 'i'"
  },
  {
    letter: "وُ",
    name: "Waw with Damma",
    transliteration: "wu",
    sound: "wu",
    vowel: "damma",
    audio: "/audio/waw.mp3",
    options: ["وُ", "يُ", "اُ"],
    description: "Waw with short 'u'"
  },

  // Ya (ي)
  {
    letter: "ي",
    name: "Ya",
    transliteration: "y",
    sound: "y",
    vowel: "none",
    audio: "/audio/ya.mp3",
    options: ["ي", "ا", "ب"],
    description: "Consonant 'y'"
  },
  {
    letter: "يَ",
    name: "Ya with Fatha",
    transliteration: "ya",
    sound: "ya",
    vowel: "fatha",
    audio: "/audio/ya.mp3",
    options: ["يَ", "اَ", "بَ"],
    description: "Ya with short 'a'"
  },
  {
    letter: "يِ",
    name: "Ya with Kasra",
    transliteration: "yi",
    sound: "yi",
    vowel: "kasra",
    audio: "/audio/ya.mp3",
    options: ["يِ", "اِ", "بِ"],
    description: "Ya with short 'i'"
  },
  {
    letter: "يُ",
    name: "Ya with Damma",
    transliteration: "yu",
    sound: "yu",
    vowel: "damma",
    audio: "/audio/ya.mp3",
    options: ["يُ", "اُ", "بُ"],
    description: "Ya with short 'u'"
  }
];
