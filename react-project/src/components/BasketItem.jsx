// 제품 상세페이지에서 넣은 정보 불러와 그에 맞게 조정되는기능까지 구현 2023/11/17 조성민
import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import COLOR from '../data/prd_color.json'
import PRD_SIZE from '../data/prd_size.json'
import PRD_INFO  from '../data/product_info.json'

const Basketitems = ({items}) => {

    console.log(items)

    // 제품수량 변경을 위한 State
    const [count, setCount] = useState(parseInt(items.PROD_COUNT))
    // 합계가격 State
    const [sum, setSum] = useState(0)

    // 개수와 합계가격을 위해 별도로 변수선언
    let price = items.PROD_PRICE;
    console.log(price,"가격")

    // 컬러 한글이름을 노출시키기 위한 필터함수()
    const color_filter = COLOR.filter(item => item.COLOR_CODE === items.PROD_COLOR)
    const prd_size_filter = PRD_SIZE.filter(item => item.PROD_ID === items.PROD_ID)
    const prd_info_filter = PRD_INFO.filter(item => item.PROD_ID === items.PROD_ID)

    console.log(prd_size_filter,'사이즈필터')
    console.log(color_filter,"컬러필터")
    console.log(prd_info_filter,"사진들")
/** 수량조절버튼 조작을 위한 간단한 함수들 */
// 빼기
    const subtract = () => {
        console.log('-')
        if (count > 0) {
            setCount(count - 1)
        }
        else {
            setCount(1)
        }
    }
//더하기
    const addtion = () => {
        setCount(count + 1)
    }
//버튼을 누를때 useEffect 실행
    useEffect(() => {
        if (count == 0) {
            setCount(1)
            setSum(price * count)
        } else {
            setSum(price * count)
        }
        console.log("useEffect 장바구니 수량조절")
    }, [count])
    
    return (
        <div className='basket-goods-list'>
            <div className='first-list-box'>
                <div className='inner-check-box'>
                    <input type="checkbox" />
                </div>
                <div className='inner-info-box' >
                    <div style={{ height: "50%" }}>
 {/* 장바구니에 넣은날짜 /세션 로컬 스토리지에 저장 */}
                        <h6>{items.CARTED_AT}</h6>
                    </div>
                    <div style={{ height: "50%" }}>
{/* DB의 상품번호 첫번째 구문만 노출/ 세션 로컬 스토리지에 저장 */}
                        <h6>{(items.PROD_ID).substring(0,7)}</h6>
                    </div>
                </div>
            </div>
{/* 장바구니 정보표시 상품이미지 / 상품명 / 상품 색 */}
            <div className='vtline' ></div>
            <div className='second-box'>
                <div style={{ width: "40%" }}>
 {/* <img className='img-box' src="./images/GM4_누끼.png" alt="" /> */}
                    <Card.Img variant="top" src={prd_info_filter[0].PROD_THUMB} style={{width:"auto",height:"auto",maxWidth:"200px",maxHeight:"200px"}}/>
                </div>
                <div className='txt-info' style={{ width: "60%" }}>
{/* DB에서 상품번호를 기반으로 불러오기 */}
                    <div style={{ height: "50%" }}>
                        {items.PROD_NAME}
                    </div>
                    <div style={{ height: "50%" }}>
                        {color_filter[0]?.COLOR_NAME}
                        <button style={{borderRadius:"50%",width:"20px",height:"20px",backgroundColor:`${items.PROD_COLOR}`}}></button>
                    </div>
                </div>
            </div>
            <div className='vtline' ></div>
            <div className='count-box' >
{/* 장바구니의 사이즈 결정 */}
                <div style={{ height: "50%", display: "grid", placeitems: "center" }}>
                    사이즈
                    <div>
                        <select name="size" id="">
                            {prd_size_filter.map((size)=>{
                               return ((size.SIZE_NAME == items.PROD_SIZE ? <option value={size.SIZE_NAME} selected>{size.SIZE_NAME} </option>:<option value={size.SIZE_NAME} defaultValue={items.PROD_SIZE}>{size.SIZE_NAME} </option>))
                            })}
                        </select>
                    </div>
                </div>
{/* 제품 수량 결정*/}
                <div style={{ height: "50%", display: "grid", placeitems: "center" }}>
                    <div>개수</div>
                    <div style={{ display: "flex", justifyContent:"center",alignitems: "center"}}>
                        <button className='count-btn' onClick={subtract}>-</button>
                        <h6 style={{margin:"4px 5px"}}>{count}</h6>
                        <button className='count-btn' onClick={addtion}>+</button>
                    </div>
                </div>
            </div>
            <div className='vtline' ></div>
{/* 간단한 함수로 각 상품의 총 금액 */}
            <div className='summary-price'>
                {sum.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원
            </div>
        </div>
    )
}

export default Basketitems