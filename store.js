import { useMemo } from 'react'
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';

let store;

const bindMiddlewares = middlewares => {
    if(process.env.NODE_ENV !== 'production'){
        const { composeWithDevTools } = require('redux-devtools-extension');
        const { logger } = require('redux-logger');
        middlewares.push(logger);
        return composeWithDevTools(applyMiddleware(...middlewares));
    }
    return applyMiddleware(...middlewares);
}

// create initStore function
const initStore = initialState => {
    return createStore(
        reducers,
        initialState,
        bindMiddlewares([thunkMiddleware])
    )
}

export const initializeStore = preloadState => {
    let _store = store?? initStore(preloadState);
    if(preloadState && store){
        _store = initStore({
            ...store.getState(),
            ...preloadState
        })
         //reset the current store
        store = undefined;
    }

    if(typeof window !== 'undefined') return _store;
    if(!store) store = _store;
    return _store;  
}

export function useStore(initialState){
    return useMemo(() => {
        return initializeStore(initialState);
    }, [initialState]);
}



