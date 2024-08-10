import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import {
  getFilmsPopular,
  getPopularSerial,
  getTopFilms,
  getTopSerials,
} from "../store/slices/home";

// import styles
import "src/assets/styles/pages/Home.scss";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

//import images
import FilmRoll from "src/assets/images/filmRoll.png";

//Components
import Search from "src/components/Search.jsx";

export default function Home() {
  const { t, i18n } = useTranslation();
  const [page] = useState(1);
  const [pageRangeDisplay, setPageRangeDisplay] = useState(6);

  const dispatch = useDispatch();

  const getPopularFilms = useSelector((state) => state.home.results);
  const getSerialPopular = useSelector((state) => state.home.resultsSerial);
  const getTopRateFilms = useSelector((state) => state.home.resultsTopF || []);
  const getTopRateSerials = useSelector(
    (state) => state.home.resultsTopS || []
  );
  console.log("Топ фильмов из компоненты", getTopRateSerials);

  useEffect(() => {
    const handleMedia = () => {
      const width480 = window.matchMedia("(max-width: 480px)");
      const width768 = window.matchMedia("(max-width: 768px)");
      const width1024 = window.matchMedia("(max-width: 1024px)");
      if (width480.matches) {
        setPageRangeDisplay(2);
      } else if (width768.matches) {
        setPageRangeDisplay(4);
      } else if (width1024.matches) {
        setPageRangeDisplay(6);
      } else {
        setPageRangeDisplay(8); // Для экранов более 1024px
      }
    };
    handleMedia();
    const mediaQueryLists = [
      window.matchMedia("(max-width: 480px)"),
      window.matchMedia("(max-width: 768px)"),
      window.matchMedia("(max-width: 1024px)"),
    ];
    mediaQueryLists.forEach((mql) =>
      mql.addEventListener("change", handleMedia)
    );
    return () => {
      mediaQueryLists.forEach((mql) =>
        mql.removeEventListener("change", handleMedia)
      );
    };
  }, []);
  useEffect(() => {
    console.log("pageRangeDisplay updated:", pageRangeDisplay);
  }, [pageRangeDisplay]);

  useEffect(() => {
    dispatch(getFilmsPopular({ page, language: i18n.language }));
    dispatch(getPopularSerial({ page, language: i18n.language }));
    dispatch(getTopFilms({ page, language: i18n.language }));
    dispatch(getTopSerials({ page, language: i18n.language }));
  }, [page, i18n.language]);

  return (
    <section>
      <div className="home">
        <div className="description">
          <div className="top-f">
            <p>{t("topFilms")}</p>
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={10}
              slidesPerView={pageRangeDisplay}
              navigation
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {getTopRateFilms.results && getTopRateFilms.results.length > 0 ? (
                getTopRateFilms.results.map((topF) => (
                  <SwiperSlide>
                    <div className="top-box" key={topF.id}>
                      <NavLink to={`/detailsFilm/${topF.id}`} key={topF.id}>
                        <img
                          src={
                            "https://image.tmdb.org/t/p/original/" +
                            topF.backdrop_path
                          }
                          alt={topF.title}
                        />
                      </NavLink>
                      <h4>
                        {t("title")}: {topF.title}
                      </h4>
                      <h4>
                        {t("rating")}: {topF.vote_average.toFixed(1)}
                      </h4>
                      <h4>
                        {t("popularity")}: {topF.popularity.toFixed(1)}
                      </h4>
                      <h4>
                        {t("voteCount")}: {topF.vote_count}
                      </h4>
                    </div>
                  </SwiperSlide>
                ))
              ) : (
                <div className="loading">
                  <img src={FilmRoll} alt="" />
                  <span>{t("loading")} ...</span>
                </div>
              )}
            </Swiper>
          </div>

          <div className="top-s">
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={10}
              slidesPerView={pageRangeDisplay}
              navigation
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {getTopRateSerials.results &&
              getTopRateSerials.results.length > 0 ? (
                getTopRateSerials.results.map((topF) => (
                  <SwiperSlide>
                    <div className="top-box" key={topF.id}>
                      <NavLink to={`/detailsSerial/${topF.id}`} key={topF.id}>
                        <img
                          src={
                            "https://image.tmdb.org/t/p/original/" +
                            topF.backdrop_path
                          }
                          alt={topF.name}
                        />
                      </NavLink>
                      <h4>
                        {t("title")}: {topF.name}
                      </h4>
                      <h4>
                        {t("rating")}: {topF.vote_average.toFixed(1)}
                      </h4>
                      <h4>
                        {t("popularity")}: {topF.popularity.toFixed(1)}
                      </h4>
                      <h4>
                        {t("voteCount")}: {topF.vote_count}
                      </h4>
                    </div>
                  </SwiperSlide>
                ))
              ) : (
                <div className="loading">
                  <img src={FilmRoll} alt="" />
                  <span>{t("loading")} ...</span>
                </div>
              )}
            </Swiper>
            <p>{t("topSerials")}</p>
          </div>

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

        <Search />

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
