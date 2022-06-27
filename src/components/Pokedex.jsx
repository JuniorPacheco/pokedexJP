import axios from "axios"
import { useEffect, useState } from "react"
import PokeCard from "./PokeCard"

const Pokedex = () => {
    const [pokemons, setPokemons] = useState([])

    useEffect(() => {
        const url = 'https://pokeapi.co/api/v2/pokemon/?limit=20&offset=20'
        axios.get(url)
        .then(res => {
            setPokemons(res.data.results)
            console.log(res.data)
        })
        .catch(err => console.log(err))
    }, [])

  return (
    <main className="pokedex">
        <section className="pokedex__header">
            <p className="pokedex__text"><span>Welcome Name, </span>find your favorite pokemón</p>
            <form className="pokedex__form">
                <article className="pokedex__searcher">
                    <input type="text" placeholder="Search your pokemón..."/>
                    <input type="submit" value="Search" />
                </article>
                <article className="pokedex__filter">
                    <select>
                        <option value="">All Pokemons</option>
                        <option value="normal">Normal</option>
                        <option value="fighting">Fighting</option>
                        <option value="flying">Flying</option>
                        <option value="poison">Poison</option>
                        <option value="ground">Ground</option>
                        <option value="rock">Rock</option>
                        <option value="bug">Bug</option>
                        <option value="ghost">Ghost</option>
                        <option value="steel">Steel</option>
                        <option value="fire">Fire</option>
                        <option value="water">Water</option>
                        <option value="grass">Grass</option>
                        <option value="electric">Electric</option>
                        <option value="psychic">Psychic</option>
                        <option value="ice">Ice</option>
                        <option value="dragon">Dragon</option>
                        <option value="dark">Dark</option>
                        <option value="fairy">Fairy</option>
                        <option value="unknown">Unknown</option>
                        <option value="shadow">Shadow</option>
                    </select>
                </article>
            </form>
        </section>
        <section className="pokedex__body">
            {
                pokemons?.map(pokemon => <PokeCard key={pokemon.name} urlPokemon={pokemon?.url}/>)
            }
        </section>
    </main>
  )
}

export default Pokedex