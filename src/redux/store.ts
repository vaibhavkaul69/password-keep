import { createStore, combineReducers } from 'redux';
import mainReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';


const rootReducer = combineReducers({
    mainState: mainReducer
});

export const store = createStore(rootReducer, composeWithDevTools());