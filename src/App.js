import React from 'react';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js'
import './App.css';

function App() {
  const [notes, setNotes] = React.useState(
    () => JSON.parse(localStorage.getItem("notes")) || [{note: 'Note1', id: nanoid(), content: ''}] //Lazy state initialization
  );
  const [currentNoteId, setCurrentNoteId] = React.useState(() => notes[0].id);
  const selectNote = (e) => {
    setCurrentNoteId(e.target.id)
  };
  React.useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);
  const addNote= () => {
    setNotes(prevNotes => [...prevNotes, {note: `Note${notes.length + 1}`, id: nanoid(), content: ''}])
  };
  const updateContent = (e) => {
    const summary = e.target.value.split("\n");
    setNotes(prevNotes => {
      const newNotes = [];
      prevNotes.map(prevNote => {
        prevNote.id === currentNoteId ?
          newNotes.unshift({...prevNote, note: summary[0], content: e.target.value}) :
          newNotes.push(prevNote);
      });
      return newNotes;
    })
  };

  return (
    <div className="App">
      <Sidebar
        notes={notes}
        currentNoteId={currentNoteId}
        selectNote={selectNote}
        addNote={addNote} />
      <Editor
        notes={notes}
        currentNoteId={currentNoteId}
        updateContent={updateContent} />
    </div>
  );
}

export default App;
