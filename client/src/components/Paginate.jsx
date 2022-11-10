import React from 'react';
import ReactPaginate from 'react-paginate';

const Paginate = ({ setPage }) => {
  return (
    <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={e => setPage(e.selected)}
        pageRangeDisplayed={5}
        pageCount={parseInt(sessionStorage.getItem("pages"))}
        previousLabel="<"
        renderOnZeroPageCount={null}
        breakClassName="border flex w-1/2 h-full text-center xsm:p-1 hover:bg-[color:var(--purple)]"
        breakLinkClassName='w-full hover:text-white active:text-[color:var(--yellow)]'
        containerClassName=' my-10 flex justify-between xsm:justify-around h-10 w-full md:w-3/4 font-medium text-base md:text-lg bg-white text-[color:var(--purple)]'
        nextClassName="border flex w-1/2 h-full text-center xsm:p-1 rounded-r-md hover:bg-[color:var(--purple)] hover:text-white active:text-[color:var(--yellow)]"
        nextLinkClassName='w-full flex items-center justify-center'
        previousClassName="border flex w-1/2 h-full text-center xsm:p-1 rounded-l-md hover:bg-[color:var(--purple)] hover:text-white active:text-[color:var(--yellow)]"
        previousLinkClassName='w-full flex items-center justify-center'
        pageClassName="flex border w-1/2 h-full text-center xsm:p-1 active:text-[color:var(--yellow)] hover:text-white hover:bg-[color:var(--purple)]"
        pageLinkClassName='w-full flex items-center justify-center'
        activeClassName='border border-[color:var(--purple)] border-solid'
        disabledClassName='bg-gray-300 hover:bg-gray-300 hover:text-black'
        disabledLinkClassName='cursor-default'
    />
  )
}

export default Paginate;