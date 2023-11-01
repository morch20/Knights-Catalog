import React, { useState, useEffect } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import DropDown from './DropDown';
import rate1BG from '../assets/blob-haikei.svg';
import rate3 from '../assets/completed.svg';
import StepTwo from './StepTwo';


const StepThree = ({ handlerFunction, animate, backwardsFunction, type, typeInfo }) => {

    const [selectedWord, setSelectedWord] = useState('Search ...');
    const [options, setOptions] = useState([]);


    useEffect(() => {

        if(type === 1){

            fetch('http://localhost:5000/undergraduate/programs', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    College: [typeInfo]
                })
                
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setOptions(data.map(i => i.name));
            })
            .catch(e => console.log(e))
        }
        else{
            fetch('http://localhost:5000/undergraduate/courses?code=' + typeInfo.replace("&", "ampersand"))
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setOptions(data.map(i => i.name));
            })
            .catch(e => console.log(e))
        }


    }, [])

    return (
        <>
            <div className='w-full flex justify-between'>
                <button
                    onClick={backwardsFunction}
                    className='flex items-center bg-white hover:shadow-md hover:shadow-slate-200 transition-all active:border-[color:var(--purple)] justify-center border rounded-md h-10 w-20'
                >
                    <BiArrowBack />
                </button>

                <button
                    onClick={() => {
                        if (selectedWord !== 'Search ...') {
                            handlerFunction(selectedWord);
                        }
                    }}
                    className={
                        'flex items-center bg-white border transition-all justify-center rounded-md h-10 w-20 '
                        + ((selectedWord !== 'Search ...') ? 'hover:shadow-md hover:shadow-slate-200 bg-[color:var(--yellow)] text-white active:border-[color:var(--purple)]' : ' cursor-not-allowed text-gray-300')
                    }
                >
                    Rate!
                </button>
            </div>
            <div className={'h-full flex ' + animate}>

                <div className='hidden w-1/2 relative lg:flex items-center justify-center'>
                    <img
                        src={rate1BG}
                        alt="rate background"
                        className=''
                    />

                    <img
                        src={rate3}
                        alt="rate"
                        className='w-4/5 h-4/5 absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%]'
                    />
                </div>

                <div className='w-full lg:w-1/2'>

                    <div className='my-20 '>
                        <h2 className='text-xl md:text-2xl lg:text-3xl text-center'>
                            {type === 1 ? 'Select program' : 'Select course'}
                        </h2>
                    </div>

                    <DropDown
                        selectedWord={selectedWord}
                        setSelectedWord={setSelectedWord}
                        options={options}
                    />
                </div>
            </div>
        </>
    )
}

export default StepThree;