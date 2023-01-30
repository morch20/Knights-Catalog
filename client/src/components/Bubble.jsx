import React, {useState} from 'react'

const Bubble = ({text, gray = undefined, limit = 12}) => {

    const [shortenText, setShortenText] = useState(text.length > limit ? text.substring(0, limit) + " ..." : text);

    const shortenString = () => {
        if(shortenText.length > limit){
            const s = shortenText.substring(0, limit) + " ...";
            setShortenText(s);
        }
    }

  return (
        <p 
            className={' transition-all first-letter:capitalize text-center  px-5 py-1 m-1 w-fit h-fit rounded-xl text-sm font-medium '
                + (gray ? ' bg-gray-200 + text-gray-700' : ' bg-green-100 text-green-800')
            }
            onMouseOver={() => {setShortenText(text)}}
            onMouseLeave={shortenString}  
        >
            {shortenText}
        </p>
    )
}

export default Bubble;