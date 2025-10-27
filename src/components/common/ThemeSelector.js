import React from 'react';
import { themes, getThemeStyles } from '../../utils/themeManager';

const ThemeSelector = ({ currentTheme, onThemeChange, onClose }) => {
  const styles = getThemeStyles(currentTheme);

  const themeButtonStyle = {
    padding: '1rem',
    margin: '0.5rem',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    flex: '1',
    minWidth: '120px'
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: styles.theme.background,
    padding: '2rem',
    color: styles.theme.text,
    fontFamily: 'Arial, sans-serif'
  };

  const cardStyle = {
    backgroundColor: styles.theme.card,
    padding: '2rem',
    borderRadius: '1rem',
    marginBottom: '2rem',
    width: '100%',
    maxWidth: '600px',
    border: `1px solid ${styles.theme.primary}20`,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    textAlign: 'center'
  };

  const themesGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem'
  };

  const handleThemeSelect = (themeName) => {
    onThemeChange(themeName);
    // Close the theme selector immediately after selection
    setTimeout(() => {
      if (onClose) {
        onClose();
      }
    }, 100);
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={styles.titleStyle}>🎨 Choose Your Theme</h1>
        <p style={styles.subtitleStyle}>
          Select a color theme for your learning experience
        </p>

        <div style={themesGridStyle}>
          {Object.entries(themes).map(([key, theme]) => (
            <button
              key={key}
              onClick={() => handleThemeSelect(key)}
              style={{
                ...themeButtonStyle,
                backgroundColor: theme.primary,
                color: 'white',
                border: currentTheme === key ? `3px solid ${theme.secondary}` : 'none',
                transform: currentTheme === key ? 'scale(1.05)' : 'scale(1)',
                boxShadow: currentTheme === key ? `0 6px 20px ${theme.primary}80` : `0 4px 15px ${theme.primary}40`
              }}
              onMouseEnter={(e) => {
                if (currentTheme !== key) {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = `0 6px 20px ${theme.primary}80`;
                }
              }}
              onMouseLeave={(e) => {
                if (currentTheme !== key) {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = `0 4px 15px ${theme.primary}40`;
                }
              }}
            >
              {theme.name}
            </button>
          ))}
        </div>

        <div style={{ 
          backgroundColor: `${styles.theme.primary}10`, 
          padding: '1.5rem', 
          borderRadius: '0.75rem',
          border: `1px solid ${styles.theme.primary}20`,
          marginBottom: '2rem'
        }}>
          <h3 style={{ color: styles.theme.secondary, marginBottom: '0.5rem' }}>
            Current Theme: {themes[currentTheme]?.name}
          </h3>
          <p style={{ margin: 0, opacity: 0.8 }}>
            This theme will be applied throughout the application
          </p>
        </div>

        <button
          onClick={onClose}
          style={{
            backgroundColor: styles.theme.secondary,
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            fontSize: '1.25rem',
            borderRadius: '0.75rem',
            cursor: 'pointer',
            fontWeight: 'bold',
            width: '100%',
            boxShadow: `0 4px 15px ${styles.theme.secondary}40`,
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = `0 6px 20px ${styles.theme.secondary}60`;
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = `0 4px 15px ${styles.theme.secondary}40`;
          }}
        >
          ← Back to App
        </button>
      </div>
    </div>
  );
};

export default ThemeSelector;
