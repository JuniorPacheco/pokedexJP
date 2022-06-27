import IconPokeball from "./IconPokeball"

const Login = () => {
  return (
    <main className="login">
        <section className="login__body">
            <figure className="login__image">
                <img src="./src/images/logo.png" alt="Pokedex logo" />
            </figure>
            <h2 className="login__tittle">Hello Trainer!</h2>
            <p className="login__paragraph">Give me your name to start this adventure!</p>
            <form className="login__form">
                <input type="text" placeholder="Trainer Name..."/>
                <input type="submit" value="Start" />
            </form>
        </section>
        <section className="login__footer">
            <IconPokeball pokeballLayout={''}/>
        </section>
    </main>
  )
}

export default Login