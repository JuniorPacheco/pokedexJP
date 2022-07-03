import axios from "axios"
import { useEffect, useState } from "react"

const useAxiosRequestPokeCard = (setSpecies, setDataPokemon, urlPokemon) => {
    const [loading, setLoading] = useState(true)
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
        .finally(() => setLoading(!loading))
    }, [])

  return loading
}

export default useAxiosRequestPokeCard