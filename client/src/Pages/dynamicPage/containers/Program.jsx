import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useSearchParams } from 'react-router-dom';
import { LoadingCircle, Bubble } from '../../../components';
import notFound from '../../../assets/search.svg';
import DividerContent from '../components/DividerContent';
import Section from '../components/Section';
import { regexNotWord } from '../../../utils/constants';


const Program = ({name}) => {

	const [searchParams] = useSearchParams();
	const college = searchParams.get('college');

	const [data, setData] = useState(null);
	const [outlineData, setOutlineData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [sections, setSections] = useState([]);
	const [showMoreSkills, setShowMoreSkills] = useState(false);

	useEffect(() => {
		setLoading(true);
		fetch('http://localhost:5000/undergraduate/program/' + name + '?college=' + college)
		.then(response => response.json())
		.then(currData => {
			console.log(currData);

			let lst = []
			let outlineLst = [];
			const object = currData.documents[0].sections;
			for (const key in object) {
				if (object.hasOwnProperty(key)) {
					const section = object[key];
					
					const {p, h3, li, h2, h4, courseSections, links} = section["body"];
					
					if(courseSections === undefined){
						lst.push(
							<DividerContent title={key} text={section.body.text} />
						);
						outlineLst.push(key);
					}
					
					else{
						lst.push(
							<Section 
								section={courseSections}
								p={p}
								li={li} 
								h3={h3}
								h2={h2}
								h4={h4}
								links = {links}
								title={section.title}
								headers={section.body.headers}
								grandTotalCredits={section.body.grandTotalCredits}
							/>
						);
						outlineLst.push(section.title);
					}
				}
			}
			setLoading(false);
			setData(currData.documents[0]);
			setOutlineData(outlineLst);
			setSections(lst);
		})
		.catch(e => {
			console.log(e);
			setLoading(false);
		})
	}, [])


	return (
		<>
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
						{
							data
							?
								<div className=' scroll-smooth'>
									<Header
										title={data.programTitle} 
										description={data.header.subtitle}
										college={college}
										type='program'
										img={data.header.pictureLink}
									/>

									{
										data?.buttons &&
										<div className='my-20 p-7 border w-full h-full'>

											<h3 className='text-gray-500 text-base mb-5 font-semibold'>SKILLS YOU WILL LEARN</h3>

											<div className='flex w-full h-full flex-wrap gap-5 mb-5'>
												{
													data.buttons?.length > 12 && !showMoreSkills
													?

														data.buttons.slice(0, 12).map( i => {
															return <Bubble text={i} limit={25} gray/>
														})

													:
														data?.buttons?.map( i => {
															return <Bubble text={i} limit={25} gray/>
														})
														
													}
													{
														data.buttons.length > 12 &&
														<p
															onClick={() => setShowMoreSkills(!showMoreSkills)} 
															className='text-blue-500 cursor-pointer'
														>
															{
																showMoreSkills ? 'Show less' : 'Show all'
															}
														</p>
													}														
											</div>
										</div>
									}
									<div className='flex justify-between relative'>
										<div className='h-full w-3/4'>
											{
												sections.map(i => i)
											}
										</div>

										<div className=' hidden p-8 border md:block top-24 2xl:top-28 sticky h-full w-1/5'>
											<h3 className='text-xl font-semibold'>Sections</h3>
											<ul className='p-4'>
												{
													outlineData.map(i => {
														return(
															<li className=' list-disc'>
																<p 
																	className='text-blue-500 xl:text-lg cursor-pointer '
																	onClick={() => {
																		let section = document.querySelector( `#${i.replaceAll(regexNotWord, '')}` );
																		section.scrollIntoView({behavior: 'smooth', block: "start"})
																	}}		
																>
																	{i}
																</p>
															</li>
														)
													})
												}
											</ul>
											
										</div>
									</div>
								</div>
							:
								<div className=' mx-auto w-full xsm:w-3/4 sm:w-1/2 2xl:w-1/4 flex-1 flex flex-col justify-around '>
									<h2 className='text-2xl text-center font-bold'>
										Page not found :/
									</h2>
									<img src={notFound} alt="Not found" />
								</div>
						}
					</>

			}
		</>
	)
}

export default Program;