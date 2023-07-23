import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom"
import './index.css';
import App from './App';
import { createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"

import rootReducer from "./reducers"
import { Provider } from "react-redux"
import { ContextProvider } from './contexts/ContextProvider'

const store = createStore(rootReducer, composeWithDevTools())


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ContextProvider>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>,
  </ContextProvider>
)
