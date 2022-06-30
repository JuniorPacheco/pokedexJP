import React from 'react'

const Page = ({numberPage, currentPage, setCurrentPage}) => {

    const handleClickPage = () => setCurrentPage(numberPage)

  return (
    <article 
        className={`blockPagination ${currentPage === numberPage ? 'pageActive' : ''}`}
        onClick={handleClickPage}
    >
        {numberPage}
    </article>
  )
}

export default Page