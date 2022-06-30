import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux/es/exports"
import IconPokeball from "./IconPokeball"
import { setTrainerName } from "../store/slices/trainerName.slice"

const Login = () => {

    const [error, setError] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSubmit = e => {
        e.preventDefault()
        const inputText = e.target.childNodes[0].value
        if(inputText === ''){
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 2000)
        }else{
            dispatch(setTrainerName(inputText))
            navigate('/pokedex')
        }
    }

  return (
    <main className="login">
        <section className="login__body">
            <figure className="login__image">
                <img src="./src/images/logo.png" alt="Pokedex logo" />
            </figure>
            <h2 className="login__tittle">Hello Trainer!</h2>
            <p className="login__paragraph">Give me your name to start this adventure!</p>
            <form className="login__form" onSubmit={handleSubmit}>
                <input type="text" placeholder="Trainer Name..."/>
                <input type="submit" value="Start" />
            </form>
            {error && <p className="error">Enter at least one character</p>}
        </section>
        <section className="login__footer">
            <div className="footer__redBlock"></div>
            <div className="footer__blackBlock"></div>
            <IconPokeball pokeballLayout={''}/>
        </section>
    </main>
  )
}

export default Login