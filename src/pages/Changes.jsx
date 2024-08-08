// Style
import "src/assets/styles/pages/Changes.scss";

export default function Changes() {
  return (
    <section>
      <h1>Фильмы и сериалы подвергшиеся изменениям за последние 24 часа.</h1>
      <div className="changes-films"></div>
      <div className="changes-serials"></div>
    </section>
  );
}
