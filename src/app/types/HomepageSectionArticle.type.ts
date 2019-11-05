export interface HomepageSectionArticle {
  title: string;
  slug: string;
  image: {
    url: string;
    description: string;
    credits: string;
  };
  views: {
    count: number;
  };
  publication_date: string;
}
