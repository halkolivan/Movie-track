import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import { getSearch } from "../store/slices/home";

//images
import search from "src/assets/images/search.png";

//Style
import "src/assets/styles/components/Search.scss";

export default function Search({allCinema}) {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [page, setPage] = useState(1);

  const [query, setQuery] = useState("");

  const handleSearchChange = (event) => {
    setQuery(event.target.value);
  };
  

  // Фильтрация фильмов
  const filteredMovies = Array.isArray(allCinema)
    ? allCinema.filter(
        (movie) =>
          movie.title && movie.title.toLowerCase().includes(query.toLowerCase())
      )
    : [];
  console.log("Функция поиска по массиву фильмов", filteredMovies);

  // Фильтрация сериалов
  const filteredSerials = Array.isArray(allCinema)
    ? allCinema.filter(
        (serial) =>
          serial.name && serial.name.toLowerCase().includes(query.toLowerCase())
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
          <div className="results">
            {filteredMovies.length > 0 ? (
              filteredMovies.map((movie) => (
                <div className="films-list" key={movie.id}>
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
              filteredSerials.map((serial) => (
                <div className="films-list" key={serial.id}>
                  <div className="films-list-image">
                    <div className="rate">{serial.vote_average.toFixed(1)}</div>
                    <NavLink to={`/detailsFilm/${serial.id}`} key={serial.id}>
                      <img
                        src={
                          "https://image.tmdb.org/t/p/original/" +
                          serial.poster_path
                        }
                        alt={serial.name}
                      />
                    </NavLink>
                  </div>
                  <div className="films-list-descript">
                    <span className="release-date">
                      {t("dataRelease")}: {serial.release_date}
                    </span>
                    <div className="title">{serial.name}</div>
                    <NavLink to={`/detailsSerial/${serial.id}`} key={serial.id}>
                      {t("moreDetailed")}
                    </NavLink>
                    <p>
                      {t("voteCount")} : {serial.vote_count}
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
