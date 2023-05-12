import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchBar, Paginate, Filters, LoadingCircle, CardCatalog } from '../../components';
import { filtersPCompareProgramsPage, regexCode } from '../../utils/constants';
import notFound from '../../assets/search.svg';
import { AiOutlineDelete } from 'react-icons/ai';

const ComparePrograms = () => {

    const [searchParams] = useSearchParams();
    const [searchValue, setSearchValue] = useState(searchParams.get('value') || '');
    const [searchData, setSearchData] = useState([]);
    const [isPending, setIsPending] = useState(true);

    const [page, setPage] = useState(0);
    const [results, setResults] = useState(searchParams.get('value') || '');

    const filtersRef = useRef({});
    const [selectedPrograms, setSelectedPrograms] = useState({});

    const loadData = async () =>{
        if(!isPending)setIsPending(true);
        
        try{

            const response = await fetch(`http://localhost:5000/undergraduate/programs/${searchValue}?p=${page}`, {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(filtersRef.current)
            });
            const values = await response.json();

            if(values.documents){
                sessionStorage.setItem("pages", values.pagination.pages || 0);
                sessionStorage.setItem("items", values.pagination.items || 0);
                setSearchData(values.documents);
            }
            else
                setSearchData(values);

            setIsPending(false);

        }
        catch (error){
            console.log(error)
        }

    }
    
    useEffect(() => {
        window.scrollTo(0, 0);
        loadData();

    }, [page])

    return ( 
        
        <div className='flex justify-between w-full h-full'>

            <div className='flex flex-col items-center w-full h-full relative '>
                <div className='md:pr-14 Tlg:px-24 Txl:px-32 T2xl:px-48'>
                    <div className='my-2 2xl:my-24 relative'>
                        <h1 className=' text-center text-2xl xsm:text-3xl 2xl:text-4xl font-semibold mb-3'>
                            Select two programs to compare and explore their differences
                        </h1>
                        <div className='bg-[color:var(--yellow)] w-[80%] h-1 absolute left-1/2 translate-x-[-50%]'></div>
                    </div>
                    <SearchBar
                        fetchData={() => {
                            if(page !== 0) setPage(0);
                            else loadData();

                            setResults(searchValue);
                        }}
                        value={searchValue} 
                        setValue={setSearchValue} 
                        className='w-full h-10 my-10 2xl:h-12 ' 
                    />

                    <Filters filtersP={filtersPCompareProgramsPage} value={filtersRef} callback={loadData} setPage={setPage} />
                </div>

                {
                    isPending
                    ?
                        <div className='absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]'>
                            <LoadingCircle />
                        </div>
                    :
                        <>
                            {
                                searchData.length > 0 
                                ?
                                    <>
                                        {
                                            results &&
                                            <p className=' mb-10 xsm:text-xl font-medium'>
                                                {
                                                    sessionStorage.getItem('items') + ` Search results for: "${results}"`
                                                } 
                                            </p>
                                        }

                                        <div className=' w-full grid grid-auto-fill gap-8 justify-center relative'>

                                            {
                                                searchData.map(data => {
                                                    //console.log(data)
                                                    if(data.type === 'course'){
                                                        return(
                                                            <CardCatalog 
                                                                data={data} 
                                                                key={data._id} 
                                                                course 
                                                                compareProgram 
                                                                selectedPrograms={selectedPrograms} 
                                                                setPrograms={setSelectedPrograms} 
                                                            />
                                                        );
                                                    }
                                                    return(
                                                        <CardCatalog 
                                                            data={data} 
                                                            key={data._id} 
                                                            compareProgram 
                                                            selectedPrograms={selectedPrograms} 
                                                            setPrograms={setSelectedPrograms} 
                                                        />
                                                    );
                                                })
                                            }

                                        </div>
                                    </>
                                :
                                <div className=' w-full xsm:w-3/4 sm:w-1/2 2xl:w-1/4 flex-1 flex flex-col justify-around '>
                                    <h2 className='text-2xl text-center font-bold'>
                                        Not Found
                                    </h2>
                                    <img src={notFound} alt="Not found" />
                                </div>

                            }
                                
                        </>
                }
                <Paginate setPage={setPage} />
            </div>

            <div className='flex flex-col items-center border p-4 top-24 2xl:top-28 sticky h-[75vh] w-1/5 hide-scrollbar overflow-y-scroll'>
                
                <h3 className='text-center text-lg font-semibold'>Selected Programs</h3>

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

                {
                    ((Object.values(selectedPrograms)).length === 2) &&
                    <button className=' bg-[color:var(--yellow)] hover:text-white active:bg-yellow-300 w-4/5 h-12 rounded'>
                        Compare them!
                    </button>
                }

            </div>  
        </div>
     );
}
 
export default ComparePrograms;