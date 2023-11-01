// GroupList.js
import React from 'react';
import styles from './GroupList.module.css'; // Import the CSS module

function GroupList({ groups, selectedGroup, setSelectedGroup, setShowPopup }) {
  return (
    <div className={styles.groupListContainer}>
      <h2>Pocket Notes</h2>
      <button className={styles.createGroupButton} onClick={() => setShowPopup(true)}>
       + Create Notes Group
      </button>
      <div className={styles.groupList}>
        {groups.map((group) => (
          <div
            key={group.id}
            className={`${styles.group} ${selectedGroup && selectedGroup.id === group.id ? styles.selected : ''}`}
            onClick={() => setSelectedGroup(group)}
          >
            <div className={styles.groupItem}>
              <div className={styles.groupIcon} style={{ backgroundColor: group.color }}>
                {group.name.substring(0, 2)}
              </div>
              <div className={styles.groupName}>{group.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GroupList;