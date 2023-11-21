import React from "react"; 
// import React, {useContext} from "react"; 
import CreateArea from "../components/CreateArea";
import Note from "../components/Note";
// import { StateContext } from "../auxiliary/Context"; 

function HomePage(props) {

  //We need to deconstruct the user object to confirm who the current logged in user is
  // const { state } = useContext(StateContext);
  // const { user } = state;

  const { notes, addNote, deleteNote, editNote, toggleNote } = props;

  return (
    <div>
      <CreateArea onAdd={addNote} />
      {notes
      //Use the filter function to ensure that currently logged in users can only see their own posts
      // .filter((noteItem) => noteItem.userEmail === user.name)
      .map((noteItem) => {
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
