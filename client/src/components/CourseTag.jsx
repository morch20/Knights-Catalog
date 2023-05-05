import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useOutsideClick } from '../hooks';
import { AiFillStar } from 'react-icons/ai';
import { FindCourseTag, LoadingCircle } from './';
import face5 from '../assets/face-smile-big-svgrepo-com.svg';
import replaceSymbol from '../utils/functions';

const CourseTag = ({ text, newTab = false }) => {
	
	text = text.split(' ').join('');
	const [open, setOpen] = useState(false);
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);
	const code = JSON.parse(localStorage.getItem('codes'));
	const starts = [1,2,3,4,5];

	const openRef = useOutsideClick(() => setOpen(false));

	if(newTab){
		return(
			<a 
				href={"http://localhost:3000/" + text + "?type=course"} 
				target= "_blank" 
				rel="noreferrer"
				className='text-blue-500 cursor-pointer inline '
			>
				{text}
			</a>
		)
	}

	const fetchData = () => {
		if(data === null){

			setLoading(true);
			const fetchCode = replaceSymbol( code[text.substring(0,3)], '&', 'ampersand');

			fetch('http://localhost:5000/undergraduate/courses/' + text + '?code=' + fetchCode)
				.then(response => response.json())
				.then(info => {

					let tmpData = {
						array: []
					};

					for (const key in info[0]) {

						if (Object.hasOwnProperty.call(info[0], key)) {

							const element = info[0][key];

							if(key === 'College' || key === 'Department' || key === '_id'){
								continue;
							}
							
							if(key === 'name'){
								tmpData.name = element;
							}

							else if(key === 'Course Description'){
								tmpData.courseDescription = element.text;
							}

							else{
								tmpData.array.push(element);
							}
						}
					}
					console.log(tmpData);
					setLoading(false);
					setData(tmpData);
				})
				.catch(e => {
					console.log(e);
					setLoading(false);
				})
		}
	}

  	return (
    	<div ref={openRef} className='inline relative'>
            <p
				onClick={() => {
					setOpen(!open);
					fetchData();
				}}
				className='text-blue-500 cursor-pointer inline '
			>
				{text}
			</p>

			{
				open &&
				<>
					{
						loading
						?
							<div className='absolute top-5 border border-gray-300 bg-stone-200 shadow-md rounded min-h-[10rem] h-fit w-[80vw] xsm:w-[75vw] z-[2] p-5'>
								<div className='w-fit mx-auto h-full'>
									<LoadingCircle />
								</div>
							</div>
						:
							<div className='absolute top-5 border border-gray-300 flex flex-col justify-between bg-stone-200 shadow-md rounded min-h-[10rem] h-fit w-[80vw] xsm:w-[75vw] z-[2] p-5'>
								<div className='flex'>

									<div className='flex flex-col items-center'>
										<div className='w-16 h-16 md:w-20 md:h-20 border bg-white flex items-center justify-center'>
											<img
												src={face5}
												alt="rating face"
												className='w-3/4 h-3/4'
											/>
										</div>
										{/* Ratings */}
										<div className='flex items-center mt-1'>
											{
												starts.map(i => {
													return(
														<div className='w-3 h-3 xsm:w-4 xsm:h-4'>
															<AiFillStar color='gold' style={{width: '100%', height: '100%'}} />
														</div>
													)
												})
											}
										</div>
									</div>
									<Link
										target="_blank" 
										rel="noopener noreferrer"
										to={'/' + data?.name + '?type=course'}
										className='mt-2 text-blue-500 transition-all text-lg md:text-2xl font-semibold ml-5'
									>
										<p>{data?.name?.split(' - ')[0] + ' -'}</p>
										<p>{data?.name?.split(' - ')[1]}</p>
									</Link>
								</div>
								<div className='flex text-sm md:text-base flex-wrap gap-x-3 my-5 '>
									
									{
										data?.array.map(i => {
											return(
												<div className='flex flex-wrap gap-x-1'>
													<p className=' text-gray-800 font-bold'>{i.title + ':'}</p>
													{/* <p className='text-red-500'>{i.text}</p> */}
													<FindCourseTag text={i.text} />
												</div>
											)
										})
									}
								</div>
								{
									data?.courseDescription &&
									<p className=' font-bold'>Course Description:</p>
								}
								{data?.courseDescription}
							</div>
					}
				</>
			}
        </div>
  	)
}

export default CourseTag;