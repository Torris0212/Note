export default function Editor(props) {console.log(2)
  const noteElements = props.notes.map(note => {
    return (
      <li
        key={note.id}
        id={note.id}
        className={note.id === props.currentNote ? "selected" : ""}
        onClick={props.selectNote}>
        {note.note}
      </li>
    )
  })
  return (
    <section className="sidebar">
      <div className="sidebar-header">
        <h2>Notes</h2>
        <button onClick={props.addNote}>+</button>
      </div>
      <div className="sidebar-body">
        <ul>
          {noteElements}
        </ul>
      </div>
    </section>
  )
}