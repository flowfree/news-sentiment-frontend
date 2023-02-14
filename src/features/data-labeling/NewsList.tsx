import { useState, useEffect } from 'react'
import NewsService from '../../services/NewsService'
import NewsCard from '../../components/NewsCard'
import PrimaryButton from '../../components/PrimaryButton'

export default function NewsList() {
  const [newsList, setNewsList] = useState<News[]>([])
  const [nextUrl, setNextUrl] = useState('/data-labeling/news')
  const [isLoading, setIsLoading] = useState(false)
  const newsService = new NewsService()
  
  useEffect(() => {
    loadNewsList()
    document.title = 'Training Data'
  }, [])

  async function loadNewsList() {
    if (nextUrl) {
      try {
        setIsLoading(true)
        const response = await newsService.getNewsList(nextUrl)
        setNewsList([...newsList, ...response.data.results])
        setNextUrl(response.data.next)
      } catch (e) {
        console.error(e)
      } finally {
        setIsLoading(false)
      }
    }
  }

  async function deleteNews(id: number) {
    try {
      await newsService.deleteNews(id)
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
          <NewsCard 
            key={news.id} 
            news={news} 
            onDelete={deleteNews}
          />
        ))}
      </div>

      {nextUrl && (
        <div className="mt-5 text-center">
          <PrimaryButton onClick={handleLoadMore} className="w-64">
            {isLoading ? 'Loading...' : 'Load More'}
          </PrimaryButton>
        </div>
      )}
    </div>
  )
}
