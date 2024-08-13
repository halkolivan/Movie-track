//Import components
import "./i18n";
import Template from "./Template";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";

//Import pages

const Home = React.lazy(() => import("./pages/Home"));
const Error = React.lazy(() => import("./pages/Error"));
const DetailsFilm = React.lazy(() => import("./components/DetailsFilm"));
const DetailPerson = React.lazy(() => import("./components/DetailPerson"));
const DetailsSerial = React.lazy(() => import("./components/DetailsSerial"));
const WarningLists = React.lazy(() => import("./components/WarningLists"));
const PopularFilmsPages = React.lazy(() => import("./pages/PopularFilmsPages"));
const PopularSerialPages = React.lazy(() =>
  import("./pages/PopularSerialPages")
);

export default function Router() {
  const {t} = useTranslation()
  const routing = createBrowserRouter([
    {
      path: "/",
      element: <Template />,
      children: [
        {
          path: "/",
          element: (
            <Suspense fallback={<div>{t('loading')}...</div>}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "/warningLists",
          element: (
            <Suspense fallback={<div>{t('loading')}...</div>}>
              <WarningLists />
            </Suspense>
          ),
        },
        {
          path: "/detailsFilm/:id",
          element: (
            <Suspense fallback={<div>{t('loading')}...</div>}>
              <DetailsFilm />
            </Suspense>
          ),
        },
        {
          path: "/detailsSerial/:id",
          element: (
            <Suspense fallback={<div>{t('loading')}...</div>}>
              <DetailsSerial />
            </Suspense>
          ),
        },
        {
          path: "/detailPerson/:id",
          element: (
            <Suspense fallback={<div>{t('loading')}...</div>}>
              <DetailPerson />
            </Suspense>
          ),
        },
        {
          path: "/popularFilmsPages",
          element: (
            <Suspense fallback={<div>{t('loading')}...</div>}>
              <PopularFilmsPages />
            </Suspense>
          ),
        },
        {
          path: "/popularSerialPages",
          element: (
            <Suspense fallback={<div>{t('loading')}...</div>}>
              <PopularSerialPages />
            </Suspense>
          ),
        },
        {
          path: "*",
          element: (
            <Suspense fallback={<div>{t('loading')}...</div>}>
              <Error />
            </Suspense>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={routing} />;
}
