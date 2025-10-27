import React from 'react';

// Mock leaderboard data - in a real app, this would come from a backend
const MOCK_LEADERBOARD = [
  { id: 1, name: 'ArabicMaster', points: 12500, streak: 15, badges: 8 },
  { id: 2, name: 'QuranLearner', points: 9800, streak: 22, badges: 6 },
  { id: 3, name: 'LanguagePro', points: 7500, streak: 8, badges: 5 },
  { id: 4, name: 'Student123', points: 6200, streak: 12, badges: 4 },
  { id: 5, name: 'NewLearner', points: 4500, streak: 5, badges: 3 },
  { id: 6, name: 'CurrentUser', points: 3200, streak: 7, badges: 2, isCurrentUser: true },
  { id: 7, name: 'ArabicFan', points: 2800, streak: 3, badges: 2 },
  { id: 8, name: 'Beginner1', points: 1500, streak: 2, badges: 1 },
  { id: 9, name: 'JustStarted', points: 800, streak: 1, badges: 0 },
  { id: 10, name: 'Newbie', points: 300, streak: 0, badges: 0 }
];

const Leaderboard = ({ userPoints = 0, userStreak = 0, userBadges = 0 }) => {
  const containerStyle = {
    backgroundColor: '#f8fafc',
    padding: '1.5rem',
    borderRadius: '0.5rem',
    marginBottom: '1rem',
    border: '1px solid #e2e8f0'
  };

  const titleStyle = {
    textAlign: 'center',
    marginBottom: '1rem',
    color: '#4f46e5',
    fontSize: '1.25rem',
    fontWeight: 'bold'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse'
  };

  const headerStyle = {
    backgroundColor: '#e2e8f0',
    padding: '0.75rem',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: '0.875rem',
    color: '#374151'
  };

  const rowStyle = {
    borderBottom: '1px solid #e2e8f0'
  };

  const cellStyle = {
    padding: '0.75rem',
    fontSize: '0.875rem'
  };

  const currentUserRowStyle = {
    ...rowStyle,
    backgroundColor: '#dcfce7',
    fontWeight: 'bold'
  };

  const rankStyle = {
    width: '50px',
    textAlign: 'center',
    fontWeight: 'bold'
  };

  const pointsStyle = {
    fontWeight: 'bold',
    color: '#4f46e5'
  };

  const streakStyle = {
    color: '#ef4444',
    fontWeight: 'bold'
  };

  const badgesStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem'
  };

  const getRankIcon = (rank) => {
    switch(rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `${rank}`;
    }
  };

  const getUserRank = () => {
    // Find where current user would rank
    const sorted = [...MOCK_LEADERBOARD].sort((a, b) => b.points - a.points);
    const userRank = sorted.findIndex(user => user.isCurrentUser) + 1;
    return userRank || sorted.length + 1;
  };

  return (
    <div style={containerStyle}>
      <div style={titleStyle}>🏆 Global Leaderboard</div>
      
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={{ ...headerStyle, ...rankStyle }}>Rank</th>
            <th style={headerStyle}>Player</th>
            <th style={headerStyle}>Points</th>
            <th style={headerStyle}>Streak</th>
            <th style={headerStyle}>Badges</th>
          </tr>
        </thead>
        <tbody>
          {MOCK_LEADERBOARD.slice(0, 5).map((user, index) => (
            <tr key={user.id} style={user.isCurrentUser ? currentUserRowStyle : rowStyle}>
              <td style={{ ...cellStyle, ...rankStyle }}>
                {getRankIcon(index + 1)}
              </td>
              <td style={cellStyle}>
                {user.name}
                {user.isCurrentUser && ' (You)'}
              </td>
              <td style={{ ...cellStyle, ...pointsStyle }}>
                {user.points.toLocaleString()}
              </td>
              <td style={{ ...cellStyle, ...streakStyle }}>
                {user.streak} 🔥
              </td>
              <td style={cellStyle}>
                <div style={badgesStyle}>
                  {user.badges} 🏅
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Current user's position */}
      <div style={{
        marginTop: '1rem',
        padding: '0.75rem',
        backgroundColor: '#f1f5f9',
        borderRadius: '0.375rem',
        fontSize: '0.875rem',
        textAlign: 'center'
      }}>
        <strong>Your Position:</strong> #{getUserRank()} • {userPoints.toLocaleString()} points • {userStreak} streak • {userBadges} badges
      </div>

      <div style={{
        marginTop: '0.5rem',
        fontSize: '0.75rem',
        color: '#6b7280',
        textAlign: 'center'
      }}>
        Climb the ranks by earning points and maintaining streaks!
      </div>
    </div>
  );
};

export default Leaderboard;
