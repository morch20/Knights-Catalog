import React, { useEffect } from 'react';
import { TbArrowBarToUp } from 'react-icons/tb';

const ScrollButton = ({ show, onScroll }) => {

    useEffect(() => {
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll)
    }, [onScroll]);

    return (
        <>
            {
                show &&
                <div
                    onClick={() => {
                        console.log(window.scrollY)
                        window.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: "smooth",
                        });
                    }}
                    className='w-fit ml-auto slide-up h-fit sticky bottom-10 cursor-pointer transition-all hover:p-4 hover:shadow-md p-3 active:bg-yellow-300 bg-[color:var(--yellow)] rounded-full '
                >
                    <TbArrowBarToUp size={25} color='#050040'/>
                </div>
            }
        </>
    )
}

export default ScrollButton;