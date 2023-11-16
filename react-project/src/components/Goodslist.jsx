// 231116 오전 11:21 성민 작성
import React, { useState } from 'react'
import GoodsCard from './GoodsCard'
import Button from 'react-bootstrap/Button';
import Product from '../data/product_info.json';


const Goodslist = () => {
  // 필터될 카테고리명이 업데이트 될 State
   const[filter,setFilter] = useState('all');

  // 버튼 클릭시 물건들이 필터되어 나오기 위한 함수
   const productFilter = (category) =>{
    // 필터함수
    return Product.filter(item=>category === 'all' || item.PROD_CATEGORY === category)
    // 필터함수에서 걸러진 데이터로 map 으로 출력시키기
    // 일단 제품이름 / 이미지경로 / 가격 만 업데이트됨 별점은 좀더 생각해봐야할듯.
                  .map((item) => {
                    return(
                    <GoodsCard key={item.PROD_ID} name={item.PROD_NAME} src={item.PROD_THUMB} price={item.PROD_PRICE}/>
                    );
   })
   }


  return (
    <div style={{margin:"0% 10%"}}>
        <div style={{width:"100%",textAlign:"center"}}>
          {/* useState에 누르는 버튼에 따라 카테고리명이 업데이트됨 */}
        <Button variant="outline-dark" type="button" style={{margin: "10px 20px"}} onClick={()=>setFilter('all')}>전체</Button> 
        <Button variant="outline-dark" type="button" style={{margin: "10px 20px"}}  onClick={()=>setFilter('clothes')}>의류</Button> 
        <Button variant="outline-dark" type="button" style={{margin: "10px 20px"}}  onClick={()=>setFilter('living')}>생활용품</Button>
        <Button variant="outline-dark" type="button" style={{margin: "10px 20px"}}  onClick={()=>setFilter('phone_acc')}>모바일 악세서리</Button>
        </div>
        <div style={{display:"flex",flexFlow:"row wrap",justifyContent:'space-evenly'}}>
          {/* 제품필터링을 위한 함수 */}
          {productFilter(filter)}
        </div>
    </div>
  )
}

export default Goodslist