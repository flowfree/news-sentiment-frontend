import BaseService from "./BaseService";

class NewsService extends BaseService {
  addNews(url: string, sentiment: string) {
    return this.client.post(`/data-labeling/news`, { url, sentiment })
  }
  
  getNewsList(nextUrl: string) {
    return this.client.get(nextUrl)
  }

  updateNewsSentiment(news: News, sentiment: string) {
    const { id, url } = news
    return this.client.put(`/data-labeling/news/${id}`, { url, sentiment })
  }

  deleteNews(id: number) {
    return this.client.delete(`/data-labeling/news/${id}`)
  }
}

export default NewsService
