import {SETARTICLES, SETFILTEREDARTICLES} from '../constants/auth';
export function setArticles(articles) {
  return {
    type: SETARTICLES,
    payload: articles,
  };
}

export function setFilteredArticles(filteredArticles) {
  return {
    type: SETFILTEREDARTICLES,
    payload: filteredArticles,
  };
}
