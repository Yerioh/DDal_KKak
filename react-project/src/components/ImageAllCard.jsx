import React from 'react'


const ImageAllCard = ({num}) => {
  return (  
    <div className='allCard'>
      <img src={`./images/${num}.png`} />
    </div>
  )
}

export default ImageAllCard;