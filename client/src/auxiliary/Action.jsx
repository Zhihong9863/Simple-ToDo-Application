
export const setView = view => ({
    type: 'SET_VIEW',
    view: view
});

export const registerUser = (username) => ({
    type: 'REGISTER',
    user: username
});

export const loginUser = (username, access_token) => ({
    type: 'LOGIN',
    user: {
        name: username,
        access_token: access_token,
    } 
  });
  
  export const logoutUser = () => ({
    type: 'LOGOUT'
  });

export const addNote = note => ({
    type: 'ADD_NOTE',
    newNote: note
});

export const deleteNote = id => ({
    type: 'DELETE_NOTE',
    id: id
});

export const editNote = attributes => ({
    type: 'EDIT_NOTE',
    noteItem: attributes
});

export const toggleNote = attributes => ({
    type: 'TOGGLE_NOTE',
    noteItem: attributes
});

// export const toggleNote = (id) => ({
//     type: 'TOGGLE_NOTE',
//     id: id,
// });


