import SECTIONS_DATA from '../temporary-data/sections-data';
import ARTICLE_DATA from '../temporary-data/article-data';

export const Section = {
  findAll: () => Promise.resolve(SECTIONS_DATA),
};

export const Article = {
  find: () => Promise.resolve(ARTICLE_DATA),
};
