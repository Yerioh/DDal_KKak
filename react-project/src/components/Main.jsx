import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';


const Main = () => {
  return (
    <div style={{margin:"0px 10%",minWidth:"751px"}}>
      
    <Container className='img-row-control'>
    <div style={{textAlign:"center", width:"100%",height:"30px"}}>
   <h3 style={{float:"left"}}>AI 생성 이미지</h3>
   <Link to={'/imageall'}>
   <Button variant="outline-dark" style={{float:"right"}}>더보기</Button>
   </Link>
   </div>
   <br />
     {/* 메인페이지 AI로 생성된 이미지 */}
   <Row>
     <Col className='product-cover'>
       <Card.Img variant="top" src="./images/1.png" style={{width:"auto",height:"auto",maxWidth:"300px",maxHeight:"300px"}}/>
     </Col>
     <Col className='product-cover'>
       <Card.Img variant="top" src="./images/2.png" style={{width:"auto",height:"auto",maxWidth:"300px",maxHeight:"300px"}}/>
     </Col>
     <Col className='product-cover'>
         <Card.Img variant="top" src="./images/3.png" style={{width:"auto",height:"auto",maxWidth:"300px",maxHeight:"300px"}}/>
     </Col>
     <Col className='product-cover'>
     <Card.Img variant="top" src="./images/4.png" style={{width:"auto",height:"auto",maxWidth:"300px",maxHeight:"300px"}}/>
     </Col>
   </Row>
 </Container>
 <Container className='img-row-control'>
 <div style={{width:"100%",height:"30px"}}>
   <h3 style={{float:"left"}}>굿즈 제작 이미지</h3>
   <Link to={'/goodslist'}>
   <Button variant="outline-dark" style={{float:"right"}}>더보기</Button>
   </Link>
   </div>
   <br />
   {/* 메인페이지 굿즈 노출 */}
   <Row className='img-row-control'>
     <Col className='product-cover'>
     <Card.Img variant="top" src="./images/GM1_누끼.png" style={{width:"auto",height:"auto",maxWidth:"250px",maxHeight:"350px"}}/>
     </Col>
     <Col className='product-cover'>
       <Card.Img variant="top" src="./images/GM2_누끼.png" style={{width:"auto",height:"auto",maxWidth:"250px",maxHeight:"350px"}}/>
     </Col>
     <Col className='product-cover'>
       <Card.Img variant="top" src="./images/GM3_누끼.png" style={{width:"auto",height:"auto",maxWidth:"250px",maxHeight:"350px"}}/>
     </Col>
     <Col className='product-cover'>
       <Card.Img variant="top" src="./images/GM1_누끼.png" style={{width:"auto",height:"auto",maxWidth:"250px",maxHeight:"350px"}}/>
     </Col>
   </Row>
   </Container>
 </div>
  )
}

export default Main