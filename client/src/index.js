// Entry Point
// Data Layer
// Redux
import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

// reducer, initial state, middleWare
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
    // React component that reads changes to store, updates components with new state
    <Provider store={store}> 
        <App />
    </Provider>,
    document.querySelector('#root'));