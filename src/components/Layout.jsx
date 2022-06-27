import { Outlet } from 'react-router-dom'
import IconPokeball from "./IconPokeball"

const Layout = () => {
  return (
    <>
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