import React, { useEffect } from 'react';
import { collegesColors } from '../utils/constants';
import AOS from 'aos';
import Bubble from './Bubble';

const CardCatalog = ({ data, course }) => {

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  if(course){
    return (
      <div data-aos="zoom-in-up" className='w-full max-w-[18rem] h-[20rem] bg-white rounded-md shadow-lg cursor-pointer'>

      <div
        
        className={'rounded-t-md w-full h-[30%] object-cove ' + collegesColors[data.College.text]}
      />

      <div className='p-5 h-[65%]'>
          <div className='flex flex-col justify-between h-full'>
              <div>
                  <h1 className='font-semibold mb-3'>{data.name}</h1>
                  <h3 className='text-sm text-gray-600 overflow-hidden text-ellipsis'>
                      {data['Course Description'] && data['Course Description'].text &&
(                        (data['Course Description'].text.length > 70)
                        ?
                        data['Course Description'].text.substring(0,69) + "..."
                        :
                        data['Course Description'].text)
                      }
                  </h3>
              </div>

              <Bubble text={data.level}/>

          </div>
      </div>
  </div>
    )
  }

  return (
    <div data-aos="zoom-in-up" className='w-full max-w-[18rem] h-[20rem] bg-white rounded-md shadow-lg cursor-pointer'>

        <img 
          src={data.header.pictureLink || 'https://images.pexels.com/photos/13814635/pexels-photo-13814635.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} 
          alt="picture" 
          className='rounded-t-md w-full h-[30%] object-cover' 
        />

        <div className='p-5 h-[65%]'>
            <div className='flex flex-col justify-between h-full'>
                <div>
                    <h1 className='font-semibold mb-3'>{data.header.title}</h1>
                    <h3 className=' text-sm text-gray-600'>{  data.header.subtitle}</h3>
                </div>

                <Bubble text={data.program}/>

            </div>
        </div>
    </div>
  )
}

export default CardCatalog;