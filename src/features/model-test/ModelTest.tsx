import { useState } from 'react'
import { PrimaryButton, SecondaryButton } from '../../components/Buttons'
import NewsService from '../../services/NewsService'
import SentimentLabel from '../../components/SentimentLabel'
import Moment from 'react-moment'

export default function ModelTest() {
  const [url, setUrl] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [news, setNews] = useState<News>()
  const newsService = new NewsService()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    try {
      setIsSubmitting(true)
      setNews(undefined)
      const response = await newsService.getSentiment(url)
      setNews(response.data)
    } catch (e) {
      console.error(e)
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleReset(e: React.MouseEvent) {
    e.preventDefault()
    setUrl('')
    setNews(undefined)
  }

  return (
    <div className="mt-10 max-w-5xl mx-auto">
      <form method="post" action="" onSubmit={handleSubmit} className="flex grow gap-3">
        <input 
          type="text" 
          name="url"
          className="block grow rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          autoComplete="off"
          value={url}
          placeholder="Enter news URL"
          onChange={e => setUrl(e.target.value)}
        />
        <PrimaryButton className="w-48">
          {isSubmitting ? 'Checking sentiment...' : 'Check sentiment'}
        </PrimaryButton>
        <SecondaryButton onClick={handleReset}>
          Reset
        </SecondaryButton>
      </form>
      {news && <Preview news={news} />}
    </div>
  )
}

interface PreviewProps {
  news: News
}

function Preview({ news }: PreviewProps) {
  const s = news.sentiment
  const borderColor = (s === 'positive' ? 'green' : (s === 'negative' ? 'red' : 'gray'))

  return (
    <div className={`group relative mt-10 flex flex-col gap-5 md:flex-row overflow-hidden rounded-lg border border-${borderColor}-300`}>
      <div className="aspect-[4/3] bg-gray-200 h-56">
        <a href={news.url} target="_blank">
          <img src={news.imageUrl} className="h-full w-full object-cover object-center" alt="image" />
        </a>
      </div>
      <div className="flex flex-1 flex-col space-y-3 py-3">
        <div className="flex gap-x-2 text-base">
          {news.sentiment && (
            <SentimentLabel sentiment={news.sentiment} className="text-base">
              Sentiment is {news.sentiment}
            </SentimentLabel>
          )}
        </div>
        <h3 className="text-2xl font-medium text-gray-900 line-clamp-2">
          <a href="https://crypto.news/north-korean-hackers-stole-record-amount-of-crypto-in-2022/" target="_blank">
            {news.title}
          </a>
        </h3>
        <p className="text-base text-gray-700">
          <span className="line-clamp-2">
            {news.description}
          </span>
        </p>
        <p className="text-base text-gray-500">
          <Moment format="MMM DD, YYYY">{news.publishedTime}</Moment>
        </p>
      </div>
    </div>
  )
}
