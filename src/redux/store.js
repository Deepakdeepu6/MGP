import reducer from './reducer'
import { createStore , applyMiddleware, combineReducers, compose} from 'redux';
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createRootReducer = () => combineReducers({user:reducer});

const store = createStore(createRootReducer(),composeEnhancers(applyMiddleware(thunk)))

export default store