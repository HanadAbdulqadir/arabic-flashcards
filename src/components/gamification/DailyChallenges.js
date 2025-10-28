import React from 'react';
import { getThemeStyles } from '../../utils/themeManager';

const DailyChallenges = ({ 
  challenges = [], 
  completedChallenges = [], 
  currentTheme = 'blue',
  onChallengeClick = () => {}
}) => {
  const themeStyles = getThemeStyles(currentTheme);

  const challengeCardStyle = {
    backgroundColor: themeStyles.theme.background,
    border: `1px solid ${themeStyles.theme.primary}20`,
    borderRadius: '0.75rem',
    padding: '1rem',
    marginBottom: '0.75rem',
    transition: 'all 0.2s ease',
    cursor: 'pointer'
  };

  const completedChallengeStyle = {
    ...challengeCardStyle,
    backgroundColor: `${themeStyles.theme.success}15`,
    border: `1px solid ${themeStyles.theme.success}30`
  };

  const progressBarStyle = {
    width: '100%',
    height: '6px',
    backgroundColor: `${themeStyles.theme.primary}20`,
    borderRadius: '3px',
    overflow: 'hidden',
    margin: '0.5rem 0'
  };

  const progressFillStyle = {
    height: '100%',
    backgroundColor: themeStyles.theme.primary,
    borderRadius: '3px',
    transition: 'width 0.3s ease'
  };

  const completedProgressFillStyle = {
    ...progressFillStyle,
    backgroundColor: themeStyles.theme.success
  };

  const getChallengeIcon = (type) => {
    const icons = {
      completion: '📚',
      accuracy: '🎯',
      streak: '🔥',
      variety: '🌍',
      speed: '⚡'
    };
    return icons[type] || '🎯';
  };

  const getChallengeStatus = (challenge) => {
    if (challenge.completed) {
      return {
        text: 'Completed!',
        color: themeStyles.theme.success,
        icon: '✅'
      };
    } else if (challenge.current > 0) {
      return {
        text: 'In Progress',
        color: themeStyles.theme.primary,
        icon: '🔄'
      };
    } else {
      return {
        text: 'Not Started',
        color: themeStyles.theme.secondary,
        icon: '⏳'
      };
    }
  };

  return (
    <div>
      <h3 style={{ 
        marginBottom: '1rem', 
        color: themeStyles.theme.secondary,
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        🎯 Daily Challenges
        <span style={{
          fontSize: '0.875rem',
          backgroundColor: themeStyles.theme.primary,
          color: 'white',
          padding: '0.25rem 0.5rem',
          borderRadius: '1rem',
          fontWeight: 'normal'
        }}>
          {completedChallenges.length}/{challenges.length}
        </span>
      </h3>

      {challenges.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '2rem',
          color: themeStyles.theme.text,
          opacity: 0.7
        }}>
          No challenges available today. Check back tomorrow!
        </div>
      ) : (
        challenges.map((challenge) => {
          const status = getChallengeStatus(challenge);
          const isCompleted = challenge.completed;
          const progressPercentage = Math.min((challenge.current / challenge.target) * 100, 100);

          return (
            <div
              key={challenge.id}
              style={isCompleted ? completedChallengeStyle : challengeCardStyle}
              onClick={() => onChallengeClick(challenge)}
              onMouseEnter={(e) => {
                if (!isCompleted) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = `0 4px 12px ${themeStyles.theme.primary}20`;
                }
              }}
              onMouseLeave={(e) => {
                if (!isCompleted) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <div style={{
                  fontSize: '1.5rem',
                  flexShrink: 0
                }}>
                  {getChallengeIcon(challenge.type)}
                </div>
                
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '0.25rem'
                  }}>
                    <h4 style={{
                      margin: 0,
                      fontSize: '1rem',
                      color: themeStyles.theme.text,
                      fontWeight: '600'
                    }}>
                      {challenge.title}
                    </h4>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      fontSize: '0.75rem',
                      color: status.color,
                      fontWeight: '600'
                    }}>
                      <span>{status.icon}</span>
                      <span>{status.text}</span>
                    </div>
                  </div>

                  <p style={{
                    margin: '0.25rem 0 0.75rem 0',
                    fontSize: '0.875rem',
                    color: themeStyles.theme.text,
                    opacity: 0.8,
                    lineHeight: '1.4'
                  }}>
                    {challenge.description}
                  </p>

                  <div style={progressBarStyle}>
                    <div style={{
                      ...(isCompleted ? completedProgressFillStyle : progressFillStyle),
                      width: `${progressPercentage}%`
                    }}></div>
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.75rem',
                    color: themeStyles.theme.text,
                    opacity: 0.7
                  }}>
                    <span>
                      {challenge.current}/{challenge.target}
                    </span>
                    <span style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      color: themeStyles.theme.success,
                      fontWeight: '600'
                    }}>
                      +{challenge.xpReward} XP
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}

      <div style={{
        marginTop: '1rem',
        padding: '0.75rem',
        backgroundColor: `${themeStyles.theme.primary}10`,
        borderRadius: '0.5rem',
        border: `1px solid ${themeStyles.theme.primary}20`,
        fontSize: '0.75rem',
        color: themeStyles.theme.text,
        opacity: 0.8,
        textAlign: 'center'
      }}>
        Complete challenges to earn XP and level up! New challenges refresh daily.
      </div>
    </div>
  );
};

export default DailyChallenges;
