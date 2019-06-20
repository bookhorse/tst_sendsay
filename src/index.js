import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import HomePage from './pages/Home';
import makeStore from './store/makeStore';
import { sendSayAuth } from './store/actions/api'

const store = makeStore();
store.dispatch(sendSayAuth());

ReactDOM.render(
  <Provider store={store}>
    <HomePage />
  </Provider>,
document.getElementById('root'));
