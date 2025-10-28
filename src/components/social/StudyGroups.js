import React, { useState } from 'react';
import { getThemeStyles } from '../../utils/themeManager';

const StudyGroups = ({ 
  currentTheme = 'blue',
  userPoints = 0,
  userLevel = 1
}) => {
  const themeStyles = getThemeStyles(currentTheme);
  const [activeTab, setActiveTab] = useState('myGroups');
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');

  // Mock study groups data
  const [studyGroups, setStudyGroups] = useState([
    {
      id: 1,
      name: 'Arabic Beginners Club',
      description: 'Perfect for those just starting their Arabic journey',
      members: 24,
      activeMembers: 8,
      weeklyGoal: 'Complete 50 cards',
      progress: 65,
      isMember: true,
      levelRequirement: 1
    },
    {
      id: 2,
      name: 'Quranic Arabic Masters',
      description: 'Advanced study of Quranic vocabulary and grammar',
      members: 42,
      activeMembers: 15,
      weeklyGoal: 'Master 20 Quranic words',
      progress: 80,
      isMember: false,
      levelRequirement: 5
    },
    {
      id: 3,
      name: 'Daily Practice Warriors',
      description: 'For learners committed to daily practice',
      members: 18,
      activeMembers: 12,
      weeklyGoal: '7-day streak',
      progress: 90,
      isMember: true,
      levelRequirement: 2
    }
  ]);

  // Mock recommended groups
  const recommendedGroups = [
    {
      id: 4,
      name: 'Arabic Writing Practice',
      description: 'Focus on proper letter formation and handwriting',
      members: 31,
      activeMembers: 9,
      weeklyGoal: 'Practice 10 letters',
      progress: 45,
      levelRequirement: 1
    },
    {
      id: 5,
      name: 'Advanced Vocabulary Builders',
      description: 'Expand your Arabic vocabulary with advanced words',
      members: 27,
      activeMembers: 11,
      weeklyGoal: 'Learn 15 new words',
      progress: 70,
      levelRequirement: 3
    }
  ];

  const containerStyle = {
    backgroundColor: themeStyles.theme.background,
    border: `1px solid ${themeStyles.theme.primary}20`,
    borderRadius: '0.75rem',
    padding: '1.5rem'
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem'
  };

  const tabStyle = {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1.5rem',
    borderBottom: `1px solid ${themeStyles.theme.primary}20`,
    paddingBottom: '0.5rem'
  };

  const tabButtonStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    fontSize: '0.875rem',
    color: themeStyles.theme.text,
    opacity: 0.7,
    transition: 'all 0.2s ease'
  };

  const activeTabStyle = {
    ...tabButtonStyle,
    backgroundColor: themeStyles.theme.primary,
    color: 'white',
    opacity: 1
  };

  const groupCardStyle = {
    backgroundColor: 'white',
    border: `1px solid ${themeStyles.theme.primary}20`,
    borderRadius: '0.5rem',
    padding: '1rem',
    marginBottom: '1rem',
    transition: 'all 0.2s ease'
  };

  const buttonStyle = {
    backgroundColor: themeStyles.theme.primary,
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    fontSize: '0.875rem',
    marginRight: '0.5rem'
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: themeStyles.theme.secondary
  };

  const successButtonStyle = {
    ...buttonStyle,
    backgroundColor: themeStyles.theme.success
  };

  const progressBarStyle = {
    width: '100%',
    height: '6px',
    backgroundColor: `${themeStyles.theme.primary}20`,
    borderRadius: '3px',
    overflow: 'hidden',
    margin: '0.5rem 0'
  };

  const progressFillStyle = {
    height: '100%',
    backgroundColor: themeStyles.theme.success,
    borderRadius: '3px',
    transition: 'width 0.3s ease'
  };

  const joinGroup = (groupId) => {
    setStudyGroups(groups => 
      groups.map(group => 
        group.id === groupId ? { ...group, isMember: true } : group
      )
    );
    alert('🎉 Welcome to the study group!');
  };

  const leaveGroup = (groupId) => {
    setStudyGroups(groups => 
      groups.map(group => 
        group.id === groupId ? { ...group, isMember: false } : group
      )
    );
    alert('You have left the study group.');
  };

  const createGroup = () => {
    if (!newGroupName.trim()) {
      alert('Please enter a group name');
      return;
    }

    const newGroup = {
      id: Date.now(),
      name: newGroupName,
      description: newGroupDescription,
      members: 1,
      activeMembers: 1,
      weeklyGoal: 'Set your first goal!',
      progress: 0,
      isMember: true,
      levelRequirement: 1
    };

    setStudyGroups([newGroup, ...studyGroups]);
    setNewGroupName('');
    setNewGroupDescription('');
    setShowCreateGroup(false);
    alert('🎊 Your study group has been created!');
  };

  const myGroups = studyGroups.filter(group => group.isMember);
  const availableGroups = studyGroups.filter(group => !group.isMember);

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h3 style={{ margin: 0, color: themeStyles.theme.text }}>
          👥 Study Groups
        </h3>
        <button 
          style={successButtonStyle}
          onClick={() => setShowCreateGroup(true)}
        >
          ➕ Create Group
        </button>
      </div>

      {/* Create Group Modal */}
      {showCreateGroup && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '0.75rem',
            width: '90%',
            maxWidth: '400px'
          }}>
            <h4 style={{ margin: '0 0 1rem 0', color: themeStyles.theme.text }}>
              Create New Study Group
            </h4>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                Group Name
              </label>
              <input
                type="text"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: `1px solid ${themeStyles.theme.primary}30`,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem'
                }}
                placeholder="Enter group name..."
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                Description (Optional)
              </label>
              <textarea
                value={newGroupDescription}
                onChange={(e) => setNewGroupDescription(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: `1px solid ${themeStyles.theme.primary}30`,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  minHeight: '80px',
                  resize: 'vertical'
                }}
                placeholder="Describe your group..."
              />
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <button 
                style={secondaryButtonStyle}
                onClick={() => setShowCreateGroup(false)}
              >
                Cancel
              </button>
              <button 
                style={successButtonStyle}
                onClick={createGroup}
              >
                Create Group
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div style={tabStyle}>
        <button
          style={activeTab === 'myGroups' ? activeTabStyle : tabButtonStyle}
          onClick={() => setActiveTab('myGroups')}
        >
          My Groups ({myGroups.length})
        </button>
        <button
          style={activeTab === 'discover' ? activeTabStyle : tabButtonStyle}
          onClick={() => setActiveTab('discover')}
        >
          Discover Groups
        </button>
        <button
          style={activeTab === 'recommended' ? activeTabStyle : tabButtonStyle}
          onClick={() => setActiveTab('recommended')}
        >
          Recommended
        </button>
      </div>

      {/* My Groups Tab */}
      {activeTab === 'myGroups' && (
        <div>
          {myGroups.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: themeStyles.theme.text, opacity: 0.7 }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👥</div>
              <h4 style={{ margin: '0 0 0.5rem 0' }}>No Groups Yet</h4>
              <p style={{ margin: 0, fontSize: '0.875rem' }}>
                Join or create a study group to learn together with others!
              </p>
            </div>
          ) : (
            myGroups.map(group => (
              <div key={group.id} style={groupCardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <div>
                    <h4 style={{ margin: '0 0 0.25rem 0', color: themeStyles.theme.text }}>
                      {group.name}
                    </h4>
                    <p style={{ margin: 0, fontSize: '0.875rem', color: themeStyles.theme.text, opacity: 0.7 }}>
                      {group.description}
                    </p>
                  </div>
                  <button 
                    style={secondaryButtonStyle}
                    onClick={() => leaveGroup(group.id)}
                  >
                    Leave
                  </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: themeStyles.theme.text, opacity: 0.7, marginBottom: '0.5rem' }}>
                  <span>👥 {group.members} members ({group.activeMembers} active)</span>
                  <span>🎯 {group.weeklyGoal}</span>
                </div>

                <div style={progressBarStyle}>
                  <div style={{ ...progressFillStyle, width: `${group.progress}%` }}></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: themeStyles.theme.text, opacity: 0.7 }}>
                  <span>Group Progress</span>
                  <span>{group.progress}%</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Discover Groups Tab */}
      {activeTab === 'discover' && (
        <div>
          {availableGroups.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: themeStyles.theme.text, opacity: 0.7 }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</div>
              <h4 style={{ margin: '0 0 0.5rem 0' }}>All Groups Joined!</h4>
              <p style={{ margin: 0, fontSize: '0.875rem' }}>
                You've joined all available groups. Create your own or check back later for new groups!
              </p>
            </div>
          ) : (
            availableGroups.map(group => (
              <div key={group.id} style={groupCardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <div>
                    <h4 style={{ margin: '0 0 0.25rem 0', color: themeStyles.theme.text }}>
                      {group.name}
                    </h4>
                    <p style={{ margin: 0, fontSize: '0.875rem', color: themeStyles.theme.text, opacity: 0.7 }}>
                      {group.description}
                    </p>
                  </div>
                  <button 
                    style={buttonStyle}
                    onClick={() => joinGroup(group.id)}
                    disabled={userLevel < group.levelRequirement}
                  >
                    {userLevel < group.levelRequirement ? `Level ${group.levelRequirement}+` : 'Join'}
                  </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: themeStyles.theme.text, opacity: 0.7, marginBottom: '0.5rem' }}>
                  <span>👥 {group.members} members ({group.activeMembers} active)</span>
                  <span>🎯 {group.weeklyGoal}</span>
                </div>

                <div style={progressBarStyle}>
                  <div style={{ ...progressFillStyle, width: `${group.progress}%` }}></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: themeStyles.theme.text, opacity: 0.7 }}>
                  <span>Group Progress</span>
                  <span>{group.progress}%</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Recommended Groups Tab */}
      {activeTab === 'recommended' && (
        <div>
          {recommendedGroups.map(group => (
            <div key={group.id} style={groupCardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <div>
                  <h4 style={{ margin: '0 0 0.25rem 0', color: themeStyles.theme.text }}>
                    {group.name}
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: themeStyles.theme.text, opacity: 0.7 }}>
                    {group.description}
                  </p>
                </div>
                <button 
                  style={buttonStyle}
                  onClick={() => joinGroup(group.id)}
                  disabled={userLevel < group.levelRequirement}
                >
                  {userLevel < group.levelRequirement ? `Level ${group.levelRequirement}+` : 'Join'}
                </button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: themeStyles.theme.text, opacity: 0.7, marginBottom: '0.5rem' }}>
                <span>👥 {group.members} members ({group.activeMembers} active)</span>
                <span>🎯 {group.weeklyGoal}</span>
              </div>

              <div style={progressBarStyle}>
                <div style={{ ...progressFillStyle, width: `${group.progress}%` }}></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: themeStyles.theme.text, opacity: 0.7 }}>
                <span>Group Progress</span>
                <span>{group.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudyGroups;
