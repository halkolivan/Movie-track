import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

// Styles
import 'src/assets/styles/components/CartActor.scss'

export default function CartActor() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const openPopWindow = () => {
    setIsOpen(true)
  }
  const closePopWindow = () => {
    setIsOpen(false)
  }

  return (
    <main>
      <div className='content'>
        <div className='actor'>
          <img
            src=''
            alt='none image'
          />
          <div className='actor-description'>
            <div className='actor-description-name'>Имя актёра</div>
            <div className='actor-description-born'>Дата рождения</div>
            <div className='actor-description-location'>Место рождения</div>
            <div className='actor-description-fame'>Роль в фильме</div>
            <div className='actor-description-known'>Так же исвестна</div>
            <div className='actor-description-social'>Социальные сети</div>
          </div>
        </div>
        <div className='biography'>
          <h2>Биография</h2>
          <p>Биография актёра</p>
        </div>
        <div className='filmography'>
          <h2>Фильмография</h2>
          <div className='filmography-list'>
            <NavLink to='/detailsFilm'>
              <div>Фильм с участием актёра</div>
            </NavLink>
            <NavLink to='/detailsFilm'>
              <div>Фильм с участием актёра</div>
            </NavLink>
            <NavLink to='/detailsFilm'>
              <div>Фильм с участием актёра</div>
            </NavLink>
            <NavLink to='/detailsFilm'>
              <div>Фильм с участием актёра</div>
            </NavLink>
            <NavLink to='/detailsFilm'>
              <div>Фильм с участием актёра</div>
            </NavLink>
            <button onClick={openPopWindow}>{t('fullList')}</button>
            {isOpen && (
              <section className='filmography-list-more'>
                <div className='filmography-title'>
                  <h2>Фильмография</h2>
                  <button onClick={closePopWindow}>+</button>
                </div>
                <div className='filmography-list-more-films'>
                  <div className='films-box-carts-column'>
                    <div>
                      <div className='rank'></div>
                    </div>
                    <div>
                      <div className='rank'></div>
                    </div>
                    <div>
                      <div className='rank'></div>
                    </div>
                    <div>
                      <div className='rank'></div>
                    </div>
                    <div>
                      <div className='rank'></div>
                    </div>
                  </div>
                  <div className='films-box-carts-column'>
                    <div>
                      <div className='rank'></div>
                    </div>
                    <div>
                      <div className='rank'></div>
                    </div>
                    <div>
                      <div className='rank'></div>
                    </div>
                    <div>
                      <div className='rank'></div>
                    </div>
                    <div>
                      <div className='rank'></div>
                    </div>
                  </div>
                  <div className='films-box-carts-column'>
                    <div>
                      <div className='rank'></div>
                    </div>
                    <div>
                      <div className='rank'></div>
                    </div>
                    <div>
                      <div className='rank'></div>
                    </div>
                    <div>
                      <div className='rank'></div>
                    </div>
                    <div>
                      <div className='rank'></div>
                    </div>
                  </div>
                  <div className='films-box-carts-column'>
                    <div>
                      <div className='rank'></div>
                    </div>
                    <div>
                      <div className='rank'></div>
                    </div>
                    <div>
                      <div className='rank'></div>
                    </div>
                    <div>
                      <div className='rank'></div>
                    </div>
                    <div>
                      <div className='rank'></div>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
