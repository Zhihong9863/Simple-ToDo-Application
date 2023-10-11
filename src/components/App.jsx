import React, {useState, useReducer} from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage"; 
import HeaderHome from "./HeaderHome";

function App() {

  const [loggedInUser, setLoggedInUser] = useState("");

  const [notes, dispatch] = useReducer(notesReducer, []);

  function notesReducer(state, action) {
    switch(action.type) {

      case 'ADD_NOTE':
        return [...state, action.newNote];

      case 'DELETE_NOTE':
        return state.filter(note => note.id !== action.id);

      case 'EDIT_NOTE':
        return state.map(note => {
          if (note.id === action.noteItem.id) {
            return action.noteItem;
          } else {
            return note;
          }
        });

      default:
        return state;

    }
  }

  function handleUserLogin(username) {
    setLoggedInUser(username);
  }

  function addNote(note) {
    dispatch({
      type: 'ADD_NOTE',
      newNote: note
    });
  }

  function deleteNote(id) {
    dispatch({
      type: 'DELETE_NOTE',
      id: id
    });
  }

  function editNote(attributes) {
    dispatch({
      type: 'EDIT_NOTE',
      noteItem: attributes
    });
  }

  return (
    <Router>
      <div>
        
        <Routes>
          <Route path="/login" element={
            <>
              <Header />
              <LoginPage onLogin={handleUserLogin}/>
            </>

          } />

          <Route path="/register" element={
            <>
              <Header />
              <RegisterPage />
            </>         
          } />


          <Route path="/homepage" element={
            <>
              <HeaderHome author={loggedInUser} />
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
                  />
                );
              })}
            </>
          } />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
//here I define a simple database to store user information although homework doesn't need this requirment.
export const mockDB = [];
