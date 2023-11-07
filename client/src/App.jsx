import React, {useReducer, useState, useEffect } from "react";
import { useResource } from 'react-request-hook';
import { userAndViewReducer, notesReducer } from './auxiliary/Reducer';
import { StateContext } from './auxiliary/Context'
import { addNote, deleteNote, editNote, toggleNote } from "./auxiliary/Action"; 
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage"; 
import HomePage from "./pages/HomePage";

//define initial state including user(username, password), posts(content, title, date)..
export const initialState = {
  user: null,
  posts: [],
  currentView: 'login',
};


export default function App() {

  //use useResource to get the database embeded array postsp[] data
  const [postResponse, getPosts] = useResource(() => ({
    url: "/posts",
    method: "get",
  })); 
  
  //Requesting posts during component loading
  //Empty dependency array ensures that it only runs when the component is mounted
  useEffect(() => {
    getPosts();
  }, []);
  
  /*
    UseEffect itself does not directly render any interface, which is a side effect hook used to handle the logic of component loading, updating, and unloading.

    Here it listens for updates to the response. Once there is data, it will call the reducer hook to update our post array. 
    This post array will be given to the note component in the homepage loop. 
    Finally, when we log in, we will directly see this data on the homepage interface
  */

  useEffect(() => {
    if (postResponse && postResponse.data) {
      console.log(postResponse.data); 
      dispatch({ type: "FETCH_POSTS", posts: postResponse.data.reverse() });
    }
  }, [postResponse]);



  const mainReducer = (state, action) => {
    const updatedUserAndView = userAndViewReducer(state, action);
    return {
      ...updatedUserAndView,
      posts: notesReducer(state.posts, action),
    };
  };

  const [state, dispatch] = useReducer(mainReducer, initialState);

  const { user, posts: notes, currentView } = state;

  //Modal Window Status
  const [showModal, setShowModal] = useState(false);

  //Use useEffect to check for changes in user status
  useEffect(() => {
    if (user) {
      setShowModal(true);
    }
  }, [user]);


  return(
    <div>
      <StateContext.Provider value={{ state, dispatch }}>

        <Header />
        {currentView === 'login' && <LoginPage />}
        {currentView === 'register' && <RegisterPage />}
        {currentView === 'homepage' && <HomePage 
          notes={notes} 
          addNote={(note) => dispatch(addNote(note))}
          deleteNote={(id) => dispatch(deleteNote(id))}
          editNote={(attributes) => dispatch(editNote(attributes))}
          toggleNote={(id) => dispatch(toggleNote(id))}
        />}
        <Footer />

        {/* New Modal Window */}
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              Welcome back, {user.name}!
              <button onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>
        )}

      </StateContext.Provider>
    </div>
  )
}




