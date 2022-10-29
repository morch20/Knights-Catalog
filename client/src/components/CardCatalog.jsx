import React from 'react';
import Bubble from './Bubble';

const CardCatalog = ({ data }) => {
  return (
    <div className=' w-[18rem] h-[20rem] bg-white rounded-md shadow-lg cursor-pointer'>

        <img src={data.header.pictureLink} alt="picture" className='rounded-t-md w-full h-[30%]' />

        <div className='p-5 h-[65%]'>
            <div className='flex flex-col justify-between h-full'>
                <div>
                    <h1 className='font-semibold mb-3'>{data.header.title}</h1>
                    <h3 className=' text-sm text-gray-600'>{  data.header.subtitle}</h3>
                </div>

                <Bubble text={data.type}/>

            </div>
        </div>
    </div>
  )
}

export default CardCatalog;