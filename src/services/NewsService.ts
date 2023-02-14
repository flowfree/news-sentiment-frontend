import BaseService from "./BaseService";

class NewsService extends BaseService {
  addNews(url: string, sentiment: string) {
    return this.client.post(`/data-labeling/news`, { url, sentiment })
  }
  
  getNewsList(nextUrl?: string) {
    return this.client.get(nextUrl ? nextUrl : `/data-labeling/news?limit=4`)
  }
}

export default NewsService
