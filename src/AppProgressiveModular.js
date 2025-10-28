import { useState, useEffect, useCallback } from "react";
import HomePage from "./components/HomePage";
import StageSelector from "./components/common/StageSelector";
import CardDisplay from "./components/common/CardDisplay";
import StatsPanel from "./components/common/StatsPanel";
import OptionsDisplay from "./components/common/OptionsDisplay";
import SessionComplete from "./components/common/SessionComplete";
import ThemeSelector from "./components/common/ThemeSelector";
import PointsSystem from "./components/gamification/PointsSystem";
import { useSpacedRepetition } from "./hooks/useSpacedRepetition";
import { useAudioManager } from "./hooks/useAudioManager";
import { useGamification } from "./hooks/useGamification";
import { useLearningAnalytics } from "./hooks/useLearningAnalytics";
import { useAdvancedGamification } from "./hooks/useAdvancedGamification";
import { initializeDeck, getAllCards, calculateStatistics } from "./utils/deckManager";
import { getThemeStyles } from "./utils/themeManager";

function AppProgressiveModular() {
  // State management
  const [isHomePage, setIsHomePage] = useState(true);
  const [mainDeck, setMainDeck] = useState([]);
  const [wrongStack, setWrongStack] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [difficulty, setDifficulty] = useState("beginner");
  const [showDifficultySelector, setShowDifficultySelector] = useState(true);
  const [stage, setStage] = useState("alphabet");
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(null);
  const [currentTheme, setCurrentTheme] = useState("blue");
  const [showThemeSelector, setShowThemeSelector] = useState(false);

  // Get current theme styles
  const themeStyles = getThemeStyles(currentTheme);

  // Custom hooks
  const { updateCardAfterReview } = useSpacedRepetition();
  const { playAudio, preloadStageAudio } = useAudioManager();
  const {
    points,
    earnedBadges,
    currentStreak,
    trackCardResponse
  } = useGamification();
  
  // Learning analytics
  const {
    trackCardResponse: trackAnalytics,
    getLearningRecommendations,
    sessionStats
  } = useLearningAnalytics();

  // Advanced gamification
  const {
    userLevel,
    experiencePoints,
    dailyChallenges,
    completedChallenges,
    streak: advancedStreak,
    trackCardCompletion,
    trackSessionCompletion,
    getLevelProgress,
    getLevelRewards
  } = useAdvancedGamification();

  const initializeDeckHandler = useCallback((difficultyLevel = difficulty, stageName = stage) => {
    const newDeck = initializeDeck(difficultyLevel, stageName);
    setMainDeck(newDeck);
    setWrongStack([]);
    setCurrentCard(newDeck[0]);
    setFeedback("");
    setScore(0);
    setAttempts(0);
    setShowHint(false);
    setSessionComplete(false);
    setSelectedAnswer(null);
    setIsCorrectAnswer(null);

    // Preload audio for the stage
    const stageCards = getAllCards(stageName);
    preloadStageAudio(stageCards);
  }, [difficulty, stage, preloadStageAudio]);

  // Initialize the deck on component mount
  useEffect(() => {
    if (!showDifficultySelector && !isHomePage && !showThemeSelector) {
      initializeDeckHandler();
    }
  }, [showDifficultySelector, isHomePage, showThemeSelector, initializeDeckHandler]);

  const handleAnswer = (selected) => {
    if (!currentCard) return;

    setSelectedAnswer(selected);
    setAttempts(attempts + 1);
    
    // Determine correct answer based on card type
    let correctAnswer;
    if (currentCard.type === "listening_letter" || 
        currentCard.type === "listening_syllable" || 
        currentCard.type === "listening_word" || 
        currentCard.type === "listening_sentence" ||
        currentCard.type === "listening_context") {
      correctAnswer = currentCard.correctAnswer;
    } else {
      correctAnswer = currentCard.letter || currentCard.arabic;
    }
    
    const isCorrect = selected === correctAnswer;
    setIsCorrectAnswer(isCorrect);
    
    // Update card using spaced repetition
    const responseTime = 2000; // Placeholder - could be measured
    const updatedCard = updateCardAfterReview(currentCard, isCorrect, responseTime);
    
    // Track gamification
    const gamificationResult = trackCardResponse(currentCard, isCorrect, responseTime);
    
    // Track learning analytics
    trackAnalytics(currentCard, isCorrect, responseTime, selected, correctAnswer);
    
    if (isCorrect) {
      setFeedback(`✅ Correct! +${gamificationResult.pointsEarned} points`);
      setScore(score + 1);
    } else {
      setFeedback("❌ Try again");
      setShowHint(true);
    }

    // Move to next card after delay to show feedback
    setTimeout(() => {
      const newMainDeck = [...mainDeck];
      newMainDeck.shift();

      if (isCorrect) {
        if (updatedCard.mastery === 0) {
          newMainDeck.push(updatedCard);
        }
      } else {
        const newWrongStack = [...wrongStack, updatedCard];
        setWrongStack(newWrongStack);
      }

      // Check if session is complete
      if (newMainDeck.length === 0 && wrongStack.length === 0) {
        setSessionComplete(true);
        setCurrentCard(null);
      } else if (newMainDeck.length === 0 && wrongStack.length > 0) {
        const shuffledWrongStack = [...wrongStack].sort(() => Math.random() - 0.5);
        setMainDeck(shuffledWrongStack);
        setWrongStack([]);
        setCurrentCard(shuffledWrongStack[0]);
      } else {
        setMainDeck(newMainDeck);
        setCurrentCard(newMainDeck[0]);
      }

      setFeedback("");
      setShowHint(false);
      setSelectedAnswer(null);
      setIsCorrectAnswer(null);
    }, 1500);
  };

  const handlePlayAudio = () => {
    if (!currentCard) return;
    
    try {
      if (currentCard.audio) {
        playAudio(currentCard.audio);
      } else {
        alert(`No audio file available for this item.\n\nNote: Add real audio files to public/audio/ folder`);
      }
    } catch (error) {
      alert(`Error playing audio: ${error.message}`);
    }
  };

  const restart = () => {
    setShowDifficultySelector(true);
  };

  const selectDifficulty = (level, stageName) => {
    setDifficulty(level);
    setStage(stageName);
    setShowDifficultySelector(false);
    initializeDeckHandler(level, stageName);
  };

  const handleStartLearning = () => {
    setIsHomePage(false);
    setShowDifficultySelector(true);
  };

  const handleReturnToHome = () => {
    setIsHomePage(true);
    setShowDifficultySelector(false);
    setSessionComplete(false);
    setShowThemeSelector(false);
  };

  const handleThemeChange = (themeName) => {
    setCurrentTheme(themeName);
    // Save theme preference to localStorage
    localStorage.setItem('arabicFlashcardsTheme', themeName);
    // Close theme selector and trigger re-render
    setShowThemeSelector(false);
  };

  const handleShowThemeSelector = () => {
    setShowThemeSelector(true);
  };

  // Load saved theme preference on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('arabicFlashcardsTheme');
    if (savedTheme) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  // Calculate statistics
  const stats = calculateStatistics(stage, mainDeck, wrongStack, score, attempts, getAllCards);

  // Show Theme Selector
  if (showThemeSelector) {
    return (
      <ThemeSelector 
        currentTheme={currentTheme} 
        onThemeChange={handleThemeChange}
        onClose={() => setShowThemeSelector(false)}
      />
    );
  }

  // Show HomePage first
  if (isHomePage) {
    return (
      <HomePage
        onStartLearning={handleStartLearning}
        onShowThemeSelector={handleShowThemeSelector}
        points={points}
        currentStreak={currentStreak}
        earnedBadges={earnedBadges}
        userProgress={stats}
        currentTheme={currentTheme}
        learningAnalytics={{
          getLearningRecommendations,
          sessionStats
        }}
        advancedGamification={{
          dailyChallenges,
          completedChallenges,
          getLevelProgress,
          getLevelRewards
        }}
      />
    );
  }

  if (showDifficultySelector) {
    return (
      <StageSelector 
        onSelectStage={selectDifficulty} 
        onReturnToHome={handleReturnToHome}
        currentTheme={currentTheme}
      />
    );
  }

  if (sessionComplete) {
    return (
      <SessionComplete
        stage={stage}
        score={score}
        attempts={attempts}
        accuracy={stats.accuracy}
        masteredCards={stats.masteredCards}
        totalCards={stats.totalCards}
        onRestart={restart}
        onReturnToHome={handleReturnToHome}
        currentTheme={currentTheme}
      />
    );
  }

  if (!currentCard) {
    return (
      <div style={themeStyles.containerStyle}>
        <div style={themeStyles.cardStyle}>
          <h1 style={themeStyles.titleStyle}>Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div style={themeStyles.containerStyle}>
      <div style={themeStyles.cardStyle}>
        {/* Gamification - Points System */}
        <PointsSystem
          points={points}
          currentStreak={currentStreak}
          pointsEarned={0} // This would be dynamic in a real implementation
          currentTheme={currentTheme}
        />

        {/* Statistics */}
        <StatsPanel
          stage={stage}
          currentCard={currentCard}
          score={score}
          attempts={attempts}
          accuracy={stats.accuracy}
          masteredCards={stats.masteredCards}
          totalCards={stats.totalCards}
          remainingCards={stats.remainingCards}
          currentTheme={currentTheme}
        />

        {/* Main Card Content */}
        <CardDisplay
          card={currentCard}
          onPlayAudio={handlePlayAudio}
          showHint={showHint}
          feedback={feedback}
          selectedAnswer={selectedAnswer}
          isCorrectAnswer={isCorrectAnswer}
          currentTheme={currentTheme}
        />

        {/* Options */}
        <OptionsDisplay
          options={currentCard.options}
          onAnswer={handleAnswer}
          selectedAnswer={selectedAnswer}
          isCorrectAnswer={isCorrectAnswer}
          disabled={selectedAnswer !== null}
          currentTheme={currentTheme}
        />

        {/* Theme Indicator */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginTop: '1rem',
          padding: '0.75rem 1rem',
          backgroundColor: `${themeStyles.theme.primary}10`,
          borderRadius: '0.5rem',
          border: `1px solid ${themeStyles.theme.primary}20`
        }}>
          <span style={{ fontSize: '0.875rem', color: themeStyles.theme.text, opacity: 0.8 }}>
            Current Theme: <strong style={{ color: themeStyles.theme.primary }}>{themeStyles.theme.name}</strong>
          </span>
          <button 
            onClick={handleShowThemeSelector}
            style={{
              backgroundColor: 'transparent',
              color: themeStyles.theme.primary,
              border: `1px solid ${themeStyles.theme.primary}`,
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = themeStyles.theme.primary;
              e.target.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = themeStyles.theme.primary;
            }}
          >
            🎨 Change
          </button>
        </div>

        {/* Navigation Buttons */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button 
            onClick={handleReturnToHome} 
            style={{ ...themeStyles.secondaryButtonStyle, flex: 1 }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = `0 6px 20px ${themeStyles.theme.secondary}60`;
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = `0 4px 15px ${themeStyles.theme.secondary}40`;
            }}
          >
            🏠 Home
          </button>
          <button 
            onClick={restart} 
            style={{ ...themeStyles.buttonStyle, flex: 1 }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = `0 6px 20px ${themeStyles.theme.primary}60`;
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = `0 4px 15px ${themeStyles.theme.primary}40`;
            }}
          >
            🔄 Change Stage
          </button>
        </div>
      </div>
    </div>
  );
}

export default AppProgressiveModular;
