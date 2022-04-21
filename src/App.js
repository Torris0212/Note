import React from 'react';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js'
import './App.css';

function App() {console.log(1)
  const [notes, setNotes] = React.useState([{note: 'Note1', id: nanoid(), content: ''}]);
  const [currentNote, setCurrentNote] = React.useState(notes[0].id);
  const selectNote = (e) => {
    setCurrentNote(e.target.id)
  }
  const addNote= () => {
    setNotes(prevNotes => [...prevNotes, {note: `Note${notes.length + 1}`, id: nanoid(), content: ''}])
  }
  const updateContent = (e) => {
    console.log(e.target.value)
    setNotes(prevNotes => {
      return prevNotes.map(prevNote => {
        return prevNote.id === currentNote ? {...prevNote, content: e.target.value} : prevNote
      })
    })
  }

  return (
    <div className="App">
      <Sidebar
        notes={notes}
        currentNote={currentNote}
        selectNote={selectNote}
        addNote={addNote} />
      <Editor
        notes={notes}
        currentNote={currentNote}
        updateContent={updateContent} />
    </div>
  );
}

export default App;
