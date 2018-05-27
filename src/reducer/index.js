import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import report from './Report';

export default combineReducers({
    routing: routerReducer,
    report
});
