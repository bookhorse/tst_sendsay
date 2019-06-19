import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import HomePage from './pages/Home';
import makeStore from './store/makeStore';

const store = makeStore();

ReactDOM.render(
  <Provider store={store}>
    <HomePage />
  </Provider>,
document.getElementById('root'));
