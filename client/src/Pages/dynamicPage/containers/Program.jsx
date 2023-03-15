import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useSearchParams } from 'react-router-dom';
import { LoadingCircle, Bubble } from '../../../components';
import ProgramDetails from '../components/ProgramDetails';
import DividerContent from '../components/DividerContent';
import Section from '../components/Section';


const Program = ({name}) => {

	const [searchParams] = useSearchParams();
	const college = searchParams.get('college');

	const [data, setData] = useState(null);
	const [sections, setSections] = useState([]);
	const [showMoreSkills, setShowMoreSkills] = useState(false);

	useEffect(() => {
		fetch('http://localhost:5000/undergraduate/program/' + name + '?college=' + college)
		.then(response => response.json())
		.then(currData => {
			console.log(currData);

			let lst = []
			const object = currData.documents[0].sections;
			for (const key in object) {
				if (object.hasOwnProperty(key)) {
					const section = object[key];
					
					const {p, h3, li, h2, h4, courseSections, links} = section["body"];
					
					if(courseSections === undefined){
						lst.push(
							<DividerContent title={key} text={section.body.text} />
						);
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
					}
				}
			}

			setData(currData.documents[0]);
			setSections(lst);
		})
		.catch(e => console.log(e))
	}, [])


	return (
		<>
			{
				data
				?
					<div>
						<Header
							title={data.programTitle} 
							description={data.header.subtitle}
							college={college}
							type='program'
							img={data.header.pictureLink}
						/>

						<div className='my-20 p-7 border w-full h-full'>

							<h3 className='text-gray-500 text-base mb-5 font-semibold'>SKILLS YOU WILL LEARN</h3>

							<div className='flex w-full h-full flex-wrap gap-5 mb-5'>
								{
									data.buttons.length > 12 && !showMoreSkills
									?

										data.buttons.slice(0, 12).map( i => {
											return <Bubble text={i} limit={25} gray/>
										})

									:
										data.buttons.map( i => {
											return <Bubble text={i} limit={25} gray/>
										})
										
								}
							</div>

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

						{
							sections.map(i => i)
						}
					</div>
				:
				<div className='w-full h-[70vh]'>
					<div className='absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]'>
						<LoadingCircle />
					</div>
				</div>
			}
		</>
	)
}

export default Program;