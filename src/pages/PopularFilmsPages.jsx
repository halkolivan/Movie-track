import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getFilmsPopular } from "../store/slices/home";
import { useSelector, useDispatch } from "react-redux";

//import style
import "src/assets/styles/pages/PopularFilmsPages.scss";

export default function PopularFilmsPages() {
  const requestPopularFilms = useSelector((state) => state.home.results);
  const loading = useSelector((state) => state.home.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFilmsPopular());
  }, []);

  return (
    <div className="main-content">
      <div className="films-page">
        {!loading ? (
          <div className="films-page-content">
            {requestPopularFilms ? (
              requestPopularFilms.map((item) => (
                <NavLink to={`/detailsFilm/${item.id}`} key={item.id}>
                  <div className="films-list">
                    <div className="films-list-image">
                      <img
                        src={
                          "https://image.tmdb.org/t/p/original/" +
                          item.poster_path
                        }
                        alt=""
                      />
                    </div>
                    <div className="films-list-descript">{item.overview}</div>
                  </div>
                </NavLink>
              ))
            ) : (
              <p>запрос отсутствует ...</p>
            )}
          </div>
        ) : (
          <p>данные не загружены</p>
        )}
      </div>
      <div className="page-numbers">Нумерация страниц</div>
    </div>
  );
}
