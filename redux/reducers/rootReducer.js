import AppReducer from './appReducer'
import { combineReducers } from 'redux';
import UserReducer from './userReducer';

const store = combineReducers({
    user: UserReducer,
    app: AppReducer
})

export default store