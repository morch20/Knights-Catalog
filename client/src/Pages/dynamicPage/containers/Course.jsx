import React, { useState, useEffect } from 'react';
import { LoadingCircle} from '../../../components';
import DividerContent from '../components/DividerContent';
import Header from '../components/Header';

const Course = ({ name }) => {

    const [data, setData] = useState({});
    const [pending, setPending] = useState(true);

    const code = JSON.parse(sessionStorage.getItem('codes'))[name.substring(0,3)];

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
                                        course
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
                                <div>
                                    NOT FOUND
                                </div>
                        }
                    </>
            }
        </>
    )
}

export default Course;