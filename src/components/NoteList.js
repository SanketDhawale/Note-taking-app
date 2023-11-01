import React from 'react';
import styles from './NoteList.module.css'; // Import the CSS module
import Note from './Note';
import NoteImage from '../assets/NoteImage.png';

function NoteList({ selectedGroup, notes, createNote }) {
  const [noteText, setNoteText] = React.useState('');

  const handleNoteTextChange = (e) => {
    setNoteText(e.target.value);
  };

  const handleNoteCreate = (e) => {
    if (e.key === 'Enter' && noteText.trim() !== '') {
      createNote(noteText);
      setNoteText('');
    }
  };

  const handleCreateClick = () => {
    if (noteText.trim() !== '') {
      createNote(noteText);
      setNoteText('');
    }
  };

  return (
    <div className={styles.noteList}>
      {selectedGroup ? (
        <div className={styles.groupInfo}>
          <div className={styles.groupIcon} style={{ backgroundColor: selectedGroup.color }}>
            {selectedGroup.name.substring(0, 2)}
          </div>
          <h2 className={styles.noteListTitle}>{selectedGroup.name}</h2>
        </div>
      ) : null}
      {selectedGroup ? (
        <div className={styles.createNote}>
          <div className={styles.notes}>
            {notes.map((note) => (
              <Note key={note.id} note={note} />
            ))}
          </div>
          <div className={styles.noteInputContainer}>
            <div className={styles.noteInputWrapper}>
              <input
                type="text"
                value={noteText}
                onChange={handleNoteTextChange}
                onKeyPress={handleNoteCreate}
                placeholder="Type a note..."
                className={styles.noteInput}
              />
              <button className={styles.createButton} onClick={handleCreateClick}>
                &gt;
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.welcomeMessage}>
          
          <img src={NoteImage}  alt="Welcome Image" />
          <h3>Pocket Notes</h3>
          <p>Send and receive messages without keeping your phone online.<br/> Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
          <div className="bottom-line">&#x1F512;end-to-end encrypted</div> {/* Add the line at the bottom */}
        </div>
      )}
    </div>
  );
}

export default NoteList;
