import { NavLink, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  getDetailPerson,
  getExternalPerson,
  getCombinedPerson,
} from "../store/slices/detailsPerson";

// Styles
import "src/assets/styles/components/DetailPerson.scss";

export default function DetailPerson() {
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

  useEffect(() => {
    dispatch(getDetailPerson({ id: id, language: i18n.language }));
    dispatch(getExternalPerson({ id: id, language: i18n.language }));
    dispatch(getCombinedPerson({ id: id, language: i18n.language }));
  }, [id, i18n.language]);

  //Данные Актёра
  const requestDetailPerson = useSelector(
    (state) => state.detailsPerson.results
  );
  // Данные соцсетей
  const requestExternal = useSelector(
    (state) => state.detailsPerson.resultsExt
  );
  //Фильмы актёра
  const requestCombined = useSelector(
    (state) => state.detailsPerson.resultsComb || []
  );
  const firstCombidenContent = Array.isArray(requestCombined.cast)
    ? requestCombined.cast.slice(0, 5)
    : [];
  console.log("\x1b[34m\x1b[3m%s\x1b[0m", "Combined", firstCombidenContent);

  const loading = useSelector((state) => state.detailsPerson.loading);

  return (
    <main>
      {!loading ? (
        <div className="content">
          {requestDetailPerson && (
            <>
              <div className="actor">
                <img
                  src={
                    "https://image.tmdb.org/t/p/original/" +
                    requestDetailPerson.profile_path
                  }
                  alt="none image"
                />
                <div className="actor-description">
                  <span className="actor-description-name">
                    Имя актёра: {requestDetailPerson.name}
                  </span>
                  <span className="actor-description-born">
                    Дата рождения: {requestDetailPerson.birthday}
                  </span>
                  <span className="actor-description-location">
                    Место рождения: {requestDetailPerson.place_of_birth}
                  </span>
                  <span className="actor-description-fame">
                    Роль в фильме: __________________
                  </span>
                  <span className="actor-description-known">
                    Так же исвестна: {requestDetailPerson.also_known_as}
                  </span>
                  <span className="actor-description-social">
                    Социальные сети:
                  </span>
                </div>
              </div>
              <div className="biography">
                <h2>Биография</h2>
                <p>
                  {requestDetailPerson.biography
                    ? requestDetailPerson.biography
                    : "Биография отсутствует"}
                </p>
              </div>
              <div className="filmography">
                <h2>Фильмография</h2>
                <div className="filmography-list">
                  {firstCombidenContent && firstCombidenContent.length > 0 ? (
                    firstCombidenContent.map((item, index) => (
                      <div className="cart-cinema" key={`${item.id}-${index}`}>
                        <img
                          src={
                            "https://image.tmdb.org/t/p/original/" +
                            item.poster_path
                          }
                          alt={item.name}
                        />
                        <div className="descript-similar-content">
                          <span>Дата выхода: {item.release_date}</span>
                          <span>Название: {item.title}</span>
                          <NavLink
                            to={`/detailsFilm/${item.id}`}
                            key={`${item.id}-${index}`}
                          >
                            <span>{t("moreDetailed")}: </span>
                          </NavLink>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>Загрузка...</p>
                  )}

                  <button onClick={openPopWindow}>{t("more")}</button>
                  {isOpen && (
                    <section className="filmography-list-more">
                      <div className="filmography-title">
                        <h2>Фильмография</h2>
                        <button onClick={closePopWindow}>+</button>
                      </div>

                      <div className="filmography-list-more-movie">
                        {requestCombined.cast &&
                        requestCombined.cast.length > 0 ? (
                          requestCombined.cast.map((item, index) => (
                            <div
                              className="cart-movie"
                              key={`${item.id}-${index}`}
                            >
                              <img
                                src={
                                  "https://image.tmdb.org/t/p/original/" +
                                  item.poster_path
                                }
                                alt="none image"
                              />
                              <div className="rank">
                                {item.vote_average.toFixed(1)}
                              </div>

                              <div className="description">
                                <span>Название: {item.title}</span>
                                <span>Дата выхода: {item.release_date}</span>
                                <span key={`${item.id}-${index}`}>
                                  Роль: {item.character}
                                </span>
                                <NavLink to={`/detailsFilm/${item.id}`} key={item.id}>
                                  <span>Подробнее: </span>
                                </NavLink>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p> Загрузка ... </p>
                        )}
                      </div>
                    </section>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <p>Загрузка ...</p>
      )}
    </main>
  );
}
