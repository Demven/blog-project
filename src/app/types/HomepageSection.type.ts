import { HomepageSectionArticle } from './HomepageSectionArticle.type';

export interface HomepageSection {
  category: {
    title: string;
    slug: string;
    color: string;
  };
  articles: HomepageSectionArticle[];
}
