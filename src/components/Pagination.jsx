import Page from "./Page"


const Pagination = ({ currentPage, setCurrentPage, lastPage, pagesInBlock }) => {

    const prevNextPage = (e) => { 
        if(e.target.className.includes('prev')){
            currentPage === 1 ? 
                setCurrentPage(lastPage) 
            :  
                setCurrentPage(currentPage - 1)
        }else {
            currentPage === lastPage ?
                setCurrentPage(1) 
            : 
                setCurrentPage(currentPage + 1)
        }
    }

    const handleLastPage = () => setCurrentPage(lastPage)
    const handleFirstPage = () => setCurrentPage(1)

  return (
    <section className="pagination">
        <article 
            className="blockPagination prev"
            onClick={prevNextPage}
        >
            <i className='bx bx-chevron-left prev'></i>
        </article>
        <article 
            className="blockPagination"
            onClick={handleFirstPage}
        >
            <p>...</p>
        </article>
        <section className="numbersPagination">
            {pagesInBlock.map(page => (
                <Page 
                    key={page} 
                    numberPage={page} 
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            ))}
        </section>
        <article 
            className="blockPagination"
            onClick={handleLastPage}
        >
            <p>...</p>
        </article>
        <article 
            className="blockPagination"
            onClick={prevNextPage}
        >
            <i className='bx bx-chevron-right'></i>
        </article>
    </section>
  )
}

export default Pagination