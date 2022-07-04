import axios from "axios"
import { useEffect, useState } from "react"
import Pagination from "./Pagination"
import PokeCard from "./PokeCard"
import { useSelector } from "react-redux/es/hooks/useSelector"
import { renderPokemonsByName } from "../helpers/pokemonsByName"
import { paginationLogic } from "../helpers/paginationLogic"

const Pokedex = () => {
    const [pokemons, setPokemons] = useState([])
    const [filterName, setFilterName] = useState('')
    const [filterType, setFilterType] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const trainerName = useSelector(state => state.trainerName)
    const [types, setTypes] = useState([])

    useEffect(() => {
        const url = `https://pokeapi.co/api/v2/${filterType ? `type/${filterType}/` : 'pokemon/?limit=1154' }`
        axios.get(url)
        .then(res => {
            if(filterType) {
                const dataPokemonsSend = res.data.pokemon.map(pokemon => {
                    return {name: pokemon.pokemon.name, url: pokemon.pokemon.url}
                })
                setPokemons(dataPokemonsSend)
            }else {
                setPokemons(res.data.results)
            }
        })
        .catch(err => console.log(err))
    }, [filterType])

    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/type/')
        .then(res => setTypes(res.data.results))
        .catch(err => console.log(err))
    }, [])

    const handleFilterName = e => {
        setCurrentPage(1)
        setFilterName(e.target.value)
    }

    const handleFilterType = e => {
        setFilterName('')
        setCurrentPage(1)
        setFilterType(e.target.value)
    }

    const { arrayPokemons, lastPage, pagesInBlock } = paginationLogic(renderPokemonsByName, filterName, pokemons, currentPage)

  return (
    <main className="pokedex">
        <section className="pokedex__header">
            <p className="pokedex__text"><span>Welcome {trainerName}, </span>find your favorite pokemón</p>
            <form className="pokedex__form">
                <article className="pokedex__searcher">
                    <input type="text" placeholder="Search your pokemón..." value={filterName} onChange={handleFilterName}/>
                </article>
                <article className="pokedex__filter">
                    <select onChange={handleFilterType}>
                        <option value="">All Pokemons</option>
                        {
                            types.map(type => <option key={type.name} value={type.name}>{type.name}</option>)
                        }
                    </select>
                </article>
            </form>
        </section>
        <Pagination 
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            lastPage={lastPage}
            pagesInBlock={pagesInBlock}
        />
        <section className="pokedex__body">
            {
                arrayPokemons.map(pokemon => {
                    return <PokeCard 
                        key={pokemon?.name} 
                        urlPokemon={pokemon?.url}    
                    />
                })
            }
        </section>
        <Pagination 
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            lastPage={lastPage}
            pagesInBlock={pagesInBlock}
        />
    </main>
  )
}

export default Pokedex