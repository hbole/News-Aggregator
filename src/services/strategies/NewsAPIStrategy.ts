import axios from "axios";

export class NewsAPIStrategy implements ArticleSource {
  private apiKey: string;
  private apiURL: string

  constructor(apiKey: string, apiURL: string) {
    this.apiKey = apiKey;
    this.apiURL = apiURL;
  }

  async fetchArticles(params: Record<string, string>): Promise<ResponseData> {
    let data: ResponseData = {
      articles: [],
      totalResults: 0
    };

    try {
      const queryParams = new URLSearchParams({ ...params });
      const response = await axios.get(
        `${this.apiURL}`,
        {
          headers: {
            Authorization: this.apiKey,
          },
          params: queryParams,
        }
      );

      data = {
        articles: response.data.articles.map((article: any) => ({
          title: article.title,
          author: article.author,
          description: article.description,
          url: article.url,
          imageURL: article.urlToImage || "https://cdn.pixabay.com/photo/2016/02/01/00/56/news-1172463_640.jpg",
          source: article.source.name,
          publishedAt: article.publishedAt,
        })),
        totalResults: response.data.totalResults
      }

      return data;
    } catch (err) {
      console.error(err);
    } finally {
      return data;
    }
  }
}
