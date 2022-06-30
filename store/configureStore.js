import {createStore, combineReducers} from 'redux';
import authReducer from '../reducers/authReducer';
import articlesReducer from '../reducers/articlesReducer';
const rootReducer = combineReducers({
  auth: authReducer,
  articles: articlesReducer,
});
const configureStore = () => {
  return createStore(rootReducer);
};
export default configureStore;
