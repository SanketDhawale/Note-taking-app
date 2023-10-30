import React, { useState, useEffect } from 'react';
import './App.css';
import GroupList from './components/GroupList';
import NoteList from './components/NoteList';
import Popup from './components/Popup';
import { getGroups, getNotes, saveGroup, saveNote } from './localStorage';

function App() {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null); // Set it to null initially
  const [notes, setNotes] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const savedGroups = getGroups();
    if (savedGroups) {
      setGroups(savedGroups);
      setSelectedGroup(null); // Set it to null initially
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
    setSelectedGroup(newGroup);
    setShowPopup(false);
  };

  const createNote = (noteText) => {
    if (selectedGroup) {
      const newNote = { id: Date.now(), text: noteText, timestamp: new Date() };
      setNotes([...notes, newNote]);
      saveNote(selectedGroup.id, newNote);
    }
  };

  return (
    <div className="App">
      <div className="sidebar">
        <GroupList groups={groups} selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup} setShowPopup={setShowPopup} />
      
      </div>
      <div className="content">
        <NoteList selectedGroup={selectedGroup} notes={notes} createNote={createNote} />
      </div>
      {showPopup && <Popup createGroup={createGroup} setShowPopup={setShowPopup} />}
    </div>
  );
}

export default App;
