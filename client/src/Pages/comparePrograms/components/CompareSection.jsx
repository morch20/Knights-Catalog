import React from 'react';
import ProgramDetails from '../../../components/ProgramDetails';


const CompareSection = ({ section, highlights }) => {

    const headers  = section?.headers;
    const courseSections = section?.courseSections;

    let lst = [];
	let count = 0;
	let prevCount = -1;

	for (const key in courseSections) {
				
		if (courseSections.hasOwnProperty(key)) {
			const currentCourseSection = courseSections[key];
	
			for (const key in currentCourseSection) {
				if (currentCourseSection.hasOwnProperty(key)) {
					if(key === "header") continue;
					const text = currentCourseSection[key];
					//if(key === "")continue;
					lst.push(
						<div>
							{
								prevCount !== count && headers && headers[`header${count}`] &&
								<div className=' bg-stone-200/30 my-2 p-2 text-gray-700'>
									<h4 className=' text-lg 2xl:text-xl'>
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
                            <ProgramDetails text={text} highlights={highlights} />
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
        <div>{lst.map(i => i)}</div>
    )
}

export default CompareSection;