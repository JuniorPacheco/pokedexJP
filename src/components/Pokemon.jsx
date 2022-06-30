import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'

const Pokemon = () => {
    const [dataPokemon, setDataPokemon] = useState({})
    const [species, setSpecies] = useState({})

    const { id } = useParams()

    const requestSpeciesData = (url) => {
        axios.get(url)
        .then(res => {
            setSpecies(res.data)
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}/`
        axios.get(url)
        .then(res => {
            console.log(res.data)
            setDataPokemon(res.data)
            requestSpeciesData(res.data.species.url)
        })
        .catch(err => console.log(err))
    }, [])

    const changeColor = color => color === 'yellow' ? '#f7d708' : color === 'white' ? 'gray' : color

  return (
    <main className='pokemon'>
        <section className='pokemon__principal' style={{background: `linear-gradient(to top, white 0%, white 60% , white 60%, ${changeColor(species.color?.name)} 100%)`, boxShadow: `1px 1px 8px ${changeColor(species.color?.name)}`}}>
            <figure className='pokemon__image'>
                <img src={dataPokemon.sprites?.other['official-artwork'].front_default} alt={`${dataPokemon.name} image`} />
            </figure>
            <p className='pokemon__id'># {dataPokemon.id}</p>
            <section className='pokemon__name'>
                <div className='linea'></div>
                <p>{dataPokemon.name}</p>
                <div className='linea'></div>
            </section>
            <section className='pokemon__features'>
                <article className='pokemon__feature'>
                    <p>Weight</p>
                    <p>{dataPokemon.weight}</p>
                </article>
                <article className='pokemon__feature'>
                    <p>Height</p>
                    <p>{dataPokemon.height}</p>
                </article>
            </section>
            <section className='pokemon__typesAbilities'>
                <section className='pokemon__typeAbilitie'>
                    <h3>Type</h3>
                    <section>
                        {dataPokemon.types?.map(type => <p className={`type ${type.type.name}`} key={type.type.name}>{type.type.name}</p>)}
                    </section>
                </section>
                <section className='pokemon__typeAbilitie'>
                    <h3>Abilities</h3>
                    <section>
                        {dataPokemon.abilities?.map(abilitie => <p className='abilitie' key={abilitie.ability.name}>{abilitie.ability.name}</p>)}
                    </section>
                </section>
            </section>
            <h3>Stats</h3>
            <section className='pokemon__stats'>
                {dataPokemon.stats?.map(stat => (
                    <article className='pokemon__stat' key={stat.stat.name}>
                        <section className='stat__tittle'>
                            <p>{stat.stat.name}</p>
                            <p>{`${stat.base_stat} / 150`}</p>
                        </section>
                        <section className='stat__bar'>
                            <div className='stat__barProgress' style={{width: `${stat.base_stat * 100 / 150}%`}}>

                            </div>
                        </section>
                    </article>
                ))}
            </section>
        </section>
    </main>
  )
}

export default Pokemon