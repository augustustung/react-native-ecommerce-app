import thunkMiddleware from "redux-thunk";
import createRootReducer from './redux/reducers/rootReducer'
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';

let middleware = [thunkMiddleware]


const persistConfig = {
    key: 'root',
    storage: AsyncStorage
};

const pReducer = persistReducer(persistConfig, createRootReducer)
export const store = createStore(pReducer, applyMiddleware(...middleware));


export const persistor = persistStore(store);