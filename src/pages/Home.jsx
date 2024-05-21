import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getFilmsPopular, getPopularSerial } from "../store/slices/home";

// import styles
import "src/assets/styles/pages/Home.scss";

//images
import search from "src/assets/images/search.png";

export default function Home() {
  const { t, i18n } = useTranslation();
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  // Вынемаем популярные фильмы
  const getPopularFilms = useSelector((state) => state.home.results || []);
  const firstFilms = getPopularFilms.slice(0, 5);

  //Вынемаем популярные сериалы
  const getSerialPopular = useSelector(
    (state) => state.home.resultsSerial || []
  );
  const firstSerials = getSerialPopular.slice(0, 5);

  useEffect(() => {
    dispatch(getFilmsPopular({ page: page, language: i18n.language }));
    dispatch(getPopularSerial({ page: page, language: i18n.language }));
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
        <div className="search">
          <img src={search} alt="" />
          <input type="search" className="blinking-cursor" />
        </div>
        <div className="Popular">
          <h2>{t("popularFilms")}</h2>
          <div className="Popular-cinema">
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
                    <span className="release-date">
                      {t("dataRelease")}: {item.release_date}
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
              <p>Загрузка ...</p>
            )}
            <NavLink to="/popularFilmsPages">
              <div className="films-list-more">{t("more")}</div>
            </NavLink>
          </div>
          <h2>{t("popularSerial")}</h2>
          <div className="Popular-cinema">
            {firstSerials ? (
              firstSerials.map((item) => (
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
                    <span className="release-date">
                      {t("dataRelease")}: {item.first_air_date}
                    </span>
                    <div className="title">{item.name}</div>
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
              <p>Загрузка ...</p>
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
