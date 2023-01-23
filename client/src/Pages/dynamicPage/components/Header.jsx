import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import { BsFillHandThumbsUpFill } from 'react-icons/bs';
import { collegesColors } from '../../../utils/constants';
import { Bubble } from '../../../components';

const Header = ({ title, college, description, course }) => {
    
    college = (college === 'The Burnett Honors College') ? 'Burnett Honors College' : college;
    const color = collegesColors[college];
    const headerHeight = ' h-[30rem] xsm:h-[30rem] ';
    const starts = [1, 2, 3, 4, 5];

    return (
        <div className={' overflow-x-clip py-10' + headerHeight }>
            <span className={'absolute -z-[5] left-0 top-0 w-full my-[100px] header-gradient ' + headerHeight } />
            <span className={'absolute -z-10 left-0 top-0 w-full my-[100px] ' + color + headerHeight }/>

            <div className='text-center md:text-start w-full lg:w-1/2 text-white'>

                <h2 className='text-2xl xsm:text-3xl md:text-4xl font-medium'>{title}</h2>

                {/* Ratings */}
                <div className='flex flex-wrap gap-3 xsm:gap-5 w-full md:w-4/5 items-center my-6'>

                    <div className='flex items-center'>
                        {
                            starts.map(i => {
                                return(
                                    <div className='w-3 h-3 xsm:w-5 xsm:h-5'>
                                        <AiFillStar color='gold' style={{width: '100%', height: '100%'}} />
                                    </div>
                                )
                            })
                        }
                        <p className=' pl-2 text-yellow-500 text-base xsm:text-lg font-bold'>{starts.length}</p>
                    </div>


                    <p className='text-sm xsm:text-base'>4,454 ratings </p>

                    <div className='flex items-center'>
                        <BsFillHandThumbsUpFill color='gold'/>
                        <p className='pl-2 text-sm xsm:text-base'>95%</p>
                    </div>

                </div>

            </div>

            <div className='w-full md:w-4/5 lg:w-3/5 text-white mt-10 xsm:mt-20 mb-8'>
                <h3 className='text-xl md:text-2xl '>{description.title}</h3>
                <p className=' text-sm xsm:text-base md:text-lg mt-3 xsm:mt-5'>{description.text}</p>
            </div>

            {
                
                course &&
                <Bubble text={ (parseInt(title[3]) <= 4 ) ? 'Undergraduate' : 'Graduate'} limit={20} />
            }

        </div>
    )
}

export default Header;