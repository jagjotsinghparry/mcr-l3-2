import {createStore, combineReducers, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import albumReducer from './albumReducer';

const rootReducer = combineReducers({
    albums: albumReducer
});

const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(logger));
};

export default configureStore;
