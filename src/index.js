import React from 'react';
import ReactDOM from 'react-dom';
import './main.scss';
import App from './Containers/App/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import { createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(rootReducer, devTools);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter><App /></BrowserRouter>
  </Provider>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
