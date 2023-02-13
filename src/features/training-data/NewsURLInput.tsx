import { AxiosError } from 'axios'
import { useState } from 'react'
import NewsService from '../../services/NewsService'
import NewsCard from '../../components/NewsCard'

export default function NewsURLInput() {
  const [url, setUrl] = useState('')
  const [sentiment, setSentiment] = useState('')
  const [newsList, setNewsList] = useState<News[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  async function handleAdd(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()

    if (isSubmitting) {
      return
    } else if (url.trim() === '') {
      setErrorMessage('Please enter the URL.')
      return
    } else if (sentiment === '') {
      setErrorMessage('Please select the sentiment.')
      return
    }

    try {
      setErrorMessage('')
      setIsSubmitting(true)
      const service = new NewsService()
      const response = await service.addNews(url, sentiment)
      setNewsList([response.data, ...newsList])
      setUrl('')
      setSentiment('')
    } catch (error) {
      console.error(error)
      if (error instanceof AxiosError && error.response?.data) {
        for (const key in error.response.data) {
          setErrorMessage(error.response.data[key][0])
        }
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full">
      <div className="max-w-4xl">
        <form method="post" action="" className="w-full flex gap-2">
          <input 
            type="text" 
            name="url"
            className="block grow rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter News URL"
            autoComplete="off"
            value={url}
            onChange={e => setUrl(e.target.value)}
          />
          <select 
            name="sentiment"
            className="block rounded-md border-gray-300 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            value={sentiment}
            onChange={e => setSentiment(e.target.value)}
          >
            <option value="">-- Sentiment --</option>
            <option value="positive">Positive</option>
            <option value="neutral">Neutral</option>
            <option value="negative">Negative</option>
          </select>
          <button
            className="w-32 rounded-md border border-transparent bg-indigo-600 py-0 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={handleAdd}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add'}
          </button>
        </form>
      </div>
      <div>
        {errorMessage && <p className="pt-1 text-sm text-red-700">{errorMessage}</p>}
      </div>

      <div className="mx-auto max-w-2xl lg:max-w-7xl">
        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-8">
          {newsList.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>
      </div>

    </div>
  )
}
