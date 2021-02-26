import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router';

import rootReducer from '../reducers'
export const history = createBrowserHistory();

export default function configureStore() {
    const middlewares = [thunkMiddleware];
    const middlewareEnhancer = applyMiddleware(...middlewares, routerMiddleware(history))

    const enhancers = [middlewareEnhancer];
    const composedEnhancers = composeWithDevTools(...enhancers);

    const reducer = rootReducer(history);

    const initialValues = {
    }

    const store = createStore(reducer, initialValues, composedEnhancers);

    return store
}