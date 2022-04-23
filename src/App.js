import React from 'react';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js'
import './App.css';

function App() {
  const [notes, setNotes] = React.useState(
    () => JSON.parse(localStorage.getItem("notes")) || [{id: nanoid(), summary: 'Note 1', content: ''}] //Lazy state initialization
  );

  const [currentNoteId, setCurrentNoteId] = React.useState(
    (notes[0] && notes[0].id) || ""
  )

  React.useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function createNewNote() {
    const newNote = {
        id: nanoid(),
        summary: `Note ${notes.length + 1}`,
        content: "",
    }
    setNotes(prevNotes => [newNote, ...prevNotes])
    setCurrentNoteId(newNote.id)
  }

  function updateNote(text) {
    setNotes(oldNotes => {
      const newArray = []
      for(let i = 0; i < oldNotes.length; i++) {
        const oldNote = oldNotes[i]
        if(oldNote.id === currentNoteId) {
          newArray.unshift({ ...oldNote, summary: text })
        } else {
          newArray.push(oldNote)
        }
      }
      return newArray
    })
  }

  function findCurrentNote() {
    return notes.find(note => {
      return note.id === currentNoteId
    }) || notes[0]
  }

  function deleteNote(event, noteId) {
    event.stopPropagation()
    setNotes(oldNotes => oldNotes.filter(note => note.id !== noteId))
  }

  return (
    <div className="App">
      <Sidebar
        notes={notes}
        currentNote={findCurrentNote()}
        setCurrentNoteId={setCurrentNoteId}
        createNewNote={createNewNote}
        deleteNote={deleteNote}
        />
      <Editor />
    </div>
  );
}

export default App;
