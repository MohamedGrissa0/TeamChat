import { createStore } from 'redux';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null, // Load user from localStorage
  currentChat: null, // Initialize currentChat
  search: '',
  newmessage :""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      localStorage.setItem('user', JSON.stringify(action.payload)); // Save user to localStorage
      return { ...state, user: action.payload };
      
    case 'LOGOUT':
      localStorage.removeItem('user'); // Remove user from localStorage
      return { ...state, user: null, currentChat: null }; // Reset user and currentChat state on logout
      
    case 'SET_CURRENT_CHAT':
      return { ...state, currentChat: action.payload }; // Set the current chat
      
    case 'SET_SEARCH':
      return { ...state, search: action.payload }; // Set the search state

    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;  
