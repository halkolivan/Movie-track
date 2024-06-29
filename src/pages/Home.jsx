import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  getFilmsPopular,
  getPopularSerial,
  getSearch,
} from "../store/slices/home";

// import styles
import "src/assets/styles/pages/Home.scss";

//import images
import FilmRoll from "src/assets/images/filmRoll.png";

//Components
import Search from "src/components/Search.jsx";

//images
// import search from "src/assets/images/search.png";

export default function Home() {
  const { t, i18n } = useTranslation();
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  const getPopularFilms = useSelector((state) => state.home.results || []);
  const getSerialPopular = useSelector(
    (state) => state.home.resultsSerial || []
  );

  const sumCinema = [...getPopularFilms, ...getSerialPopular]
  console.log('sum cinema',sumCinema)
  
  const responseSearch = useSelector((state) => state.home.search);
  console.log("responseSearch", responseSearch);
  // const loading = useSelector((state) => state.home.loading);

  useEffect(() => {
    dispatch(getSearch({ page, language: i18n.language }));
    dispatch(getFilmsPopular({ page, language: i18n.language }));
    dispatch(getPopularSerial({ page, language: i18n.language }));
  }, [page, i18n.language]);

  return (
    <section>
      <div className="home">
        <div className="description">
          <h1>{t("hello")}</h1>
          <span>{t("descriptSite")}</span>
          <p>{t("socialNetwork")}</p>
          <ul>
            <li>
              <a href="https://t.me/movie_tracker_news" target="_blank">
                {t("telegramNews")}
              </a>
            </li>
            <li>
              <a href="https://t.me/+2lEXfqjyC2NjZWMy" target="_blank">
                {t("telegramForum")}
              </a>
            </li>
          </ul>
          <h3>{t("searchFilms")}</h3>
        </div>

        <Search allCinema={sumCinema}/>

        <div className="popular">
          <h2>{t("popularFilms")}</h2>
          <div
            className="popular-cinema"
            style={{ flexDirection: getPopularFilms ? "row" : "column" }}
          >
            {getPopularFilms && getPopularFilms.length > 0 ? (
              getPopularFilms.slice(0, 6).map((movie) => (
                <div className="films-list" key={movie.id}>
                  <div className="films-list-image">
                    <div className="rate">{movie.vote_average.toFixed(1)}</div>
                    <NavLink to={`/detailsFilm/${movie.id}`} key={movie.id}>
                      <img
                        src={
                          "https://image.tmdb.org/t/p/original/" +
                          movie.poster_path
                        }
                        alt=""
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
              <div className="loading">
                <img src={FilmRoll} alt="" />
                <span>{t("loading")} ...</span>
              </div>
            )}
            <NavLink to="/popularFilmsPages">
              <div className="films-list-more">{t("more")}</div>
            </NavLink>
          </div>
          <h2>{t("popularSerial")}</h2>
          <div className="popular-cinema">
            {getSerialPopular && getSerialPopular.length > 0 ? (
              getSerialPopular.slice(0, 6).map((serial) => (
                <div className="films-list" key={serial.id}>
                  <div className="films-list-image">
                    <div className="rate">{serial.vote_average.toFixed(1)}</div>
                    <NavLink to={`/detailsSerial/${serial.id}`} key={serial.id}>
                      <img
                        src={
                          "https://image.tmdb.org/t/p/original/" +
                          serial.poster_path
                        }
                        alt=""
                      />
                    </NavLink>
                  </div>
                  <div className="films-list-descript">
                    <span className="release-date">
                      {t("dataRelease")}: {serial.first_air_date}
                    </span>
                    <div className="title">{serial.name}</div>
                    <NavLink to={`/detailsFilm/${serial.id}`} key={serial.id}>
                      {t("moreDetailed")}
                    </NavLink>
                    <p>
                      {t("voteCount")} : {serial.vote_count}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="loading">
                <img src={FilmRoll} alt="" />
                <span>{t("loading")} ...</span>
              </div>
            )}
            <NavLink to="/popularSerialPages">
              <div className="films-list-more">{t("more")}</div>
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
}
