import React from 'react';
import styles from './Note.module.css';

function Note({ note }) {
  const formattedTimestamp = formatTimestamp(new Date(note.timestamp));

  return (
    <div className={styles.note}>
      <div className={styles.note_timestamp}>{formattedTimestamp}</div>
      <div className={styles.note_text}>{note.text}</div>
    </div>
  );
}

function formatTimestamp(timestamp) {
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  const time = new Intl.DateTimeFormat('en-US', options).format(timestamp);

  const dateOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  const date = new Intl.DateTimeFormat('en-US', dateOptions).format(timestamp);

  return `${time} - ${date}`;
}

export default Note;
