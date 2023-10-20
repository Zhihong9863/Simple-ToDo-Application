import React, {useState} from "react";

function Note(props) {

  const [isEditing, setIsEditing] = useState(false);

  const [editedNote, setEditedNote] = useState({
    title: props.title,
    content: props.content
  });

  /*
  The behavior of this function depends on the isEditing state. If currently in editing mode (i.e. isEditing is true),
  It will submit the current edited note content. If it is not in edit mode, it will switch to edit mode. Each click 
  will switch the status of isEditing.
  */
  function handleEdit() {
    if (isEditing) {
        props.onEdit({ ...editedNote, 
          id: props.id,
          createdDate: props.createdDate,
          isCompleted: props.isCompleted,         
          completedDate: props.completedDate 
         });
    }
    setIsEditing(!isEditing);
  }


  function handleDelete() {
    props.onDelete(props.id);
  }


  function handleCheckboxChange() {
    props.onToggle(props.id);
  }


  function handleChange(event) {
    const { name, value } = event.target;

    setEditedNote(prevEditNote => {
      return {
        ...prevEditNote,
        [name]: value
      };
    });
  }


  /**
   * HandleEdit is a switching function that determines whether to save notes or switch to editing mode based on the current state 
   * of isEditing. When the state of the React component (in this case isEditing) changes, the component will be re rendered. 
   * Therefore, when the handleEdit function is called and the value of isEditing is changed, it will cause the component to re render. 
   * That is, re-entering the return section
   */

  
  return (
    <div className="note">
        {isEditing ? (
            <div>
                <input 
                    name="title"
                    value={editedNote.title}
                    onChange={handleChange}
                />
                <textarea
                    name="content" 
                    value={editedNote.content}
                    onChange={handleChange}
                />
            </div>
        ) : (
            <>
                <h1>{props.title}</h1>
                <p>{props.content}</p>

                {/* Checkbox for completion status */}
                <div className="checkbox-container">
                  <label>
                    <input 
                      type="checkbox" 
                      checked={props.isCompleted} 
                      onChange={handleCheckboxChange} 
                    />
                    Completed
                  </label>
                </div>

                <h2 className="createdDate">CreateTime: {props.createdDate}</h2>
                {props.isCompleted && <h2 className="completedDate">Completed: {props.completedDate}</h2>}
                
            </>
        )}
        <button className="edit-btn" onClick={handleEdit}> {isEditing ?  "SAVE" : "EDIT"}</button>
        <button className="delete-btn" onClick={handleDelete}>DELETE</button>
    </div>
  );

}

export default Note;
