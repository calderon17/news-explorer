import "./SavedNews.css";
import NewsCard from "../NewsCard/NewsCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import React, { useMemo, useContext } from "react";

function SavedNews({
  savedArticles = [],
  isLoggedIn,
  onToggleSave,
  currentUser,
}) {
  const name = currentUser?.username || currentUser?.name || "User";
  const count = savedArticles.length;

  const uniq = Array.from(
    new Set(savedArticles.map((a) => (a.keyword || "").trim()).filter(Boolean))
  );

  const uniqKeywords = [];
  for (const a of savedArticles) {
    const k = (a.keyword || "").trim();
    if (k && !uniqKeywords.includes(k)) uniqKeywords.push(k);
  }

  let keywordLine = "";
  if (uniqKeywords.length === 1) {
    keywordLine = `By keywords: ${uniqKeywords[0]}`;
  } else if (uniqKeywords.length === 2) {
    keywordLine = `By keywords: ${uniqKeywords[0]}, ${uniqKeywords[1]}`;
  } else if (uniqKeywords.length > 2) {
    const others = uniqKeywords.length - 2;
    keywordLine = `By keywords: ${uniqKeywords[0]}, ${
      uniqKeywords[1]
    }, and ${others} other${others > 1 ? "s" : ""}`;
  }

  return (
    <main className="saved-page">
      <section className="saved-header">
        <p className="saved-breadcrumb">Saved articles</p>
        <h1 className="saved-title">
          {name}, you have {count} saved{" "}
          <div>{count === 1 ? "article" : "articles"}</div>
        </h1>
        {keywordLine && <p className="saved-keywords">{keywordLine}</p>}
      </section>

      <section className="saved-results">
        {count === 0 ? (
          <div className="saved-empty">You haven't saved any articles yet.</div>
        ) : (
          <ul className="saved-grid">
            {savedArticles.map((article, i) => (
              <NewsCard
                key={article.url || article.title || i}
                article={article}
                isLoggedIn={isLoggedIn}
                isSaved={true}
                onToggleSave={onToggleSave}
              />
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default SavedNews;
