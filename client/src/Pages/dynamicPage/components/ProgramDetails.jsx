import React from 'react';
import CourseTag from './CourseTag';

const ProgramDetails = ({ text, p, h3, h2, li, h4, links }) => {

    const arr = text?.split("\n");
    let lst = [];
    let tmpUl = [];

    const emptyTmpUl = () => {
        if (tmpUl.length === 0) return;

        lst.push(
            <ul>
                {tmpUl.map(i => i)}
            </ul>
        )
        tmpUl = [];
    }

    const filterTags = (element, li) => {
        let tab = <></>;
        const regexCodeWithSpace = /[A-Z]{3}\s[0-9]{4}/;
        const regexCode = /[A-Z]{3}[0-9]{4}/;
        let courseTag = <></>;

        if(element.search(regexCode) === 0){
            tab = <>&nbsp;&nbsp;&nbsp;&nbsp;</>;
            courseTag = <CourseTag text={element.substring(0,8)} />
            element = (element[7] === "C" || element[7] === "L") ? element.substring(8, element.length): element.substring(7, element.length);
        }
        else if(element.search(regexCodeWithSpace) === 0){
            tab = <>&nbsp;&nbsp;&nbsp;&nbsp;</>;
            courseTag = <CourseTag text={element.substring(0,9)} />
            element = (element[8] === "C" || element[8] === "L") ? element.substring(9, element.length): element.substring(8, element.length);
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

    arr?.forEach(element => {

        if(element === ""){
            //console.log("Empty element");
        }
        else if (li?.hasOwnProperty(element)) {
            tmpUl.push(<li className='list-disc my-2 ml-7'>{filterTags(element, true)}</li>);
        }
        else if (h4?.hasOwnProperty(element)) {
            emptyTmpUl();
            lst.push(<h4 className='text-xl font-bold'>{filterTags(element, false)}</h4>);
        }
        else if (h3?.hasOwnProperty(element)) {
            emptyTmpUl();
            lst.push(<h3 className='text-2xl font-bold'>{filterTags(element, false)}</h3>);
        }
        else if (h2?.hasOwnProperty(element)) {
            emptyTmpUl();
            lst.push(<h2 className='text-3xl font-bold'>{filterTags(element, false)}</h2>);
        }
        else if (p?.hasOwnProperty(element)) {
            emptyTmpUl();
            lst.push(<p>{filterTags(element, false)}</p>);
        }

        else {
            emptyTmpUl();
            lst.push(<p>{filterTags(element, false)}</p>);
        }
    });

    emptyTmpUl();

    return (
        <>
            {
                lst?.map(item => item)
            }
        </>
    );
}


export default ProgramDetails;