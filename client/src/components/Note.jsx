import React, {useState, useEffect} from "react";
import { useResource } from 'react-request-hook';


function Note(props) {

  const [isEditing, setIsEditing] = useState(false);

  const [editedNote, setEditedNote] = useState({
    title: props.title,
    content: props.content
  });

  //any operations in our Note.jsx needs to know the exact 'id' in their params, so that's why I need the backend's 'id' when post a new note
  const [deleteResponse, deleteNote] = useResource((id) => ({
    url: `/posts/${id}`,
    method: 'delete'
  }));

  const [toggleResponse, toggleTodo] = useResource(({ id, isCompleted, completedDate }) => ({
    url: `/posts/${id}`,
    method: 'patch',
    data: { isCompleted, completedDate }
  }));

  const [editResponse, editTodo] = useResource(({ id, title, content, createdDate, isCompleted, completedDate }) => ({
    url: `/posts/${id}`,
    method: 'patch',
    data: { title, content, createdDate, isCompleted, completedDate }
  }));

  
  // Because the backend database has been deleted, response.data is empty and does not need to be listened to. 
  // It can be directly deleted under the original function using props. onDelete (props. id);

  // useEffect(() => {
  //   if(deleteResponse && deleteResponse.data) {
  //     console.log(deleteResponse.data);
  //     props.onDelete(deleteResponse.data);
  //   }
  //   else if (deleteResponse && deleteResponse.error) {
  //     console.error(deleteResponse.error);
  //     window.alert(deleteResponse.error.data);
  //   }
  // }, [deleteResponse]);

   
  //Listen to the execution status of the backend of the useResource, 
  //and execute these userReducer contents on the front-end after being successfully added to the backend database
  useEffect(() => {
    if(toggleResponse && toggleResponse.data && toggleResponse.isLoading === false) {
      props.onToggle(toggleResponse.data.id);
    }
    else if (toggleResponse && toggleResponse.error) {
      console.error(toggleResponse.error);
      window.alert(toggleResponse.data);
    }
  }, [toggleResponse]);

  useEffect(() => {
    if(editResponse && editResponse.data && editResponse.isLoading === false){
      console.log(editResponse.data);
      props.onEdit(editResponse.data);
    }
    if (editResponse && editResponse.error){
      console.error(editResponse.error);
      window.alert(editResponse.error.data);
    }
  }, [editResponse]);


  /*
  The behavior of this function depends on the isEditing state. If currently in editing mode (i.e. isEditing is true),
  It will submit the current edited note content. If it is not in edit mode, it will switch to edit mode. Each click 
  will switch the status of isEditing.
  */
  function handleEdit() {
    console.log(props.id);
    if (isEditing) {

        editTodo({
          id: props.id,
          title: editedNote.title, // use the edited title from the state
          content: editedNote.content, // use the edited content from the state
          createdDate: props.createdDate,
          isCompleted: props.isCompleted,
          completedDate: props.completedDate
        });

    }
    setIsEditing(!isEditing);
  }


  function handleDelete() {
    console.log(props.id);
    
    deleteNote(props.id);
    props.onDelete(props.id);
  }


  function handleCheckboxChange() {
    console.log(props.id);

    const newIsCompleted = !props.isCompleted;
    const newCompletedDate = newIsCompleted ? new Date().toLocaleString() : null;

    toggleTodo({
      id: props.id,
      isCompleted: newIsCompleted,
      completedDate: newCompletedDate
    });

    // props.onToggle(props.id);
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
