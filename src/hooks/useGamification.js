import { useState, useCallback } from 'react';
import { BADGES } from '../components/gamification/Badges';

export const useGamification = () => {
  const [points, setPoints] = useState(0);
  const [earnedBadges, setEarnedBadges] = useState([]);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [cardsReviewed, setCardsReviewed] = useState(0);
  const [consecutiveDays] = useState(0);

  const calculatePoints = useCallback((card, wasCorrect, responseTime, streak) => {
    let points = 0;
    
    // Base points for correct answer
    if (wasCorrect) {
      points += 10;
      
      // Bonus for fast response
      if (responseTime < 2000) points += 5;
      if (responseTime < 1000) points += 5;
      
      // Streak multiplier
      if (streak >= 5) points *= 1.5;
      if (streak >= 10) points *= 2;
      if (streak >= 20) points *= 3;
      
      // Difficulty multiplier
      const difficultyMultiplier = {
        'beginner': 1,
        'intermediate': 1.5,
        'advanced': 2
      };
      points *= difficultyMultiplier[card.difficulty] || 1;
    }
    
    return Math.floor(points);
  }, []);

  const checkForNewBadges = useCallback((userProgress) => {
    const newBadges = [];
    
    Object.values(BADGES).forEach(badge => {
      if (!earnedBadges.includes(badge.id) && badge.condition(userProgress)) {
        newBadges.push(badge.id);
      }
    });
    
    if (newBadges.length > 0) {
      setEarnedBadges(prev => [...prev, ...newBadges]);
      return newBadges;
    }
    
    return [];
  }, [earnedBadges]);

  const trackCardResponse = useCallback((card, wasCorrect, responseTime) => {
    const newStreak = wasCorrect ? currentStreak + 1 : 0;
    setCurrentStreak(newStreak);
    
    const pointsEarned = calculatePoints(card, wasCorrect, responseTime, newStreak);
    setPoints(prev => prev + pointsEarned);
    
    setCardsReviewed(prev => prev + 1);
    
    // Update user progress for badge checking
    const userProgress = {
      currentStreak: newStreak,
      cardsReviewed: cardsReviewed + 1,
      stageMastery: 0, // This would come from actual progress tracking
      stageTime: Date.now() - (sessionStartTime || Date.now()),
      totalMastered: 0, // This would come from actual progress tracking
      totalCards: 0, // This would come from actual progress tracking
      listeningAccuracy: 0, // This would come from actual progress tracking
      vocabularyMastered: 0, // This would come from actual progress tracking
      consecutiveDays: consecutiveDays
    };
    
    const newBadges = checkForNewBadges(userProgress);
    
    return {
      pointsEarned,
      newStreak,
      newBadges
    };
  }, [calculatePoints, checkForNewBadges, currentStreak, cardsReviewed, sessionStartTime, consecutiveDays]);

  const startSession = useCallback(() => {
    setSessionStartTime(Date.now());
    setCardsReviewed(0);
  }, []);

  const endSession = useCallback(() => {
    setSessionStartTime(null);
  }, []);

  const resetGamification = useCallback(() => {
    setPoints(0);
    setEarnedBadges([]);
    setCurrentStreak(0);
    setSessionStartTime(null);
    setCardsReviewed(0);
  }, []);

  const getUserProgress = useCallback(() => {
    return {
      points,
      earnedBadges,
      currentStreak,
      cardsReviewed,
      consecutiveDays,
      sessionStartTime
    };
  }, [points, earnedBadges, currentStreak, cardsReviewed, consecutiveDays, sessionStartTime]);

  return {
    points,
    earnedBadges,
    currentStreak,
    trackCardResponse,
    startSession,
    endSession,
    resetGamification,
    getUserProgress,
    calculatePoints
  };
};
