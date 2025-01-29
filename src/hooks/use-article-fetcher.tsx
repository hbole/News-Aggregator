import { useState } from "react";
import { sources } from "../constants/sources";
import { ArticleFetcher } from "../services/ArticleFetcher";

export const useArticleFetcher = () => {
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);

  const articleFetcher = new ArticleFetcher(sources);

  const fetchArticles = async (params: ArticleParams) => {
    try {
      const { searchQuery, startDate, endDate, category, sourceId } = params;
      const articlePayload: ArticlePayload = {};

      if (page > totalPages) {
        return;
      }

      setLoading(true);
      articlePayload.page = String(page);
      articlePayload.pageSize = String(20)

      if (startDate) {
        articlePayload.to = startDate.toDateString;
      }

      if (endDate) {
        articlePayload.from = endDate.toDateString;
      }

      if (searchQuery) {
        articlePayload.q = searchQuery;
      }

      if (category) {
        articlePayload.category = category
      }

      if (!searchQuery && !category) {
        articlePayload.q = "all";
      }

      const articles = await articleFetcher.fetchArticles(
        articlePayload,
        sourceId
      );

      const pages = Math.min(5, Math.max(1, Math.ceil(articles.totalResults / 20)));

      setNews((prevNews) => {
        if (page === 1) {
          return [...articles.articles];
        } else {
          return [...prevNews, ...articles.articles];
        }
      })
      setTotalPages(pages);
      setPage((prevPage) => prevPage + 1);
    } catch {

    } finally {
      setLoading(false);
    }
  };

  return {
    news,
    loading,
    setNews,
    setPage,
    fetchArticles
  };
}