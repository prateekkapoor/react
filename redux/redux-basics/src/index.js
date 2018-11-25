import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import counterReducer from './stores/reducers/counterReducer';
import storeReducer from './stores/reducers/storeReducer';

const rootReducer = combineReducers({
    ctr: counterReducer,
    res: storeReducer
})

const store = createStore(rootReducer);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
