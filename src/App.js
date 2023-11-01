import React, { useState, useEffect } from 'react';
import './App.css';
import GroupList from './components/GroupList';
import NoteList from './components/NoteList';
import Popup from './components/Popup';
import { getGroups, getNotes, saveGroup, saveNote } from './localStorage';

function App() {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [notes, setNotes] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const savedGroups = getGroups();
    if (savedGroups) {
      setGroups(savedGroups);
    }
  }, []);

  useEffect(() => {
    if (selectedGroup) {
      const savedNotes = getNotes(selectedGroup.id);
      if (savedNotes) {
        setNotes(savedNotes);
      }
    }
  }, [selectedGroup]);

  const createGroup = (groupName, groupColor) => {
    const newGroup = { id: Date.now(), name: groupName, color: groupColor };
    setGroups([...groups, newGroup]);
    saveGroup(newGroup);
  };

  const createNote = (noteText) => {
    if (selectedGroup) {
      const newNote = { id: Date.now(), text: noteText, timestamp: new Date() };
      setNotes([...notes, newNote]);
      saveNote(selectedGroup.id, newNote);
    }
  };

  const handleBackButtonClick = () => {
    setSelectedGroup(null);
  };

  const handleWindowResize = () => {
    setIsMobileView(window.innerWidth <= 600);
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <div className="App">
      {isMobileView ? (
        // Mobile View
        <div className="sidebar">
          {selectedGroup ? (
            // Show Note List for the selected group
            <div>
              <button className="backButton" onClick={handleBackButtonClick}>
               &larr;
              </button>
              <NoteList selectedGroup={selectedGroup} notes={notes} createNote={createNote} />
            </div>
          ) : (
            // Show Group List if no group is selected
            <GroupList
              groups={groups}
              selectedGroup={selectedGroup}
              setSelectedGroup={setSelectedGroup}
              setShowPopup={setShowPopup}
            />
          )}
        </div>
      ) : (
        // Desktop View
        <div className="sidebar">
          <GroupList
            groups={groups}
            selectedGroup={selectedGroup}
            setSelectedGroup={setSelectedGroup}
            setShowPopup={setShowPopup}
          />
        </div>
      )}
      <div className="content">     
        <NoteList selectedGroup={selectedGroup} notes={notes} createNote={createNote} />
      </div>
      {showPopup && <Popup createGroup={createGroup} setShowPopup={setShowPopup} />}
    </div>
  );
}

export default App;
