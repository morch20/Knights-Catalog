import React, { useState, useEffect } from 'react';
import { LoadingCircle} from '../../../components';
import DividerContent from '../components/DividerContent';
import Header from '../components/Header';
import notFound from '../../../assets/search.svg';
import replaceSymbol from '../../../utils/functions';

const Course = ({ name }) => {

    const [data, setData] = useState({});
    const [pending, setPending] = useState(true);
    let codesFound = true;

    let code = JSON.parse(localStorage.getItem('codes'));
    if(code === null){
        codesFound = false;
    }
    else{
        code = replaceSymbol(code[name.substring(0,3)], '&', 'ampersand');
    }

    useEffect(() => {
        fetch('http://localhost:5000/undergraduate/courses/' + name + '?code=' + code)
            .then(response => response.json())
            .then(data => {
                setData(data);
                setPending(false);
                console.log(data);
            })
            .catch(e => console.log(e))

    }, []);


    return (
        <>
            {
                pending
                ?
                    <div className='w-full h-[70vh]'>
                        <div className='absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]'>
                            <LoadingCircle />
                        </div>
                    </div>
                :
                    <>
                        {
                            data.length > 0
                            ?

                                <div>
                                    <Header
                                        title={data[0].name} 
                                        college={data[0].College.text}
                                        description={data[0]['Course Description']}
                                        type='course'
                                    />

                                <div className='w-full h-full my-8'>
                                    <div>
                                        {
                                            Object.values(data[0]).map(i => {
                                                if(i.title !== 'Course Description'){
                                                    return(
                                                        <DividerContent title={i.title} text={i.text} />
                                                    )
                                                }
                                            })
                                        }
                                    </div>
                                </div>

                                </div>
                            :
                                <div className=' mx-auto w-full xsm:w-3/4 sm:w-1/2 2xl:w-1/4 flex-1 flex flex-col justify-around '>
                                    <h2 className='text-2xl text-center font-bold'>
                                        { codesFound ? 'Course not found' : 'Something went wrong. Plz reload the page :('} 
                                    </h2>
                                    <img src={notFound} alt="Not found" />
                                </div>
                        }
                    </>
            }
        </>
    )
}

export default Course;