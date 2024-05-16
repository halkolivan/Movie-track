import { useTranslation } from "react-i18next";
import { useState } from "react";
//styles
import "src/assets/styles/components/WarningLists.scss";

export default function WarningLists() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const openPopWindow = () => {
    setIsOpen(true);
  };
  const closePopWindow = () => {
    setIsOpen(false);
  };
  return (
    <div className="main">
      <div className="main-content">
        <span>
          <button onClick={openPopWindow}>{t('enter')} </button> {t('text')}
        </span>
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
  );
}
