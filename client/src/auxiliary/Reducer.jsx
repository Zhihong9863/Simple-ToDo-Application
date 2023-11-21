import { initialState } from '../App.jsx';

export function userAndViewReducer(state, action){
  switch (action.type) {
    case 'SET_VIEW':
      return {
          ...state,
          currentView: action.view
      };
    case 'LOGIN':
      return {
        ...state,
        user: {
          ...state.user,
          name: action.user.name,
          //when we login in, our access token will be saved into state
          //when we operate our posts in the future, we can use the access token headers: { Authorization: `${state.user.access_token}` },
          access_token: action.user.access_token, 
        }
      };
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
    
    case "FETCH_POSTS":
      return action.posts;

    case 'ADD_NOTE':
      return [...state, action.newNote];

    case 'DELETE_NOTE':
      return state.filter(note => note.id !== action.id);

    case 'EDIT_NOTE':
    case 'TOGGLE_NOTE':   
      return state.map(note => {
        if (note.id === action.noteItem.id) {
          return action.noteItem;
        } else {
          return note;
        }
      });

    // case 'TOGGLE_NOTE':
    //   return state.map(note => {
    //       if (note.id === action.id) {
    //           const isCompleted = !note.isCompleted;
    //           return {
    //             ...note,
    //             isCompleted,
    //             completedDate: isCompleted ? new Date().toISOString() : null
    //           };
    //       }
    //       return note;
    // });

    default:
      return state;

    }
  }
