interface NewsCardProps {
  news: News
}

export default function NewsCard({ news }: NewsCardProps) {
  let sentiment = ''
  let sentimentColor = ''

  switch (news.sentiment) {
    case 'positive':
      sentiment = 'Positive'
      sentimentColor = 'bg-green-100 text-green-800'
      break
    case 'neutral':
      sentiment = 'Neutral'
      sentimentColor = 'bg-gray-100 text-gray-800'
      break
    case 'negative':
      sentiment = 'Negative'
      sentimentColor = 'bg-pink-100 text-pink-800'
      break
    default:
      break
  }

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="aspect-w-4 aspect-h-3 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-48">
        <a href={news.url} target="_blank">
          <img
            src={news.imageUrl}
            className="h-full w-full object-cover object-center sm:h-full sm:w-full"
            alt="image"
          />
        </a>
      </div>
      <div className="flex flex-1 flex-col space-y-3 p-3">
        <div>
          <span className={`inline-flex items-center rounded ${sentimentColor} px-2 py-0.5 text-sm font-medium`}>
            {sentiment}
          </span>
        </div>
        <h3 className="text-base font-medium text-gray-900 line-clamp-2">
          <a href={news.url} title={news.title} target="_blank">
            {news.title}
          </a>
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2">
          {news.description}
        </p>
        <div className="mt-4 flex flex-1">
          <p className="grow text-sm font-medium text-gray-900">
            {news.site.name}
          </p>
        </div>
      </div>
    </div>
  )
}
