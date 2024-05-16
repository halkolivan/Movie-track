//Import components
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";

// Import images

//Import styles
import "src/assets/styles/app/header.scss";

// Функция для придания Header свойства position: sticky
export default function Header({ style, ...props }) {
  const headerStyle = {
    display: "flex",
    position: "sticky",
    top: 0,
    
    ...style 
  };
  const { t, i18n } = useTranslation();
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  const [isOpen, setIsOpen] = useState(false);
  const openPopWindow = () => {
    setIsOpen(true);
  };
  const closePopWindow = () => {
    setIsOpen(false);
  };

  return (
    <header style={headerStyle} {...props}>
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
          <span>{t("search")}</span>
          <NavLink to="/warningLists">
            <span>{t("myLists")}</span>
          </NavLink>
          <button onClick={openPopWindow}>{t("enter")}</button>
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
      </div>
    </header>
  );
}
