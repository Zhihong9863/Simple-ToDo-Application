import React, {useReducer, useState, useEffect } from "react";
import { userAndViewReducer, notesReducer, mockDBReducer } from './auxiliary/Reducer';
import { StateContext } from './auxiliary/Context'
import { addNote, deleteNote, editNote, toggleNote } from "./auxiliary/Action"; 
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage"; 
import HomePage from "./pages/HomePage";

export const initialState = {
  user: null,
  posts: [],
  currentView: 'login',
  //Store registered users in the database
  mockDB: []
};


export default function App() {

  const mainReducer = (state, action) => {
    const updatedUserAndView = userAndViewReducer(state, action);
    return {
      ...updatedUserAndView,
      posts: notesReducer(state.posts, action),
      mockDB: mockDBReducer(state.mockDB, action),
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



