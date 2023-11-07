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

  const [post, createPost] = useResource(({ title, content, createdDate, isCompleted, completedDate, userEmail }) => ({
    url: "/posts",
    method: "post",
    data: { title, content, createdDate, isCompleted, completedDate, userEmail },
  }));

  /*
  The post.isLoading here is an important code. If false, it means that the request has been completed and data is available.

  This can prevent calling props.onAdd before the data is ready (ensuring that our request has been completed) and also prevent duplicate rendering,
  
  Because whenever there is a change in the post, props.add will come in, which means that the component will be rendered twice on the main interface. 
  However, in reality, we only need to ensure that the data is sent to the backend and the request is completed before calling this onadd function
  */
  const { onAdd } = props;
  useEffect(() => {
    if (post && post.data && post.isLoading === false) {
      console.log(post.data);
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
      //used to confirm which user this post belongs to, like "userEmail": "zhihong@email.com"
      userEmail: user.name
    };
  
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
