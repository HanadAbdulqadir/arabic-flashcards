import { useState, useEffect, useCallback } from "react";
import { arabicLettersEnhanced } from "./data/arabicLettersEnhanced";

function AppEnhanced() {
  // State management
  const [mainDeck, setMainDeck] = useState([]);
  const [wrongStack, setWrongStack] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);

  // Helper function to generate random options for each card
  const generateOptions = (correctLetter) => {
    const allArabicLetters = [
      "ا", "ب", "ت", "ث", "ج", "ح", "خ", "د", "ذ", "ر", "ز", "س", "ش", "ص", "ض", "ط", "ظ", "ع", "غ", "ف", "ق", "ك", "ل", "م", "ن", "ه", "و", "ي",
      "اَ", "بَ", "تَ", "ثَ", "جَ", "حَ", "خَ", "دَ", "ذَ", "رَ", "زَ", "سَ", "شَ", "صَ", "ضَ", "طَ", "ظَ", "عَ", "غَ", "فَ", "قَ", "كَ", "لَ", "مَ", "نَ", "هَ", "وَ", "يَ",
      "اِ", "بِ", "تِ", "ثِ", "جِ", "حِ", "خِ", "دِ", "ذِ", "رِ", "زِ", "سِ", "شِ", "صِ", "ضِ", "طِ", "ظِ", "عِ", "غِ", "فِ", "قِ", "كِ", "لِ", "مِ", "نِ", "هِ", "وِ", "يِ",
      "اُ", "بُ", "تُ", "ثُ", "جُ", "حُ", "خُ", "دُ", "ذُ", "رُ", "زُ", "سُ", "شُ", "صُ", "ضُ", "طُ", "ظُ", "عُ", "غُ", "فُ", "قُ", "كُ", "لُ", "مُ", "نُ", "هُ", "وُ", "يُ"
    ];
    
    const otherLetters = allArabicLetters.filter(letter => letter !== correctLetter);
    const shuffled = [...otherLetters].sort(() => Math.random() - 0.5).slice(0, 5); // Get 5 random letters
    const options = [correctLetter, ...shuffled.slice(0, 2)]; // Include correct + 2 random
    return options.sort(() => Math.random() - 0.5); // Shuffle the final options
  };

  const initializeDeck = useCallback(() => {
    const enhancedCards = arabicLettersEnhanced.map(card => ({
      ...card,
      options: generateOptions(card.letter) // Generate random options for each card
    }));
    
    const shuffled = enhancedCards
      .map(card => ({ ...card })) // Deep copy to avoid mutation
      .sort(() => Math.random() - 0.5);
    
    setMainDeck(shuffled);
    setWrongStack([]);
    setCurrentCard(shuffled[0]);
    setFeedback("");
    setScore(0);
    setAttempts(0);
    setShowHint(false);
    setSessionComplete(false);
  }, []);

  // Initialize the deck on component mount
  useEffect(() => {
    initializeDeck();
  }, [initializeDeck]);

  const handleAnswer = (selected) => {
    if (!currentCard) return;

    setAttempts(attempts + 1);
    const isCorrect = selected === currentCard.letter;
    
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

    // Move to next card
    const newMainDeck = [...mainDeck];
    newMainDeck.shift(); // Remove current card from main deck

    if (isCorrect) {
      // If correct and not mastered, keep in main deck for now
      if (updatedCard.mastery === 0) {
        newMainDeck.push(updatedCard);
      }
    } else {
      // If incorrect, add to wrong stack
      const newWrongStack = [...wrongStack, updatedCard];
      setWrongStack(newWrongStack);
    }

    // Check if session is complete
    if (newMainDeck.length === 0 && wrongStack.length === 0) {
      setSessionComplete(true);
      setCurrentCard(null);
    } else if (newMainDeck.length === 0 && wrongStack.length > 0) {
      // Move wrong stack to main deck and shuffle
      const shuffledWrongStack = [...wrongStack].sort(() => Math.random() - 0.5);
      setMainDeck(shuffledWrongStack);
      setWrongStack([]);
      setCurrentCard(shuffledWrongStack[0]);
    } else {
      setMainDeck(newMainDeck);
      setCurrentCard(newMainDeck[0]);
    }

    // Clear feedback after delay if correct
    if (isCorrect) {
      setTimeout(() => {
        setFeedback("");
        setShowHint(false);
      }, 1000);
    }
  };

  const playAudio = () => {
    if (!currentCard) return;
    
    try {
      new Audio(currentCard.audio).play();
    } catch (error) {
      alert(`Playing sound for ${currentCard.name} (${currentCard.letter})\n\nNote: Add real audio files to public/audio/ folder`);
    }
  };

  const restart = () => {
    initializeDeck();
  };

  // Calculate statistics
  const totalCards = arabicLettersEnhanced.length;
  const masteredCards = arabicLettersEnhanced.filter(card => card.mastery === 1).length;
  const accuracy = attempts > 0 ? Math.round((score / attempts) * 100) : 0;
  const remainingCards = mainDeck.length + wrongStack.length;

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
    maxWidth: '24rem',
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

  const optionButtonStyle = {
    fontSize: '1.875rem',
    backgroundColor: '#f3f4f6',
    border: 'none',
    padding: '0.75rem',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
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

  if (sessionComplete) {
    return (
      <div style={containerStyle}>
        <div style={cardStyle}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#10b981' }}>
            🎉 Session Complete!
          </h1>
          <div style={statsStyle}>
            <p><strong>Final Score:</strong> {score}/{attempts}</p>
            <p><strong>Accuracy:</strong> {accuracy}%</p>
            <p><strong>Mastered Cards:</strong> {masteredCards}/{totalCards}</p>
          </div>
          <button
            onClick={restart}
            style={{ 
              ...buttonStyle, 
              backgroundColor: '#10b981',
              marginTop: '1rem'
            }}
          >
            🔄 Start New Session
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
        {/* Progress Stats */}
        <div style={statsStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
            <div>
              <strong>Progress:</strong> {masteredCards}/{totalCards} mastered
            </div>
            <div>
              <strong>Accuracy:</strong> {accuracy}%
            </div>
          </div>
          <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#6b7280' }}>
            Remaining: {remainingCards} cards • Score: {score}/{attempts}
          </div>
        </div>

        {/* Current Card */}
        <h1 style={letterStyle}>
          {currentCard.letter}
          {currentCard.mastery === 1 && <span style={masteryBadgeStyle}>Mastered</span>}
        </h1>
        
        <div style={infoStyle}>
          <p><strong>{currentCard.name}</strong> - {currentCard.transliteration}</p>
          <p>Sound: {currentCard.sound}</p>
          {currentCard.vowel !== "none" && <p>Vowel: {currentCard.vowel}</p>}
          <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
            Streak: {currentCard.streak} • Need 2 for mastery
          </p>
        </div>

        <button
          onClick={playAudio}
          style={buttonStyle}
          onMouseOver={(e) => e.target.style.backgroundColor = '#4338ca'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#4f46e5'}
        >
          🔊 Hear Sound
        </button>

        <div style={optionsContainerStyle}>
          {currentCard.options.map((opt) => (
            <button
              key={opt}
              onClick={() => handleAnswer(opt)}
              style={optionButtonStyle}
              onMouseOver={(e) => e.target.style.backgroundColor = '#e5e7eb'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#f3f4f6'}
            >
              {opt}
            </button>
          ))}
        </div>

        {feedback && (
          <p style={{ 
            marginTop: '1.5rem', 
            fontSize: '1.25rem', 
            fontWeight: '500',
            color: feedback.includes('✅') ? '#10b981' : '#ef4444'
          }}>
            {feedback}
          </p>
        )}

        {showHint && (
          <p style={{ 
            marginTop: '1rem', 
            fontSize: '1rem', 
            color: '#f59e0b', 
            fontStyle: 'italic' 
          }}>
            💡 Hint: The correct letter is "{currentCard.letter}"
          </p>
        )}

        <div style={{ marginTop: '1.5rem' }}>
          <button
            onClick={restart}
            style={{ 
              padding: '0.5rem 1rem', 
              backgroundColor: '#ef4444', 
              color: 'white', 
              border: 'none', 
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}
          >
            🔄 Restart Session
          </button>
        </div>
      </div>
    </div>
  );
}

export default AppEnhanced;
