import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getFilmsPopular, setLoading } from "../store/slices/home";
import { useSelector, useDispatch } from "react-redux";

//import images
import FilmRoll from "src/assets/images/filmRoll.png";

//import style
import "src/assets/styles/pages/CinemaPages.scss";

export default function PopularFilmsPages() {

  
  //Initialization variables
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const [pageRangeDisplayed, setPageRangeDisplayed] = useState(5);
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
  useEffect(() => {
    console.log('pageRangeDisplayed updated:', pageRangeDisplayed);
  }, [pageRangeDisplayed]);

  //Initialization state manager
  const [page, setPage] = useState(1);
  const loading = useSelector((state) => state.home.loading);
  const requestPopularFilms = useSelector((state) => state.home.results);

  if (requestPopularFilms && requestPopularFilms.length > 0) {
    console.log("films", requestPopularFilms);
  } else {
    console.log("Массив не найден");
  }

  if (page >= 1) {
    console.log("page films", page);
  }

  //Function for request popular films
  useEffect(() => {
    dispatch(
      getFilmsPopular({
        page: page,
        language: i18n.language,
      })
    );
  }, [page, i18n.language]);

  //Обработчик изминения страницы
  const handleClick = (event) => {
    setPage(event.selected + 1);
    dispatch(setLoading(true));
  };

  return (
    <div className="main-content">
      <div className="films-page">
        {!loading ? (
          <div className="films-page-content">
            {requestPopularFilms ? (
              requestPopularFilms.map((item) => (
                <div className="films-list" key={item.id}>
                  <div className="films-list-image">
                    <div className="rate">{item.vote_average.toFixed(1)}</div>
                    <NavLink to={`/detailsFilm/${item.id}`} key={item.id}>
                      <img
                        src={
                          "https://image.tmdb.org/t/p/original/" +
                          item.poster_path
                        }
                        alt=""
                      />
                    </NavLink>
                  </div>
                  <div className="films-list-descript">
                    <span className="release-data">
                      {t("dataRelease")}:{item.release_date}
                    </span>
                    <div className="title">{item.title}</div>
                    <NavLink to={`/detailsFilm/${item.id}`} key={item.id}>
                      {t("moreDetailed")}
                    </NavLink>
                    <p>
                      {t("voteCount")} : {item.vote_count}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>{t("loading")}...</p>
            )}
          </div>
        ) : (
          <div className="loading">
            <img src={FilmRoll} alt="" />
            <span>{t("loading")} ...</span>
          </div>
        )}
      </div>

      <div className="page-numbers">
        <ReactPaginate
          breakLabel="..."
          onPageChange={handleClick}
          pageRangeDisplayed={pageRangeDisplayed}
          pageCount={500}
          nextLabel="next >"
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
}
