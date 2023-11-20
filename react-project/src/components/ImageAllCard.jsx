import React from 'react'
import Card from 'react-bootstrap/Card';

const ImageAllCard = ({num}) => {
  return (  
    <div>
      <Card.Img variant="top" src={`./images/${num}.png`} style={{margin:"5px 5px",width:"auto",height:"auto",maxWidth:"250px",maxHeight:"350px"}}/>
    </div>
  )
}

export default ImageAllCard;