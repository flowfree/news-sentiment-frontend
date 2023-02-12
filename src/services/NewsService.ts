import BaseService from "./BaseService";

class NewsService extends BaseService {
  addNews(url: string, sentiment: string) {
    return this.client.post(`/training-data/news`, { url, sentiment })
  }
}

export default NewsService
