import { useState, useCallback } from 'react';

export const useAudioManager = () => {
  const [audioCache] = useState(new Map());
  const [preloaded, setPreloaded] = useState(false);

  const preloadStageAudio = useCallback(async (stageCards) => {
    const audioUrls = stageCards.map(card => card.audio).filter(url => url);
    
    try {
      await Promise.all(
        audioUrls.map(url => 
          new Promise((resolve, reject) => {
            const audio = new Audio();
            audio.preload = 'auto';
            audio.src = url;
            audio.oncanplaythrough = () => {
              audioCache.set(url, audio);
              resolve();
            };
            audio.onerror = reject;
          })
        )
      );
      setPreloaded(true);
    } catch (error) {
      console.warn('Audio preloading failed:', error);
      // Continue without preloading - audio will load on demand
    }
  }, [audioCache]);

  const playAudio = useCallback((url) => {
    try {
      if (audioCache.has(url)) {
        const audio = audioCache.get(url);
        audio.currentTime = 0;
        audio.play().catch(error => {
          console.warn('Failed to play cached audio:', error);
          // Fallback to dynamic loading
          new Audio(url).play().catch(console.error);
        });
      } else {
        // Fallback to dynamic loading
        new Audio(url).play().catch(console.error);
      }
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  }, [audioCache]);

  return { preloadStageAudio, playAudio, preloaded };
};
