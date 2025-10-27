import React from 'react';

const CardDisplay = ({ card, onPlayAudio, showHint, feedback, selectedAnswer, isCorrectAnswer }) => {
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

  return (
    <div>
      {/* Main Card Content */}
      <div style={letterStyle}>
        {getDisplayText(card)}
      </div>

      {/* English Sound Transliteration */}
      {getTransliteration(card) && (
        <div style={transliterationStyle}>
          🔊 Sound: {getTransliteration(card)}
        </div>
      )}

      {/* Audio Button */}
      <button onClick={onPlayAudio} style={buttonStyle}>
        🔊 Play Audio
      </button>

      {/* Description */}
      <div style={infoStyle}>
        {getDescription(card)}
      </div>

      {/* Hint */}
      {showHint && (
        <div style={{ color: '#ef4444', marginBottom: '1rem', fontStyle: 'italic' }}>
          Hint: {card.transliteration || card.meaning || "Listen carefully!"}
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
    </div>
  );
};

export default CardDisplay;
