import { Outlet, Navigate, useNavigate } from 'react-router-dom'
import IconPokeball from "./IconPokeball"
import { useSelector } from 'react-redux/es/hooks/useSelector'
import Logo from '../images/logo.png'
import { useDispatch } from 'react-redux'
import { setTrainerName } from '../store/slices/trainerName.slice'

const Layout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const trainerName = useSelector(state => state.trainerName)

    const goToLogout = () => {
        dispatch(setTrainerName(''))
    }

    const goToPokedex = () => {
        navigate('/pokedex')
    }

  return (
    <>
        <>
            {trainerName === '' ? <Navigate to={'/'}/> : null }
        </>
        <header className="header">
            <section className="header__redBlock">
                <figure onClick={goToPokedex} className="header__image">
                    <img src={Logo} alt="Pokedex logo" />
                </figure>
            </section>
            <section className="header__blackBlock">
                <button onClick={goToLogout} className='button__logout'>
                    <i className='bx bx-log-out'></i>
                </button>
                <IconPokeball pokeballLayout={'pokeballLayout'}/>
            </section>
        </header>
        <Outlet />
    </>
  )
}

export default Layout