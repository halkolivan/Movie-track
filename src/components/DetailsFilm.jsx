import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  getDetailFilm,
  getTrailersDetail,
  getCreditsPerson,
} from "../store/slices/detailsCinema";

// import styles
import "src/assets/styles/pages/DetailsFilm.scss";

export default function DetailsFilm() {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const openPopWindow = () => {
    setIsOpen(true);
  };
  const closePopWindow = () => {
    setIsOpen(false);
  };

  const [isOpenWinActor, setIsOpenWinActor] = useState(false);
  const openActorWindow = () => {
    setIsOpenWinActor(true);
  };
  const closeActorWindow = () => {
    setIsOpenWinActor(false);
  };

  const [isOpenSimilar, setIsOpenSimilar] = useState(false);
  const openSimilarWindow = () => {
    setIsOpenSimilar(true);
  };
  const closeSimilarWindow = () => {
    setIsOpenSimilar(false);
  };

  //Данные фильма
  useEffect(() => {
    dispatch(getDetailFilm({ id: id, language: i18n.language }));
  }, [id, i18n.language]);
  const requestDetal = useSelector((state) => state.detailFilm.resultsDfilm);
  console.log(requestDetal);
  const loading = useSelector((state) => state.detailFilm.loading);

  //Трейлер фильма
  useEffect(() => {
    dispatch(getTrailersDetail({ id: id, language: i18n.language }));
  }, [id, i18n.language]);
  const requestTrailersDetail = useSelector((state) => state.detailFilm);
  console.log(requestTrailersDetail);

  //Перечень актёров
  useEffect(() => {
    dispatch(getCreditsPerson({ id: id, language: i18n.language }));
  }, [id, i18n.language]);
  const requestPerson = useSelector((state) => state.detailFilm);
  console.log(requestPerson);

  //Функция вывода всех значений массива
  function displayFn(el) {
    const event = el.map((ind) => ind.name);
    return event.join(", ");
  }

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
                    Добавить в список
                  </button>
                  {isOpen && (
                    <div className="overlay">
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
                  <h1>Название: {requestDetal.title}</h1>
                  <h2>Оригинальное название: {requestDetal.original_title}</h2>
                  <ul>
                    <li>
                      <span>Оценка пользователей: </span>
                      <span>{requestDetal.vote_average.toFixed(1)}</span>
                    </li>
                    <li>
                      <span>Популярность: </span>
                      <span>{requestDetal.popularity.toFixed(1)}</span>
                    </li>
                    <li>
                      <span>Страна производства: </span>
                      <span>
                        {displayFn(requestDetal.production_countries)}
                      </span>
                    </li>
                    <li>
                      <span>Язык: </span>
                      <span>{displayFn(requestDetal.spoken_languages)}</span>
                    </li>
                    <li>
                      <span>Режиссёр: </span>
                      <span></span>
                    </li>
                    <li>
                      <span>Кинокомпании: </span>
                      <span>
                        {displayFn(requestDetal.production_companies)}
                      </span>
                    </li>
                    <li>
                      <span>Жанр: </span>
                      <span>{displayFn(requestDetal.genres)}</span>
                    </li>
                    <li>
                      <span>Бюджет: </span>
                      <span>{requestDetal.budget} $</span>
                    </li>
                    <li>
                      <span>Сборы: </span>
                      <span>{requestDetal.revenue} $</span>
                    </li>
                    <li>
                      <span>Дата выхода: </span>
                      <span>{requestDetal.release_date}</span>
                    </li>
                    <li>
                      <span>Статус: </span>
                      <span>" {requestDetal.status} " </span>
                    </li>
                    <li>
                      <span>Длительность: </span>
                      <span>{requestDetal.runtime} мин.</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="content-description">
                <h2>Описание фильма</h2>
                <p>{requestDetal.overview}</p>
              </div>
            </>
          )}

          <div className="content-video-material">
            <h2>Видеоматериалы</h2>
            <div className="content-video-material-section">
              <button>
                <div>Изображение видео</div>
                <div>Описание материала</div>
              </button>
              <button></button>
              <button></button>
              <button></button>
            </div>
          </div>

          <div className="content-actors">
            <h2>Актёры</h2>
            <div className="content-actors-carts">
              <NavLink to="/cartActor">
                <div>Актёр</div>
              </NavLink>
              <button onClick={openActorWindow}>{t("fullList")}</button>
              {isOpenWinActor && (
                <div
                  className="overlay"
                  style={{ zIndex: isOpenWinActor ? 99 : 0 }}
                >
                  <div className="actors-more">
                    <div className="actors-more-title">
                      <h2>Актёры</h2>
                      <button onClick={closeActorWindow}>+</button>
                    </div>
                    <div className="actors-more-count">
                      <div>Данные актёра</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="content-similar">
            <h2>Похожие кинокартины</h2>
            <div className="content-similar-carts">
              <NavLink to="/detailsFilm">
                <div>Кинокартины</div>
              </NavLink>
              <div className="similar-films">
                <button onClick={openSimilarWindow}>{t("fullList")}</button>
                {isOpenSimilar && (
                  <div className="similar-overlay">
                    <div className="similar-box">
                      <div className="similar-box-title">
                        <h2>{t("similarFilms")}</h2>
                        <button onClick={closeSimilarWindow}>+</button>
                      </div>
                      <div className="similar-box-carts">
                        <div className="similar-box-carts-column">
                          <div>
                            <div className="rank"></div>
                          </div>
                          <div>
                            <div className="rank"></div>
                          </div>
                        </div>
                        <div className="similar-box-carts-column">
                          <div>
                            <div className="rank"></div>
                          </div>
                          <div>
                            <div className="rank"></div>
                          </div>
                        </div>
                        <div className="similar-box-carts-column">
                          <div>
                            <div className="rank"></div>
                          </div>
                          <div>
                            <div className="rank"></div>
                          </div>
                        </div>
                        <div className="similar-box-carts-column">
                          <div>
                            <div className="rank"></div>
                          </div>
                          <div>
                            <div className="rank"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Загрузка ...</p>
      )}
    </main>
  );
}
