import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './scss/index.scss';
import { Provider } from 'react-redux';
import store from './redux/store/Store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ErrorBoundary from './error/ErrorBoundary';

ReactDOM.render(
  <Router>
    <ErrorBoundary>
      <Provider store={store}>
        <App />
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </Provider>
    </ErrorBoundary>
  </Router>,
  document.getElementById('root')
);
