import React from "react";
import Card from 'react-bootstrap/Card';
const SearchCard = ({num, index}) => {
    


  return (

      <Card className="mb-3 Card-div" style={{ width: "14rem" }}>
        <Card.Img variant="top" src={`./images/${num}.png`} />
        <Card.Body>
          <Card.Title>{index}</Card.Title>
        </Card.Body>
      </Card>
    
  );
};

export default SearchCard;
