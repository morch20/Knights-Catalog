import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchBar, CardCatalog, LoadingCircle, Paginate, Filters } from '../../components';
import { regexCode } from '../../utils/constants';
import notFound from '../../assets/search.svg';


const Explore = () => {

    const [searchParams] = useSearchParams();
    const [searchValue, setSearchValue] = useState(searchParams.get('value') || '');
    const [searchData, setSearchData] = useState([]);
    const [isPending, setIsPending] = useState(true);

    const [page, setPage] = useState(0);
    const [results, setResults] = useState(searchParams.get('value') || '');

    const filtersRef = useRef({});

    const loadData = async () =>{
        if(!isPending)setIsPending(true);
        
        try{

            const response = await fetch(`http://localhost:5000/search/${searchValue}?p=${page}`, {
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
        <div className='flex flex-col items-center w-full h-full relative '>

            <div className='md:px-14 lg:px-24 xl:px-32 2xl:px-48'>
                <div className='my-2 2xl:my-24 relative'>
                    <h1 className=' text-center text-2xl xsm:text-3xl 2xl:text-4xl font-semibold mb-3'>
                        Search through all our whole catalog, ratings, and more
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

                <Filters value={filtersRef} callback={loadData} setPage={setPage} />
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

                                    <p className=' mb-10 xsm:text-xl font-medium'>
                                        {
                                            results &&
                                            sessionStorage.getItem('items') + ` Search results for: "${results}"`
                                        } 
                                    </p>

                                    <div className=' w-full grid grid-auto-fill gap-16 justify-center relative'>

                                        {
                                            searchData.map(data => {
                                                //console.log(data)
                                                if(data.name.search(regexCode) >= 0){
                                                    return <CardCatalog data={data} key={data._id} course />
                                                }
                                                return <CardCatalog data={data} key={data._id} />
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
    );
}
 
export default Explore;