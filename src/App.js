import React from 'react';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js'
import './App.css';

function App() {console.log(1);
  /**
     * Challenge: Try to figure out a way to display only the 
     * first line of note.body as the note summary in the
     * sidebar.
     * 
     * Hint 1: note.body has "invisible" newline characters
     * in the text every time there's a new line shown. E.g.
     * the text in Note 1 is:
     * "# Note summary\n\nBeginning of the note"
     * 
     * Hint 2: See if you can split the string into an array
     * using the "\n" newline character as the divider
     */
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
      return prevNotes.map(prevNote => {
        return prevNote.id === currentNoteId ? {...prevNote, note: summary[0], content: e.target.value} : prevNote
      })
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
