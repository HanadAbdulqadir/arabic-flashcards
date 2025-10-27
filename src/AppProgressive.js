import { useState, useEffect, useCallback } from "react";
import { arabicLettersEnhanced } from "./data/arabicLettersEnhanced";
import { arabicLongVowels } from "./data/arabicLongVowels";
import { arabicSukunTanwin } from "./data/arabicSukunTanwin";
import { arabicSimpleWords } from "./data/arabicSimpleWords";
import { arabicWordRoots } from "./data/arabicWordRoots";
import { arabicSimpleSentences } from "./data/arabicSimpleSentences";
import { arabicAdvancedVocabulary } from "./data/arabicAdvancedVocabulary";
import { arabicListeningComprehension } from "./data/arabicListeningComprehension";
import { arabicQuranicMastery } from "./data/arabicQuranicMastery";

function AppProgressive() {
  // State management
  const [mainDeck, setMainDeck] = useState([]);
  const [wrongStack, setWrongStack] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [difficulty, setDifficulty] = useState("beginner"); // beginner, intermediate, advanced
  const [showDifficultySelector, setShowDifficultySelector] = useState(true);
  const [stage, setStage] = useState("alphabet"); // Current learning stage
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(null);

  // Combine all datasets for comprehensive learning
  const getAllCards = (stageName) => {
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

  // Helper function to generate options based on difficulty and stage
  const generateOptions = (correctAnswer, difficultyLevel, currentStage) => {
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
        if (currentCard && currentCard.options) {
          return currentCard.options;
        }
        allOptions = ["Option 1", "Option 2", "Option 3", "Option 4"];
        break;
      
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

  const initializeDeck = useCallback((difficultyLevel = difficulty, stageName = stage) => {
    // Get ALL cards for the selected stage (no filtering by difficulty)
    const allCards = getAllCards(stageName);
    
    const enhancedCards = allCards.map(card => ({
      ...card,
      options: generateOptions(
        card.letter || card.arabic || card.correctAnswer, 
        difficultyLevel, 
        stageName
      )
    }));
    
    const shuffled = enhancedCards
      .map(card => ({ ...card }))
      .sort(() => Math.random() - 0.5);
    
    setMainDeck(shuffled);
    setWrongStack([]);
    setCurrentCard(shuffled[0]);
    setFeedback("");
    setScore(0);
    setAttempts(0);
    setShowHint(false);
    setSessionComplete(false);
    setSelectedAnswer(null);
    setIsCorrectAnswer(null);
  }, [difficulty, stage]);

  // Initialize the deck on component mount
  useEffect(() => {
    if (!showDifficultySelector) {
      initializeDeck();
    }
  }, [showDifficultySelector, initializeDeck]);

  const handleAnswer = (selected) => {
    if (!currentCard) return;

    setSelectedAnswer(selected);
    setAttempts(attempts + 1);
    
    // Determine correct answer based on card type
    let correctAnswer;
    if (currentCard.type === "listening_letter" || 
        currentCard.type === "listening_syllable" || 
        currentCard.type === "listening_word" || 
        currentCard.type === "listening_sentence" ||
        currentCard.type === "listening_context") {
      correctAnswer = currentCard.correctAnswer;
    } else {
      correctAnswer = currentCard.letter || currentCard.arabic;
    }
    
    const isCorrect = selected === correctAnswer;
    setIsCorrectAnswer(isCorrect);
    
    // Update card mastery and streak
    const updatedCard = { ...currentCard };
    if (isCorrect) {
      updatedCard.streak += 1;
      if (updatedCard.streak >= 2) {
        updatedCard.mastery = 1;
      }
      updatedCard.lastReviewed = new Date().toISOString();
      setFeedback("✅ Correct!");
      setScore(score + 1);
    } else {
      updatedCard.streak = 0;
      updatedCard.mastery = 0;
      setFeedback("❌ Try again");
      setShowHint(true);
    }

    // Move to next card after delay to show feedback
    setTimeout(() => {
      const newMainDeck = [...mainDeck];
      newMainDeck.shift();

      if (isCorrect) {
        if (updatedCard.mastery === 0) {
          newMainDeck.push(updatedCard);
        }
      } else {
        const newWrongStack = [...wrongStack, updatedCard];
        setWrongStack(newWrongStack);
      }

      // Check if session is complete
      if (newMainDeck.length === 0 && wrongStack.length === 0) {
        setSessionComplete(true);
        setCurrentCard(null);
      } else if (newMainDeck.length === 0 && wrongStack.length > 0) {
        const shuffledWrongStack = [...wrongStack].sort(() => Math.random() - 0.5);
        setMainDeck(shuffledWrongStack);
        setWrongStack([]);
        setCurrentCard(shuffledWrongStack[0]);
      } else {
        setMainDeck(newMainDeck);
        setCurrentCard(newMainDeck[0]);
      }

      setFeedback("");
      setShowHint(false);
      setSelectedAnswer(null);
      setIsCorrectAnswer(null);
    }, 1500);
  };

  const playAudio = () => {
    if (!currentCard) return;
    
    try {
      if (currentCard.audio) {
        new Audio(currentCard.audio).play();
      } else {
        alert(`No audio file available for this item.\n\nNote: Add real audio files to public/audio/ folder`);
      }
    } catch (error) {
      alert(`Error playing audio: ${error.message}`);
    }
  };

  const restart = () => {
    setShowDifficultySelector(true);
  };

  const selectDifficulty = (level, stageName) => {
    setDifficulty(level);
    setStage(stageName);
    setShowDifficultySelector(false);
    initializeDeck(level, stageName);
  };

  // Calculate statistics
  const totalCards = getAllCards(stage).length;
  const masteredCards = getAllCards(stage).filter(card => card.mastery === 1).length;
  const accuracy = attempts > 0 ? Math.round((score / attempts) * 100) : 0;
  const remainingCards = mainDeck.length + wrongStack.length;

  // Get display text based on card type
  const getDisplayText = (card) => {
    if (card.letter) return card.letter;
    if (card.arabic) return card.arabic;
    if (card.type && card.type.includes("listening")) return "🔊 Listen to Audio";
    return "No content";
  };

  // Get description based on card type
  const getDescription = (card) => {
    if (card.type === "listening_letter") return "Identify the letter by its sound";
    if (card.type === "listening_syllable") return "Identify the syllable by its sound";
    if (card.type === "listening_word") return "Identify the word by its pronunciation";
    if (card.type === "listening_sentence") return "Identify the sentence by its pronunciation";
    if (card.type === "listening_context") return card.question || "Understand the meaning from audio";
    if (card.type === "dictation_letter") return "Type the letter you hear";
    if (card.type === "dictation_syllable") return "Type the syllable you hear";
    if (card.type === "dictation_word") return "Type the word you hear";
    if (card.type === "dictation_sentence") return "Type the sentence you hear";
    
    return card.description || card.sound || "";
  };

  // Get transliteration/meaning for display
  const getTransliteration = (card) => {
    if (card.transliteration) return card.transliteration;
    if (card.meaning) return card.meaning;
    if (card.sound) return card.sound;
    return "";
  };

  // Get option button style based on selection
  const getOptionButtonStyle = (option) => {
    const baseStyle = {
      fontSize: '1.875rem',
      backgroundColor: '#f3f4f6',
      border: 'none',
      padding: '0.75rem',
      borderRadius: '0.5rem',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    };

    if (selectedAnswer === option) {
      if (isCorrectAnswer) {
        return { ...baseStyle, backgroundColor: '#10b981', color: 'white' };
      } else {
        return { ...baseStyle, backgroundColor: '#ef4444', color: 'white' };
      }
    }
    
    return baseStyle;
  };

  // Styles
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(to bottom, #e0e7ff, #ffffff)',
    padding: '1rem',
  };

  const cardStyle = {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '1rem',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    textAlign: 'center',
    maxWidth: '32rem',
    width: '100%',
  };

  const letterStyle = {
    fontSize: '4.5rem',
    marginBottom: '1rem',
    fontWeight: 'bold',
    fontFamily: 'serif',
    color: '#1f2937',
  };

  const infoStyle = {
    fontSize: '1rem',
    color: '#6b7280',
    marginBottom: '1rem',
    fontStyle: 'italic',
  };

  const transliterationStyle = {
    fontSize: '1.25rem',
    color: '#4f46e5',
    marginBottom: '1rem',
    fontWeight: 'bold',
    backgroundColor: '#f8fafc',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    display: 'inline-block',
  };

  const buttonStyle = {
    marginBottom: '1.5rem',
    padding: '0.5rem 1.25rem',
    backgroundColor: '#4f46e5',
    color: 'white',
    border: 'none',
    borderRadius: '0.75rem',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.2s',
  };

  const optionsContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '0.75rem',
  };

  const statsStyle = {
    backgroundColor: '#f8fafc',
    padding: '1rem',
    borderRadius: '0.5rem',
    marginBottom: '1rem',
    border: '1px solid #e2e8f0',
  };

  const masteryBadgeStyle = {
    display: 'inline-block',
    padding: '0.25rem 0.5rem',
    backgroundColor: currentCard?.mastery === 1 ? '#10b981' : '#f59e0b',
    color: 'white',
    borderRadius: '0.25rem',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    marginLeft: '0.5rem',
  };

  const stageButtonStyle = {
    padding: '1rem 1.5rem',
    margin: '0.5rem',
    backgroundColor: '#4f46e5',
    color: 'white',
    border: 'none',
    borderRadius: '0.75rem',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    transition: 'background-color 0.2s',
    width: '100%',
    textAlign: 'left',
  };

  if (showDifficultySelector) {
    return (
      <div style={containerStyle}>
        <div style={cardStyle}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#1f2937' }}>
            🎓 Arabic Flashcards - Complete Learning Journey
          </h1>
          <p style={{ marginBottom: '2rem', color: '#6b7280' }}>
            Choose your learning stage and level:
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Stage 1-4: Alphabet & Vowels */}
            <div>
              <h3 style={{ color: '#4f46e5', marginBottom: '0.5rem' }}>📚 Alphabet & Vowels</h3>
              <button onClick={() => selectDifficulty("beginner", "alphabet")} style={stageButtonStyle}>
                🌱 Stage 1-2: Basic Letters & Short Vowels
              </button>
              <button onClick={() => selectDifficulty("intermediate", "long_vowels")} style={stageButtonStyle}>
                🌿 Stage 3: Long Vowels & Shadda
              </button>
              <button onClick={() => selectDifficulty("intermediate", "sukun_tanwin")} style={stageButtonStyle}>
                🌿 Stage 4: Sukun & Tanwin
              </button>
            </div>

            {/* Stage 5-7: Vocabulary & Grammar */}
            <div>
              <h3 style={{ color: '#4f46e5', marginBottom: '0.5rem' }}>📝 Vocabulary & Grammar</h3>
              <button onClick={() => selectDifficulty("intermediate", "simple_words")} style={stageButtonStyle}>
                🌳 Stage 5: Simple Words
              </button>
              <button onClick={() => selectDifficulty("intermediate", "word_roots")} style={stageButtonStyle}>
                🌳 Stage 6: Word Formation & Roots
              </button>
              <button onClick={() => selectDifficulty("intermediate", "simple_sentences")} style={stageButtonStyle}>
                🌳 Stage 7: Simple Sentences
              </button>
            </div>

            {/* Stage 8-10: Advanced & Quranic */}
            <div>
              <h3 style={{ color: '#4f46e5', marginBottom: '0.5rem' }}>🎯 Advanced & Quranic</h3>
              <button onClick={() => selectDifficulty("advanced", "advanced_vocabulary")} style={stageButtonStyle}>
                🌲 Stage 8: Advanced Vocabulary
              </button>
              <button onClick={() => selectDifficulty("advanced", "listening_comprehension")} style={stageButtonStyle}>
                🌲 Stage 9: Listening Comprehension
              </button>
              <button onClick={() => selectDifficulty("advanced", "quranic_mastery")} style={stageButtonStyle}>
                🌲 Stage 10: Quranic Mastery
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (sessionComplete) {
    return (
      <div style={containerStyle}>
        <div style={cardStyle}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#1f2937' }}>
            🎉 Session Complete!
          </h1>
          <div style={statsStyle}>
            <p><strong>Stage:</strong> {stage.replace('_', ' ').toUpperCase()}</p>
            <p><strong>Score:</strong> {score}/{attempts}</p>
            <p><strong>Accuracy:</strong> {accuracy}%</p>
            <p><strong>Mastered:</strong> {masteredCards}/{totalCards}</p>
          </div>
          <button onClick={restart} style={buttonStyle}>
            Start New Session
          </button>
        </div>
      </div>
    );
  }

  if (!currentCard) {
    return (
      <div style={containerStyle}>
        <div style={cardStyle}>
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {/* Statistics */}
        <div style={statsStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong>Stage:</strong> {stage.replace('_', ' ').toUpperCase()}
              <span style={masteryBadgeStyle}>
                {currentCard.mastery === 1 ? 'MASTERED' : 'LEARNING'}
              </span>
            </div>
            <div>
              <strong>Score:</strong> {score}/{attempts} ({accuracy}%)
            </div>
          </div>
          <div style={{ marginTop: '0.5rem' }}>
            <strong>Remaining:</strong> {remainingCards} cards
          </div>
        </div>

        {/* Main Card Content */}
        <div style={letterStyle}>
          {getDisplayText(currentCard)}
        </div>

        {/* English Sound Transliteration */}
        {getTransliteration(currentCard) && (
          <div style={transliterationStyle}>
            🔊 Sound: {getTransliteration(currentCard)}
          </div>
        )}

        {/* Audio Button */}
        <button onClick={playAudio} style={buttonStyle}>
          🔊 Play Audio
        </button>

        {/* Description */}
        <div style={infoStyle}>
          {getDescription(currentCard)}
        </div>

        {/* Hint */}
        {showHint && (
          <div style={{ color: '#ef4444', marginBottom: '1rem', fontStyle: 'italic' }}>
            Hint: {currentCard.transliteration || currentCard.meaning || "Listen carefully!"}
          </div>
        )}

        {/* Feedback */}
        {feedback && (
          <div style={{ 
            color: feedback.includes('✅') ? '#10b981' : '#ef4444', 
            marginBottom: '1rem', 
            fontSize: '1.25rem',
            fontWeight: 'bold'
          }}>
            {feedback}
          </div>
        )}

        {/* Options */}
        <div style={optionsContainerStyle}>
          {currentCard.options && currentCard.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              style={getOptionButtonStyle(option)}
              disabled={selectedAnswer !== null}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Restart Button */}
        <button onClick={restart} style={{ ...buttonStyle, backgroundColor: '#6b7280', marginTop: '1rem' }}>
          🔄 Change Stage
        </button>
      </div>
    </div>
  );
}

export default AppProgressive;
