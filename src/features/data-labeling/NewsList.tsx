import { useState, useEffect } from 'react'
import NewsService from '../../services/NewsService'
import NewsCard from '../../components/NewsCard'
import PrimaryButton from '../../components/PrimaryButton'

export default function NewsList() {
  const [newsList, setNewsList] = useState<News[]>([])
  const [nextUrl, setNextUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(() => {
    loadNewsList()
    document.title = 'Training Data'
  }, [])

  async function loadNewsList() {
    const service = new NewsService()
    try {
      const response = await service.getNewsList(nextUrl)
      setNewsList([...newsList, ...response.data.results])
      setNextUrl(response.data.next)
    } catch (e) {
      console.error(e)
    }
  }

  function handleLoadMore(e: React.MouseEvent) {
    e.preventDefault()
    loadNewsList()
  }

  return (
    <div className="mx-auto max-w-2xl lg:max-w-7xl">
      <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-8">
        {newsList.map((news) => (
          <NewsCard key={news.id} news={news} />
        ))}
      </div>
      <div className="mt-5 text-center">
        <PrimaryButton 
          className="w-64"
          onClick={handleLoadMore}
        >
          {isLoading ? 'Loading...' : 'Load More'}
        </PrimaryButton>
      </div>
    </div>
  )
}
