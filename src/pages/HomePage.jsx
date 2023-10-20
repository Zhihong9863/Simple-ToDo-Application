import React from "react"; 
import CreateArea from "../components/CreateArea";
import Note from "../components/Note";

function HomePage(props) {
  const { notes, addNote, deleteNote, editNote, toggleNote } = props;

  return (
    <div>
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem) => {
        return (
          <Note
            key={noteItem.id}
            id={noteItem.id}
            title={noteItem.title}
            content={noteItem.content}
            createdDate={noteItem.createdDate}
            isCompleted={noteItem.isCompleted}
            completedDate={noteItem.completedDate}
            onDelete={deleteNote}
            onEdit={editNote}
            onToggle={toggleNote}
          />
        );
      })}
    </div>
  );
}

export default HomePage;
