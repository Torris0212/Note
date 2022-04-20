export default function Editor(props) {console.log(3);
  const text = props.notes.filter((note) => { return note.id === props.currentNote});
  const textContent = text[0].content
  return (
    <section className="editor">
      <div className="editor-header">
        <h2>Content</h2>
      </div>
      <div className="editor-body">
        <textarea rows="50" value={textContent}></textarea>
      </div>
    </section>
  )
}