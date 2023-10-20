import { initialState } from '../App.jsx';

export function userAndViewReducer(state, action){
  switch (action.type) {
    case 'SET_VIEW':
      return {
          ...state,
          currentView: action.view
      };
    case 'LOGIN':
    case 'REGISTER':
      return {
        ...state,
        user: action.user
      };
    case 'LOGOUT':
      return initialState;
    
    default:
        return state;
  }
}


export function notesReducer(state, action) {
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

    case 'TOGGLE_NOTE':
      return state.map(note => {
          if (note.id === action.id) {
              const isCompleted = !note.isCompleted;
              return {
                ...note,
                isCompleted,
                completedDate: isCompleted ? new Date().toLocaleString() : null
              };
          }
          return note;
    });

    default:
      return state;

    }
  }

export function mockDBReducer(db, action) {
  switch(action.type) {
      case 'ADD_USER_TO_DB':
          return [...db, action.user];
      default:
          return db;
  }
}