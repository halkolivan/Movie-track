import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getPopularSerial } from "../store/slices/home";
import { useSelector, useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";

//import images
import FilmRoll from "src/assets/images/filmRoll.png";

//import style
import "src/assets/styles/pages/CinemaPages.scss";

export default function PopularSerialPages() {
  //Initialization variables
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  //Initialization state manager
  const [page, setPage] = useState(1);
  const loading = useSelector((state) => state.home.loading);
  const requestPopularSerial = useSelector((state) => state.home.resultsSerial);

  // Диапазон отображаемых страниц
  const [pageRangeDisplayed, setPageRangeDisplayed] = useState(5);

  // Использование эффекта для отслеживания изменения ширины экрана
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 480px)");

    const handleMediaQueryChange = (e) => {
      if (e.matches) {
        setPageRangeDisplayed(1);
      } else {
        setPageRangeDisplayed(5);
      }
    };

    handleMediaQueryChange(mediaQuery);
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);
  useEffect(() => {
    console.log("pageRangeDisplayed updated:", pageRangeDisplayed);
  }, [pageRangeDisplayed]);

  //Function for request popular films
  useEffect(() => {
    dispatch(
      getPopularSerial({
        page: page,
        language: i18n.language,
      })
    );
  }, [page, i18n.language]);

  //Обработчик изминения страницы
  const handleClick = (event) => {
    setPage(event.selected + 1);
  };

  return (
    <div className="main-content">
      <div className="films-page">
        {!loading ? (
          <div className="films-page-content">
            {requestPopularSerial ? (
              requestPopularSerial.map((elem) => (
                <div className="films-list" key={elem.id}>
                  <div className="films-list-image">
                    <div className="rate">{elem.vote_average.toFixed(1)}</div>
                    <NavLink to={`/detailsSerial/${elem.id}`}>
                      <img
                        src={
                          "https://image.tmdb.org/t/p/original/" +
                          elem.poster_path
                        }
                        alt=""
                      />
                    </NavLink>
                  </div>
                  <div className="films-list-descript">
                    <span className="release-data">
                      {t("dataRelease")}:{elem.first_air_date}
                    </span>
                    <div className="title">{elem.name}</div>
                    <NavLink to={`/detailsSerial/${elem.id}`}>
                      {t("moreDetailed")}
                    </NavLink>
                    <p>
                      {t("voteCount")} : {elem.vote_count}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>
                <div className="loading">
                  <img src={FilmRoll} alt="" />
                  <span>{t("loading")} ...</span>
                </div>
              </p>
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
