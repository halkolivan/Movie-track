import React from "react";

//import styles
import "src/assets/styles/app/footer.scss";

//import image

export default function Footer() {
  return (
    <div className="footer">
      <ul>
        <li>
          Created by: <span>Roman Tomayli</span>
        </li>
        <li>
          GitHub:{" "}
          <a href="https://github.com/halkolivan" target="_blank">
            halkolivan
          </a>
        </li>
        <li>
          Telegram:{" "}
          <a href="https://t.me/tomayli80" target="_blank">
            @tomayli80
          </a>
        </li>
        <li>
          Email:{" "}
          <a href="mailto:gemdtera@gmail.com" target="_blank">
            gemdtera@gmail.com
          </a>
        </li>
        <li>
          Film data from:{" "}
          <a href="https://www.themoviedb.org/" target="_blank">
            TMDb
          </a>
        </li>
      </ul>
    </div>
  );
}
