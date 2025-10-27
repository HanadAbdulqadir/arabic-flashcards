import React from 'react';
import { getThemeStyles } from '../../utils/themeManager';

const StageSelector = ({ onSelectStage, onReturnToHome, currentTheme = 'blue' }) => {
  const themeStyles = getThemeStyles(currentTheme);

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: themeStyles.theme.background,
    padding: '2rem',
    color: themeStyles.theme.text,
    fontFamily: 'Arial, sans-serif'
  };

  const cardStyle = {
    backgroundColor: themeStyles.theme.card,
    padding: '2rem',
    borderRadius: '1rem',
    marginBottom: '2rem',
    width: '100%',
    maxWidth: '800px',
    border: `1px solid ${themeStyles.theme.primary}20`,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    textAlign: 'center'
  };

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: themeStyles.theme.primary,
    textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
  };

  const subtitleStyle = {
    fontSize: '1.25rem',
    opacity: 0.8,
    marginBottom: '2rem',
    color: themeStyles.theme.text
  };

  const sectionStyle = {
    marginBottom: '2rem',
    textAlign: 'left'
  };

  const sectionTitleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: themeStyles.theme.secondary,
    textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
  };

  const buttonStyle = {
    display: 'block',
    width: '100%',
    marginBottom: '0.75rem',
    padding: '1rem 1.5rem',
    backgroundColor: `${themeStyles.theme.primary}15`,
    color: themeStyles.theme.text,
    border: `1px solid ${themeStyles.theme.primary}30`,
    borderRadius: '0.75rem',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    textAlign: 'left',
    backdropFilter: 'blur(5px)'
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: `${themeStyles.theme.primary}25`,
    transform: 'translateY(-2px)',
    boxShadow: `0 4px 15px ${themeStyles.theme.primary}40`
  };

  const [hoveredButton, setHoveredButton] = React.useState(null);

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>🎓 Choose Your Learning Journey</h1>
        <p style={subtitleStyle}>
          Select a stage and difficulty level to begin your Arabic learning adventure
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Stage 1-4: Alphabet & Vowels */}
          <div style={sectionStyle}>
            <h3 style={sectionTitleStyle}>📚 Alphabet & Vowels</h3>
            <button 
              onClick={() => onSelectStage("beginner", "alphabet")} 
              style={hoveredButton === 'stage1' ? buttonHoverStyle : buttonStyle}
              onMouseEnter={() => setHoveredButton('stage1')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              🌱 Stage 1-2: Basic Letters & Short Vowels
            </button>
            <button 
              onClick={() => onSelectStage("intermediate", "long_vowels")} 
              style={hoveredButton === 'stage3' ? buttonHoverStyle : buttonStyle}
              onMouseEnter={() => setHoveredButton('stage3')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              🌿 Stage 3: Long Vowels & Shadda
            </button>
            <button 
              onClick={() => onSelectStage("intermediate", "sukun_tanwin")} 
              style={hoveredButton === 'stage4' ? buttonHoverStyle : buttonStyle}
              onMouseEnter={() => setHoveredButton('stage4')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              🌿 Stage 4: Sukun & Tanwin
            </button>
          </div>

          {/* Stage 5-7: Vocabulary & Grammar */}
          <div style={sectionStyle}>
            <h3 style={sectionTitleStyle}>📝 Vocabulary & Grammar</h3>
            <button 
              onClick={() => onSelectStage("intermediate", "simple_words")} 
              style={hoveredButton === 'stage5' ? buttonHoverStyle : buttonStyle}
              onMouseEnter={() => setHoveredButton('stage5')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              🌳 Stage 5: Simple Words
            </button>
            <button 
              onClick={() => onSelectStage("intermediate", "word_roots")} 
              style={hoveredButton === 'stage6' ? buttonHoverStyle : buttonStyle}
              onMouseEnter={() => setHoveredButton('stage6')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              🌳 Stage 6: Word Formation & Roots
            </button>
            <button 
              onClick={() => onSelectStage("intermediate", "simple_sentences")} 
              style={hoveredButton === 'stage7' ? buttonHoverStyle : buttonStyle}
              onMouseEnter={() => setHoveredButton('stage7')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              🌳 Stage 7: Simple Sentences
            </button>
          </div>

          {/* Stage 8-10: Advanced & Quranic */}
          <div style={sectionStyle}>
            <h3 style={sectionTitleStyle}>🎯 Advanced & Quranic</h3>
            <button 
              onClick={() => onSelectStage("advanced", "advanced_vocabulary")} 
              style={hoveredButton === 'stage8' ? buttonHoverStyle : buttonStyle}
              onMouseEnter={() => setHoveredButton('stage8')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              🌲 Stage 8: Advanced Vocabulary
            </button>
            <button 
              onClick={() => onSelectStage("advanced", "listening_comprehension")} 
              style={hoveredButton === 'stage9' ? buttonHoverStyle : buttonStyle}
              onMouseEnter={() => setHoveredButton('stage9')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              🌲 Stage 9: Listening Comprehension
            </button>
            <button 
              onClick={() => onSelectStage("advanced", "quranic_mastery")} 
              style={hoveredButton === 'stage10' ? buttonHoverStyle : buttonStyle}
              onMouseEnter={() => setHoveredButton('stage10')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              🌲 Stage 10: Quranic Mastery
            </button>
          </div>
        </div>

        {/* Navigation Button */}
        <button 
          onClick={onReturnToHome}
          style={{
            backgroundColor: `${themeStyles.theme.secondary}20`,
            color: themeStyles.theme.text,
            border: `1px solid ${themeStyles.theme.secondary}30`,
            padding: '0.75rem 1.5rem',
            borderRadius: '0.75rem',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '500',
            marginTop: '1rem',
            transition: 'all 0.3s ease',
            width: '100%'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = `${themeStyles.theme.secondary}30`;
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = `0 4px 15px ${themeStyles.theme.secondary}40`;
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = `${themeStyles.theme.secondary}20`;
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }}
        >
          🏠 Return to Home
        </button>
      </div>
    </div>
  );
};

export default StageSelector;
