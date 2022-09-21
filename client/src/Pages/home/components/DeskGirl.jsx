import React from "react";
import girl from '../assets/DeskGirl.svg';
import thinkingBubble from '../assets/ThinkingBubble.svg';

const DeskGirl = () => {
    return (
        <div className="relative w-auto h-full">
            <img
                className="absolute top-[5%] left-[50%] scale-up-center-infinite-1"
                src={thinkingBubble}
                alt='Thinking Bubble'
            />
            <img 
                src={girl} 
                alt="Desk Girl" 
            />
        </div>

    )
}

export default DeskGirl;
