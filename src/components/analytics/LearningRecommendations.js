import React from 'react';
import { getThemeStyles } from '../../utils/themeManager';

const LearningRecommendations = ({ 
  recommendations = [], 
  sessionStats = {}, 
  currentTheme = 'blue',
  onSelectRecommendation 
}) => {
  const themeStyles = getThemeStyles(currentTheme);

  const containerStyle = {
    backgroundColor: `${themeStyles.theme.primary}10`,
    border: `1px solid ${themeStyles.theme.primary}20`,
    borderRadius: '0.75rem',
    padding: '1.5rem',
    marginBottom: '1.5rem'
  };

  const titleStyle = {
    color: themeStyles.theme.primary,
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  };

  const recommendationStyle = {
    backgroundColor: 'white',
    border: `1px solid ${themeStyles.theme.secondary}20`,
    borderRadius: '0.5rem',
    padding: '1rem',
    marginBottom: '0.75rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.75rem'
  };

  const recommendationHoverStyle = {
    ...recommendationStyle,
    transform: 'translateY(-2px)',
    boxShadow: `0 4px 12px ${themeStyles.theme.primary}20`,
    borderColor: themeStyles.theme.primary
  };

  const priorityIndicatorStyle = (priority) => ({
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: 
      priority === 'high' ? '#ef4444' : 
      priority === 'medium' ? '#f59e0b' : 
      '#10b981'
  });

  const statsContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginBottom: '1.5rem'
  };

  const statCardStyle = {
    backgroundColor: 'white',
    border: `1px solid ${themeStyles.theme.primary}20`,
    borderRadius: '0.5rem',
    padding: '1rem',
    textAlign: 'center'
  };

  const statValueStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: themeStyles.theme.primary,
    marginBottom: '0.25rem'
  };

  const statLabelStyle = {
    fontSize: '0.875rem',
    color: themeStyles.theme.text,
    opacity: 0.7
  };

  const getRecommendationIcon = (type) => {
    switch (type) {
      case 'targeted_practice':
        return '🎯';
      case 'mastery_practice':
        return '📈';
      case 'speed_practice':
        return '⚡';
      default:
        return '💡';
    }
  };

  const getDurationBadge = (duration) => {
    const styles = {
      short: { text: '5-10 min', color: '#10b981' },
      medium: { text: '15-20 min', color: '#f59e0b' },
      long: { text: 'Full session', color: '#ef4444' }
    };
    
    const style = styles[duration] || styles.medium;
    
    return {
      backgroundColor: `${style.color}20`,
      color: style.color,
      padding: '0.25rem 0.5rem',
      borderRadius: '0.25rem',
      fontSize: '0.75rem',
      fontWeight: '500'
    };
  };

  const [hoveredRecommendation, setHoveredRecommendation] = React.useState(null);

  if (recommendations.length === 0 && !sessionStats.averageAccuracy) {
    return (
      <div style={containerStyle}>
        <h3 style={titleStyle}>📊 Learning Analytics</h3>
        <p style={{ color: themeStyles.theme.text, opacity: 0.7, margin: 0 }}>
          Complete a few learning sessions to get personalized recommendations.
        </p>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>🎯 Smart Learning Recommendations</h3>
      
      {/* Statistics Overview */}
      {sessionStats.averageAccuracy > 0 && (
        <div style={statsContainerStyle}>
          <div style={statCardStyle}>
            <div style={statValueStyle}>
              {Math.round(sessionStats.averageAccuracy * 100)}%
            </div>
            <div style={statLabelStyle}>7-Day Accuracy</div>
          </div>
          
          <div style={statCardStyle}>
            <div style={statValueStyle}>
              {sessionStats.totalSessions}
            </div>
            <div style={statLabelStyle}>Practice Sessions</div>
          </div>
          
          <div style={statCardStyle}>
            <div style={statValueStyle}>
              {sessionStats.improvementRate > 0 ? '+' : ''}{Math.round(sessionStats.improvementRate)}%
            </div>
            <div style={statLabelStyle}>Improvement Rate</div>
          </div>
        </div>
      )}

      {/* Recommendations */}
      {recommendations.length > 0 ? (
        <div>
          <h4 style={{ 
            color: themeStyles.theme.text, 
            fontSize: '1rem', 
            marginBottom: '1rem',
            fontWeight: '600'
          }}>
            Personalized Practice ({recommendations.length} suggestions)
          </h4>
          
          {recommendations.map((rec, index) => (
            <div
              key={index}
              style={
                hoveredRecommendation === index 
                  ? recommendationHoverStyle 
                  : recommendationStyle
              }
              onMouseEnter={() => setHoveredRecommendation(index)}
              onMouseLeave={() => setHoveredRecommendation(null)}
              onClick={() => onSelectRecommendation && onSelectRecommendation(rec)}
            >
              <div style={priorityIndicatorStyle(rec.priority)} />
              
              <div style={{ flex: 1 }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  marginBottom: '0.25rem'
                }}>
                  <span>{getRecommendationIcon(rec.type)}</span>
                  <strong style={{ color: themeStyles.theme.text }}>
                    {rec.description}
                  </strong>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  gap: '0.5rem', 
                  alignItems: 'center',
                  fontSize: '0.875rem',
                  color: themeStyles.theme.text,
                  opacity: 0.7
                }}>
                  <span style={{ 
                    textTransform: 'capitalize',
                    backgroundColor: `${themeStyles.theme.secondary}20`,
                    padding: '0.125rem 0.5rem',
                    borderRadius: '0.25rem'
                  }}>
                    {rec.type.replace('_', ' ')}
                  </span>
                  
                  {rec.count && (
                    <span>• {rec.count} errors</span>
                  )}
                  
                  {rec.accuracy && (
                    <span>• {Math.round(rec.accuracy * 100)}% accuracy</span>
                  )}
                  
                  {rec.responseTime && (
                    <span>• {Math.round(rec.responseTime / 1000)}s avg</span>
                  )}
                </div>
              </div>
              
              <div style={getDurationBadge(
                rec.priority === 'high' ? 'short' :
                rec.priority === 'medium' ? 'medium' : 'long'
              )}>
                {rec.priority === 'high' ? '5-10 min' :
                 rec.priority === 'medium' ? '15-20 min' : 'Full session'}
              </div>
            </div>
          ))}
        </div>
      ) : sessionStats.averageAccuracy > 0 ? (
        <div style={{
          backgroundColor: `${themeStyles.theme.secondary}10`,
          border: `1px solid ${themeStyles.theme.secondary}20`,
          borderRadius: '0.5rem',
          padding: '1rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎉</div>
          <strong style={{ color: themeStyles.theme.text, display: 'block', marginBottom: '0.25rem' }}>
            Great Progress!
          </strong>
          <p style={{ color: themeStyles.theme.text, opacity: 0.7, margin: 0, fontSize: '0.875rem' }}>
            You're doing well across all areas. Keep up the consistent practice!
          </p>
        </div>
      ) : null}

      {/* Common Struggle Areas */}
      {sessionStats.commonStruggleAreas && sessionStats.commonStruggleAreas.length > 0 && (
        <div style={{ marginTop: '1.5rem' }}>
          <h4 style={{ 
            color: themeStyles.theme.text, 
            fontSize: '1rem', 
            marginBottom: '0.75rem',
            fontWeight: '600'
          }}>
            Common Challenge Areas
          </h4>
          
          {sessionStats.commonStruggleAreas.map((area, index) => (
            <div key={index} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.5rem 0',
              borderBottom: `1px solid ${themeStyles.theme.primary}10`
            }}>
              <span style={{ color: themeStyles.theme.text, fontSize: '0.875rem' }}>
                {area.description}
              </span>
              <span style={{
                backgroundColor: `${themeStyles.theme.primary}20`,
                color: themeStyles.theme.primary,
                padding: '0.25rem 0.5rem',
                borderRadius: '0.25rem',
                fontSize: '0.75rem',
                fontWeight: '500'
              }}>
                {area.count} times
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LearningRecommendations;
