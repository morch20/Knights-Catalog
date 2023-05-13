import React, { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { MdKeyboardArrowUp } from 'react-icons/md';

const SelectedPrograms = ({ selectedPrograms, setSelectedPrograms }) => {

    const [hide, setHide] = useState(true);

    return (
        <>
            <>
                <div
                    onClick={() => setHide(!hide)} 
                    className={'md:hidden cursor-pointer p-1 bg-gray-300 fixed left-1/2 translate-x-[-50%] rounded-full shadow-2xl transition-all duration-500 ' + (hide ? 'bottom-3 ': ' bottom-32')}
                >
                    <div className={(hide ? '' : ' rotate-180')}>
                        <MdKeyboardArrowUp size={30} color='#4b5563' />
                    </div>
                </div>

                <div className={'md:hidden bg-[#f5f6f7] flex flex-col items-center border-gray-400 border-t-2 p-1 left-0 fixed h-32 w-full transition-all duration-500 '+ (hide ? '-bottom-[7.5rem]' : 'bottom-0') } >
                        
                    <h3 className=' text-center font-semibold'>Selected Programs</h3>

                    <div className='flex justify-around items-center w-full h-full'>
                        {
                            (Object.values(selectedPrograms)).map(i => {
                                return(
                                    <div
                                        className='flex flex-col cursor-pointer items-center justify-between w-1/5 h-20 md:h-28 rounded shadow-md relative shake'
                                        onClick={() => {
                                            let tmp = JSON.parse(JSON.stringify(selectedPrograms));
                                            delete tmp[i.name];
                                            setSelectedPrograms(tmp);
                                        }}
                                    >
                                        <img
                                            src={i.header.pictureLink || 'https://images.pexels.com/photos/13814635/pexels-photo-13814635.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
                                            alt="picture"
                                            className='rounded-t-md w-full h-3/4 object-cover'
                                        />
                                        <p title={i.name} className=' w-4/5 font-medium overflow-hidden whitespace-nowrap text-ellipsis'>{i.name}</p>
                                        <span className='h-fit w-fit p-1 absolute -top-1 -right-1 bg-red-300 rounded-full '>
                                            <AiOutlineDelete size={20}/>
                                        </span>
                                    </div>
                                )
                            })
                        }

                        {
                            ((Object.values(selectedPrograms)).length === 2) &&
                            <button className=' bg-[color:var(--yellow)] hover:text-white active:bg-yellow-300 w-1/5 h-12 rounded'>
                                Compare them!
                            </button>
                        }

                    </div>

                </div>  
            </>

            <div className=' hidden md:flex flex-col items-center border p-4 top-24 2xl:top-28 sticky h-[75vh] w-1/5 hide-scrollbar overflow-y-scroll'>
                
                <h3 className=' text-center text-lg font-semibold'>Selected Programs</h3>
    
                <div className='flex flex-col justify-around items-center w-full h-full'>
                    {
                        (Object.values(selectedPrograms)).map(i => {
                            return(
                                <div
                                    className='flex my-5 flex-col cursor-pointer items-center justify-between w-full h-28 rounded shadow relative shake'
                                    onClick={() => {
                                        let tmp = JSON.parse(JSON.stringify(selectedPrograms));
                                        delete tmp[i.name];
                                        setSelectedPrograms(tmp);
                                    }}
                                >
                                    <img
                                        src={i.header.pictureLink || 'https://images.pexels.com/photos/13814635/pexels-photo-13814635.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
                                        alt="picture"
                                        className='rounded-t-md w-full h-3/4 object-cover'
                                    />
                                    <p title={i.name} className=' w-4/5 font-medium overflow-hidden whitespace-nowrap text-ellipsis'>{i.name}</p>
                                    <span className='h-fit w-fit p-1 absolute -top-2 -right-2 bg-red-300 rounded-full '>
                                        <AiOutlineDelete size={20}/>
                                    </span>
                                </div>
                            )
                        })
                    }
                </div>
    
                {
                    ((Object.values(selectedPrograms)).length === 2) &&
                    <button className=' bg-[color:var(--yellow)] hover:text-white active:bg-yellow-300 w-4/5 h-12 rounded'>
                        Compare them!
                    </button>
                }
    
            </div>
        </>
    )
}

export default SelectedPrograms;