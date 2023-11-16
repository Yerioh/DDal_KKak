// 231116 오전 11:21 성민 작성
import React from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';

const GoodsCard = ({name,src,price}) => {
  return (
    <div style={{margin:"5px 5px"}}>
    <Link to={'/goodsdetail'} style={{textDecoration:"none"}}>
    <Card style={{ width: '18rem',textAlign:"center",border:"none"}} >
        {/* 제품 이미지 */}
    <div style={{textAlign:"center"}}>
    <Card.Img variant="top" src={src} style={{width:"auto",height:"auto",maxWidth:"250px",maxHeight:"350px"}}/>
    </div>
    <Card.Body>
        {/* 제품명 */}
      <Card.Title>
        <h4>{name}</h4>
        </Card.Title> 
    </Card.Body>
    
    <ListGroup>
        {/* 제품 가격 */}
        <div style={{display:"flex", broder:"none"}}>
      <p style={{width:"50%" , }}>{price}</p>
      <p style={{width:"50%" , }}>별점 0.00점</p>
      </div>
    </ListGroup>
  </Card> 
  </Link>
  </div>
  )
}

export default GoodsCard