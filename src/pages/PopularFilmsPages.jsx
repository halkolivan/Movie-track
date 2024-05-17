import { useEffect, useState } from "react";
import { getFilmsPopular } from "../store/slices/home";
import { useSelector, useDispatch } from "react-redux";

//import style
import "src/assets/styles/pages/PopularFilmsPages.scss";

export default function PopularFilmsPages() {
  
  const requestPopularFilms = useSelector((state) => state.home.results);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getFilmsPopular())
  },[])
  
  console.log(requestPopularFilms);
  return (
    <div className="main-content">
      <div className="films-page">
        {requestPopularFilms ? (
          <div className="films-list">
            <div className="films-list-image"></div>
            <div className="films-list-descript"></div>
          </div>
        ) : (
          <p>Нет загрузки</p>
        )}
      </div>
      <div className="page-numbers">Нумерация страниц</div>
    </div>
  );
}
