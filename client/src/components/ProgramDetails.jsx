import React from 'react';
import FilterTags from './FilterTags';

const ProgramDetails = ({ text, p, h3, h2, li, h4, links, highlights }) => {
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

    arr?.forEach(element => {

        if(element === ""){
            //console.log("Empty element");
        }
        else if (li?.hasOwnProperty(element)) {
            tmpUl.push(<li className='list-disc my-2 ml-7'><FilterTags element={element} links={links} li highlights={highlights}/></li>);
        }
        else if (h4?.hasOwnProperty(element)) {
            emptyTmpUl();
            lst.push(<h4 className='text-xl font-bold'><FilterTags element={element} links={links} highlights={highlights}/></h4>);
        }
        else if (h3?.hasOwnProperty(element)) {
            emptyTmpUl();
            lst.push(<h3 className='text-2xl font-bold'><FilterTags element={element} links={links} highlights={highlights}/></h3>);
        }
        else if (h2?.hasOwnProperty(element)) {
            emptyTmpUl();
            lst.push(<h2 className='text-3xl font-bold'><FilterTags element={element} links={links} highlights={highlights}/></h2>);
        }
        else if (p?.hasOwnProperty(element)) {
            emptyTmpUl();
            lst.push(<p><FilterTags element={element} links={links} highlights={highlights}/></p>);
        }

        else {
            emptyTmpUl();
            lst.push(<p><FilterTags element={element} links={links} highlights={highlights}/></p>);
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