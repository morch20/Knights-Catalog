import React, { useState, useRef } from 'react';
import { AiOutlineDelete, AiOutlineClose } from 'react-icons/ai';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { useOutsideClick } from '../../../hooks';
import Comparison from './Comparison';
import { LoadingCircle } from '../../../components';
import { getTagsHighlights } from '../../../utils/functions';

const SelectedPrograms = ({ selectedPrograms, setSelectedPrograms }) => {

    const [hide, setHide] = useState(true);
    const [showComparison, setShowComparison] = useState(false);
    const [loading, setLoading] = useState(true);
    const highlights = useRef({});

    const [comparisonSection0, setComparisonSection0] = useState(undefined);
    const [comparisonSection1, setComparisonSection1] = useState(undefined);

    const closeComparison = () => {
        highlights.current = {};
        setShowComparison(false);
    }

    const outsideRef = useOutsideClick(() => {
        setShowComparison(false);
    });

    const fetchData = async (data) => {

        let tmpData = undefined;
        try {
            const response = await fetch('http://localhost:5000/undergraduate/program/' + data.name.replaceAll('/', 'slash') + '?college=' + data.college);
            const currData = await response.json();

            tmpData =  currData.documents[0].sections["Degree Requirements"]?.body;
            console.log(tmpData)
        } 
        catch (e) {
            console.log(e);
        }

        return tmpData;
    }

    const constructHighlights = (courseSections, last) => {
        for (const key in courseSections) {
				
            if (courseSections.hasOwnProperty(key)) {
                const currentCourseSection = courseSections[key];
        
                for (const key in currentCourseSection) {
                    if (currentCourseSection.hasOwnProperty(key)) {
                        if(key === "header") continue;
                        const text = currentCourseSection[key];
                        getTagsHighlights(text, highlights, last);
                    }
                }
            }
        }
    }

    const handleClick = async() => {
        highlights.current = {};
        setShowComparison(true);
        setComparisonSection0(undefined);
        setComparisonSection1(undefined);

        const section0 = await fetchData((Object.values(selectedPrograms))[0]);
        const section1 = await fetchData((Object.values(selectedPrograms))[1]);
        
        if(section0 !== undefined && section1 !== undefined){
            constructHighlights(section0.courseSections, false);
            constructHighlights(section1.courseSections, true);
        }
        setComparisonSection0(section0);
        setComparisonSection1(section1);
        setLoading(false);

    }


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
                            <button onClick={handleClick} className=' bg-[color:var(--yellow)] hover:text-white active:bg-yellow-300 w-1/5 h-12 rounded'>
                                Compare them!
                            </button>
                        }

                    </div>

                </div>  
            </>

            <div className=' hidden md:flex flex-col items-center shadow-sm border p-4 top-24 2xl:top-28 sticky h-[75vh] w-1/5 hide-scrollbar overflow-y-scroll'>
                
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
                    <button onClick={handleClick} className=' bg-[color:var(--yellow)] hover:text-white active:bg-yellow-300 w-4/5 h-12 rounded'>
                        Compare them!
                    </button>
                }
    
            </div>

            {
                showComparison &&
                <div ref={outsideRef} className=' py-4 fixed w-[90%] h-[75dvh] bg-white shadow-md border rounded'>

                    {
                        loading
                        ?
                            <div className='w-full h-[70vh]'>
                                <div className='absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]'>
                                    <LoadingCircle />
                                </div>
                            </div>
                        :
                            <>
                                <div className='flex justify-around h-full'>
                                    <Comparison data={comparisonSection0} highlights={highlights} name={(Object.values(selectedPrograms))[0].name} />
                                    <span className='h-full w-[1px] bg-gray-300'></span>
                                    <Comparison data={comparisonSection1} highlights={highlights} name={(Object.values(selectedPrograms))[1].name} />
                                </div>

                                <button onClick={closeComparison} className='absolute w-fit h-fit p-1 -top-2 -right-2 bg-red-300 rounded-full'>
                                    <AiOutlineClose size={20} />
                                </button>
                            </>
                    }
                    

                </div>
            }
        </>
    )
}

export default SelectedPrograms;