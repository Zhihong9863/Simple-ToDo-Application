import React, { useState } from "react";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    const newNote = {
      id: Date.now(),
      title: note.title,
      content: note.content,
      createdDate: new Date().toLocaleString(),
      isCompleted: false,
      completedDate: null
  };
    props.onAdd(newNote);
    setNote({
      title: "",
      content: ""
    });
    event.preventDefault();
  }

  return (
    <div>
      <form>
        <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows="3"
        />
        <button onClick={submitNote} disabled={!note.title}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
