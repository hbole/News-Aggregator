import { GuardianAPIStrategy } from "./strategies/GuardianAPIStrategy";
import { NewsAPIStrategy } from "./strategies/NewsAPIStrategy";

export class ArticleFetcher {
  private newsAPIStrategy: NewsAPIStrategy;
  private gurdianAPIStrategy: GuardianAPIStrategy;

  constructor(sources: Source[]) {
    this.newsAPIStrategy = new NewsAPIStrategy(
      sources[0].apiKey,
      sources[0].url
    );
    this.gurdianAPIStrategy = new GuardianAPIStrategy(
      sources[1].apiKey,
      sources[1].url
    );
  }

  private getAPIStrategy = (source: number) => {
    switch (source) {
      case 1:
        return this.newsAPIStrategy;
      case 2:
        return this.gurdianAPIStrategy;
      default:
        return this.newsAPIStrategy;
    }
  }

  async fetchArticles(params: ArticlePayload, strategyId: number = 1): Promise<ResponseData> {
    // Fetch articles from all strategies concurrently
    const articleFetcherStrategy = this.getAPIStrategy(strategyId);
    return articleFetcherStrategy.fetchArticles(params);
  }
}
