import React, { useState, useRef, useEffect } from 'react';
import { getThemeStyles } from '../../utils/themeManager';

const LetterAnimation = ({ 
  letter, 
  position = 'isolated',
  currentTheme = 'blue',
  interactive = true,
  onAnimationComplete = () => {}
}) => {
  const themeStyles = getThemeStyles(currentTheme);
  const canvasRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showStrokeOrder, setShowStrokeOrder] = useState(true);

  // Arabic letter stroke data (simplified for demonstration)
  const strokeData = {
    'ا': [
      { points: [{x: 50, y: 20}, {x: 50, y: 80}] }
    ],
    'ب': [
      { points: [{x: 30, y: 20}, {x: 30, y: 80}] },
      { points: [{x: 30, y: 80}, {x: 70, y: 80}] },
      { points: [{x: 70, y: 80}, {x: 70, y: 60}] }
    ],
    'ت': [
      { points: [{x: 30, y: 20}, {x: 30, y: 80}] },
      { points: [{x: 30, y: 80}, {x: 70, y: 80}] },
      { points: [{x: 70, y: 80}, {x: 70, y: 60}] },
      { points: [{x: 50, y: 20}, {x: 50, y: 40}] }
    ],
    'ث': [
      { points: [{x: 30, y: 20}, {x: 30, y: 80}] },
      { points: [{x: 30, y: 80}, {x: 70, y: 80}] },
      { points: [{x: 70, y: 80}, {x: 70, y: 60}] },
      { points: [{x: 40, y: 20}, {x: 40, y: 40}] },
      { points: [{x: 60, y: 20}, {x: 60, y: 40}] }
    ]
  };

  // Default stroke data for unknown letters
  const defaultStrokeData = [
    { points: [{x: 30, y: 20}, {x: 30, y: 80}] },
    { points: [{x: 30, y: 80}, {x: 70, y: 80}] }
  ];

  const strokes = strokeData[letter] || defaultStrokeData;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid background
    ctx.strokeStyle = `${themeStyles.theme.primary}20`;
    ctx.lineWidth = 0.5;
    
    // Horizontal lines
    for (let y = 0; y <= canvas.height; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
    
    // Vertical lines
    for (let x = 0; x <= canvas.width; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    // Draw completed strokes
    ctx.strokeStyle = themeStyles.theme.primary;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    for (let i = 0; i < currentStep; i++) {
      const stroke = strokes[i];
      if (stroke) {
        ctx.beginPath();
        ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
        for (let j = 1; j < stroke.points.length; j++) {
          ctx.lineTo(stroke.points[j].x, stroke.points[j].y);
        }
        ctx.stroke();
      }
    }

    // Draw current stroke animation
    if (isAnimating && currentStep < strokes.length) {
      const stroke = strokes[currentStep];
      if (stroke) {
        ctx.strokeStyle = themeStyles.theme.success;
        ctx.lineWidth = 4;
        
        ctx.beginPath();
        ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
        
        // Animate the stroke
        const progress = (Date.now() % 2000) / 2000;
        const currentPointIndex = Math.floor(progress * (stroke.points.length - 1));
        
        for (let j = 1; j <= currentPointIndex; j++) {
          ctx.lineTo(stroke.points[j].x, stroke.points[j].y);
        }
        
        ctx.stroke();
      }
    }

    // Draw stroke order numbers
    if (showStrokeOrder) {
      ctx.fillStyle = themeStyles.theme.secondary;
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      for (let i = 0; i < strokes.length; i++) {
        const stroke = strokes[i];
        if (stroke && stroke.points.length > 0) {
          const startPoint = stroke.points[0];
          ctx.fillText((i + 1).toString(), startPoint.x, startPoint.y - 10);
        }
      }
    }
  }, [letter, currentStep, isAnimating, showStrokeOrder, themeStyles, strokes]);

  const startAnimation = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentStep(0);
    
    const animateStep = (step) => {
      if (step >= strokes.length) {
        setIsAnimating(false);
        onAnimationComplete();
        return;
      }
      
      setCurrentStep(step);
      
      // Wait before next stroke
      setTimeout(() => {
        animateStep(step + 1);
      }, 1000);
    };
    
    animateStep(0);
  };

  const resetAnimation = () => {
    setIsAnimating(false);
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (currentStep < strokes.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
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
    cursor: interactive ? 'pointer' : 'default'
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

  return (
    <div style={containerStyle}>
      <h4 style={{ 
        margin: '0 0 1rem 0', 
        color: themeStyles.theme.text,
        fontSize: '1rem'
      }}>
        ✍️ Letter Formation: {letter}
        {position !== 'isolated' && ` (${position})`}
      </h4>

      <canvas
        ref={canvasRef}
        width={100}
        height={100}
        style={canvasStyle}
        onClick={interactive ? startAnimation : undefined}
        title={interactive ? "Click to start animation" : "Letter formation"}
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
            onClick={startAnimation}
            disabled={isAnimating}
          >
            {isAnimating ? 'Animating...' : '▶️ Play'}
          </button>
          <button 
            style={secondaryButtonStyle}
            onClick={resetAnimation}
          >
            🔄 Reset
          </button>
        </div>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '0.5rem',
          marginBottom: '0.5rem'
        }}>
          <button 
            style={secondaryButtonStyle}
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            ⬅️ Previous
          </button>
          <button 
            style={secondaryButtonStyle}
            onClick={nextStep}
            disabled={currentStep >= strokes.length}
          >
            Next ➡️
          </button>
        </div>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.875rem',
          color: themeStyles.theme.text
        }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <input
              type="checkbox"
              checked={showStrokeOrder}
              onChange={(e) => setShowStrokeOrder(e.target.checked)}
              style={{ margin: 0 }}
            />
            Show Stroke Order
          </label>
        </div>

        <div style={{ 
          marginTop: '0.5rem',
          fontSize: '0.75rem',
          color: themeStyles.theme.text,
          opacity: 0.7
        }}>
          Step {currentStep + 1} of {strokes.length}
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
          💡 <strong>Tip:</strong> Practice writing this letter while watching the animation. 
          Pay attention to stroke order and direction.
        </div>
      )}
    </div>
  );
};

export default LetterAnimation;
