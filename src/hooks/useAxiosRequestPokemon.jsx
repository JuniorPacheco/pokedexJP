import axios from "axios"
import { useEffect } from "react"

const useAxiosRequestPokemon = (id, setSpecies, setDataPokemon) => {

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
            setDataPokemon(res.data)
            requestSpeciesData(res.data.species.url)
        })
        .catch(err => console.log(err))
    }, [])
}

export default useAxiosRequestPokemon