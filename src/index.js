import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './FrontEnd/App';
import store from './FrontEnd/store/store';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// import { AuthProvider } from './FrontEnd/context/AuthProvider.js';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <Router>
      <App />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        limit={3}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        progressClassName="toastProgress"
        bodyClassName="toastBody"
      />
    </Router>
  </Provider>
  // </React.StrictMode>
);