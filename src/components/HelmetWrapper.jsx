import { Helmet } from "react-helmet";

const HelmetWrapper = ({ children }) => (
  <>
    <Helmet>
      <link rel="icon" href="public/icon-movie.png" />
    </Helmet>
    {children}
  </>
);
export default HelmetWrapper;
