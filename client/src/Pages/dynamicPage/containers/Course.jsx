import React, { useState, useEffect } from 'react';
import { LoadingCircle, FindCourseTag } from '../../../components';
import DividerContent from '../components/DividerContent';
import Header from '../components/Header';
import notFound from '../../../assets/search.svg';

const Course = ({ name }) => {

    const [data, setData] = useState({});
    const [pending, setPending] = useState(true);
    let codesFound = true;

    let code = JSON.parse(localStorage.getItem('codes'));
    if(code === null){
        codesFound = false;
    }
    else{
        code = code[name.substring(0,3)].replace('&', 'ampersand');
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
                                                        <DividerContent title={i.title}>
                                                            <div className='flex flex-wrap gap-x-1'>
                                                                <FindCourseTag text={i.text} newTab={false}/>
                                                            </div>
                                                        </DividerContent>
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