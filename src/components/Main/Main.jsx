import "./Main.css";
import me from "../../images/me.jpg";
import SearchForm from "../SearchForm/SearchForm";
import NewsCard from "../NewsCard/NewsCard";
import Preloader from "../Preloader/Preloader";
import notfound from "../../images/notfound.png";

function Main({
  section,
  onSearch,
  isSearching,
  searchError,
  hasSearched,
  articles = [],
  visibleCount = 3,
  onShowMore,
  isLoggedIn,
  savedArticles = [],
  onToggleSave,
}) {
  return (
    <main className="main">
      {section === "search" && (
        <>
          <section className="main__search">
            <h1 className="main__search_title">
              What’s going on in the world?
            </h1>
            <p className="main__subtitle">
              Find the latest news on any topic and save them in your personal
              account.
            </p>
            <SearchForm onSearch={onSearch} />
          </section>

          {hasSearched && (
            <section className="main__results">
              <div className="main__results-inner">
                {!isSearching && !searchError && articles.length > 0 && (
                  <h2 className="main__results-title">Search results</h2>
                )}

                {isSearching && <Preloader text="Searching for news..." />}

                {!isSearching && searchError && (
                  <div className="main__results-error">{searchError}</div>
                )}

                {!isSearching && !searchError && articles.length === 0 && (
                  <div className="main__results-empty">
                    <img
                      src={notfound}
                      alt="notfound"
                      className="main__notfound"
                    />
                    <h2 className="main__results-title">Nothing found</h2>
                    <p className="main__results-subtitle">
                      Sorry, but nothing matched{" "}
                    </p>
                    <p className="main__results-subtitle">your search terms.</p>
                  </div>
                )}

                {!isSearching && !searchError && articles.length > 0 && (
                  <>
                    <ul className="main__cards-grid">
                      {articles.slice(0, visibleCount).map((article, i) => {
                        const isSaved = (savedArticles || []).some(
                          (a) => a.url === article.url
                        );
                        return (
                          <NewsCard
                            key={i}
                            article={article}
                            isLoggedIn={isLoggedIn}
                            isSaved={isSaved}
                            onToggleSave={onToggleSave}
                          />
                        );
                      })}
                    </ul>

                    {visibleCount < articles.length && (
                      <button className="main__show-more" onClick={onShowMore}>
                        Show more
                      </button>
                    )}
                  </>
                )}
              </div>
            </section>
          )}
        </>
      )}

      {section === "author" && (
        <section className="main__author">
          <div className="main__author-content">
            <img src={me} alt="aboutauthor" className="main__author_img" />
            <div className="main__text">
              <h1 className="main__title_author">About the author</h1>
              <p className="main__description">
                My name is Manuel Calderon, i work at the airport as a mechanic
                assistant, and i am in web frontend development technologies
              </p>
              <p className="main__description">
                Here at tripleten, i have had a perfect guide on how to create
                website with HTML, CSS and react and more. Beyond that i have
                now the attention to detail on what customers want to see when
                making any pieace of software
              </p>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

export default Main;
