import { useState } from "react";
import "./SearchForm.css";

export default function SearchForm({ onSearch }) {
  const [keyword, setKeyword] = useState("");
  const [error, setError] = useState("");

  function handleChange(e) {
    setKeyword(e.target.value);
    if (error) setError("");
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!keyword.trim()) {
      setError("Please enter a keyword");
      return;
    }

    onSearch(keyword.trim());
  }

  return (
    <form className="search" onSubmit={handleSubmit}>
      <div className="search-form__group">
        <input
          type="text"
          className="search-form__input"
          placeholder="Enter topic"
          value={keyword}
          onChange={handleChange}
        />
        <button className="search-form__button" type="submit">
          Search
        </button>
      </div>
      {error && <span className="search-form__error">{error}</span>}
    </form>
  );
}
