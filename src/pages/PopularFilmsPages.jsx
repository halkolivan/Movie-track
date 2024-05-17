import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getFilmsPopular } from '../store/slices/home'
import { useSelector, useDispatch } from 'react-redux'

//import style
import 'src/assets/styles/pages/PopularFilmsPages.scss'

export default function PopularFilmsPages() {
  //Initialization variables
  const dispatch = useDispatch()
  const { t, i18n } = useTranslation()

  //Initialization state manager

  const [page, setPage] = useState(1)
  const loading = useSelector(state => state.home.loading)
  const requestPopularFilms = useSelector(state => state.home.results)

  //Function for request popular films
  useEffect(() => {
    dispatch(
      getFilmsPopular({
        page: page,
        language: 'ru-RU',
      })
    )
  }, [page])

  return (
    <div className='main-content'>
      <button
        onClick={() =>
          setPage(old => {
            if (old > 1) {
              return old - 1
            } else {
              return old
            }
          })
        }>
        -
      </button>
      <button onClick={() => setPage(old => old + 1)}>+</button>
      <div className='films-page'>
        {!loading ? (
          <div className='films-page-content'>
            {requestPopularFilms ? (
              requestPopularFilms.map(item => (
                <NavLink
                  to={`/detailsFilm/${item.id}`}
                  key={item.id}>
                  <div className='films-list'>
                    <div className='films-list-image'>
                      <img
                        src={
                          'https://image.tmdb.org/t/p/original/' +
                          item.poster_path
                        }
                        alt=''
                      />
                    </div>
                    <div className='films-list-descript'>{item.overview}</div>
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
      <div className='page-numbers'>Нумерация страниц</div>
    </div>
  )
}
