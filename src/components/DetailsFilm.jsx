import YouTube from "react-youtube";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// import styles
import "src/assets/styles/pages/DetailsFilm.scss";

import {
  getDetailFilm,
  getTrailersDetail,
  getCreditsPerson,
  getRecommendatFilm,
} from "../store/slices/detailsCinema";

export default function DetailsFilm() {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenTrailer, setIsOpenTrailer] = useState(false);
  const [isOpenSimilar, setIsOpenSimilar] = useState(false);
  const [isOpenWinActor, setIsOpenWinActor] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const dispatch = useDispatch();

  const openPopWindow = () => {
    setIsOpen(true);
  };
  const closePopWindow = () => {
    setIsOpen(false);
  };

  const openActorWindow = () => {
    setIsOpenWinActor(true);
  };
  const closeActorWindow = () => {
    setIsOpenWinActor(false);
  };

  const openSimilarWindow = () => {
    setIsOpenSimilar(true);
  };
  const closeSimilarWindow = () => {
    setIsOpenSimilar(false);
  };

  //Модельное окно с видео
  const openTrailerWindow = (key) => {
    setTrailerKey(key);
    setIsOpenTrailer(true);
  };

  const closeTrailerWindow = () => {
    setIsOpenTrailer(false);
    setTrailerKey(null);
  };

  //Данные фильма
  useEffect(() => {
    dispatch(getDetailFilm({ id: id, language: i18n.language }));
    dispatch(getTrailersDetail({ id: id, language: i18n.language }));
    dispatch(getCreditsPerson({ id: id, language: i18n.language }));
  }, [id, i18n.language]);
  useEffect(() => {
    dispatch(
      getRecommendatFilm({ id: id, language: i18n.language, page: page })
    );
  }, [id, i18n.language, page]);

  //Описание фильма(сериала)
  const requestDetal = useSelector((state) => state.detailFilm.resultsDfilm);

  //Трейлер фильма
  const requestTrailersDetail = useSelector(
    (state) => state.detailFilm.results || []
  );

  //Перечень актёров
  const requestPerson = useSelector((state) => state.detailFilm.actors || []);
  const firstActors = requestPerson.cast ? requestPerson.cast.slice(0, 5) : [];
  console.log("\x1b[31m\x1b[4m%s\x1b[0m", "Crew", requestPerson.crew);

  //Походие кинокартины
  const requestRecommandat = useSelector(
    (state) => state.detailFilm.recommendat || []
  );
  const firstRecommendat = requestRecommandat.results
    ? requestRecommandat.results.slice(0, 5)
    : [];

  //Функция вывода всех значений массива
  function displayFn(el) {
    const event = el.map((ind) => ind.name);
    return event.join(", ");
  }
  const loading = useSelector((state) => state.detailFilm.loading);

  return (
    <main>
      {!loading ? (
        <div className="content-general">
          {requestDetal && (
            <>
              <div className="content-detail">
                <div className="content-detail-photo">
                  <div className="content-detail-photo-cinema">
                    <img
                      src={
                        "https://image.tmdb.org/t/p/original/" +
                        requestDetal.poster_path
                      }
                      alt={requestDetal.title}
                    />
                  </div>
                  <button className="add-list" onClick={openPopWindow}>
                    {t("addToList")}
                  </button>
                  {isOpen && (
                    <div
                      className="overlay"
                      style={{ zIndex: isOpen ? 99 : 0 }}
                    >
                      <div className="enter-box" tabIndex="0">
                        <div className="enter-box-nav">
                          <span>{t("enter")}</span>
                          <button onClick={closePopWindow}>+</button>
                        </div>
                        <div className="enter-box-social">
                          <button>Google</button>
                          <button>Yandex</button>
                          <button>Vkontakte</button>
                          <button>GitHub</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="content-detail-description">
                  <h1>
                    {t("title")}: {requestDetal.title}
                  </h1>
                  <h2>
                    {t("originalTitle")}: {requestDetal.original_title}
                  </h2>

                  <ul>
                    <li>
                      <span>{t("userEvaluation")}: </span>
                      <span>{requestDetal.vote_average.toFixed(1)}</span>
                    </li>
                    <li>
                      <span>{t("popularity")}: </span>
                      <span>{requestDetal.popularity.toFixed(1)}</span>
                    </li>
                    <li>
                      <span>{t("countryOfProduction")}: </span>
                      <span>
                        {displayFn(requestDetal.production_countries)}
                      </span>
                    </li>
                    <li>
                      <span>{t("lng")}: </span>
                      <span>{displayFn(requestDetal.spoken_languages)}</span>
                    </li>
                    {requestPerson.crew && requestPerson.crew.length > 0 ? (
                      requestPerson.crew.find(
                        (item) => item.job === "Director"
                      ) ? (
                        <li>
                          <span>{t("director")}: </span>
                          {requestPerson.crew
                            .filter((item) => item.job === "Director")
                            .map((director) => (
                              <NavLink
                                to={`/detailPerson/${director.id}`}
                                key={director.id}
                              >
                                <span>{director.name}</span>
                              </NavLink>
                            ))}
                        </li>
                      ) : (
                        <p>{t("loading")}...</p>
                      )
                    ) : (
                      <p>{t("loading")}...</p>
                    )}
                    <li>
                      <span>{t("movieCompany")}: </span>
                      <span>
                        {displayFn(requestDetal.production_companies)}
                      </span>
                    </li>
                    <li>
                      <span>{t("genre")}: </span>
                      <span>{displayFn(requestDetal.genres)}</span>
                    </li>
                    <li>
                      <span>{t("budget")}: </span>
                      <span>{requestDetal.budget} $</span>
                    </li>
                    <li>
                      <span>{t("revenue")}: </span>
                      <span>{requestDetal.revenue} $</span>
                    </li>
                    <li>
                      <span>{t("releaseDate")}: </span>
                      <span>{requestDetal.release_date}</span>
                    </li>
                    <li>
                      <span>{t("status")}: </span>
                      <span>" {requestDetal.status} " </span>
                    </li>
                    <li>
                      <span>{t("runtime")}: </span>
                      <span>{requestDetal.runtime} мин.</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="content-description">
                <h2>{t("descriptionOfFilm")}</h2>
                <p>{requestDetal.overview}</p>
              </div>
            </>
          )}
          <div className="content-video-material">
            <h2>{t("videoMaterials")}</h2>
            <div className="content-video-material-box">
              {requestTrailersDetail && requestTrailersDetail.length > 0 ? (
                requestTrailersDetail.map((item) => (
                  <div className="content-video-material-section" key={item.id}>
                    <div
                      className="content-video-material-section-trailer"
                      onClick={openTrailerWindow}
                    >
                      <YouTube videoId={item.key} id={item.id} />
                      <h4>
                        {t("releaseDate")}: {item.published_at}
                      </h4>
                      <h2>{item.name}</h2>
                    </div>
                    {isOpenTrailer && (
                      <div
                        className="overlay"
                        style={{ zIndex: isOpenTrailer ? 99 : 0 }}
                      >
                        <div className="trailer" tabIndex="0">
                          <div className="trailer-head">
                            <span>{item.name}</span>
                            <button onClick={closeTrailerWindow}>+</button>
                          </div>
                          <div className="trailer-content">
                            <YouTube videoId={item.key} id={item.id} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="none-response">{t("trlMss")}</div>
              )}
            </div>
          </div>

          <div className="content-actors">
            <h2>{t("cast")}</h2>
            <div className="content-actors-carts">
              {firstActors && firstActors.length > 0 ? (
                firstActors.map((item) => (
                  <NavLink to={`/detailPerson/${item.id}`} key={item.id}>
                    <img
                      src={
                        "https://image.tmdb.org/t/p/original/" +
                        item.profile_path
                      }
                      alt={item.name}
                    />
                    <div className="actor-description">
                      <span>{item.name}</span>
                      <span>
                        {t("role")}:{item.character}
                      </span>
                      <span>{t("moreDetailed")}</span>
                    </div>
                  </NavLink>
                ))
              ) : (
                <p>{t("loading")} ...</p>
              )}
              <div className="full-list" onClick={openActorWindow}>
                {t("more")}
              </div>
              {isOpenWinActor && (
                <div
                  className="overlay"
                  style={{ zIndex: isOpenWinActor ? 99 : 0 }}
                >
                  <div className="actors-box">
                    <div className="actors-box-title">
                      <span>{t("actors")}</span>
                      <button onClick={closeActorWindow}>+</button>
                    </div>
                    <div className="actors-more-count">
                      {requestPerson.cast && requestPerson.cast.length > 0 ? (
                        requestPerson.cast.map((item) => (
                          <NavLink
                            to={`/detailPerson/${item.id}`}
                            key={item.id}
                          >
                            <img
                              src={
                                "https://image.tmdb.org/t/p/original/" +
                                item.profile_path
                              }
                              alt={item.name}
                            />
                            <div className="actor-description">
                              <span>{item.name}</span>
                              <span>
                                {t("role")}:{item.character}
                              </span>
                              <span>{t("moreDetailed")}</span>
                            </div>
                          </NavLink>
                        ))
                      ) : (
                        <p>{t("loading")} ...</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="content-similar">
            <h2>{t("similarFilms")}</h2>
            <div className="content-similar-carts">
              {firstRecommendat && firstRecommendat.length > 0 ? (
                firstRecommendat.map((item) => (
                  <NavLink to={`/detailsFilm/${item.id}`} key={item.id}>
                    <img
                      src={
                        "https://image.tmdb.org/t/p/original/" +
                        item.poster_path
                      }
                      alt={item.title}
                    />
                    <div className="cinema-description">
                      <span>{item.title}</span>
                      <span>
                        {t("dataRelease")}: {item.release_date}
                      </span>
                      <span>
                        {t("popularity")}: {item.popularity.toFixed(0.1)}
                      </span>
                      <span>
                        {t("rating")}:{" "}
                        <span> {item.vote_average.toFixed(1)} </span>{" "}
                      </span>
                    </div>
                  </NavLink>
                ))
              ) : (
                <p>{t("loading")} ...</p>
              )}
              <button
                className="similar-films"
                onClick={openSimilarWindow}
                style={{ zIndex: isOpenTrailer ? 0 : 1 }}
              >
                <span>{t("more")}</span>
              </button>
              {isOpenSimilar && (
                <div
                  className="overlay"
                  style={{ zIndex: isOpenSimilar ? 99 : 0 }}
                >
                  <div className="similar-box">
                    <div className="similar-box-title">
                      <h2>{t("similarFilms")}</h2>
                      <button onClick={closeSimilarWindow}>+</button>
                    </div>
                    <div className="similar-box-movies">
                      {requestRecommandat.results &&
                      requestRecommandat.results.length > 0 ? (
                        requestRecommandat.results.map((item) => (
                          <NavLink to={`/detailsFilm/${item.id}`} key={item.id}>
                            <img
                              src={
                                "https://image.tmdb.org/t/p/original/" +
                                item.poster_path
                              }
                              alt={item.title}
                            />
                            <div className="cinema-description">
                              <span>{item.title}</span>
                              <span>
                                {t("dataRelease")}: {item.release_date}
                              </span>
                              <span>
                                {t("popularity")}:{" "}
                                {item.popularity.toFixed(0.1)}
                              </span>
                              <span>
                                {t("rating")}:{" "}
                                <span> {item.vote_average.toFixed(1)} </span>{" "}
                              </span>
                            </div>
                          </NavLink>
                        ))
                      ) : (
                        <p> {t("loading")} ... </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>{t("loading")}...</p>
      )}
    </main>
  );
}
