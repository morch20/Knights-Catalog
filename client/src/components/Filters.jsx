import React, { useRef, useState, useEffect } from 'react';
import { useOutsideClick } from '../hooks';
import { VscSettings, VscClose } from 'react-icons/vsc';
import DropDown from './DropDown';

const Filters = ({ filtersP, value, callback, setPage }) => {

    const [open, setOpen] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const buttonRef = useRef();

    const dialogRef = useOutsideClick(() => {
        setOpen(false);
    }, [buttonRef]);

    const [filters, setFilters] = useState(filtersP);

    const update = async (option, title) => {

        
        if(option === 'Course'){
            const codes = localStorage.getItem('codes');
            setFilters([...filters, {title: 'Code', options: Object.values(JSON.parse(codes)).sort()}]);
        }

        else if(option === 'Program'){
            const programTypes = {
                title: 'Program',
                options: ['Major', 'Minor', 'Certificate', 'Accelerated UndergraduateGraduate Program']
            };
            setFilters([...filters, programTypes]);
        }
        
        setPage(0);

        if(title === 'Code'){
            option = option.substring(0,3);
        }

        if(Object.hasOwn(value.current, title)){
            value.current[title].push(option)
        }
        else{
            value.current[title] = [option]
        }
        setSelectedFilters([...selectedFilters, {option, title}]);
    }

    const remove = (option, title) => {
        
        setPage(0);
        value.current[title] = value.current[title].filter(i => i !== option);

        if(value.current[title].length === 0){
            delete value.current[title];
        }
        if(option === 'Course'){
            delete value.current['Code'];
            setFilters(filters.filter( i => i.title !== 'Code'));
            setSelectedFilters(selectedFilters.filter(i => i.option !== option && i.option.length > 3));
        }
        else if(option === 'Program'){
            delete value.current['Program'];
            setFilters(filters.filter( i => i.title !== 'Program'));
            setSelectedFilters(selectedFilters.filter(i => i.title !== 'Program' && i.option !== option));
        }
        else setSelectedFilters(selectedFilters.filter(i => i.option !== option));
    }

    const clear = () => {
        setPage(0);
        value.current = {};
        setSelectedFilters([]);
        setOpen(false);
        setFilters(filters.filter( i => (i.title !== 'Code' && i.title !== 'Program')));
    }
    
    useEffect(() => {
        if(selectedFilters.length === 0) setPage(0);
        callback();
    }, [selectedFilters])

  return (
    <>
        <button
            ref={buttonRef}
            onClick={() => setOpen(!open)} 
            className={'md:hidden my-5 transition duration-500 ease-out bg-white p-3 w-32 rounded-md border md:border-2 flex justify-between items-center ' + (open ? 'border-[color:var(--purple)] text-[color:var(--purple)]' : '')}
        >
            Filters
            <VscSettings size={20} />
        </button>

        {
            open &&
                <div
                    ref={dialogRef}
                    className=' bg-[#f9f9f9] p-5 w-full min-h-[10rem] shadow-md border rounded-md'
                >
                    <h2 className='text-lg font-medium'>Filter by:</h2>

                    {
                        filters.map(i => {
                            return(
                                <DropDown
                                    values={value.current}
                                    title={i.title}
                                    options={i.options}
                                    update={update}
                                    remove={remove}
                                />
                            )
                        })
                    }

                    <div className='w-full mt-20 flex justify-around'>
                        <button
                            onClick={() => setOpen(false)} 
                            className='bg-[color:var(--purple)] rounded text-white h-12 w-1/4 min-w-[90px] hover:text-[color:var(--yellow)]'
                        >
                            Apply filters
                        </button>
                        <button
                            onClick={clear} 
                            className='rounded h-12 w-1/4 min-w-[90px] border border-[color:var(--purple)] hover:text-[color:var(--yellow)]'
                        >
                            Clear
                        </button>
                    </div>
                    
                </div>
        }

        <div className=' hidden w-full md:block'>

            <h2 className='text-lg font-medium'>Filter by:</h2>

            <div className='flex items-stretch w-full justify-around'>
                {
                    filters.map(i => {
                        return(
                            <DropDown
                                values={value.current}
                                title={i.title}
                                options={i.options}
                                update={update}
                                remove={remove}
                            />
                        )
                    })
                }
            </div>

            
        </div>

        {
            selectedFilters.length > 0 &&
            
            <div className='w-full h-1/2 flex flex-wrap gap-5 my-6 '>

                {
                    selectedFilters?.map(i => {
                        return(
                        <div 
                            className=' cursor-pointer h-8 flex items-center px-2 bg-gray-200 rounded-xl transition-all hover:shadow-md hover:h-9'
                            onClick={() => remove(i.option, i.title)}
                        >
                            <p className='text-gray-500 text-justify'>{i.option}</p>
                            <div className='ml-4'>
                                <VscClose size={22} color='gray' />
                            </div>
                        </div>
                        )
                    })
                }

                <div 
                    className=' cursor-pointer h-8 flex items-center px-2 bg-gray-400 rounded-xl transition-all hover:shadow-md hover:h-9'
                    onClick={clear}
                >
                    <p className='text-gray-700 text-justify'>Clear all</p>
                    <div className=' ml-4'>
                        <VscClose size={22} color='#374151' />
                    </div>
                </div>
                
            </div>
        }
    </>
  )
}

export default Filters;