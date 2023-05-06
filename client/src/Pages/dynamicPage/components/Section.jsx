import React from 'react';
import ProgramDetails from './ProgramDetails';
import { regexNotWord } from '../../../utils/constants';

const Section = ({ section, p, li, h3, h2, h4, links, title, grandTotalCredits, headers }) => {

	let lst = [];
	let count = 0;
	let prevCount = -1;

	for (const key in section) {
				
		if (section.hasOwnProperty(key)) {
			const currentCourseSection = section[key];
	
			for (const key in currentCourseSection) {
				if (currentCourseSection.hasOwnProperty( key)) {
					if(key === "header") continue;
					const text = currentCourseSection[key];
					//if(key === "")continue;
					lst.push(
						<div>
							{
								prevCount !== count && headers && headers[`header${count}`] &&
								<div className=' bg-stone-200/30 my-2 p-2 text-gray-700'>
									<h4 className=' text-lg md:text-xl'>
										{headers['header'+count].text}
									</h4>
									{
										headers['header'+count].credits &&
										<p>
											{headers['header'+count].credits}
										</p>
									}
								</div>
							}
							<ProgramDetails 
								p={p} 
								text={text} 
								li={li} 
								h3={h3}
								h2={h2}
								h4={h4}
								links = {links}
							>
							</ProgramDetails>
							<br/>
						</div>
					);
					prevCount = count;
				}   	
			}
			count++;
		}
	}
	

  	return (
    	<div className='my-8 scroll-m-28' id={title.replaceAll(regexNotWord, '')}>

			<div className='my-2'>
				<h3 className='my-1 text-xl md:text-2xl'>
					{title}
				</h3>
				<hr />
			</div>

			{
				lst.map(i => i)
			}

			<h4 className='font-semibold text-lg'>
				{grandTotalCredits}
			</h4>
		</div>
  	)
}

export default Section;