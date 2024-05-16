import { useTranslation } from "react-i18next";
import { useState } from "react";
import { NavLink } from "react-router-dom";

// import styles
import "src/assets/styles/pages/DetailsFilm.scss";

export default function DetailsFilm() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <main>
      <div className="content">
        <div className="content-detail">
          <div className="content-detail-photo">
            <div className="content-detail-photo-cinema">Обложка фильма</div>
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
            <h1>Название фильма</h1>
            <h2>Название на английском</h2>
            <ul>
              <li>
                <span></span>
              </li>
              <li>
                <span></span>
              </li>
              <li>
                <span></span>
              </li>
              <li>
                <span></span>
              </li>
              <li>
                <span></span>
              </li>
              <li>
                <span></span>
              </li>
              <li>
                <span></span>
              </li>
              <li>
                <span></span>
              </li>
            </ul>
          </div>
        </div>
        <div className="content-description">
          <h2>Описание фильма</h2>
          <p></p>
        </div>
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
            <NavLink to="/cartActor">
              <div>Актёр</div>
            </NavLink>
            <NavLink to="/cartActor">
              <div>Актёр</div>
            </NavLink>
            <NavLink to="/cartActor">
              <div>Актёр</div>
            </NavLink>
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
                    <div>Данные актёра</div>
                    <div>Данные актёра</div>
                    <div>Данные актёра</div>
                    <div>Данные актёра</div>
                    <div>Данные актёра</div>
                    <div>Данные актёра</div>
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
            <NavLink to="/detailsFilm">
              <div>Кинокартины</div>
            </NavLink>
            <NavLink to="/detailsFilm">
              <div>Кинокартины</div>
            </NavLink>
            <NavLink to="/detailsFilm">
              <div>Кинокартины</div>
            </NavLink>
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
    </main>
  );
}
