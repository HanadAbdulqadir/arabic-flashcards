import React from 'react';
import Badges from './gamification/Badges';
import Leaderboard from './gamification/Leaderboard';
import PointsSystem from './gamification/PointsSystem';
import LearningRecommendations from './analytics/LearningRecommendations';
import { getThemeStyles, getThemeButtonHoverStyle } from '../utils/themeManager';

const HomePage = ({ 
  onStartLearning, 
  onShowThemeSelector,
  points = 0, 
  currentStreak = 0, 
  earnedBadges = [], 
  userProgress = {},
  currentTheme = 'blue',
  learningAnalytics = {}
}) => {
  const themeStyles = getThemeStyles(currentTheme);

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '2rem'
  };

  const statsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem'
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
    backgroundColor: themeStyles.theme.success,
    borderRadius: '4px',
    transition: 'width 0.3s ease'
  };

  const [isHovered, setIsHovered] = React.useState(false);
  const [isThemeHovered, setIsThemeHovered] = React.useState(false);

  // Mock progress data - in a real app, this would come from user data
  const mockProgress = {
    totalMastered: 45,
    totalCards: 100,
    accuracy: 85,
    currentStage: 3,
    totalStages: 10,
    timeSpent: 120, // minutes
    ...userProgress
  };

  const masteryPercentage = Math.round((mockProgress.totalMastered / mockProgress.totalCards) * 100);
  const stagePercentage = Math.round((mockProgress.currentStage / mockProgress.totalStages) * 100);

  return (
    <div style={themeStyles.containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <h1 style={themeStyles.titleStyle}>🎓 Arabic Flashcards</h1>
        <p style={themeStyles.subtitleStyle}>Master Arabic with fun, interactive learning!</p>
      </div>

      {/* Main Content Card */}
      <div style={themeStyles.cardStyle}>
        {/* Quick Stats */}
        <div style={statsGridStyle}>
          <div style={themeStyles.statCardStyle}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', color: themeStyles.theme.primary }}>
              {mockProgress.totalMastered}
            </div>
            <div style={{ fontSize: '0.875rem', opacity: 0.8, textTransform: 'uppercase' }}>
              Cards Mastered
            </div>
          </div>
          <div style={themeStyles.statCardStyle}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', color: themeStyles.theme.primary }}>
              {mockProgress.accuracy}%
            </div>
            <div style={{ fontSize: '0.875rem', opacity: 0.8, textTransform: 'uppercase' }}>
              Accuracy
            </div>
          </div>
          <div style={themeStyles.statCardStyle}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', color: themeStyles.theme.primary }}>
              {mockProgress.currentStage}/{mockProgress.totalStages}
            </div>
            <div style={{ fontSize: '0.875rem', opacity: 0.8, textTransform: 'uppercase' }}>
              Stages
            </div>
          </div>
          <div style={themeStyles.statCardStyle}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', color: themeStyles.theme.primary }}>
              {mockProgress.timeSpent}m
            </div>
            <div style={{ fontSize: '0.875rem', opacity: 0.8, textTransform: 'uppercase' }}>
              Time Spent
            </div>
          </div>
        </div>

        {/* Progress Bars */}
        <div>
          <h3 style={{ marginBottom: '0.5rem', color: themeStyles.theme.secondary }}>Overall Mastery</h3>
          <div style={progressBarStyle}>
            <div style={{ ...progressFillStyle, width: `${masteryPercentage}%` }}></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
            <span>{masteryPercentage}% Complete</span>
            <span>{mockProgress.totalMastered}/{mockProgress.totalCards} Cards</span>
          </div>
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          <h3 style={{ marginBottom: '0.5rem', color: themeStyles.theme.secondary }}>Stage Progress</h3>
          <div style={progressBarStyle}>
            <div style={{ ...progressFillStyle, width: `${stagePercentage}%` }}></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
            <span>Stage {mockProgress.currentStage}</span>
            <span>{stagePercentage}% Complete</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <button
            style={isHovered ? getThemeButtonHoverStyle(themeStyles.buttonStyle) : themeStyles.buttonStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onStartLearning}
            className="flex-1"
          >
            🚀 Start Learning Journey
          </button>
          <button
            style={isThemeHovered ? getThemeButtonHoverStyle(themeStyles.outlineButtonStyle) : themeStyles.outlineButtonStyle}
            onMouseEnter={() => setIsThemeHovered(true)}
            onMouseLeave={() => setIsThemeHovered(false)}
            onClick={onShowThemeSelector}
            className="flex-1"
          >
            🎨 Change Theme
          </button>
        </div>
      </div>

      {/* Learning Recommendations Section */}
      <div style={{ ...themeStyles.cardStyle, marginBottom: '1rem' }}>
        <LearningRecommendations 
          recommendations={learningAnalytics.getLearningRecommendations ? learningAnalytics.getLearningRecommendations() : []}
          sessionStats={learningAnalytics.sessionStats || {}}
          currentTheme={currentTheme}
          onSelectRecommendation={(rec) => {
            // Handle recommendation selection - could navigate to specific practice
            console.log('Selected recommendation:', rec);
            alert(`Starting practice for: ${rec.description}`);
          }}
        />
      </div>

      {/* Gamification Section */}
      <div style={{ ...themeStyles.cardStyle, marginBottom: '1rem' }}>
        <PointsSystem 
          points={points} 
          currentStreak={currentStreak} 
          pointsEarned={0}
          currentTheme={currentTheme}
        />
      </div>

      {/* Leaderboard Section */}
      <div style={{ ...themeStyles.cardStyle, marginBottom: '1rem' }}>
        <Leaderboard 
          userPoints={points} 
          userStreak={currentStreak} 
          userBadges={earnedBadges.length} 
          currentTheme={currentTheme}
        />
      </div>

      {/* Badges Section */}
      <div style={themeStyles.cardStyle}>
        <Badges 
          earnedBadges={earnedBadges} 
          userProgress={mockProgress} 
          currentTheme={currentTheme}
        />
      </div>
    </div>
  );
};

export default HomePage;
