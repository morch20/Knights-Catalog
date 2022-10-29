import React from "react";
import girl from '../assets/DeskGirl.svg';
import thinkingBubble from '../assets/ThinkingBubble.svg';

const DeskGirl = () => {
    return (
        <div className="relative w-auto h-full 2xl:min-w-[30rem] 2xl:min-h-[30rem] 2xl:mr-20">
            <img
                className="absolute top-[5%] left-[50%] scale-up-center-infinite-1 2xl:w-20 2xl:h-20"
                src={thinkingBubble}
                alt='Thinking Bubble'
            />
            <img 
                src={girl} 
                alt="Desk Girl" 
                className="2xl:w-full 2xl:h-full"
            />
        </div>

    )
}

export default DeskGirl;
