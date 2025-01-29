import React, { useEffect, useRef } from 'react'
import Filter from './Filter'
import { useArticleFetcher } from '../hooks/use-article-fetcher';
import ArticleCard from './ArticleCard';
import { RotatingLines } from 'react-loader-spinner';
import useIntersectionObserver from '../hooks/use-intersection-observer';

const Articles = () => {
  const articleRef = useRef<HTMLDivElement | null>(null);
  const { news, loading, setNews, setPage, fetchArticles } = useArticleFetcher();
  const [articleParams, setArticleParams] = React.useState<ArticleParams>({
    searchQuery: 'all',
    sourceId: 1,
    startDate: null,
    endDate: null,
  });

  const fetchData = async () => {
    await fetchArticles(articleParams);
  }

  const applyFilters = React.useCallback((searchQuery: string, selectedCategory: string, selectedSource: number) => {
    const updatedParams: ArticleParams = {
      searchQuery,
      category: selectedCategory,
      sourceId: selectedSource
    };

    setPage(1);
    setNews([]);
    setArticleParams(updatedParams);
  }, []);

  useEffect(() => {
    fetchData();
  }, [articleParams]);

  useIntersectionObserver(articleRef, fetchData);

  return (
    <div className="w-full flex flex-col justify-between gap-3 my-3">
      <div className="sticky top-0 p-4 bg-app z-10">
        <Filter loading={loading} applyFilter={applyFilters} />
      </div>
      <div className="w-full grid grid-cols-3 gap-5 my-3">
        {
          news?.length > 0 ? news.map((article, index) => (
            <ArticleCard key={index} article={article} ref={index === news.length - 1 ? articleRef : undefined} />
          )) :
            !loading && <div className="flex flex-col justify-center items-center w-full my-2 col-span-3">
              <i className="text-8xl fa-regular fa-newspaper"></i>
              <p className="text-2xl my-3 font-bold">No articles found</p>
            </div>
        }
        {
          loading ?
            <div className="flex justify-center items-center w-full my-2 col-span-3">
              <RotatingLines
                strokeColor='#fff'
                width="40"
                strokeWidth="5"
                animationDuration="0.75"
              />
            </div>
            : null
        }
      </div>
    </div>
  )
}

export default React.memo(Articles);