import React from 'react';
import CourseTag from './CourseTag';
import { regexCodeWithSpace, regexCode } from '../utils/constants';

const FilterTags = ({element, links, li}) => {
    //console.log(element)
    let tab = <></>;
    let courseTag = <></>;
    if(element.substring(0,2) === "• "){
        element = element.replace("• ", "");
    }

    if(element.search(regexCode) === 0){
        tab = <>&nbsp;&nbsp;&nbsp;&nbsp;</>;
        courseTag = <CourseTag text={element.substring(0,8)} />
        element = (element[7] === "C" || element[7] === "L" || element[7] === "H" || element[7] === "K") ? element.substring(8, element.length): element.substring(7, element.length);
    }
    else if(element.search(regexCodeWithSpace) === 0){
        tab = <>&nbsp;&nbsp;&nbsp;&nbsp;</>;
        courseTag = <CourseTag text={element.substring(0,9)} />
        element = (element[8] === "C" || element[8] === "L" || element[8] === "H" || element[8] === "K") ? element.substring(9, element.length): element.substring(8, element.length);
    }
    else{
        if(links !== undefined){
            const {text, url} = links;
            
            for (const key in text) {
                const index = element.search(text[key]);

                if(index === -1) continue;

                let firstHalf = element.substring(0, index);
                const lastHalf = element.substring(index + text[key].length, element.length);
                return(
                    <>
                        {firstHalf?.split("\n").map(s =>
                            <>
                                {s}
                                <br/>
                            </> 
                            )}
                        <a 
                            className=' text-blue-500'
                            href={url[key]} 
                            target="_blank"
                        >
                            {text[key]}
                        </a>
                        {lastHalf?.split("\n").map(s =>
                            <>
                                {s}
                                <br/>
                            </> 
                            )}
                    </>
                )
            }
        }
    }   
    return (
        <>
            {(li) ? "": tab}
            {courseTag}
            {element}
        </>
    );
}

export default FilterTags;