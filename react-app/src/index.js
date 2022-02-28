import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ModalProvider } from './context/Modal';
import {MenuProvider} from './context/Menu'
import App from './App';
import configureStore from './store';
import './index.css';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <ModalProvider>
      <Provider store={store}>
        <MenuProvider>
        <App />
        </MenuProvider>
      </Provider>
    </ModalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
