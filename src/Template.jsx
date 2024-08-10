import { Outlet } from "react-router-dom";
import Footer from "./components/App/Footer";
import Header from "./components/App/Header";
import ScrollToTop from "./helpers/scrollToTop";

export default function Template() {
  return (
    <>
      <Header />
      <ScrollToTop />
      <Outlet />
      <Footer />
    </>
  );
}
