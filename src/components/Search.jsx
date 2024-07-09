import debounce from "lodash.debounce";
import { NavLink } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useTranslation } from "react-i18next";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

//Slices
import { getSearch } from "../store/slices/home";

//images
import search from "src/assets/images/search.png";
import FilmRoll from "src/assets/images/filmRoll.png";

//Style
import "src/assets/styles/components/Search.scss";

export default function Search() {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageRangeDisplayed, setPageRangeDisplayed] = useState(5);

  const loading = useSelector((state) => state.home.loading);
  const responseSearch = useSelector((state) => state.home.search);
  useEffect(() => {
    dispatch(getSearch({ page, language: i18n.language, query: query }));
  }, [query, page]);

  const resultsSearch = responseSearch.total_results;
  const totalPages = responseSearch.total_pages;

  //Обработчик изминения страницы
  const handleClick = (event) => {
    setPage(event.selected + 1);
  };
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 480px)");

    const handleMediaQueryChange = (e) => {
      if (e.matches) {
        setPageRangeDisplayed(1);
      } else {
        setPageRangeDisplayed(5);
      }
    };

    handleMediaQueryChange(mediaQuery); // Устанавливаем начальное значение
    mediaQuery.addEventListener("change", handleMediaQueryChange); // Слушатель изменения

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange); // Удаление слушателя
    };
  }, []);

  // Задержка рендеринга до полного ввода данных в поисковик
  const handleChangeClick = (event) => {
    setQuery(event.target.value);
    debounceHandleChange(event.target.value);
  };
  const debounceHandleChange = useCallback(
    debounce((inputValue) => {
      console.log(inputValue, "test");
    }, 500),
    []
  );

  return (
    <div>
      <div className="search">
        <img src={search} alt="" />
        <input
          type="search"
          className="blinking-cursor"
          placeholder={t("search")}
          value={query}
          onChange={handleChangeClick}
        />
      </div>
      {!loading ? (
        <>
          {query && (
            <>
              <h2>Результаты поиска: {resultsSearch}</h2>
              <div className="results">
                {responseSearch.results && responseSearch.results.length > 0 ? (
                  responseSearch.results.map((movie) => (
                    <div className="films-list" key={movie.id}>
                      <div className="films-list-image">
                        <div className="rate">
                          {movie?.vote_average?.toFixed(1) ||
                            movie.popularity.toFixed(0.1)}
                        </div>
                        <NavLink
                          to={
                            movie.media_type === "movie"
                              ? `/detailsFilm/${movie.id}`
                              : movie.media_type === "tv"
                              ? `/detailsSeries/${movie.id}`
                              : movie.media_type === "person"
                              ? `/detailPerson/${movie.id}`
                              : "#"
                          }
                          key={movie.id}
                        >
                          <img
                            src={
                              "https://image.tmdb.org/t/p/original/" +
                              (movie.media_type === "person"
                                ? movie.profile_path
                                : movie.poster_path)
                            }
                            alt={movie.title || movie.name}
                          />
                        </NavLink>
                      </div>
                      <div className="films-list-descript">
                        {(movie.release_date || movie.first_air_date) && (
                          <span className="release-date">
                            {t("dataRelease")}:{" "}
                            {movie.release_date || movie.first_air_date}
                          </span>
                        )}
                        <div className="title">{movie.title || movie.name}</div>
                        <NavLink
                          to={
                            movie.media_type === "movie"
                              ? `/detailsFilm/${movie.id}`
                              : movie.media_type === "tv"
                              ? `/detailsSeries/${movie.id}`
                              : movie.media_type === "person"
                              ? `/detailPerson/${movie.id}`
                              : "#"
                          }
                          key={movie.id}
                        >
                          {t("moreDetailed")}
                        </NavLink>
                        {movie.vote_count && (
                          <p>
                            {t("voteCount")} : {movie.vote_count}
                          </p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="no-results"></p>
                )}
                <div className="page-numbers">
                  <ReactPaginate
                    breakLabel="..."
                    onPageChange={handleClick}
                    pageRangeDisplayed={pageRangeDisplayed}
                    pageCount={totalPages}
                    nextLabel="next >"
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                  />
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <div className="loading">
          <img src={FilmRoll} alt="" />
          <span>{t("loading")} ...</span>
        </div>
      )}
    </div>
  );
}
