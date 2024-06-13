import { useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

//images
import search from "src/assets/images/search.png";

//Style
import "src/assets/styles/components/Search.scss";

export default function Search({ films, serials }) {
  const { t } = useTranslation();

  const [query, setQuery] = useState("");

  const handleSearchChange = (event) => {
    setQuery(event.target.value);
  };

  const filteredMovies = Array.isArray(films)
    ? films.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const filteredSerials = Array.isArray(serials)
    ? serials.filter((serial) =>
        serial.name.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div>
      <div className="search">
        <img src={search} alt="" />
        <input
          type="search"
          className="blinking-cursor"
          placeholder={t("search")}
          value={query}
          onChange={handleSearchChange}
        />
      </div>
      {query && (
        <>
          {/* <div className="results-data">
            <h2>{t("searchResults")} :</h2>
            <p>
              {t("filmsFound")}: {films.length}
            </p>
            <p>
              {t("serialsFound")}: {serials.length}
            </p>
          </div> */}
          <div className="results">
            {filteredMovies.length > 0 ? (
              filteredMovies.map((movie) => (
                <div className="films-list">
                  <div className="films-list-image">
                    <div className="rate">{movie.vote_average.toFixed(1)}</div>
                    <NavLink to={`/detailsFilm/${movie.id}`} key={movie.id}>
                      <img
                        src={
                          "https://image.tmdb.org/t/p/original/" +
                          movie.poster_path
                        }
                        alt={movie.title}
                      />
                    </NavLink>
                  </div>
                  <div className="films-list-descript">
                    <span className="release-date">
                      {t("dataRelease")}: {movie.release_date}
                    </span>
                    <div className="title">{movie.title}</div>
                    <NavLink to={`/detailsFilm/${movie.id}`} key={movie.id}>
                      {t("moreDetailed")}
                    </NavLink>
                    <p>
                      {t("voteCount")} : {movie.vote_count}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-results"></p>
            )}
            {filteredSerials.length > 0 ? (
              filteredSerials.map((serials) => (
                <div className="films-list">
                  <div className="films-list-image">
                    <div className="rate">
                      {serials.vote_average.toFixed(1)}
                    </div>
                    <NavLink to={`/detailsFilm/${serials.id}`} key={serials.id}>
                      <img
                        src={
                          "https://image.tmdb.org/t/p/original/" +
                          serials.poster_path
                        }
                        alt={serials.name}
                      />
                    </NavLink>
                  </div>
                  <div className="films-list-descript">
                    <span className="release-date">
                      {t("dataRelease")}: {serials.release_date}
                    </span>
                    <div className="title">{serials.name}</div>
                    <NavLink to={`/detailsFilm/${serials.id}`} key={serials.id}>
                      {t("moreDetailed")}
                    </NavLink>
                    <p>
                      {t("voteCount")} : {serials.vote_count}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-results"></p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
