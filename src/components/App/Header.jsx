//Import components
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";

//Import styles
import "src/assets/styles/app/header.scss";

export default function Header() {
  const { t, i18n } = useTranslation();
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header>
      <div className="components-menu">
        <div className="left-side">
          <NavLink to="/">
            <span>Movie Tracker</span>
          </NavLink>
          <div className="languages">
            <span onClick={() => changeLanguage("ru")}>Ru</span>
            <span onClick={() => changeLanguage("en")}>En</span>
          </div>
        </div>

        <div className="right-side">
          <NavLink to="/">
            <span>{t("search")}</span>
          </NavLink>
          <NavLink to="/warningLists">
            <span>{t("myLists")}</span>
          </NavLink>
          <button
            onClick={() => {
              setIsOpen(true);
            }}
          >
            {t("enter")}
          </button>
          {isOpen && (
            <div className="overlay">
              <div className="enter-box" tabIndex="0">
                <div className="enter-box-nav">
                  <span>{t("enter")}</span>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    +
                  </button>
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
      </div>
    </header>
  );
}
