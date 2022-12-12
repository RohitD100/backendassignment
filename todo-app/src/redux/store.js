import {legacy_createStore, applyMiddleware, combineReducers} from 'redux';
import {reducer as AppReducer} from './AppReducer/reducer';
import {reducers as AuthReducer} from './AuthReducer/reducers';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({AppReducer, AuthReducer});


export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));