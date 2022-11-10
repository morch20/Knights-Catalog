import React from 'react';
import { AiOutlineLoading } from 'react-icons/ai';

const LoadingCircle = ({ color = '#050040', size = 70 }) => {
  return (
    <div className=' animate-spin '>
      <AiOutlineLoading 
        color={color} 
        size={size} 
      />
    </div>
  )
}

export default LoadingCircle;