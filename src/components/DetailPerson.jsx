import { NavLink, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//import slices
import {
  getDetailPerson,
  getExternalPerson,
  getCombinedPerson,
} from "../store/slices/detailsPerson";

//import selectors
import {
  selectDetailActor,
  selectDetailExternal,
  selectCombinedCinema,
} from "../helpers/selectors";

import { getCreditsPerson } from "../store/slices/detailsCinema";

//import images
import FilmRoll from "src/assets/images/filmRoll.png";

// Styles
import "src/assets/styles/components/DetailPerson.scss";

export default function DetailPerson() {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetailPerson({ id: id, language: i18n.language }));
    dispatch(getExternalPerson({ id: id, language: i18n.language }));
    dispatch(getCombinedPerson({ id: id, language: i18n.language }));
    dispatch(getCreditsPerson({ id: id, language: i18n.language }));
  }, [id, i18n.language]);

  // Использование мемоизированных селекторов
  const requestDetailPerson = useSelector(selectDetailActor);
  const requestExternal = useSelector(selectDetailExternal);
  const requestCombined = useSelector(selectCombinedCinema);

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
                    {t("nameActor")}: {requestDetailPerson.name}
                  </span>
                  <span className="actor-description-born">
                    {t("dateBirth")}: {requestDetailPerson.birthday}
                  </span>
                  <span className="actor-description-location">
                    {t("placeBirth")}: {requestDetailPerson.place_of_birth}
                  </span>

                  <span className="actor-description-fame">
                    {t("fameFor")}: {requestDetailPerson.known_for_department}
                  </span>
                  <span className="actor-description-known">
                    {t("alsoKnown")}: {requestDetailPerson.also_known_as}
                  </span>
                  <div className="actor-description-social">
                    {t("socialNetwork")} :{" "}
                    <span>
                      {requestExternal && requestExternal.instagram_id && (
                        <a
                          href={`https://www.instagram.com/${[
                            requestExternal.instagram_id,
                          ]}`}
                          target="_blank"
                        >
                          Instagram
                        </a>
                      )}
                    </span>
                    <span>
                      {requestExternal && requestExternal.facebook_id && (
                        <a
                          href={`https://www.facebook.com/${[
                            requestExternal.facebook_id,
                          ]}`}
                          target="_blank"
                        >
                          facebook
                        </a>
                      )}
                    </span>
                    <span>
                      {requestExternal && requestExternal.tiktok_id && (
                        <a
                          href={`https://www.tiktok.com/${[
                            requestExternal.tiktok_id,
                          ]}`}
                          target="_blank"
                        >
                          tiktok
                        </a>
                      )}
                    </span>
                    <span>
                      {requestExternal && requestExternal.tvrage_id && (
                        <a
                          href={`https://www.tvrage.com/${[
                            requestExternal.tvrage_id,
                          ]}`}
                          target="_blank"
                        >
                          tvrage
                        </a>
                      )}
                    </span>
                    <span>
                      {requestExternal && requestExternal.twitter_id && (
                        <a
                          href={`https://x.com/${[requestExternal.twitter_id]}`}
                          target="_blank"
                        >
                          twitter
                        </a>
                      )}
                    </span>
                    <span>
                      {requestExternal && requestExternal.wikidata_id && (
                        <a
                          href={`https://www.wikidata.org/${[
                            requestExternal.wikidata_id,
                          ]}`}
                          target="_blank"
                        >
                          wikidata
                        </a>
                      )}
                    </span>
                    <span>
                      {requestExternal && requestExternal.youtube_id && (
                        <a
                          href={`https://www.youtube.com/${[
                            requestExternal.youtube_id,
                          ]}`}
                          target="_blank"
                        >
                          youtube
                        </a>
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <div className="biography">
                <h2>{t("biography")}</h2>
                <p>
                  {requestDetailPerson.biography
                    ? requestDetailPerson.biography
                    : "Биография отсутствует"}
                </p>
              </div>
              <div className="filmography">
                <h2>{t("filmography")}</h2>
                <div className="filmography-list">
                  {(requestCombined.cast?.length ||
                    requestCombined.crew?.length) > 0 ? (
                    (requestCombined.cast || requestCombined.crew)
                      .slice(0, 5)
                      .map((item, index) => (
                        <div
                          className="cart-cinema"
                          key={`${item.id}-${index}`}
                        >
                          <img
                            src={`https://image.tmdb.org/t/p/original/${
                              item.media_type === "person"
                                ? item.profile_path
                                : item.poster_path
                            }`}
                            alt={item.title || item.name}
                          />
                          <div className="descript-similar-content">
                            {(item.release_date || item.first_air_date) && (
                              <span>
                                {t("dataRelease")}:{" "}
                                {item.release_date || item.first_air_date}
                              </span>
                            )}
                            <span>
                              {t("title")}: {item.title || item.name}
                            </span>
                            <NavLink
                              to={
                                item.media_type === "movie"
                                  ? `/detailsFilm/${item.id}`
                                  : item.media_type === "tv"
                                  ? `/detailsSerial/${item.id}`
                                  : "#"
                              }
                              key={`${item.id}-${index}`}
                            >
                              <span>{t("moreDetailed")}: </span>
                            </NavLink>
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className="loading">
                      <img src={FilmRoll} alt="" />
                      <span>{t("loading")} ...</span>
                    </div>
                  )}
                  <button
                    onClick={() => {
                      setIsOpen(true);
                    }}
                  >
                    {t("more")}
                  </button>
                  {isOpen && (
                    <section className="filmography-list-more">
                      <div className="filmography-title">
                        <h2>{t("filmography")}</h2>
                        <button
                          onClick={() => {
                            setIsOpen(false);
                          }}
                        >
                          +
                        </button>
                      </div>
                      <div className="filmography-list-more-movie">
                        {(requestCombined.cast?.length ||
                          requestCombined.crew?.length) > 0 ? (
                          (requestCombined.cast || requestCombined.crew).map(
                            (item, index) => (
                              <div
                                className="cart-movie"
                                key={`${item.id}-${index}`}
                              >
                                <img
                                  src={`https://image.tmdb.org/t/p/original/${
                                    item.media_type === "person"
                                      ? item.profile_path
                                      : item.poster_path
                                  }`}
                                  alt={item.title || item.name}
                                />
                                <div className="rank">
                                  {item?.vote_average?.toFixed(1)}
                                </div>

                                <div className="description">
                                  <span>
                                    {t("title")}: {item.title || item.name}
                                  </span>
                                  {(item.release_date ||
                                    item.first_air_date) && (
                                    <span>
                                      {t("dataRelease")}:{" "}
                                      {item.release_date || item.first_air_date}
                                    </span>
                                  )}
                                  <span key={`${item.id}-${index}`}>
                                    {t("role")}: {item.character}
                                  </span>
                                  <NavLink
                                    to={
                                      item.media_type === "movie"
                                        ? `/detailsFilm/${item.id}`
                                        : item.media_type === "tv"
                                        ? `/detailsSerial/${item.id}`
                                        : "#"
                                    }
                                    key={`${item.id}-${index}`}
                                  >
                                    <span>{t("moreDetailed")}: </span>
                                  </NavLink>
                                </div>
                              </div>
                            )
                          )
                        ) : (
                          <p>
                            <div className="loading">
                              <img src={FilmRoll} alt="" />
                              <span>{t("loading")} ...</span>
                            </div>
                          </p>
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
        <div className="loading">
          <img src={FilmRoll} alt="" />
          <span>{t("loading")} ...</span>
        </div>
      )}
    </main>
  );
}
