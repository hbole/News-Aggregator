import axios from "axios";

export class GuardianAPIStrategy implements ArticleSource {
  private apiKey: string;
  private apiURL: string;

  constructor(apiKey: string, apiURL: string) {
    this.apiURL = apiURL;
    this.apiKey = apiKey;
  }

  async fetchArticles(params: Record<string, string>): Promise<ResponseData> {
    let queryParams: Record<string, string> = {
      "page-size": params.pageSize,
      "page": params.page,
    };

    if (params.q) {
      queryParams["q"] = params.q;
    }

    if (params.category) {
      queryParams["section"] = params.category;
    }

    let data: ResponseData = {
      articles: [],
      totalResults: 0
    };

    try {
      const finalParams = new URLSearchParams({ ...queryParams, "api-key": this.apiKey });
      const response = await axios.get(
        `${this.apiURL}`,
        {
          params: finalParams,
        }
      );

      data = {
        articles: response.data.response.results.map((article: any) => ({
          title: article.webTitle,
          description: article.description,
          url: article.webUrl,
          imageURL: "https://cdn.pixabay.com/photo/2016/02/01/00/56/news-1172463_640.jpg",
          source: "The Guardian",
          publishedAt: article.webPublicationDate,
        })),
        totalResults: response.data.response.total
      }
    } catch (err) {

    }

    return data;
  }
}