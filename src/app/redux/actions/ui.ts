export const ARTICLE_TITLE_IS_VISIBLE = 'ds/ARTICLE_TITLE_IS_VISIBLE';
export const ARTICLE_TITLE_IS_HIDDEN = 'ds/ARTICLE_TITLE_IS_HIDDEN';

export function articleTitleIsVisibleAction() {
  return { type: ARTICLE_TITLE_IS_VISIBLE };
}

export function articleTitleIsHiddenAction() {
  return { type: ARTICLE_TITLE_IS_HIDDEN };
}
