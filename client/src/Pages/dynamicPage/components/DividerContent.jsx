import React from 'react';
import { regexNotWord } from '../../../utils/constants';

const DividerContent = ({ title, text, children }) => {

    if(!text && !title) return;

    return (
        <div className='my-8 scroll-m-28' id={title.replaceAll(regexNotWord, '')}>
            <h3 className='my-1 text-xl md:text-2xl'>
                {title}
            </h3>
            <hr/>
            <p className='my-1 text-gray-700 md:text-lg'>
                {
                    !text
                    ?
                        children
                    :
                        text
                }
            </p>
        </div>
    )
}

export default DividerContent;