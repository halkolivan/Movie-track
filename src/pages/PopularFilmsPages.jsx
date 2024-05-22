import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getFilmsPopular } from "../store/slices/home";
import { useSelector, useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";

//import images
import FilmRoll from "src/assets/images/filmRoll.png";

//import style
import "src/assets/styles/pages/CinemaPages.scss";

export default function PopularFilmsPages() {
  //Initialization variables
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  //Initialization state manager
  const [page, setPage] = useState(1);
  const loading = useSelector((state) => state.home.loading);
  const requestPopularFilms = useSelector((state) => state.home.results);
  const firstFilms = requestPopularFilms
    ? requestPopularFilms.slice(0, 18)
    : [];

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
  };

  return (
    <div className="main-content">
      <div className="films-page">
        {!loading ? (
          <div className="films-page-content">
            {firstFilms ? (
              firstFilms.map((item) => (
                <div className="films-list">
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
              <p>запрос отсутствует ...</p>
            )}
          </div>
        ) : (
          <div className="loading">
            <img src={FilmRoll} alt="" />
            <span>Загрузка ...</span>
          </div>
        )}
      </div>
      <div className="page-numbers">
        <ReactPaginate
          breakLabel="..."
          onPageChange={handleClick}
          pageRangeDisplayed={5}
          pageCount={44270}
          nextLabel="next >"
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
}
