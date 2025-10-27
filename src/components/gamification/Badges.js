import React from 'react';

export const BADGES = {
  STAGE_MASTER: {
    id: 'stage_master',
    name: 'Stage Master',
    description: 'Master all cards in a stage',
    icon: '🏆',
    condition: (progress) => progress.stageMastery === 100
  },
  PERFECT_STREAK: {
    id: 'perfect_streak',
    name: 'Perfect Streak',
    description: 'Answer 20 cards correctly in a row',
    icon: '🔥',
    condition: (progress) => progress.currentStreak >= 20
  },
  FAST_LEARNER: {
    id: 'fast_learner',
    name: 'Fast Learner',
    description: 'Master a stage in under 10 minutes',
    icon: '⚡',
    condition: (progress) => progress.stageTime < 600000
  },
  DEDICATED_STUDENT: {
    id: 'dedicated_student',
    name: 'Dedicated Student',
    description: 'Complete 100 cards in one session',
    icon: '📚',
    condition: (progress) => progress.cardsReviewed >= 100
  },
  ARABIC_SCHOLAR: {
    id: 'arabic_scholar',
    name: 'Arabic Scholar',
    description: 'Master all stages',
    icon: '🎓',
    condition: (progress) => progress.totalMastered === progress.totalCards
  },
  LISTENING_EXPERT: {
    id: 'listening_expert',
    name: 'Listening Expert',
    description: 'Achieve 95% accuracy in listening exercises',
    icon: '👂',
    condition: (progress) => progress.listeningAccuracy >= 95
  },
  VOCABULARY_MASTER: {
    id: 'vocabulary_master',
    name: 'Vocabulary Master',
    description: 'Master 50 vocabulary words',
    icon: '📝',
    condition: (progress) => progress.vocabularyMastered >= 50
  },
  CONSISTENT_LEARNER: {
    id: 'consistent_learner',
    name: 'Consistent Learner',
    description: 'Practice for 7 consecutive days',
    icon: '📅',
    condition: (progress) => progress.consecutiveDays >= 7
  }
};

const Badges = ({ earnedBadges, userProgress }) => {
  const badgeContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    justifyContent: 'center',
    margin: '1rem 0'
  };

  const badgeStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1rem',
    borderRadius: '0.5rem',
    backgroundColor: '#f8fafc',
    border: '2px solid #e2e8f0',
    minWidth: '100px',
    textAlign: 'center'
  };

  const earnedBadgeStyle = {
    ...badgeStyle,
    backgroundColor: '#dcfce7',
    borderColor: '#10b981'
  };

  const lockedBadgeStyle = {
    ...badgeStyle,
    opacity: 0.5,
    backgroundColor: '#f1f5f9'
  };

  const iconStyle = {
    fontSize: '2rem',
    marginBottom: '0.5rem'
  };

  const nameStyle = {
    fontSize: '0.75rem',
    fontWeight: 'bold',
    marginBottom: '0.25rem'
  };

  const descriptionStyle = {
    fontSize: '0.65rem',
    color: '#6b7280'
  };

  const checkBadgeEarned = (badgeId) => {
    return earnedBadges.includes(badgeId);
  };

  const checkBadgeUnlocked = (badge) => {
    return badge.condition(userProgress || {});
  };

  return (
    <div>
      <h3 style={{ textAlign: 'center', marginBottom: '1rem', color: '#4f46e5' }}>
        🏆 Achievement Badges
      </h3>
      <div style={badgeContainerStyle}>
        {Object.values(BADGES).map((badge) => {
          const isEarned = checkBadgeEarned(badge.id);
          const isUnlocked = checkBadgeUnlocked(badge);
          const currentStyle = isEarned ? earnedBadgeStyle : (isUnlocked ? badgeStyle : lockedBadgeStyle);
          
          return (
            <div key={badge.id} style={currentStyle}>
              <div style={iconStyle}>{badge.icon}</div>
              <div style={nameStyle}>{badge.name}</div>
              <div style={descriptionStyle}>{badge.description}</div>
              {isEarned && (
                <div style={{ fontSize: '0.6rem', color: '#10b981', marginTop: '0.25rem' }}>
                  ✓ Earned
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Badges;
