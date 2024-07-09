import { createSelector } from "reselect";

const selectDetailMovie = (state) => state.detailMovie;

//////////////////// Ресурсы сериалов ////////////////////////////
export const selectDetailSerial = createSelector(
  [selectDetailMovie],
  (detailMovie) => detailMovie.resultsDserial
);

export const selectTrailersDetailSerial = createSelector(
  [selectDetailMovie],
  (detailMovie) => detailMovie.resultsTrailerSerial
);

export const selectActorsSerial = createSelector(
  [selectDetailMovie],
  (detailMovie) => detailMovie.actorsSerial || []
);

export const selectCreatorsSerial = createSelector(
  [selectDetailMovie],
  (detailMovie) => detailMovie.creator || []
);

export const selectRecommendatSerial = createSelector(
  [selectDetailMovie],
  (detailMovie) => detailMovie.recommendatSerial || []
);

/////////////////////// Ресурсы  фильмов //////////////////////////
export const selectDetailFilm = createSelector(
  [selectDetailMovie],
  (detailMovie) => detailMovie.resultsDfilm
);

export const selectTrailersDetailFilm = createSelector(
  [selectDetailMovie],
  (detailMovie) => detailMovie.results
);

export const selectActorsFilm = createSelector(
  [selectDetailMovie],
  (detailMovie) => detailMovie.actors || []
);

export const selectRecommendatFilm = createSelector(
  [selectDetailMovie],
  (detailMovie) => detailMovie.recommendat || []
);

/////////////// Ресурсы актёров/съёмочной группы /////////////////
const selectDetailPeople = (state) => state.detailsPerson;

export const selectDetailActor = createSelector(
  [selectDetailPeople],
  (detailPeople) => detailPeople.results || []
);

export const selectDetailExternal = createSelector(
  [selectDetailPeople],
  (detailPeople) => detailPeople.resultsExt || []
);

export const selectCombinedCinema = createSelector(
  [selectDetailPeople],
  (detailPeople) => detailPeople.resultsComb || []
);

