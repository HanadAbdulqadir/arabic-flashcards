import React, { useState, useRef, useEffect } from 'react';
import { getThemeStyles } from '../../utils/themeManager';

const PronunciationVisualizer = ({ 
  text, 
  phonetic,
  currentTheme = 'blue',
  interactive = true,
  onPlayComplete = () => {}
}) => {
  const themeStyles = getThemeStyles(currentTheme);
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(3000); // 3 seconds for demonstration
  const [waveformData, setWaveformData] = useState([]);

  // Generate mock waveform data based on text
  useEffect(() => {
    const generateWaveform = () => {
      const data = [];
      const points = 50;
      
      for (let i = 0; i < points; i++) {
        // Create a waveform pattern based on text length and position
        const baseAmplitude = 0.3 + (Math.sin(i * 0.3) * 0.2);
        const variation = Math.sin(i * 0.5 + text.length * 0.1) * 0.4;
        const amplitude = Math.max(0.1, Math.min(0.9, baseAmplitude + variation));
        
        data.push({
          amplitude,
          frequency: 1 + (i % 3),
          isVowel: i % 4 === 0 // Mock vowel detection
        });
      }
      
      return data;
    };

    setWaveformData(generateWaveform());
  }, [text]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    ctx.fillStyle = themeStyles.theme.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = `${themeStyles.theme.primary}20`;
    ctx.lineWidth = 0.5;
    
    // Horizontal lines
    for (let y = 0; y <= canvas.height; y += canvas.height / 4) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
    
    // Vertical lines (time markers)
    for (let x = 0; x <= canvas.width; x += canvas.width / 10) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    // Draw waveform
    if (waveformData.length > 0) {
      const segmentWidth = canvas.width / waveformData.length;
      const centerY = canvas.height / 2;
      
      ctx.strokeStyle = themeStyles.theme.primary;
      ctx.lineWidth = 2;
      ctx.beginPath();

      for (let i = 0; i < waveformData.length; i++) {
        const point = waveformData[i];
        const x = i * segmentWidth;
        const amplitude = point.amplitude * (canvas.height / 2 - 10);
        const y = centerY + (Math.sin(i * point.frequency) * amplitude);

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        // Highlight vowels with different color
        if (point.isVowel) {
          ctx.stroke();
          ctx.strokeStyle = themeStyles.theme.success;
          ctx.beginPath();
          ctx.moveTo(x, centerY - amplitude);
          ctx.lineTo(x, centerY + amplitude);
          ctx.stroke();
          ctx.strokeStyle = themeStyles.theme.primary;
          ctx.beginPath();
          ctx.moveTo(x, y);
        }
      }

      ctx.stroke();

      // Draw progress indicator
      if (isPlaying) {
        const progressX = (currentTime / duration) * canvas.width;
        
        ctx.strokeStyle = themeStyles.theme.success;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(progressX, 0);
        ctx.lineTo(progressX, canvas.height);
        ctx.stroke();

        // Draw playhead circle
        ctx.fillStyle = themeStyles.theme.success;
        ctx.beginPath();
        ctx.arc(progressX, centerY, 6, 0, 2 * Math.PI);
        ctx.fill();
      }
    }

    // Draw labels
    ctx.fillStyle = themeStyles.theme.text;
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    
    // Time labels
    ctx.fillText('0s', 10, canvas.height - 5);
    ctx.fillText('3s', canvas.width - 10, canvas.height - 5);
    
    // Amplitude labels
    ctx.textAlign = 'left';
    ctx.fillText('High', 5, 15);
    ctx.textAlign = 'right';
    ctx.fillText('Low', canvas.width - 5, canvas.height - 15);
  }, [waveformData, currentTime, isPlaying, themeStyles, duration]);

  const playPronunciation = () => {
    if (isPlaying) return;
    
    setIsPlaying(true);
    setCurrentTime(0);
    
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setCurrentTime(elapsed);
      
      if (elapsed >= duration) {
        clearInterval(interval);
        setIsPlaying(false);
        setCurrentTime(0);
        onPlayComplete();
      }
    }, 50);
  };

  const stopPronunciation = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const containerStyle = {
    backgroundColor: themeStyles.theme.background,
    border: `1px solid ${themeStyles.theme.primary}20`,
    borderRadius: '0.75rem',
    padding: '1rem',
    textAlign: 'center'
  };

  const canvasStyle = {
    border: `2px solid ${themeStyles.theme.primary}30`,
    borderRadius: '0.5rem',
    margin: '0.5rem 0',
    backgroundColor: 'white'
  };

  const buttonStyle = {
    backgroundColor: themeStyles.theme.primary,
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    margin: '0.25rem',
    cursor: 'pointer',
    fontSize: '0.875rem'
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: themeStyles.theme.secondary
  };

  const textDisplayStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    margin: '0.5rem 0',
    color: themeStyles.theme.text
  };

  const phoneticStyle = {
    fontSize: '0.875rem',
    color: themeStyles.theme.secondary,
    marginBottom: '1rem',
    fontStyle: 'italic'
  };

  return (
    <div style={containerStyle}>
      <h4 style={{ 
        margin: '0 0 1rem 0', 
        color: themeStyles.theme.text,
        fontSize: '1rem'
      }}>
        🔊 Pronunciation: {text}
      </h4>

      <div style={textDisplayStyle}>
        {text}
      </div>
      
      {phonetic && (
        <div style={phoneticStyle}>
          /{phonetic}/
        </div>
      )}

      <canvas
        ref={canvasRef}
        width={300}
        height={120}
        style={canvasStyle}
        title="Pronunciation waveform visualization"
      />

      <div style={{ marginTop: '1rem' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '0.5rem',
          marginBottom: '0.5rem'
        }}>
          <button 
            style={buttonStyle}
            onClick={playPronunciation}
            disabled={isPlaying}
          >
            {isPlaying ? '🔊 Playing...' : '▶️ Play Sound'}
          </button>
          <button 
            style={secondaryButtonStyle}
            onClick={stopPronunciation}
            disabled={!isPlaying}
          >
            ⏹️ Stop
          </button>
        </div>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.75rem',
          color: themeStyles.theme.text,
          opacity: 0.7,
          marginTop: '0.5rem'
        }}>
          <span>Start</span>
          <span>
            {isPlaying ? `${(currentTime / 1000).toFixed(1)}s` : 'Ready'}
          </span>
          <span>End</span>
        </div>
      </div>

      {interactive && (
        <div style={{
          marginTop: '1rem',
          padding: '0.75rem',
          backgroundColor: `${themeStyles.theme.primary}10`,
          borderRadius: '0.5rem',
          fontSize: '0.75rem',
          color: themeStyles.theme.text,
          opacity: 0.8
        }}>
          💡 <strong>Pronunciation Tips:</strong>
          <br />
          • Watch the waveform to understand sound intensity
          <br />
          • Pay attention to vowel peaks (green markers)
          <br />
          • Practice matching the rhythm and flow
        </div>
      )}

      {/* Pronunciation Guide */}
      <div style={{
        marginTop: '1rem',
        padding: '0.75rem',
        backgroundColor: `${themeStyles.theme.secondary}10`,
        borderRadius: '0.5rem',
        fontSize: '0.75rem',
        color: themeStyles.theme.text
      }}>
        <strong>🎯 Pronunciation Guide:</strong>
        <br />
        • <strong>Wave Height</strong> = Sound intensity/loudness
        <br />
        • <strong>Wave Frequency</strong> = Pitch variation
        <br />
        • <strong>Green Markers</strong> = Vowel emphasis points
        <br />
        • <strong>Progress Line</strong> = Current playback position
      </div>
    </div>
  );
};

export default PronunciationVisualizer;
