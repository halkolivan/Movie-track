import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getFilmsPopular, getPopularSerial } from "../store/slices/home";

// import styles
import "src/assets/styles/pages/Home.scss";

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

  useEffect(() => {
    dispatch(getFilmsPopular({ page, language: i18n.language }));
    dispatch(getPopularSerial({ page, language: i18n.language }));
  }, [page, i18n.language, dispatch]);

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

        {/* Поиск */}

        <Search films={getFilmsPopular} serials={getPopularSerial} />

        <div className="Popular">
          <h2>{t("popularFilms")}</h2>
          <div className="Popular-cinema">
            {getPopularFilms ? (
              getPopularFilms.slice(0, 5).map((item) => (
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
              <p>{t("loading")} ...</p>
            )}
            <NavLink to="/popularFilmsPages">
              <div className="films-list-more">{t("more")}</div>
            </NavLink>
          </div>
          <h2>{t("popularSerial")}</h2>
          <div className="Popular-cinema">
            {getSerialPopular ? (
              getSerialPopular.slice(0, 5).map((item) => (
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
              <p>{t("loading")} ...</p>
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
