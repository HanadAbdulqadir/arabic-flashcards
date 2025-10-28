import { useState, useEffect, useCallback } from 'react';

// Track user performance patterns and common errors
export const useLearningAnalytics = () => {
  const [learningHistory, setLearningHistory] = useState([]);
  const [errorPatterns, setErrorPatterns] = useState({});
  const [masteryProgress, setMasteryProgress] = useState({});
  const [sessionStats, setSessionStats] = useState({
    totalSessions: 0,
    averageAccuracy: 0,
    commonStruggleAreas: [],
    improvementRate: 0
  });

  // Load analytics from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('arabicFlashcardsLearningHistory');
    const savedErrorPatterns = localStorage.getItem('arabicFlashcardsErrorPatterns');
    const savedMasteryProgress = localStorage.getItem('arabicFlashcardsMasteryProgress');
    const savedSessionStats = localStorage.getItem('arabicFlashcardsSessionStats');

    if (savedHistory) setLearningHistory(JSON.parse(savedHistory));
    if (savedErrorPatterns) setErrorPatterns(JSON.parse(savedErrorPatterns));
    if (savedMasteryProgress) setMasteryProgress(JSON.parse(savedMasteryProgress));
    if (savedSessionStats) setSessionStats(JSON.parse(savedSessionStats));
  }, []);

  // Save analytics to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('arabicFlashcardsLearningHistory', JSON.stringify(learningHistory));
    localStorage.setItem('arabicFlashcardsErrorPatterns', JSON.stringify(errorPatterns));
    localStorage.setItem('arabicFlashcardsMasteryProgress', JSON.stringify(masteryProgress));
    localStorage.setItem('arabicFlashcardsSessionStats', JSON.stringify(sessionStats));
  }, [learningHistory, errorPatterns, masteryProgress, sessionStats]);


  // Calculate average response time
  const calculateAverageResponseTime = (currentStats, newTime, isCorrect) => {
    if (!currentStats) return newTime;
    const totalTime = (currentStats.averageResponseTime * currentStats.totalAttempts) + newTime;
    return totalTime / (currentStats.totalAttempts + 1);
  };

  // Update session-level statistics
  const updateSessionStats = useCallback((event) => {
    setSessionStats(prev => {
      const recentSessions = learningHistory
        .filter(e => new Date(e.timestamp) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) // Last 7 days
        .slice(-100); // Last 100 events

      const accuracy = recentSessions.length > 0 
        ? recentSessions.filter(e => e.isCorrect).length / recentSessions.length 
        : 0;

      // Identify common struggle areas
      const struggleAreas = Object.entries(errorPatterns)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([pattern, count]) => ({
          pattern,
          count,
          description: getStruggleDescription(pattern)
        }));

      return {
        totalSessions: prev.totalSessions + (event.isCorrect ? 0 : 1), // Count sessions with errors
        averageAccuracy: accuracy,
        commonStruggleAreas: struggleAreas,
        improvementRate: calculateImprovementRate(prev.averageAccuracy, accuracy)
      };
    });
  }, [learningHistory, errorPatterns]);

  // Calculate improvement rate
  const calculateImprovementRate = (oldAccuracy, newAccuracy) => {
    if (oldAccuracy === 0) return newAccuracy > 0 ? 1 : 0;
    return ((newAccuracy - oldAccuracy) / oldAccuracy) * 100;
  };

  // Track a learning event (card response)
  const trackCardResponse = useCallback((card, isCorrect, responseTime, selectedAnswer, correctAnswer) => {
    const event = {
      timestamp: new Date().toISOString(),
      cardId: card.id || `${card.arabic}_${card.type}`,
      stage: card.stage || 'unknown',
      type: card.type,
      isCorrect,
      responseTime,
      selectedAnswer,
      correctAnswer,
      difficulty: card.difficulty || 'beginner'
    };

    setLearningHistory(prev => [...prev, event]);

    // Update error patterns for incorrect responses
    if (!isCorrect) {
      const errorKey = `${card.stage}_${card.type}_${selectedAnswer}_${correctAnswer}`;
      setErrorPatterns(prev => ({
        ...prev,
        [errorKey]: (prev[errorKey] || 0) + 1
      }));
    }

    // Update mastery progress
    const masteryKey = `${card.stage}_${card.type}`;
    setMasteryProgress(prev => ({
      ...prev,
      [masteryKey]: {
        totalAttempts: ((prev[masteryKey]?.totalAttempts) || 0) + 1,
        correctAttempts: ((prev[masteryKey]?.correctAttempts) || 0) + (isCorrect ? 1 : 0),
        averageResponseTime: calculateAverageResponseTime(prev[masteryKey], responseTime, isCorrect)
      }
    }));

    // Update session stats
    updateSessionStats(event);
  }, [updateSessionStats]);

  // Get description for struggle patterns
  const getStruggleDescription = (pattern) => {
    const [stage, type, selected, correct] = pattern.split('_');
    
    if (type === 'letter') {
      return `Confusing ${selected} with ${correct} in ${stage}`;
    } else if (type.includes('listening')) {
      return `Mishearing ${selected} as ${correct} in ${stage}`;
    } else if (type.includes('word')) {
      return `Confusing word "${selected}" with "${correct}"`;
    }
    
    return `Difficulty with ${type} in ${stage}`;
  };

  // Get recommendations based on performance
  const getLearningRecommendations = useCallback(() => {
    const recommendations = [];

    // Check for specific error patterns
    Object.entries(errorPatterns)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .forEach(([pattern, count]) => {
        if (count >= 3) { // Only suggest if error occurred multiple times
          recommendations.push({
            type: 'targeted_practice',
            pattern,
            description: `Practice ${getStruggleDescription(pattern)}`,
            priority: 'high',
            count
          });
        }
      });

    // Check for low mastery areas
    Object.entries(masteryProgress).forEach(([area, stats]) => {
      const accuracy = stats.correctAttempts / stats.totalAttempts;
      if (stats.totalAttempts >= 5 && accuracy < 0.7) {
        recommendations.push({
          type: 'mastery_practice',
          area,
          description: `Improve ${area} mastery (current: ${Math.round(accuracy * 100)}%)`,
          priority: accuracy < 0.5 ? 'high' : 'medium',
          accuracy
        });
      }
    });

    // Check for slow response times
    Object.entries(masteryProgress).forEach(([area, stats]) => {
      if (stats.totalAttempts >= 3 && stats.averageResponseTime > 3000) { // > 3 seconds
        recommendations.push({
          type: 'speed_practice',
          area,
          description: `Increase speed in ${area} (avg: ${Math.round(stats.averageResponseTime / 1000)}s)`,
          priority: 'medium',
          responseTime: stats.averageResponseTime
        });
      }
    });

    return recommendations.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }, [errorPatterns, masteryProgress]);

  // Get adaptive learning path suggestions
  const getAdaptiveLearningPath = useCallback((currentStage) => {
    const recommendations = getLearningRecommendations();
    const path = [];

    // Add high priority recommendations first
    const highPriority = recommendations.filter(r => r.priority === 'high');
    highPriority.forEach(rec => {
      path.push({
        type: 'remedial',
        recommendation: rec,
        duration: 'short', // 5-10 minute focused practice
        description: `Focus on: ${rec.description}`
      });
    });

    // Add medium priority if no high priority
    if (path.length === 0) {
      const mediumPriority = recommendations.filter(r => r.priority === 'medium');
      mediumPriority.slice(0, 2).forEach(rec => {
        path.push({
          type: 'improvement',
          recommendation: rec,
          duration: 'medium', // 15-20 minute practice
          description: `Work on: ${rec.description}`
        });
      });
    }

    // If no specific recommendations, suggest progressive learning
    if (path.length === 0) {
      path.push({
        type: 'progressive',
        stage: getNextProgressiveStage(currentStage),
        duration: 'long', // Full session
        description: `Continue with ${getNextProgressiveStage(currentStage)}`
      });
    }

    return path;
  }, [getLearningRecommendations]);

  // Determine next progressive stage
  const getNextProgressiveStage = (currentStage) => {
    const stageOrder = [
      'alphabet', 'long_vowels', 'sukun_tanwin', 
      'simple_words', 'word_roots', 'simple_sentences',
      'advanced_vocabulary', 'listening_comprehension', 'quranic_mastery'
    ];
    
    const currentIndex = stageOrder.indexOf(currentStage);
    return currentIndex < stageOrder.length - 1 ? stageOrder[currentIndex + 1] : currentStage;
  };

  // Reset analytics (for testing or user reset)
  const resetAnalytics = useCallback(() => {
    setLearningHistory([]);
    setErrorPatterns({});
    setMasteryProgress({});
    setSessionStats({
      totalSessions: 0,
      averageAccuracy: 0,
      commonStruggleAreas: [],
      improvementRate: 0
    });
  }, []);

  return {
    trackCardResponse,
    getLearningRecommendations,
    getAdaptiveLearningPath,
    resetAnalytics,
    sessionStats
  };
};
