import { Category } from './Category.type';
import { Article } from './Article.type';

export interface Page404Data {
  type: string;
  categories: Category[];
  articles: Article[];
}
