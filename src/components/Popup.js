import React, { useState, useRef, useEffect } from 'react';
import styles from './Popup.module.css';

function Popup({ createGroup, setShowPopup }) {
  const [groupName, setGroupName] = useState('');
  const [groupColor, setGroupColor] = useState('#007bff'); // Default color
  const predefinedColors = ['#B38BFA', ' #FF79F2', '#43E6FC', '#F19576', '#0047FF', '#6691FF'];
  
  const popupRef = useRef();

  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };

  const handleGroupColorChange = (color) => {
    setGroupColor(color);
  };

  const handleCreateGroup = () => {
    if (groupName.trim() !== '') {
      createGroup(groupName, groupColor);
      setGroupName('');
      setShowPopup(false);
    }
  };

  // Close the popup when clicking outside of it
  const handleClickOutside = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      setShowPopup(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.popup}>
      <div className={styles.popupBackdrop}>
        <div className={styles.popupContent} ref={popupRef}>
          <span className={styles.close} onClick={() => setShowPopup(false)}>
            &times;
          </span>
          <h2>Create new notes Group</h2>
          <span>Group name:</span>
          <input
            type="text"
            placeholder="Group Name"
            value={groupName}
            onChange={handleGroupNameChange}
            className={styles.groupNameInput}
          />
          <div className={styles.colorPicker}>
            <span>Choose a Color:</span>
            <div className={styles.colorButtons}>
              {predefinedColors.map((color) => (
                <button
                  key={color}
                  style={{ backgroundColor: color }}
                  onClick={() => handleGroupColorChange(color)}
                  className={groupColor === color ? styles.selectedColor : ''}
                ></button>
              ))}
            </div>
          </div>
          <button onClick={handleCreateGroup} className={styles.createGroupButton}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
