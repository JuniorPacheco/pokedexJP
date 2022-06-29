import { useEffect, useState } from "react"
import axios from 'axios'

const PokeCard = ({ urlPokemon }) => {
    const [dataPokemon, setDataPokemon] = useState({})
    const [species, setSpecies] = useState({})

    const requestSpeciesData = (url) => {
        axios.get(url)
        .then(res => {
            setSpecies(res.data)
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        axios.get(urlPokemon)
        .then(res => {
            setDataPokemon(res.data)
            requestSpeciesData(res.data.species.url)
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
        //{backgroundColor: species.color?.name}
    }

    const changeColor = color => color === 'yellow' ? '#f7d708' : color === 'white' ? 'gray' : color

    const changeFirstLetter = (word = '') => word[0]?.toUpperCase() + word?.substring(1)

  return (
    <article className="pokeCard" style={{background: `linear-gradient(to top, white 0%, white 60% , white 60%, ${changeColor(species.color?.name)} 100%)`, boxShadow: `1px 1px 8px ${changeColor(species.color?.name)}`}}>
        <figure className="pokeCard__image">
            <img src={dataPokemon.sprites?.other['official-artwork'].front_default} alt="Pokedex logo" />
        </figure>
        <h3 className="pokeCard__name">{changeFirstLetter(dataPokemon.name)}</h3>
        <section className="pokeCard__type">
            <p>{dataPokemon.types?.map(type => changeFirstLetter(type.type.name)).join(' / ')}</p>
            <p>Type</p>
        </section>
        <section className="pokeCard__stats">
            {
                dataPokemon.stats?.map(stat => (
                    <article className="pokeCard__stat" key={stat.stat.url}>
                        <p className="stat__name">{changeNameStats(stat.stat.name)}</p>
                        <p className="stat__number" style={{color: `${changeColor(species.color?.name)}`}}>{stat.base_stat}</p>
                    </article>
                ))
            }
        </section>
    </article>
  )
}

export default PokeCard