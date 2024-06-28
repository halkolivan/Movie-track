//Import components
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Template from "./Template";
import "./i18n";

//Import pages
import Home from "./pages/Home";
import Error from "./pages/Error";
import WarningLists from "./components/WarningLists";
import DetailsFilm from "./components/DetailsFilm";
import DetailsSerial from "./components/DetailsSerial";
import DetailPerson from "./components/DetailPerson";
import PopularFilmsPages from "./pages/PopularFilmsPages";
import PopularSerialPages from "./pages/PopularSerialPages";

export default function Router() {
  const routing = createBrowserRouter([
    {
      path: "/",
      element: <Template />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/warningLists",
          element: <WarningLists />,
        },

        {
          path: "/detailsFilm/:id",
          element: <DetailsFilm />,
        },

        {
          path: "/detailsSerial/:id",
          element: <DetailsSerial />,
        },

        {
          path: "/detailPerson/:id",
          element: <DetailPerson />,
        },
        {
          path: "/popularFilmsPages",
          element: <PopularFilmsPages />,
        },
        {
          path: "/popularSerialPages",
          element: <PopularSerialPages />,
        },
        {
          path: "*",
          element: <Error />,
        },
      ],
    },
  ]);

  return <RouterProvider router={routing} />;
}
