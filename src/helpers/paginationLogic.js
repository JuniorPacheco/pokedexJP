export const paginationLogic = (renderPokemonsByName, filterName, pokemons, currentPage ) => {
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

    return {arrayPokemons, lastPage, pagesInBlock}
}