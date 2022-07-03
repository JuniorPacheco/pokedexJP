export const renderPokemonsByName = (pokemonName, pokemons) => {
    const arrayResult = pokemons?.map(pokemon => {
        if(pokemonName.toLowerCase() === '') {
            return pokemon
        }else{
            if(pokemon?.name.includes(pokemonName.toLowerCase())) {
                return pokemon
            }
        }

    })
    const arrayResult2 = arrayResult.filter(pokemon => pokemon !== undefined)
    return arrayResult2
}