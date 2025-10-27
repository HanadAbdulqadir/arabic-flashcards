import React from 'react';

const StatsPanel = ({ 
  stage, 
  currentCard, 
  score, 
  attempts, 
  accuracy, 
  masteredCards, 
  totalCards, 
  remainingCards 
}) => {
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

  return (
    <div style={statsStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <strong>Stage:</strong> {stage.replace('_', ' ').toUpperCase()}
          {currentCard && (
            <span style={masteryBadgeStyle}>
              {currentCard.mastery === 1 ? 'MASTERED' : 'LEARNING'}
            </span>
          )}
        </div>
        <div>
          <strong>Score:</strong> {score}/{attempts} ({accuracy}%)
        </div>
      </div>
      <div style={{ marginTop: '0.5rem' }}>
        <strong>Remaining:</strong> {remainingCards} cards
        {masteredCards !== undefined && totalCards !== undefined && (
          <span style={{ marginLeft: '1rem' }}>
            <strong>Mastered:</strong> {masteredCards}/{totalCards}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatsPanel;
