import { useCallback } from 'react';

export const useSpacedRepetition = () => {
  const calculateNextReview = useCallback((card, wasCorrect, responseTime) => {
    const baseInterval = 24 * 60 * 60 * 1000; // 1 day
    const easeFactor = card.easeFactor || 2.5;
    
    if (wasCorrect) {
      const newInterval = Math.floor((card.interval || baseInterval) * easeFactor);
      const newEaseFactor = Math.max(1.3, easeFactor + 0.1 - (responseTime > 5000 ? 0.2 : 0));
      
      return {
        interval: newInterval,
        easeFactor: newEaseFactor,
        nextReview: new Date(Date.now() + newInterval)
      };
    } else {
      return {
        interval: baseInterval,
        easeFactor: Math.max(1.3, easeFactor - 0.2),
        nextReview: new Date(Date.now() + baseInterval)
      };
    }
  }, []);

  const updateCardAfterReview = useCallback((card, wasCorrect, responseTime) => {
    const srsResult = calculateNextReview(card, wasCorrect, responseTime);
    
    return {
      ...card,
      streak: wasCorrect ? card.streak + 1 : 0,
      mastery: wasCorrect && card.streak + 1 >= 2 ? 1 : card.mastery,
      lastReviewed: new Date().toISOString(),
      nextReview: srsResult.nextReview.toISOString(),
      easeFactor: srsResult.easeFactor,
      interval: srsResult.interval
    };
  }, [calculateNextReview]);

  return { updateCardAfterReview, calculateNextReview };
};
