import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import material from 'reducers/materials/reducers';

const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    material,
});

export default rootReducer;