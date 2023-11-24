// 231116 오전 11:21 성민 작성
import React, { useEffect, useState } from 'react'
import GoodsCard from './GoodsCard'
import Button from 'react-bootstrap/Button';
import axios from '../axios'

const Goodslist = () => {
  // 필터될 카테고리명이 업데이트 될 State
   const[filter, setFilter] = useState('all');
   const [isLoading, setIsLoading] = useState(false) // 데이터 로딩 스테이트
   const [product, setProduct] = useState([])

   useEffect(() => {
    axios.post("/page/goods")
    .then((res) => {
      setIsLoading(res.data.isLoading)
      setProduct(res.data.result)
    })
   }, [])

  // 버튼 클릭시 물건들이 필터되어 나오기 위한 함수
   const productFilter = (category) =>{
    // 필터함수
    return product.filter(item=>category === 'all' || item.PROD_CATEGORY === category)
    // 필터함수에서 걸러진 데이터로 map 으로 출력시키기
    // 일단 제품이름 / 이미지경로 / 가격 만 업데이트됨 별점은 좀더 생각해봐야할듯.
                  .map((item) => {
                    // 23-11-17 09:40 상품 카테고리, 가격 단위 임휘훈 작성
                    let cate = ""
                    if (item.PROD_CATEGORY === "clothes"){
                      cate = "의류"
                    }
                    else if(item.PROD_CATEGORY === "living"){
                      cate = "생활용품"
                    }
                    else if(item.PROD_CATEGORY === "phone_acc"){
                      cate = "휴대폰 액세서리"
                    }
                    let price = item.PROD_PRICE.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
                    return(
                    <GoodsCard key={item.PROD_ID} name={item.PROD_NAME} src={item.PROD_THUMB} price={price} cate={cate} PROD_ID={item.PROD_ID}/>
                    );
   })
   }


  return (
    <div style={{margin:"0% 10%"}}>
        {isLoading === true ? (<div>
        <div style={{width:"100%", textAlign:"center", marginTop:"2%", marginBottom: "1%"}}>
          {/* useState에 누르는 버튼에 따라 카테고리명이 업데이트됨 */}
        <Button variant="outline-dark" type="button" style={{margin: "10px 20px"}} onClick={()=>setFilter('all')}>전체</Button> 
        <Button variant="outline-dark" type="button" style={{margin: "10px 20px"}}  onClick={()=>setFilter('clothes')}>의류</Button> 
        <Button variant="outline-dark" type="button" style={{margin: "10px 20px"}}  onClick={()=>setFilter('living')}>생활용품</Button>
        <Button variant="outline-dark" type="button" style={{margin: "10px 20px"}}  onClick={()=>setFilter('phone_acc')}>휴대폰 액세서리</Button>
        </div>
        <div style={{display:"flex",flexFlow:"row wrap",justifyContent:'space-evenly'}}>
          {/* 제품필터링을 위한 함수 */}
          {productFilter(filter)}
          </div>
        </div>)
        : "로딩중"}
    </div>
  )
}

export default Goodslist