import { Category } from './Category.type';
import { Keyword } from './Keyword.type';
import { Image } from './Image.type';

export interface Article {
  _id: string;
  slug: string;
  title: string;
  description: string;
  image: Image;
  category: Category;
  keywords: Array<Keyword>;
  views: {
    count: number;
  };
  thanks: {
    count: number;
  };
  publication_date: string;
  body: Array<any>;
}
