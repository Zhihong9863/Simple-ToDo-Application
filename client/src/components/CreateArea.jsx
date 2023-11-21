import React, { useState, useContext, useEffect } from "react";
import { useResource } from "react-request-hook";
import { StateContext } from "../auxiliary/Context"; 

function CreateArea(props) {

  const { state } = useContext(StateContext);
  const { user } = state;

  const [note, setNote] = useState({
    title: "",
    content: ""
  });
  
  //1. Create hooks, build front-end and back-end routes, define routes and methods, 
  //and provide parsers for post data, when passed to the backend, remember we need to pass the authorization header
  const [post, createPost] = useResource(({ title, content, createdDate, isCompleted, completedDate}) => ({
    url: "/post",
    method: "post",
    headers: { Authorization: `${user.access_token}` },
    data: { title, content, createdDate, isCompleted, completedDate }
  }));

  /*
  3. The post.isLoading here is an important code. If false, it means that the request has been completed and data is available.

  This can prevent calling props.onAdd before the data is ready (ensuring that our request has been completed) and also prevent duplicate rendering,
  
  Because whenever there is a change in the post, props.add will come in, which means that the component will be rendered twice on the main interface. 
  However, in reality, we only need to ensure that the data is sent to the backend and the request is completed before calling this onadd function
  */
  const { onAdd } = props;
  useEffect(() => {
    if (post && post.data && post.isLoading === false) {
      console.log(post.data);
      //it comes from the back-end, and posts[] will have id that froms database now 
      onAdd(post.data);
      setNote({
        title: "",
        content: ""
      });
    }
  }, [post]); // we don't need to put onAdd into here, because it will cause infinete loop

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  //we remove our original id: Date.now()
  //because we need to use our backend's 'id', which can make sure any operations needed 'id' as params in API coming from db.json.
  function submitNote(event) {
    event.preventDefault(); 
  
    const newNote = {
      title: note.title,
      content: note.content,
      createdDate: new Date().toLocaleString(),
      isCompleted: false,
      completedDate: null,
    };
  
    //2.Obtain the newnote entered by the user from the input box and pass them to the backend
   createPost(newNote); 
      
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
