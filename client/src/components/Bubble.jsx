import React, {useState} from 'react'

const Bubble = ({text, limit = 12}) => {

    const [shortenText, setShortenText] = useState(text.length > limit ? text.substring(0, limit) + " ..." : text);

    const shortenString = () => {
        if(shortenText.length > limit){
            const s = shortenText.substring(0, limit) + " ...";
            setShortenText(s);
        }
    }

  return (
        <p 
            className='text-center bg-green-100 px-5 py-1 m-1 w-fit h-fit rounded-xl text-sm font-medium text-green-800'
            onMouseOver={() => {setShortenText(text)}}
            onMouseLeave={shortenString}  
        >
            {shortenText}
        </p>
    )
}

export default Bubble;