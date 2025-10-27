import { arabicLettersEnhanced } from "../data/arabicLettersEnhanced";
import { arabicLongVowels } from "../data/arabicLongVowels";
import { arabicSukunTanwin } from "../data/arabicSukunTanwin";
import { arabicSimpleWords } from "../data/arabicSimpleWords";
import { arabicWordRoots } from "../data/arabicWordRoots";
import { arabicSimpleSentences } from "../data/arabicSimpleSentences";
import { arabicAdvancedVocabulary } from "../data/arabicAdvancedVocabulary";
import { arabicListeningComprehension } from "../data/arabicListeningComprehension";
import { arabicQuranicMastery } from "../data/arabicQuranicMastery";

// Helper function to generate options based on difficulty and stage
export const generateOptions = (correctAnswer, difficultyLevel, currentStage) => {
  let allOptions = [];
  
  // Get appropriate options based on stage
  switch(currentStage) {
    case "alphabet":
    case "long_vowels":
    case "sukun_tanwin":
      const allArabicLetters = [
        "ا", "ب", "ت", "ث", "ج", "ح", "خ", "د", "ذ", "ر", "ز", "س", "ش", "ص", "ض", "ط", "ظ", "ع", "غ", "ف", "ق", "ك", "ل", "م", "ن", "ه", "و", "ي",
        "اَ", "بَ", "تَ", "ثَ", "جَ", "حَ", "خَ", "دَ", "ذَ", "رَ", "زَ", "سَ", "شَ", "صَ", "ضَ", "طَ", "ظَ", "عَ", "غَ", "فَ", "قَ", "كَ", "لَ", "مَ", "نَ", "هَ", "وَ", "يَ",
        "اِ", "بِ", "تِ", "ثِ", "جِ", "حِ", "خِ", "دِ", "ذِ", "رِ", "زِ", "سِ", "شِ", "صِ", "ضِ", "طِ", "ظِ", "عِ", "غِ", "فِ", "قِ", "كِ", "لِ", "مِ", "نِ", "هِ", "وِ", "يِ",
        "اُ", "بُ", "تُ", "ثُ", "جُ", "حُ", "خُ", "دُ", "ذُ", "رُ", "زُ", "سُ", "شُ", "صُ", "ضُ", "طُ", "ظُ", "عُ", "غُ", "فُ", "قُ", "كُ", "لُ", "مُ", "نُ", "هُ", "وُ", "يُ"
      ];
      allOptions = allArabicLetters;
      break;
    
    case "simple_words":
    case "advanced_vocabulary":
      // For words, use other words from the same dataset
      const currentDataset = currentStage === "simple_words" ? arabicSimpleWords : arabicAdvancedVocabulary;
      allOptions = currentDataset.map(item => item.arabic);
      break;
    
    case "word_roots":
      allOptions = arabicWordRoots.map(item => item.arabic);
      break;
    
    case "simple_sentences":
      allOptions = arabicSimpleSentences.map(item => item.arabic);
      break;
    
    case "listening_comprehension":
      // For listening exercises, use the options provided in the dataset
      return ["Option 1", "Option 2", "Option 3", "Option 4"];
    
    case "quranic_mastery":
      allOptions = arabicQuranicMastery.map(item => item.arabic);
      break;
    
    default:
      allOptions = ["Option 1", "Option 2", "Option 3", "Option 4"];
  }
  
  let filteredOptions = allOptions;
  
  // Filter options based on difficulty
  if (difficultyLevel === "beginner") {
    // Beginner: Only show letters without vowels (for alphabet stages)
    if (currentStage === "alphabet") {
      filteredOptions = allOptions.filter(option => 
        !option.includes("َ") && !option.includes("ِ") && !option.includes("ُ")
      );
    }
  } else if (difficultyLevel === "intermediate") {
    // Intermediate: Show letters with same vowel as correct answer
    if (currentStage === "alphabet") {
      const vowel = correctAnswer.includes("َ") ? "َ" : 
                   correctAnswer.includes("ِ") ? "ِ" : 
                   correctAnswer.includes("ُ") ? "ُ" : "";
      
      if (vowel) {
        filteredOptions = allOptions.filter(option => option.includes(vowel));
      }
    }
  }
  // Advanced: Use all options (no filtering)
  
  const otherOptions = filteredOptions.filter(option => option !== correctAnswer);
  const shuffled = [...otherOptions].sort(() => Math.random() - 0.5).slice(0, 5);
  const options = [correctAnswer, ...shuffled.slice(0, 2)];
  return options.sort(() => Math.random() - 0.5);
};

// Get all cards for a specific stage
export const getAllCards = (stageName) => {
  switch(stageName) {
    case "alphabet":
      return [...arabicLettersEnhanced];
    case "long_vowels":
      return [...arabicLongVowels];
    case "sukun_tanwin":
      return [...arabicSukunTanwin];
    case "simple_words":
      return [...arabicSimpleWords];
    case "word_roots":
      return [...arabicWordRoots];
    case "simple_sentences":
      return [...arabicSimpleSentences];
    case "advanced_vocabulary":
      return [...arabicAdvancedVocabulary];
    case "listening_comprehension":
      return [...arabicListeningComprehension];
    case "quranic_mastery":
      return [...arabicQuranicMastery];
    default:
      return [...arabicLettersEnhanced];
  }
};

// Initialize deck with options
export const initializeDeck = (difficultyLevel, stageName) => {
  const allCards = getAllCards(stageName);
  
  const enhancedCards = allCards.map(card => ({
    ...card,
    options: generateOptions(
      card.letter || card.arabic || card.correctAnswer, 
      difficultyLevel, 
      stageName
    )
  }));
  
  return enhancedCards
    .map(card => ({ ...card }))
    .sort(() => Math.random() - 0.5);
};

// Calculate statistics
export const calculateStatistics = (stage, mainDeck, wrongStack, score, attempts, getAllCards) => {
  const totalCards = getAllCards(stage).length;
  const masteredCards = getAllCards(stage).filter(card => card.mastery === 1).length;
  const accuracy = attempts > 0 ? Math.round((score / attempts) * 100) : 0;
  const remainingCards = mainDeck.length + wrongStack.length;
  
  return { totalCards, masteredCards, accuracy, remainingCards };
};
