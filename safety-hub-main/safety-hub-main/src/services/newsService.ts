import api from "./api";

export interface NewsArticle {
  title: string;
  description?: string;
  url?: string;
  source?: string;
  publishedAt?: string;
}

interface NewsResponse {
  source: string;
  articles: NewsArticle[];
}

export const getLatestNews = async (): Promise<NewsArticle[]> => {
  const { data } = await api.get<NewsResponse>("/news");
  return data.articles || [];
};

