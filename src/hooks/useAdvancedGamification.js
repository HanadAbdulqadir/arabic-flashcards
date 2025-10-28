import { useState, useEffect, useCallback } from 'react';

// Advanced gamification system with XP, levels, and daily challenges
export const useAdvancedGamification = () => {
  const [userLevel, setUserLevel] = useState(1);
  const [experiencePoints, setExperiencePoints] = useState(0);
  const [dailyChallenges, setDailyChallenges] = useState([]);
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [streak, setStreak] = useState(0);
  const [lastActivityDate, setLastActivityDate] = useState(null);

  // XP required for each level (exponential growth)
  const getXPForLevel = (level) => {
    return Math.floor(100 * Math.pow(1.5, level - 1));
  };

  // Load gamification data from localStorage
  useEffect(() => {
    const savedLevel = localStorage.getItem('arabicFlashcardsUserLevel');
    const savedXP = localStorage.getItem('arabicFlashcardsXP');
    const savedChallenges = localStorage.getItem('arabicFlashcardsDailyChallenges');
    const savedCompleted = localStorage.getItem('arabicFlashcardsCompletedChallenges');
    const savedStreak = localStorage.getItem('arabicFlashcardsStreak');
    const savedLastActivity = localStorage.getItem('arabicFlashcardsLastActivity');

    if (savedLevel) setUserLevel(parseInt(savedLevel));
    if (savedXP) setExperiencePoints(parseInt(savedXP));
    if (savedChallenges) setDailyChallenges(JSON.parse(savedChallenges));
    if (savedCompleted) setCompletedChallenges(JSON.parse(savedCompleted));
    if (savedStreak) setStreak(parseInt(savedStreak));
    if (savedLastActivity) setLastActivityDate(savedLastActivity);

    // Generate daily challenges if none exist
    if (!savedChallenges) {
      generateDailyChallenges();
    }

    // Check and update streak
    checkAndUpdateStreak();
  }, []);

  // Save gamification data to localStorage
  useEffect(() => {
    localStorage.setItem('arabicFlashcardsUserLevel', userLevel.toString());
    localStorage.setItem('arabicFlashcardsXP', experiencePoints.toString());
    localStorage.setItem('arabicFlashcardsDailyChallenges', JSON.stringify(dailyChallenges));
    localStorage.setItem('arabicFlashcardsCompletedChallenges', JSON.stringify(completedChallenges));
    localStorage.setItem('arabicFlashcardsStreak', streak.toString());
    if (lastActivityDate) {
      localStorage.setItem('arabicFlashcardsLastActivity', lastActivityDate);
    }
  }, [userLevel, experiencePoints, dailyChallenges, completedChallenges, streak, lastActivityDate]);

  // Check and update streak based on activity
  const checkAndUpdateStreak = useCallback(() => {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    if (!lastActivityDate) {
      // First time user
      setStreak(1);
      setLastActivityDate(today);
    } else if (lastActivityDate === today) {
      // Already active today
      return;
    } else if (lastActivityDate === yesterday) {
      // Consecutive day
      setStreak(prev => prev + 1);
      setLastActivityDate(today);
    } else {
      // Broken streak
      setStreak(1);
      setLastActivityDate(today);
    }
  }, [lastActivityDate]);

  // Generate daily challenges
  const generateDailyChallenges = useCallback(() => {
    const challenges = [
      {
        id: 'daily_practice',
        title: 'Daily Practice',
        description: 'Complete 10 cards in any stage',
        type: 'completion',
        target: 10,
        current: 0,
        xpReward: 50,
        completed: false
      },
      {
        id: 'accuracy_challenge',
        title: 'Accuracy Master',
        description: 'Achieve 80% accuracy in a session',
        type: 'accuracy',
        target: 80,
        current: 0,
        xpReward: 75,
        completed: false
      },
      {
        id: 'streak_builder',
        title: 'Streak Builder',
        description: 'Maintain a 3-day learning streak',
        type: 'streak',
        target: 3,
        current: streak,
        xpReward: 100,
        completed: false
      },
      {
        id: 'stage_explorer',
        title: 'Stage Explorer',
        description: 'Complete cards in 3 different stages',
        type: 'variety',
        target: 3,
        current: 0,
        xpReward: 60,
        completed: false
      },
      {
        id: 'speed_demon',
        title: 'Speed Demon',
        description: 'Answer 5 cards in under 2 seconds each',
        type: 'speed',
        target: 5,
        current: 0,
        xpReward: 80,
        completed: false
      }
    ];

    setDailyChallenges(challenges);
  }, [streak]);

  // Award XP and check for level up
  const awardXP = useCallback((amount, reason) => {
    setExperiencePoints(prevXP => {
      const newXP = prevXP + amount;
      
      // Check for level up
      const xpForNextLevel = getXPForLevel(userLevel);
      if (newXP >= xpForNextLevel) {
        setUserLevel(prevLevel => prevLevel + 1);
        // Keep remaining XP after level up
        return newXP - xpForNextLevel;
      }
      
      return newXP;
    });

    // Log XP award (could be used for notifications)
    console.log(`Awarded ${amount} XP for: ${reason}`);
  }, [userLevel]);

  // Update challenge progress
  const updateChallengeProgress = useCallback((challengeType, value, sessionData = {}) => {
    setDailyChallenges(prev => 
      prev.map(challenge => {
        if (challenge.type === challengeType && !challenge.completed) {
          let newCurrent = challenge.current;
          
          switch (challengeType) {
            case 'completion':
              newCurrent += value;
              break;
            case 'accuracy':
              if (sessionData.accuracy >= challenge.target) {
                newCurrent = challenge.target;
              }
              break;
            case 'streak':
              newCurrent = streak;
              break;
            case 'variety':
              if (sessionData.stage && !sessionData.completedStages?.includes(sessionData.stage)) {
                newCurrent += 1;
              }
              break;
            case 'speed':
              if (sessionData.responseTime && sessionData.responseTime < 2000) {
                newCurrent += 1;
              }
              break;
            default:
              break;
          }

          const completed = newCurrent >= challenge.target;
          
          if (completed && !challenge.completed) {
            // Award XP for completed challenge
            awardXP(challenge.xpReward, `Completed challenge: ${challenge.title}`);
            setCompletedChallenges(prev => [...prev, challenge.id]);
          }

          return {
            ...challenge,
            current: Math.min(newCurrent, challenge.target),
            completed
          };
        }
        return challenge;
      })
    );
  }, [awardXP, streak]);

  // Track card completion for challenges
  const trackCardCompletion = useCallback((card, isCorrect, responseTime, sessionData = {}) => {
    // Update completion challenge
    updateChallengeProgress('completion', 1);

    // Update speed challenge if applicable
    if (responseTime && responseTime < 2000) {
      updateChallengeProgress('speed', 1, { responseTime });
    }

    // Update variety challenge
    if (sessionData.stage) {
      updateChallengeProgress('variety', 0, { 
        stage: sessionData.stage,
        completedStages: sessionData.completedStages || []
      });
    }
  }, [updateChallengeProgress]);

  // Track session completion for challenges
  const trackSessionCompletion = useCallback((sessionData) => {
    // Update accuracy challenge
    if (sessionData.accuracy) {
      updateChallengeProgress('accuracy', 0, { accuracy: sessionData.accuracy });
    }

    // Update streak challenge
    updateChallengeProgress('streak', 0);

    // Award base XP for session completion
    const baseXP = Math.floor(sessionData.score * 2 + sessionData.accuracy);
    awardXP(baseXP, 'Session completion');
  }, [updateChallengeProgress, awardXP]);

  // Get user progress towards next level
  const getLevelProgress = useCallback(() => {
    const currentLevelXP = getXPForLevel(userLevel);
    const nextLevelXP = getXPForLevel(userLevel + 1);
    const progress = (experiencePoints / currentLevelXP) * 100;
    
    return {
      currentLevel: userLevel,
      nextLevel: userLevel + 1,
      currentXP: experiencePoints,
      requiredXP: currentLevelXP,
      nextLevelXP,
      progressPercentage: Math.min(progress, 100),
      xpToNextLevel: currentLevelXP - experiencePoints
    };
  }, [userLevel, experiencePoints]);

  // Get available rewards for current level
  const getLevelRewards = useCallback(() => {
    const rewards = {
      1: { title: 'Beginner', unlocks: ['Basic themes', 'Daily challenges'] },
      3: { title: 'Intermediate', unlocks: ['Advanced themes', 'Progress analytics'] },
      5: { title: 'Advanced', unlocks: ['Premium themes', 'Custom decks'] },
      10: { title: 'Expert', unlocks: ['All features', 'Priority support'] }
    };

    return Object.entries(rewards)
      .filter(([level]) => parseInt(level) <= userLevel)
      .map(([level, reward]) => ({ level: parseInt(level), ...reward }));
  }, [userLevel]);

  // Reset daily challenges (for testing or new day)
  const resetDailyChallenges = useCallback(() => {
    generateDailyChallenges();
    setCompletedChallenges([]);
  }, [generateDailyChallenges]);

  return {
    // State
    userLevel,
    experiencePoints,
    dailyChallenges,
    completedChallenges,
    streak,
    
    // Actions
    awardXP,
    trackCardCompletion,
    trackSessionCompletion,
    updateChallengeProgress,
    resetDailyChallenges,
    
    // Getters
    getLevelProgress,
    getLevelRewards,
    getXPForLevel
  };
};
