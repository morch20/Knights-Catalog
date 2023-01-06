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

    filtersP = [
        {
            title: 'Type',
            options: ['Program', 'Course', 'Rating']
        },
        {
            title: 'College',
            options: [
                "College of Arts and Humanities",
                "College of Business Administration",
                "College of Community Innovation and Education",
                "College of Engineering and Computer Science",
                "College of Sciences",
                "College of Health Professions and Sciences",
                "College of Nursing",
                "College of Medicine",
                "College of Optics and Photonics",
                "College of Undergraduate Studies",
                "Rosen College of Hospitality Management",
                "Burnett Honors College"
            ]
        },
        {
            title: 'Department',
            options: [
                'Department of English',
                'Department of History',
                'Department of Modern Languages and Literatures',
                "Department of Philosophy",
                'Department of Writing and Rhetoric',
                "Program in Women’s and Gender Studies",
                'School of Performing Arts',
                'School of Visual Arts and Design',
                'Department of Economics',
                'Department of Finance',
                'Department of Integrated Business',
                'Department of Management',
                'Department of Marketing',
                'Dr. P. Phillips School of Real Estate',
                'Kenneth G. Dixon School of Accounting',
                'Department of Counselor Education and School Psychology',
                'Department of Criminal Justice',
                'Department of Educational Leadership and Higher Education',
                'Department of Learning Sciences and Educational Research',
                'Department of Legal Studies',
                'School of Global Health Management and Informatics',
                'School of Public Administration',
                'School of Teacher Education',
                'Department of Civil, Environmental, and Construction Engineering',
                'Department of Computer Science',
                'Department of Electrical and Computer Engineering',
                'Department of Industrial Engineering and Management Systems',
                'Department of Materials Science and Engineering',
                'Department of Mechanical and Aerospace Engineering',
                'Reserve Officer Training Corp: Air Force ROTC',
                'Reserve Officer Training Corp: Army ROTC',
                'Department of Health Sciences',
                'School of Communication Sciences and Disorders',
                'School of Kinesiology and Physical Therapy',
                'School of Social Work',
                'Burnett School of Biomedical Sciences',
                'Department of Anthropology',
                'Department of Biology',
                'Department of Chemistry',
                'Department of Mathematics',
                'Department of Physics',
                'Department of Psychology',
                'Department of Sociology',
                'Department of Statistics and Data Science',
                'Nicholson School of Communication and Media',
                'School of Politics, Security, and International Affairs',
                'Department of Interdisciplinary Studies',
                'Department of Foodservices and Lodging Management',
                'Department of Hospitality Services',
                'Department of Tourism, Events and Attractions'
            ]
        }
    ];

    const [filters, setFilters] = useState(filtersP);

    const update = async (option, title) => {

        
        if(option === 'Course'){
            fetch('http://localhost:5000/undergraduate/codes')
            .then(response => response.json())
            .then(data => {
                setFilters([...filters, {title: 'Code', options: Object.keys(data).sort()}])
            })
            .catch(e => console.log(e));
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
        else setSelectedFilters(selectedFilters.filter(i => i.option !== option));
    }

    const clear = () => {
        setPage(0);
        value.current = {};
        setSelectedFilters([]);
        setOpen(false);
        setFilters(filters.filter( i => i.title !== 'Code'));
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
            className={'md:hidden transition duration-500 ease-out bg-white p-3 w-32 rounded-md border md:border-2 flex justify-between items-center ' + (open ? 'border-[color:var(--purple)] text-[color:var(--purple)]' : '')}
            >
            Filters
            <VscSettings size={20} />
        </button>

        {
            open &&
                <div
                    ref={dialogRef}
                    className=' bg-[#f9f9f9] p-5 w-full my-1 min-h-[10rem] shadow-md border rounded-md'
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

        <div className=' hidden p-5 w-full my-1 min-h-[10rem] md:block'>

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
            
            <div className='w-full h-1/2 flex flex-wrap gap-5 mt-10 md:mt-0'>

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