// Theme Manager for Arabic Flashcards
export const themes = {
  blue: {
    name: "Blue",
    primary: '#3b82f6',
    secondary: '#1e40af',
    background: '#eff6ff',
    card: '#ffffff',
    text: '#1f2937',
    accent: '#ef4444',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444'
  },
  green: {
    name: "Green",
    primary: '#10b981',
    secondary: '#047857',
    background: '#ecfdf5',
    card: '#ffffff',
    text: '#1f2937',
    accent: '#f59e0b',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444'
  },
  purple: {
    name: "Purple",
    primary: '#8b5cf6',
    secondary: '#7c3aed',
    background: '#faf5ff',
    card: '#ffffff',
    text: '#1f2937',
    accent: '#ec4899',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444'
  },
  orange: {
    name: "Orange",
    primary: '#f97316',
    secondary: '#ea580c',
    background: '#fff7ed',
    card: '#ffffff',
    text: '#1f2937',
    accent: '#dc2626',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444'
  },
  gray: {
    name: "Gray",
    primary: '#6b7280',
    secondary: '#4b5563',
    background: '#f9fafb',
    card: '#ffffff',
    text: '#1f2937',
    accent: '#ef4444',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444'
  }
};

export const getThemeStyles = (themeName = 'blue') => {
  const theme = themes[themeName] || themes.blue;
  
  return {
    containerStyle: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: theme.background,
      padding: '2rem',
      color: theme.text,
      fontFamily: 'Arial, sans-serif'
    },
    cardStyle: {
      backgroundColor: theme.card,
      padding: '2rem',
      borderRadius: '1rem',
      marginBottom: '2rem',
      width: '100%',
      maxWidth: '800px',
      border: `1px solid ${theme.primary}20`,
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      textAlign: 'center'
    },
    buttonStyle: {
      backgroundColor: theme.primary,
      color: 'white',
      border: 'none',
      padding: '1rem 2rem',
      fontSize: '1.25rem',
      borderRadius: '0.75rem',
      cursor: 'pointer',
      fontWeight: 'bold',
      margin: '1rem 0',
      boxShadow: `0 4px 15px ${theme.primary}40`,
      transition: 'all 0.3s ease'
    },
    secondaryButtonStyle: {
      backgroundColor: theme.secondary,
      color: 'white',
      border: 'none',
      padding: '1rem 2rem',
      fontSize: '1.25rem',
      borderRadius: '0.75rem',
      cursor: 'pointer',
      fontWeight: 'bold',
      margin: '1rem 0',
      boxShadow: `0 4px 15px ${theme.secondary}40`,
      transition: 'all 0.3s ease'
    },
    accentButtonStyle: {
      backgroundColor: theme.accent,
      color: 'white',
      border: 'none',
      padding: '1rem 2rem',
      fontSize: '1.25rem',
      borderRadius: '0.75rem',
      cursor: 'pointer',
      fontWeight: 'bold',
      margin: '1rem 0',
      boxShadow: `0 4px 15px ${theme.accent}40`,
      transition: 'all 0.3s ease'
    },
    outlineButtonStyle: {
      backgroundColor: 'transparent',
      color: theme.primary,
      border: `2px solid ${theme.primary}`,
      padding: '1rem 2rem',
      fontSize: '1.25rem',
      borderRadius: '0.75rem',
      cursor: 'pointer',
      fontWeight: 'bold',
      margin: '1rem 0',
      transition: 'all 0.3s ease'
    },
    titleStyle: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      color: theme.primary
    },
    subtitleStyle: {
      fontSize: '1.25rem',
      color: theme.text,
      opacity: 0.8,
      marginBottom: '2rem'
    },
    sectionTitleStyle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      color: theme.secondary
    },
    statCardStyle: {
      backgroundColor: `${theme.primary}10`,
      padding: '1.5rem',
      borderRadius: '0.75rem',
      textAlign: 'center',
      border: `1px solid ${theme.primary}20`
    },
    theme
  };
};

export const getThemeButtonHoverStyle = (baseStyle) => ({
  ...baseStyle,
  transform: 'translateY(-2px)',
  boxShadow: `${baseStyle.boxShadow}, 0 6px 20px ${baseStyle.backgroundColor}60`
});

export const getThemeOutlineButtonHoverStyle = (baseStyle, theme) => ({
  ...baseStyle,
  backgroundColor: theme.primary,
  color: 'white',
  transform: 'translateY(-2px)'
});
