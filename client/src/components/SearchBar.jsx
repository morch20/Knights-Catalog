import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

const SearchBar = ({ value, setValue, fetchData, className }) => {

  return (
    <div className='relative w-full' >
        <div className={'flex justify-center items-center ' + className}>
            <input
                value={value}
                type="text"
                placeholder="Search..."
                className="w-[75%] h-full xsm:w-[80%] sm:w-[85%] bg-gray-200 py-1 pl-4 rounded-l-lg outline-none"
                onChange={(e) => setValue(e.target.value) }
                onKeyUp={(e) => {
                  if(e.key === "Enter") fetchData();
                }}
                />
            <button
                onClick={ () => fetchData()}
                className="bg-[color:var(--yellow)] w-[25%] xsm:w-[20%] sm:w-[15%] min-h-full pointer flex justify-center items-center rounded-r-lg hover:text-white transition-all active:bg-yellow-300">
                <AiOutlineSearch size={25} />
            </button>
        </div>
    </div>
  )
}

export default SearchBar;