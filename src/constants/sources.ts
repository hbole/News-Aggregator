export const sources: Source[] = [
  {
    id: 1,
    name: "NewsAPI.org",
    apiKey: import.meta.env.VITE_NEWS_API_KEY,
    url: "https://newsapi.org/v2/top-headlines",
  },
  {
    id: 2,
    name: "The Guardian",
    apiKey: import.meta.env.VITE_GUARDIAN_API_KEY,
    url: "https://content.guardianapis.com/search",
  },
]