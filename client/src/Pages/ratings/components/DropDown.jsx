import React, { useState, useEffect } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useOutsideClick }  from '../../../hooks';

const DropDown = ({ selectedWord, setSelectedWord, options  }) => {


    const [open, setOpen] = useState(false);
    const [searchWord, setSearchWord] = useState('');

    const ref = useOutsideClick(() => {
        setOpen(false);
    });

    return (
        <div ref={ref} className="relative text-gray-500">
            <button 
                className={ " w-full h-10 hover:text-black hover:shadow-md hover:shadow-slate-200 bg-white flex items-center justify-between pr-2 "
                 + (open ? "rounded-t-md" : "rounded-md")
                }
            >
                <input
                    className='p-2 w-full bg-transparent h-full outline-none text-gray-500'
                    placeholder={selectedWord} 
                    type="text" 
                    value={searchWord}
                    onChange={e => setSearchWord(e.target.value)}
                    onClick={() => setOpen(true)}
                />
                <IoMdArrowDropdown onClick={() => setOpen(prev => !prev)} className={'transition-all ' + (open ? 'rotate-180' : '')} />
            </button>
            {
                open &&
                <div className="absolute w-full right-0 max-h-[15rem] overflow-y-auto bg-white border-t z-[10] rounded-b-md shadow-slate-200 shadow-md">
                    {
                        options?.map(i => {
                            
                            if( searchWord === '' || i.toLowerCase().includes(searchWord.toLowerCase())){
                                return(
                                    <button 
                                        key={i} 
                                        className={"pl-2 w-full text-start py-2 " + (i === selectedWord ? "bg-[color:var(--yellow)] text-white" : "hover:bg-gray-100 ")}
                                        onClick={() => {
                                            setSelectedWord(i);
                                            setOpen(false);
                                            setSearchWord('');
                                        }}
                                    >
                                        {i}
                                    </button>
                                );
                            }
                            return <></>;

                        })
                    }
                </div>
            }
        </div>
    )
}

export default DropDown;