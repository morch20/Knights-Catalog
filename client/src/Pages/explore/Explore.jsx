import React, { useState, useEffect } from 'react';
import { SearchBar, CardCatalog } from '../../components';
import { regexCode } from '../../utils/constants';

// import { Card } from './components/index.js';
// import undergraduate from './assets/undergraduate.jpg';
// import graduate from './assets/graduate.jpg';
// import rating from './assets/rating.png';
// import { AiOutlineArrowRight } from 'react-icons/ai';



const Explore = () => {

    //const [showIcon, setShowIcon] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const [searchData, setSearchData] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/search/${searchValue}`)
            .then(response => response.json())
            .then((values) => {
                if(values.documents)
                    setSearchData(values.documents);
                else
                    setSearchData(values);
            })
            .catch(error => console.log(error))
    }, [searchValue])


    return ( 
        <div className='w-full h-full min-h-[50rem] relative '>

            <div className='md:px-14 lg:px-24 xl:px-32 2xl:px-48'>
                <div className='my-10 2xl:my-24 relative'>
                    <h1 className=' text-center text-2xl xsm:text-3xl 2xl:text-4xl font-semibold mb-3'>
                        Search through through all our whole catalog, ratings, and more
                    </h1>
                    <div className='bg-[color:var(--yellow)] w-[80%] h-1 absolute left-1/2 translate-x-[-50%]'></div>
                </div>
                <SearchBar setValue={setSearchValue} className='w-full h-10 my-10 2xl:h-12 ' />

            </div>

            { searchValue &&
                <p className='text-xl font-semibold'>
                    Search results for: "{searchValue}"
                </p>
            }
            <div className=' my-28 flex flex-wrap gap-10 justify-center '>
                {
                    searchData?.map(data => {
                        
                        if(data.name.search(regexCode) >= 0){
                            //console.log(data.name)
                            return (<></>);
                        }
                        console.log(data.header.pictureLink === "")
                        //console.log(data.name)
                        return (<CardCatalog data={data} />);
                    })
                }
            </div>

            {/* <div 
                onScroll={(e) => {
                    if((e.target.scrollLeft + e.target.clientWidth) === e.target.scrollWidth){
                        setShowIcon(false);
                    }
                    else{
                        if(!showIcon){
                            setShowIcon(true);
                        }
                    }
                }} 
                className=' flex flex-nowrap w-full h-max scrolling-wrapper md:py-10 overflow-x-auto overflow-y-hidden '
            >
                <Card
                    url={undergraduate} 
                    alt='undergraduate image'
                    title='Undergraduate'
                    description={'Explore the Undergraduate Catalog'}
                />
                <Card
                    url={graduate}
                    title='Graduate'
                    description={'Explore the Graduate Catalog'}
                    alt='graduate image'
                />
                <Card
                    url={rating}
                    alt='rating image'
                    title={'Ratings'}
                    description={'Explore all the course ratings'}
                    last
                />

                {showIcon &&
                    <div className='absolute top-1/2 right-[-5%] animate-bounce md:hidden'>
                        <AiOutlineArrowRight size={20}/>
                    </div>
                }
            </div> */}
        </div>
     );
}
 
export default Explore;