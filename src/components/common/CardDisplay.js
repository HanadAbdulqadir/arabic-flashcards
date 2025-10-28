import React, { useState } from 'react';
import { getThemeStyles } from '../../utils/themeManager';
import LetterAnimation from '../learning/LetterAnimation';
import PronunciationVisualizer from '../learning/PronunciationVisualizer';

const CardDisplay = ({ 
  card, 
  onPlayAudio, 
  showHint, 
  feedback, 
  selectedAnswer, 
  isCorrectAnswer,
  currentTheme = 'blue'
}) => {
  const [showLetterAnimation, setShowLetterAnimation] = useState(false);
  const [showPronunciation, setShowPronunciation] = useState(false);
  
  const themeStyles = getThemeStyles(currentTheme);

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

  // Check if card is suitable for letter animation
  const isLetterCard = card.letter && card.letter.length === 1;

  // Check if card is suitable for pronunciation visualization
  const isPronunciationCard = card.arabic || card.letter;

  const letterStyle = {
    fontSize: '4.5rem',
    marginBottom: '1rem',
    fontWeight: 'bold',
    fontFamily: 'serif',
    color: themeStyles.theme.text,
  };

  const infoStyle = {
    fontSize: '1rem',
    color: themeStyles.theme.secondary,
    marginBottom: '1rem',
    fontStyle: 'italic',
  };

  const transliterationStyle = {
    fontSize: '1.25rem',
    color: themeStyles.theme.primary,
    marginBottom: '1rem',
    fontWeight: 'bold',
    backgroundColor: `${themeStyles.theme.primary}10`,
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    display: 'inline-block',
  };

  const buttonStyle = {
    marginBottom: '0.5rem',
    padding: '0.5rem 1rem',
    backgroundColor: themeStyles.theme.primary,
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    fontSize: '0.875rem',
    marginRight: '0.5rem',
    transition: 'background-color 0.2s',
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: themeStyles.theme.secondary
  };

  const multimediaButtonStyle = {
    ...buttonStyle,
    backgroundColor: themeStyles.theme.success,
    fontSize: '0.75rem',
    padding: '0.375rem 0.75rem'
  };

  const multimediaSectionStyle = {
    marginTop: '1rem',
    padding: '1rem',
    backgroundColor: `${themeStyles.theme.primary}05`,
    borderRadius: '0.75rem',
    border: `1px solid ${themeStyles.theme.primary}20`
  };

  const multimediaHeaderStyle = {
    fontSize: '0.875rem',
    fontWeight: 'bold',
    color: themeStyles.theme.text,
    marginBottom: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
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
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={onPlayAudio} style={buttonStyle}>
          🔊 Play Audio
        </button>

        {/* Multimedia Learning Tools */}
        {(isLetterCard || isPronunciationCard) && (
          <div style={multimediaSectionStyle}>
            <div style={multimediaHeaderStyle}>
              🎯 Learning Tools
            </div>
            
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {isLetterCard && (
                <button 
                  onClick={() => setShowLetterAnimation(!showLetterAnimation)}
                  style={multimediaButtonStyle}
                >
                  {showLetterAnimation ? '✍️ Hide Writing' : '✍️ Show Writing'}
                </button>
              )}
              
              {isPronunciationCard && (
                <button 
                  onClick={() => setShowPronunciation(!showPronunciation)}
                  style={multimediaButtonStyle}
                >
                  {showPronunciation ? '🔊 Hide Sound' : '🔊 Show Sound'}
                </button>
              )}
            </div>

            {/* Letter Animation */}
            {showLetterAnimation && isLetterCard && (
              <div style={{ marginTop: '1rem' }}>
                <LetterAnimation
                  letter={card.letter}
                  position={card.position || 'isolated'}
                  currentTheme={currentTheme}
                  interactive={true}
                  onAnimationComplete={() => console.log('Animation complete')}
                />
              </div>
            )}

            {/* Pronunciation Visualization */}
            {showPronunciation && isPronunciationCard && (
              <div style={{ marginTop: '1rem' }}>
                <PronunciationVisualizer
                  text={card.arabic || card.letter}
                  phonetic={card.transliteration || card.sound}
                  currentTheme={currentTheme}
                  interactive={true}
                  onPlayComplete={() => console.log('Playback complete')}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Description */}
      <div style={infoStyle}>
        {getDescription(card)}
      </div>

      {/* Hint */}
      {showHint && (
        <div style={{ 
          color: themeStyles.theme.error, 
          marginBottom: '1rem', 
          fontStyle: 'italic',
          padding: '0.75rem',
          backgroundColor: `${themeStyles.theme.error}10`,
          borderRadius: '0.5rem'
        }}>
          💡 Hint: {card.transliteration || card.meaning || "Listen carefully!"}
        </div>
      )}

      {/* Feedback */}
      {feedback && (
        <div style={{ 
          color: feedback.includes('✅') ? themeStyles.theme.success : themeStyles.theme.error, 
          marginBottom: '1rem', 
          fontSize: '1.25rem',
          fontWeight: 'bold',
          padding: '0.75rem',
          backgroundColor: feedback.includes('✅') ? `${themeStyles.theme.success}10` : `${themeStyles.theme.error}10`,
          borderRadius: '0.5rem',
          textAlign: 'center'
        }}>
          {feedback}
        </div>
      )}

      {/* Learning Tips */}
      {!showHint && !feedback && (
        <div style={{
          fontSize: '0.75rem',
          color: themeStyles.theme.text,
          opacity: 0.7,
          textAlign: 'center',
          marginTop: '1rem',
          padding: '0.5rem',
          backgroundColor: `${themeStyles.theme.primary}05`,
          borderRadius: '0.375rem'
        }}>
          💡 Use the learning tools above to practice writing and pronunciation
        </div>
      )}
    </div>
  );
};

export default CardDisplay;
