import axios from "axios"
import { useEffect, useState } from "react"
import Pagination from "./Pagination"
import PokeCard from "./PokeCard"
import { useSelector } from "react-redux/es/hooks/useSelector"

const Pokedex = () => {
    const [pokemons, setPokemons] = useState([])
    const [filterName, setFilterName] = useState('')
    const [filterType, setFilterType] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const trainerName = useSelector(state => state.trainerName)

    useEffect(() => {
        const url = `https://pokeapi.co/api/v2/${filterType ? `type/${filterType}/` : 'pokemon/?limit=1154' }`
        axios.get(url)
        .then(res => {
            filterType ? setPokemons(res.data.pokemon) : setPokemons(res.data.results)
        })
        .catch(err => console.log(err))
    }, [filterType])

    const handleFilterName = e => {
        setCurrentPage(1)
        setFilterName(e.target.value.toLowerCase())
    }

    const handleFilterType = e => {
        setCurrentPage(1)
        setFilterName('')
        setFilterType(e.target.value)
    }

    const renderPokemonsByName = (pokemonName, pokemons) => {
        const arrayResult = pokemons?.map(pokemon => {
            if(pokemonName === '') {
                return pokemon
            }else if(filterType === ''){
                if(pokemon?.name.includes(pokemonName)) {
                    return pokemon
                }
            }else{
                if(pokemon?.pokemon?.name.includes(pokemonName)) {
                    return pokemon
                }
            }
        })
        const arrayResult2 = arrayResult.filter(pokemon => pokemon !== undefined)
        return arrayResult2
    }

    let arrayPokemons = []
    const pokemonsPerPage = 12
    arrayPokemons =  renderPokemonsByName(filterName, pokemons).slice((currentPage - 1) * pokemonsPerPage, currentPage * pokemonsPerPage)
    const arrayPages = []
    const quantityPages = Math.ceil( renderPokemonsByName(filterName, pokemons).length / pokemonsPerPage )
    for(let i = 1; i <= quantityPages; i++){
        arrayPages.push(i)
    }
    const lastPage = arrayPages[arrayPages.length - 1]

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

  return (
    <main className="pokedex">
        <section className="pokedex__header">
            <p className="pokedex__text"><span>Welcome {trainerName}, </span>find your favorite pokemón</p>
            <form className="pokedex__form">
                <article className="pokedex__searcher">
                    <input type="text" placeholder="Search your pokemón..." onChange={handleFilterName} value={filterName}/>
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
        <Pagination 
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            lastPage={lastPage}
            pagesInBlock={pagesInBlock}
        />
        <section className="pokedex__body">
            {
                arrayPokemons.map(pokemon => (
                    <PokeCard 
                        key={filterType ? pokemon?.pokemon?.name : pokemon?.name} 
                        urlPokemon={filterType ? pokemon?.pokemon?.url : pokemon?.url}    
                    />
                ))
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