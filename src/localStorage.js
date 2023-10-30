export const getGroups = () => {
    return JSON.parse(localStorage.getItem('groups')) || [];
  };
  
  export const saveGroup = (group) => {
    const groups = getGroups();
    groups.push(group);
    localStorage.setItem('groups', JSON.stringify(groups));
  };
  
  export const getNotes = (groupId) => {
    return JSON.parse(localStorage.getItem(`notes-${groupId}`)) || [];
  };
  
  export const saveNote = (groupId, note) => {
    const notes = getNotes(groupId);
    notes.push(note);
    localStorage.setItem(`notes-${groupId}`, JSON.stringify(notes));
  };
  