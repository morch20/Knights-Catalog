import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
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
			<Link
				to={'/' + data.name + '?type=' + data.type}
				data-aos="zoom-in-up" 
				className='w-full max-w-[18rem] h-[20rem] bg-white rounded-md shadow-lg cursor-pointer '
			>

				<div className={'rounded-t-md w-full h-[30%] object-cove ' + collegesColors[(data.college === 'The Burnett Honors College') ? 'Burnett Honors College' : data.college]}/>

				<div className='p-5 h-[65%]'>
					<div className='flex flex-col justify-between h-full'>
						<div>
							<h1 className='font-semibold mb-3'>{data.name}</h1>
							<h3 className='text-sm text-gray-600 overflow-hidden text-ellipsis'>
								{data['description']&&
									((data['description'].length > 70)
									?
									data['description'].substring(0,69) + "..."
									:
									data['description'])
								}
							</h3>
						</div>

						<Bubble text={data.level}/>

					</div>
				</div>
			</Link>
		)
	}

	return (
		<Link 
			to={'/' + data.name + '?type=' + data.type + '&college=' + data.college}
			data-aos="zoom-in-up" 
			className='w-full max-w-[18rem] h-[20rem] bg-white rounded-md shadow-lg cursor-pointer'
		>

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
		</Link>
	)
}

export default CardCatalog;