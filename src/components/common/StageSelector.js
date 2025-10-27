import React from 'react';

const StageSelector = ({ onSelectStage, onReturnToHome }) => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '2rem',
    color: 'white',
    fontFamily: 'Arial, sans-serif'
  };

  const cardStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    padding: '2rem',
    borderRadius: '1rem',
    marginBottom: '2rem',
    width: '100%',
    maxWidth: '800px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    textAlign: 'center'
  };

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
  };

  const subtitleStyle = {
    fontSize: '1.25rem',
    opacity: 0.9,
    marginBottom: '2rem'
  };

  const sectionStyle = {
    marginBottom: '2rem',
    textAlign: 'left'
  };

  const sectionTitleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#ffd700',
    textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
  };

  const buttonStyle = {
    display: 'block',
    width: '100%',
    marginBottom: '0.75rem',
    padding: '1rem 1.5rem',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.3)',
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
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 15px rgba(255, 255, 255, 0.2)'
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
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.3)',
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
            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          🏠 Return to Home
        </button>
      </div>
    </div>
  );
};

export default StageSelector;
