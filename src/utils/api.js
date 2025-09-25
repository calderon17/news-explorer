const STORAGE_KEY = "savedArticles_v1";

function read() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function write(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function getSavedArticles() {
  return Promise.resolve(read().slice());
}

export function saveArticle(article, keyword = "") {
  const list = read();

  if (article?.url && list.some((a) => a.url === article.url)) {
    return Promise.resolve(list.find((a) => a.url === article.url));
  }

  const doc = {
    _id: cryptoRandomId(),
    title: article?.title || "",
    url: article?.url || "",
    urlToImage: article?.urlToImage || null,
    description: article?.description || "",
    publishedAt: article?.publishedAt || new Date().toISOString(),
    source: { name: article?.source?.name || "Unknown" },
    keyword,
    savedAt: Date.now(),
  };

  write([doc, ...list]);
  return Promise.resolve(doc);
}

export function deleteArticle(idOrUrl) {
  const list = read();
  const next = list.filter((a) => a._id !== idOrUrl && a.url !== idOrUrl);
  if (next.length === list.length) {
    return Promise.reject(new Error("Not found"));
  }
  write(next);
  return Promise.resolve({ ok: true });
}

function cryptoRandomId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID)
    return crypto.randomUUID();
  return "id_" + Math.random().toString(36).slice(2, 10);
}
