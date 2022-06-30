import {SETARTICLES, SETFILTEREDARTICLES} from '../constants/auth';

const initialState = {
  articles: null,
  filteredArticles: null,
};
const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SETARTICLES:
      return {
        ...state,
        articles: action.payload,
      };
    case SETFILTEREDARTICLES:
      return {
        ...state,
        filteredArticles: action.payload,
      };
    default:
      return state;
  }
};
export default articlesReducer;
