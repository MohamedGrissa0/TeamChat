import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './pages/Auth';
import Chat from './pages/Chat';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from './store';
import { Provider } from 'react-redux';
import { useSelector } from 'react-redux';
import Setting from './pages/Setting';

function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

const Main = () => {
  const user = useSelector((state) => state.user); // Access user from the Redux store

  return (
    <Router>
      <div className='h-screen overflow-hidden'>
        <Routes>
          {/* Route for the Auth page at "/" */}
          <Route path="/" element={user ? <Chat /> : <Auth />} />
          {/* Route for the Chat page at "/chat" */}
          <Route path="/chat" element={user ? <Chat /> : <Auth />} />
          <Route path="/setting" element={user ? <Setting /> : <Auth />} />

        </Routes>
        {/* Toast notifications */}
        <ToastContainer position="top-right" />
      </div>
    </Router>
  );
};

export default App;
