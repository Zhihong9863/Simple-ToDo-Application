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

  //use useResource to get the database embeded array postsp[] data
  const [postResponse, getPosts] = useResource(() => ({
    url: "/post",
    method: "get",
    headers: { Authorization: `${user?.access_token}` }
  })); 
  
  //If the user logs in, an access token will be generated, and here we listen for the access token. 
  //When we go to the login interface, we can load all the posts
  useEffect(() => {
    getPosts();
  }, [user?.access_token]);
  
  //Once we have data in the postResponse, we will pull out the user's post from the database
  useEffect(() => {
    if (postResponse && postResponse.isLoading === false && postResponse.data) {
      console.log(postResponse.data); 
      dispatch({ type: "FETCH_POSTS", posts: postResponse.data.reverse() });
    }
  }, [postResponse]);


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




