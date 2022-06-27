import { useEffect, useState } from "react"
import axios from 'axios'

const PokeCard = ({ urlPokemon }) => {
    const [dataPokemon, setDataPokemon] = useState({})
    const [species, setSpecies] = useState({})

    const requestSpeciesData = (url) => {
        axios.get(url)
        .then(res => {
            setSpecies(res.data)
            console.log(res.data)
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        axios.get(urlPokemon)
        .then(res => {
            setDataPokemon(res.data)
            requestSpeciesData(res.data.species.url)
            console.log(res.data)
        })
        .catch(err => console.log(err))
    }, [])

    const changeNameStats = (statName) => {
        return (
            statName === 'hp' ? 
                'HP' 
            : 
                statName  === 'attack' ?
                    'ATQ'
                :
                    statName === 'defense' ?
                        'DEF'
                    : 
                        statName === 'special-attack' ?
                            'STK'
                        :
                            statName === 'special-defense' ?
                                'SDF'
                            :
                                'SPD'

        )
    }
  return (
    <article className="pokeCard" style={{backgroundColor: species.color?.name}}>
        <figure className="pokeCard__image">
            <img src={dataPokemon.sprites?.other['official-artwork'].front_default} alt="Pokedex logo" />
        </figure>
        <h3>{dataPokemon.name}</h3>
        <section className="pokeCard__type">
            <p>{dataPokemon.types?.map(type => type.type.name).join(' / ')}</p>
            <p>Type</p>
        </section>
        <section className="pokeCard__stats">
            {
                dataPokemon.stats?.map(stat => (
                    <article className="pokeCard__stat" key={stat.stat.url}>
                        <p className="stat__name">{changeNameStats(stat.stat.name)}</p>
                        <p className="stat__number">{stat.base_stat}</p>
                    </article>
                ))
            }
        </section>
    </article>
  )
}

export default PokeCard