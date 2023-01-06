import React, { useState, useRef } from 'react';
import { useOutsideClick } from '../hooks';
import { IoMdArrowDropdown } from 'react-icons/io';

const DropDown = ({ title, options, update, remove, values }) => {

    const buttonRef = useRef();
    const outsideRef = useOutsideClick(() => {
        setOpen(false);
    }, [buttonRef]);

    const [open, setOpen] = useState(false);

    return (
        <div className='relative min-w-[10rem]'>
            <button
                ref={buttonRef}
                onClick={() => setOpen(!open)}
                className='border border-gray-300 focus:border-[color:var(--yellow)] my-4 rounded p-4 w-full text-sm flex justify-between items-center'
            >
                {title}
                <IoMdArrowDropdown size={20} color='050040'/>
            </button>

            {
                open &&
                <div ref={outsideRef} className='bg-white border p-3 shadow-md z-10 absolute rounded max-h-72 overflow-y-scroll top-16 min-w-full w-max max-w-[422px]'>
                    {
                        options.map(o => {
                            return(
                                <div className=' text-lg my-4 flex items-center w-full'>
                                    <CheckBox
                                        o={o}
                                        title={title}
                                        update={update}
                                        remove={remove}
                                        values={values}
                                    />
                                    <label htmlFor={o} className='px-2 text-base'>
                                        {o}
                                    </label>
                                </div>
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}

export default DropDown;

const CheckBox = ({ o, title, update, remove, values }) => {

    const flag = (Object.hasOwn(values, title) && values[title].find(i => i === o)) ? true : false;

    const [isChecked, setIsChecked] = useState(flag);

    return(
        <input
            value={o} 
            type="checkbox" 
            name={o} 
            id={title}
            checked={isChecked}
            onChange={e => {
                if(!isChecked){
                    update(e.target.value, e.target.id);
                }
                else{
                    remove(e.target.value, e.target.id);
                }
                setIsChecked(!isChecked);
            }}
        />
    )
}