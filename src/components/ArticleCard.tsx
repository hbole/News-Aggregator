import moment from 'moment'
import { forwardRef } from 'react'

const ArticleCard = forwardRef<HTMLDivElement, ArticleCardProps>(({ article }, ref) => {
  return (
    <div ref={ref} className="card-bg rounded-xl">
      <img src={article.imageURL} alt={article.title} className="w-full h-80 object-cover rounded-xl" />
      <div className="p-4 rounded-xl">
        <p className="font-bold text-2xl line-clamp-2 text-center min-h-16">{article.title}</p>
        <p className='text-sm line-clamp-2 my-3 min-h-8 overflow-hidden'>{article.description}</p>
        <p className='text-sm text-right line-clamp-2 my-3'>- {article.author}</p>
        <div className="flex justify-between my-2 text-white">
          <p className="text-sm">{moment(article.publishedAt).format("MM-DD-YYYY")}</p>
          <p className="text-sm">{article.source}</p>
        </div>
      </div>
    </div>
  );
});

export default ArticleCard