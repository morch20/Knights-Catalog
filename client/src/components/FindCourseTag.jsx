import React from 'react';
import CourseTag from './CourseTag';

const FindCourseTag = ({ text, newTab = true }) => {
    
    const matches = [...text.matchAll(new RegExp(/[A-Z]{3}(\s?)[0-9]{4}/, 'g'))];
    let values = [];
    
    const generateAddingIndex = (text) => {
        if( text[8] === 'C' || text[8] === 'H') return 9;
        return 8;
    }

    let first = true;
    let prev = 0;
    let addingIndex = 9;
    matches.forEach(i => {
        if(i.index === 0){
            addingIndex = generateAddingIndex(text.substring(i.index, i.index + 9));
            values.push(<CourseTag text={text.substring(i.index, i.index + addingIndex)} newTab={newTab} />);
            
            first = false;
        }
        else{
            if(first){
                values.push(<p>{text.substring(0, i.index)}</p>);
                first = false;
                addingIndex = generateAddingIndex(text.substring(i.index, i.index + 9));
                values.push(<CourseTag text={text.substring(i.index, i.index + addingIndex)} newTab={newTab} />);
                

            }
            else{
                values.push(<p>{text.substring(prev, i.index)}</p>)
                addingIndex = generateAddingIndex(text.substring(i.index, i.index + 9));
                values.push(<CourseTag text={text.substring(i.index, i.index + addingIndex)} newTab={newTab} />);
                
            }
        }

        prev = i.index + addingIndex;
    })
    values.push(<p>{text.substring(prev)}</p>);


    return (
        <>
            {
                values.map(i => i)
            }
        </>
    )
}

export default FindCourseTag;