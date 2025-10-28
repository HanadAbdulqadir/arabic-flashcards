import React from 'react';
import { getThemeStyles } from '../../utils/themeManager';

const LevelProgression = ({ 
  levelProgress = {}, 
  levelRewards = [], 
  currentTheme = 'blue',
  onLevelUp = () => {}
}) => {
  const themeStyles = getThemeStyles(currentTheme);

  const containerStyle = {
    backgroundColor: themeStyles.theme.background,
    border: `1px solid ${themeStyles.theme.primary}20`,
    borderRadius: '0.75rem',
    padding: '1.5rem'
  };

  const levelBadgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '3rem',
    height: '3rem',
    backgroundColor: themeStyles.theme.primary,
    color: 'white',
    borderRadius: '50%',
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '1rem'
  };

  const progressBarStyle = {
    width: '100%',
    height: '8px',
    backgroundColor: `${themeStyles.theme.primary}20`,
    borderRadius: '4px',
    overflow: 'hidden',
    margin: '1rem 0'
  };

  const progressFillStyle = {
    height: '100%',
    backgroundColor: themeStyles.theme.primary,
    borderRadius: '4px',
    transition: 'width 0.3s ease'
  };

  const rewardCardStyle = {
    backgroundColor: `${themeStyles.theme.success}10`,
    border: `1px solid ${themeStyles.theme.success}20`,
    borderRadius: '0.5rem',
    padding: '0.75rem',
    marginBottom: '0.5rem'
  };

  const lockedRewardStyle = {
    backgroundColor: `${themeStyles.theme.secondary}10`,
    border: `1px solid ${themeStyles.theme.secondary}20`,
    borderRadius: '0.5rem',
    padding: '0.75rem',
    marginBottom: '0.5rem',
    opacity: 0.6
  };

  const {
    currentLevel = 1,
    nextLevel = 2,
    currentXP = 0,
    requiredXP = 100,
    progressPercentage = 0,
    xpToNextLevel = 100
  } = levelProgress;

  const isLevelUp = progressPercentage >= 100;

  return (
    <div style={containerStyle}>
      {/* Level Header */}
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <div style={levelBadgeStyle}>
          {currentLevel}
        </div>
        <h3 style={{ 
          margin: '0.5rem 0 0.25rem 0',
          color: themeStyles.theme.text,
          fontSize: '1.25rem'
        }}>
          Level {currentLevel}
        </h3>
        <p style={{ 
          margin: 0,
          color: themeStyles.theme.text,
          opacity: 0.7,
          fontSize: '0.875rem'
        }}>
          {isLevelUp ? 'Ready to level up!' : `${xpToNextLevel} XP to next level`}
        </p>
      </div>

      {/* Progress Bar */}
      <div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.5rem',
          fontSize: '0.875rem',
          color: themeStyles.theme.text
        }}>
          <span>Level {currentLevel}</span>
          <span style={{ fontWeight: '600' }}>
            {currentXP}/{requiredXP} XP
          </span>
          <span>Level {nextLevel}</span>
        </div>
        
        <div style={progressBarStyle}>
          <div style={{
            ...progressFillStyle,
            width: `${Math.min(progressPercentage, 100)}%`
          }}></div>
        </div>

        {isLevelUp && (
          <div style={{
            textAlign: 'center',
            marginTop: '1rem',
            padding: '0.75rem',
            backgroundColor: `${themeStyles.theme.success}15`,
            border: `1px solid ${themeStyles.theme.success}30`,
            borderRadius: '0.5rem',
            color: themeStyles.theme.success,
            fontWeight: '600',
            cursor: 'pointer'
          }}
          onClick={onLevelUp}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = `${themeStyles.theme.success}25`;
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = `${themeStyles.theme.success}15`;
          }}
          >
            🎉 Level Up Available! Click to Advance
          </div>
        )}
      </div>

      {/* Level Rewards */}
      {levelRewards.length > 0 && (
        <div style={{ marginTop: '1.5rem' }}>
          <h4 style={{ 
            margin: '0 0 1rem 0',
            color: themeStyles.theme.secondary,
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            🏆 Level Rewards
          </h4>
          
          {levelRewards.map((reward, index) => {
            const isUnlocked = reward.level <= currentLevel;
            const isNextReward = reward.level === currentLevel + 1;
            
            return (
              <div 
                key={reward.level}
                style={isUnlocked ? rewardCardStyle : lockedRewardStyle}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '0.5rem'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <span style={{
                      fontSize: '1.125rem'
                    }}>
                      {isUnlocked ? '✅' : isNextReward ? '🔜' : '🔒'}
                    </span>
                    <span style={{
                      fontWeight: '600',
                      color: themeStyles.theme.text,
                      fontSize: '0.875rem'
                    }}>
                      {reward.title}
                    </span>
                  </div>
                  <span style={{
                    fontSize: '0.75rem',
                    color: themeStyles.theme.text,
                    opacity: 0.7,
                    backgroundColor: isUnlocked ? `${themeStyles.theme.success}20` : `${themeStyles.theme.secondary}20`,
                    padding: '0.25rem 0.5rem',
                    borderRadius: '1rem'
                  }}>
                    Level {reward.level}
                  </span>
                </div>
                
                <div style={{
                  fontSize: '0.75rem',
                  color: themeStyles.theme.text,
                  opacity: 0.8,
                  lineHeight: '1.4'
                }}>
                  {reward.unlocks.map((unlock, idx) => (
                    <div key={idx} style={{ marginBottom: '0.25rem' }}>
                      • {unlock}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* XP Breakdown */}
      <div style={{
        marginTop: '1rem',
        padding: '0.75rem',
        backgroundColor: `${themeStyles.theme.primary}10`,
        borderRadius: '0.5rem',
        fontSize: '0.75rem',
        color: themeStyles.theme.text,
        opacity: 0.8
      }}>
        <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
          How to Earn XP:
        </div>
        <div>• Complete cards: +2 XP each</div>
        <div>• Daily challenges: +50-100 XP</div>
        <div>• Session completion: +10-50 XP</div>
        <div>• Streak bonus: +5 XP per day</div>
      </div>
    </div>
  );
};

export default LevelProgression;
