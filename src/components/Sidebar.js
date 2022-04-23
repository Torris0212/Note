export default function Sidebar(props) {
  const noteElements = props.notes.map(note => (
    <div
      key={note.id}
      className={note.id === props.currentNote.id ? "sidebar-summary--selected" : ""}
      onClick={() => props.setCurrentNoteId(note.id)}>
      <div className="sidebar-summary">
        <h4>{note.summary}</h4>
        <button 
          className={`sidebar-delete-btn ${note.id === props.currentNote.id ? "sidebar-delete-btn--selected" : ""}`}
          onClick={(event) => props.deleteNote(event, note.id)}
        >
          <i className="gg-trash trash-icon"></i>
        </button>
      </div>
    </div>
  ))

  return (
    <section className="sidebar">
      <div className="sidebar-header">
        <h2>Notes</h2>
        <button
          className="add-new-note"
          onClick={props.createNewNote}>+</button>
      </div>
      {noteElements}
    </section>
  )
}
