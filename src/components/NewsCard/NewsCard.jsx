import "./NewsCard.css";
import Save from "../../images/save.svg";
import Savefilled from "../../images/save-filled.svg";

function NewsCard({ article, isLoggedIn, isSaved, onToggleSave }) {
  if (!article) return null;

  const {
    title,
    description = "",
    url = "#",
    urlToImage,
    publishedAt,
    source,
    author,
  } = article;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleSaveClick = (e) => {
    e.preventDefault();
    if (!isLoggedIn) return;
    onToggleSave?.(article);
  };

  let saveTitle = "Sign in to save articles";
  if (isLoggedIn) {
    saveTitle = isSaved ? "Remove from saved" : "Save article";
  }

  return (
    <li className="news-card">
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="news-card__link"
      >
        <div className="news-card__image-wrapper">
          <button
            type="button"
            className={`news-card__save ${
              isSaved ? "news-card__save_active" : ""
            } ${!isLoggedIn ? "news-card__save_disabled" : ""}`}
            title={saveTitle}
            onClick={handleSaveClick}
            disabled={!isLoggedIn}
          >
            <img src={isLoggedIn && isSaved ? Savefilled : Save} alt="save" />
          </button>
          {urlToImage ? (
            <img src={urlToImage} alt={title} className="news-card__image" />
          ) : (
            <div className="news-card__placeholder">No image</div>
          )}
        </div>
      </a>

      <div className="news-card__content">
        <p className="news-card__date">{formatDate(publishedAt)}</p>
        <h3 className="news-card__title">{title}</h3>
        <p className="news-card__description">
          {description && description.length > 120
            ? `${description.slice(0, 120)  }...`
            : description}
        </p>
        <p className="news-card__author">{author || source?.name}</p>
      </div>
    </li>
  );
}

export default NewsCard;
