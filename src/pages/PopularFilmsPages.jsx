import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

//import style
import "src/assets/styles/pages/PopularFilmsPages.scss";

export default function PopularFilmsPages() {
  return (
    <div className="main-content">
      <div className="films-page">
        Страница с фильмами
        {/* <div className="films-list">
          <div className="films-list-image"></div>
          <div className="films-list-descript"></div>
        </div> */}
      </div>
      <div className="page-numbers">Нумерация страниц</div>
    </div>
  );
}
