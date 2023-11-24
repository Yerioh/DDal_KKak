import React from 'react'


const ImageAllCard = ({data}) => {
  console.log('123123',data)
  return (  
    <div className='allCard'>
      <img src={`${process.env.REACT_APP_AWS_BUCKET_URL}/${data.IMG_URL}`} />
    </div>
  )
}

export default ImageAllCard;