import { Outlet, Navigate } from 'react-router-dom'
import IconPokeball from "./IconPokeball"
import { useSelector } from 'react-redux/es/hooks/useSelector'

const Layout = () => {
    const trainerName = useSelector(state => state.trainerName)


  return (
    <>
        <>
            {trainerName === '' ? <Navigate to={'/'}/> : null }
        </>
        <header className="header">
            <section className="header__redBlock">
                <figure className="header__image">
                    <img src="./src/images/logo.png" alt="Pokedex logo" />
                </figure>
            </section>
            <section className="header__blackBlock">
                <IconPokeball pokeballLayout={'pokeballLayout'}/>
            </section>
        </header>
        <Outlet />
    </>
  )
}

export default Layout