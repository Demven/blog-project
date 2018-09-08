import {
  ARTICLE_TITLE_IS_VISIBLE,
  ARTICLE_TITLE_IS_HIDDEN,
} from '../actions/ui';
import initialAppState from '../InitialAppState';

interface IAction {
  type: string;
  [propName: string]: any;
}

export default function uiReducer(state:object = { ...initialAppState.ui }, action:IAction) {
  switch (action.type) {
    case ARTICLE_TITLE_IS_VISIBLE:
      return { ...state, articleTitleIsVisible: true };
    case ARTICLE_TITLE_IS_HIDDEN:
      return { ...state, articleTitleIsVisible: false };
    default:
      return state;
  }
}
