import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { useOutsideClick } from '../hooks';


export default function SearchBarAutoComplete({ className, endpoint, route }) {

    let [data, setData] = useState([]);
    let [value, setValue] = useState('');
    let [autoComplete, setAutoComplete] = useState(false);

    let ref = useOutsideClick(() => {
        setAutoComplete(false);
    });

    const navigate = useNavigate();

    const handleNavigate = (routeValue = value) => {
        navigate(`/${route}?value=${routeValue}` );
    };

    useEffect(() =>{

        if(value.length > 2){
            fetch(`http://localhost:5000/${endpoint}/${value}`, {
                method: 'POST'
            })
                    .then(response => {
                        return response.json()
                    })
                    .then((values) => {
                        setData(values);
                    })
                    .catch(err => console.log(err))
        }
        else setData([])
    }, [value])

    return (
        <div 
            className='relative w-full' 
            ref={ref} 
            onClick={() => {setAutoComplete(true)}}
        >
            <div className={'flex justify-center items-center ' + className}>
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-[75%] h-full xsm:w-[80%] sm:w-[85%] bg-gray-200 py-1 pl-4 rounded-l-lg outline-none"
                    onKeyUp={(e) => {
                        if(e.key === 'Enter'){
                            handleNavigate();
                        }
                        else setValue(e.target.value);
                    } }
                    />
                <button
                    onClick={() => handleNavigate()}
                    className="bg-[color:var(--yellow)] w-[25%] xsm:w-[20%] sm:w-[15%] min-h-full pointer flex justify-center items-center rounded-r-lg hover:text-white transition-all active:bg-yellow-300"
                >
                    <AiOutlineSearch size={25}></AiOutlineSearch>
                </button>
            </div>

            {
                (autoComplete && data.length > 0 )

                ?
                <ul className='bg__glass absolute shadow-md z-10 w-full outline-white rounded-md'>
                {(data.length > 5)
                    ?
                        data.slice(0,5).map(o => {
                            return (
                                <li
                                    onClick={() => handleNavigate(o.name)}
                                    key={o._id} 
                                    className=' p-1.5 md:p-2 xl:p-3 hover:bg-[color:var(--yellow)] hover:shadow rounded cursor-pointer'
                                >
                                    {o.name}
                                </li>
                            )
                        })
                    :
                        data.map(o => {
                            return (
                                <li 
                                    onClick={() => handleNavigate(o.name)}
                                    key={o._id} 
                                    className=' p-1.5 md:p-2 xl:p-3 hover:bg-[color:var(--yellow)] hover:shadow rounded cursor-pointer'
                                >
                                    {o.name}
                                </li>
                            )
                        })}
                </ul>
                :
                <></>
            }

        </div>
    )
}
