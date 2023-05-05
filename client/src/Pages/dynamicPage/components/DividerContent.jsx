import React from 'react';

const DividerContent = ({ title, text, children }) => {

    if(!text && !title) return;

    return (
        <div className='my-8'>
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