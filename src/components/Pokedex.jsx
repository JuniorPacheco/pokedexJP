import axios from "axios"
import { useEffect, useState } from "react"
import PokeCard from "./PokeCard"

const Pokedex = () => {
    const [pokemons, setPokemons] = useState([])
    const [filterName, setFilterName] = useState('')
    const [filterType, setFilterType] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        const url = `https://pokeapi.co/api/v2/${filterType ? `type/${filterType}/` : 'pokemon/?limit=20' }`
        axios.get(url)
        .then(res => {
            filterType ? setPokemons(res.data.pokemon) : setPokemons(res.data.results)
            console.log(res.data)
        })
        .catch(err => console.log(err))
    }, [filterType])

    const handleFilterName = e => setFilterName(e.target.value)

    const handleFilterType = e => setFilterType(e.target.value)

    const renderPokemonsByName = (pokemonName, pokemons) => {
        return pokemons?.map(pokemon => {
            if(pokemonName === '') {
                return (<PokeCard 
                    key={filterType ? pokemon?.pokemon?.name : pokemon?.name} 
                    urlPokemon={filterType ? pokemon?.pokemon?.url : pokemon?.url}
                />)
            }else if(filterType === ''){
                if(pokemon?.name.includes(pokemonName)) {
                    return (<PokeCard 
                        key={pokemon?.name} 
                        urlPokemon={pokemon?.url}
                    />)
                }
            }else{
                if(pokemon?.pokemon?.name.includes(pokemonName)) {
                    return (<PokeCard 
                        key={pokemon?.pokemon?.name} 
                        urlPokemon={pokemon?.pokemon?.url}
                    />)
                }
            }
        })
    }

    let arrayPokemons = []
    const pokemonsPerPage = 6
    arrayPokemons =  pokemons.slice((currentPage - 1) * pokemonsPerPage, currentPage * pokemonsPerPage)

    let arrayPages = []
    const quantityPages = Math.ceil( pokemons.length / pokemonsPerPage )
    for(let i = 1; i <= quantityPages; i++){
        arrayPages.push(i)
    }

    let pagesInBlock = []
    const pagesPerBlock = 5
    let comprobation = true
    for(let actualBlock = 1; comprobation ; actualBlock++){
        const lastPageInBlock = pagesPerBlock * actualBlock
        const firstPageInBlock = lastPageInBlock - (pagesPerBlock - 1)
        if(currentPage >= firstPageInBlock && currentPage <= lastPageInBlock) {
            comprobation = false
            for(let i = firstPageInBlock; i <= lastPageInBlock && i <= arrayPages[arrayPages.length - 1]; i++){
                pagesInBlock.push(i)
            }
        }
    }
    console.log(pagesInBlock)

  return (
    <main className="pokedex">
        <section className="pokedex__header">
            <p className="pokedex__text"><span>Welcome Name, </span>find your favorite pokemón</p>
            <form className="pokedex__form">
                <article className="pokedex__searcher">
                    <input type="text" placeholder="Search your pokemón..." onChange={handleFilterName}/>
                    <input type="submit" value="Search" />
                </article>
                <article className="pokedex__filter">
                    <select onChange={handleFilterType}>
                        <option value="">All Pokemons</option>
                        <option value="1">Normal</option>
                        <option value="2">Fighting</option>
                        <option value="3">Flying</option>
                        <option value="4">Poison</option>
                        <option value="5">Ground</option>
                        <option value="6">Rock</option>
                        <option value="7">Bug</option>
                        <option value="8">Ghost</option>
                        <option value="9">Steel</option>
                        <option value="10">Fire</option>
                        <option value="11">Water</option>
                        <option value="12">Grass</option>
                        <option value="13">Electric</option>
                        <option value="14">Psychic</option>
                        <option value="15">Ice</option>
                        <option value="16">Dragon</option>
                        <option value="17">Dark</option>
                        <option value="18">Fairy</option>
                        <option value="10001">Unknown</option>
                        <option value="10002">Shadow</option>
                    </select>
                </article>
            </form>
        </section>
        <section className="pokedex__body">
            {
                renderPokemonsByName(filterName, pokemons)
            }
        </section>
    </main>
  )
}

export default Pokedex