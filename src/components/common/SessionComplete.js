import React from 'react';

const SessionComplete = ({ stage, score, attempts, accuracy, masteredCards, totalCards, onRestart, onReturnToHome }) => {
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
    maxWidth: '600px',
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

  const statsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem'
  };

  const statCardStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: '1.5rem',
    borderRadius: '0.75rem',
    textAlign: 'center',
    backdropFilter: 'blur(5px)'
  };

  const statValueStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem'
  };

  const statLabelStyle = {
    fontSize: '0.875rem',
    opacity: 0.8,
    textTransform: 'uppercase'
  };

  const buttonStyle = {
    backgroundColor: '#ff6b6b',
    color: 'white',
    border: 'none',
    padding: '1rem 2rem',
    fontSize: '1.25rem',
    borderRadius: '0.75rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    margin: '1rem 0',
    boxShadow: '0 4px 15px rgba(255, 107, 107, 0.4)',
    transition: 'all 0.3s ease'
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(255, 107, 107, 0.6)'
  };

  const [isHovered, setIsHovered] = React.useState(false);

  // Format stage name for display
  const formatStageName = (stage) => {
    const stageNames = {
      'alphabet': 'Alphabet & Letters',
      'long_vowels': 'Long Vowels & Shadda',
      'sukun_tanwin': 'Sukun & Tanwin',
      'simple_words': 'Simple Words',
      'word_roots': 'Word Roots',
      'simple_sentences': 'Simple Sentences',
      'advanced_vocabulary': 'Advanced Vocabulary',
      'listening_comprehension': 'Listening Comprehension',
      'quranic_mastery': 'Quranic Mastery'
    };
    return stageNames[stage] || stage;
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>🎉 Session Complete!</h1>
        <p style={subtitleStyle}>
          Great job completing the {formatStageName(stage)} stage!
        </p>

        {/* Statistics Grid */}
        <div style={statsGridStyle}>
          <div style={statCardStyle}>
            <div style={statValueStyle}>{score}</div>
            <div style={statLabelStyle}>Correct Answers</div>
          </div>
          <div style={statCardStyle}>
            <div style={statValueStyle}>{accuracy}%</div>
            <div style={statLabelStyle}>Accuracy</div>
          </div>
          <div style={statCardStyle}>
            <div style={statValueStyle}>{attempts}</div>
            <div style={statLabelStyle}>Total Attempts</div>
          </div>
          <div style={statCardStyle}>
            <div style={statValueStyle}>{masteredCards}/{totalCards}</div>
            <div style={statLabelStyle}>Cards Mastered</div>
          </div>
        </div>

        {/* Performance Message */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          padding: '1.5rem',
          borderRadius: '0.75rem',
          marginBottom: '2rem',
          backdropFilter: 'blur(5px)'
        }}>
          <h3 style={{ marginBottom: '0.5rem', color: '#ffd700' }}>
            {accuracy >= 90 ? '🌟 Excellent!' : 
             accuracy >= 75 ? '👍 Great Job!' : 
             accuracy >= 60 ? '💪 Good Work!' : 'Keep Practicing!'}
          </h3>
          <p style={{ margin: 0, opacity: 0.9 }}>
            {accuracy >= 90 ? 'You\'re mastering Arabic!' :
             accuracy >= 75 ? 'You\'re making great progress!' :
             accuracy >= 60 ? 'You\'re on the right track!' : 
             'Every practice session brings improvement!'}
          </p>
        </div>

        {/* Navigation Buttons */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button 
            onClick={onReturnToHome}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              padding: '1rem 2rem',
              borderRadius: '0.75rem',
              cursor: 'pointer',
              fontSize: '1.25rem',
              fontWeight: 'bold',
              flex: 1,
              transition: 'all 0.3s ease'
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
            🏠 Home
          </button>
          <button
            style={isHovered ? buttonHoverStyle : buttonStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onRestart}
          >
            🚀 Continue Learning
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionComplete;
