import React from 'react';

const OptionsDisplay = ({ 
  options, 
  onAnswer, 
  selectedAnswer, 
  isCorrectAnswer, 
  disabled = false 
}) => {
  const optionsContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '0.75rem',
  };

  const getOptionButtonStyle = (option) => {
    const baseStyle = {
      fontSize: '1.875rem',
      backgroundColor: '#f3f4f6',
      border: 'none',
      padding: '0.75rem',
      borderRadius: '0.5rem',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    };

    if (selectedAnswer === option) {
      if (isCorrectAnswer) {
        return { ...baseStyle, backgroundColor: '#10b981', color: 'white' };
      } else {
        return { ...baseStyle, backgroundColor: '#ef4444', color: 'white' };
      }
    }
    
    return baseStyle;
  };

  return (
    <div style={optionsContainerStyle}>
      {options && options.map((option, index) => (
        <button
          key={index}
          onClick={() => onAnswer(option)}
          style={getOptionButtonStyle(option)}
          disabled={disabled}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default OptionsDisplay;
