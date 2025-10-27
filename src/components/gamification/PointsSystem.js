import React from 'react';

const PointsSystem = ({ points, currentStreak, pointsEarned, showAnimation = false }) => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: '1rem',
    borderRadius: '0.5rem',
    marginBottom: '1rem',
    border: '1px solid #e2e8f0'
  };

  const pointsStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };

  const pointsValueStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#4f46e5'
  };

  const pointsLabelStyle = {
    fontSize: '0.75rem',
    color: '#6b7280',
    textTransform: 'uppercase'
  };

  const streakStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };

  const streakValueStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: currentStreak >= 5 ? '#ef4444' : '#f59e0b'
  };

  const streakLabelStyle = {
    fontSize: '0.75rem',
    color: '#6b7280',
    textTransform: 'uppercase'
  };

  const pointsAnimationStyle = {
    position: 'absolute',
    top: '-20px',
    right: '0',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#10b981',
    animation: 'floatUp 1s ease-out forwards'
  };

  const streakBonusStyle = {
    position: 'absolute',
    top: '-20px',
    left: '0',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    color: '#f59e0b',
    animation: 'floatUp 1s ease-out forwards'
  };

  const getStreakMultiplier = (streak) => {
    if (streak >= 20) return '3x';
    if (streak >= 10) return '2x';
    if (streak >= 5) return '1.5x';
    return '1x';
  };

  return (
    <div style={{ position: 'relative' }}>
      {showAnimation && pointsEarned > 0 && (
        <div style={pointsAnimationStyle}>
          +{pointsEarned}
        </div>
      )}
      
      {currentStreak >= 5 && (
        <div style={streakBonusStyle}>
          {getStreakMultiplier(currentStreak)} streak!
        </div>
      )}
      
      <div style={containerStyle}>
        <div style={pointsStyle}>
          <div style={pointsValueStyle}>{points}</div>
          <div style={pointsLabelStyle}>Points</div>
        </div>
        
        <div style={streakStyle}>
          <div style={streakValueStyle}>{currentStreak}</div>
          <div style={streakLabelStyle}>Streak</div>
        </div>
      </div>

      <style>
        {`
          @keyframes floatUp {
            0% {
              opacity: 1;
              transform: translateY(0);
            }
            100% {
              opacity: 0;
              transform: translateY(-30px);
            }
          }
        `}
      </style>
    </div>
  );
};

export default PointsSystem;
