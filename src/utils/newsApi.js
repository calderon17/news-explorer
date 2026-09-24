const newsApiBaseUrl =
  process.env.NODE_ENV === "production"
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://newsapi.org/v2/everything";

const apiKey = "1dc664970bb247d794d3586af97f4e6a";

export async function fetchNews(query) {
  const today = new Date();
  const lastWeek = new Date(today);
  lastWeek.setDate(today.getDate() - 7);

  const url = new URL(newsApiBaseUrl);
  url.searchParams.set("q", query);
  url.searchParams.set("apiKey", apiKey);
  url.searchParams.set("from", lastWeek.toISOString().split("T")[0]);
  url.searchParams.set("to", today.toISOString().split("T")[0]);

  url.searchParams.set("pageSize", "100");

  const res = await fetch(url);
  if (!res.ok) throw new Error(`News API error: ${res.status}`);
  const data = await res.json();
  return data.articles;
}
