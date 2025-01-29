interface ArticleSource {
  fetchArticles(params: ArticlePayload): Promise<ResponseData>;
}

type ArticleParams = {
  isNewPage?: boolean;
  sourceId?: number;
  startDate?: Date | null;
  endDate?: Date | null;
  category?: string;
  searchQuery?: string;
}

type ArticlePayload = {
  q?: string;
  to?: DateString;
  from?: DateString;
  category?: string;
  page?: string;
  pageSize?: string;
}

type ResponseData = {
  articles: Article[];
  totalResults: number;
}

type Article = {
  title: string;
  author?: string;
  imageURL?: string;
  description: string;
  url: string;
  source: string;
  publishedAt: string;
}

type ArticleCardProps = {
  article: Article;
}