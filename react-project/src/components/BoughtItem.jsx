import React, { useState } from 'react'
import ReviewWrite from './ReviewWrite.jsx'
import '../css/BoughtItem.css'


const BoughtItem = ({order_at, order_de_img, prod_name, order_prod_info, order_de_cnt, order_detail_price, prod_id, userId}) => {
    const [isOpen, setIsOpen] = useState(false); // 모달 상태 State
    const [deliverState, setDeliverState] = useState(true)


    /**모달 열고 닫는 상태 함수*/
    const openModalHandler = () => {
        // isOpen의 상태를 변경하는 메소드를 구현
        // !false -> !true -> !false
        setIsOpen((prevIsOpen) => !prevIsOpen);
    };
  return (
    <div className='BoughtItem item-first-container'>
            <div className='item-second-container'>
                <div className='first-box' >
                    <div>
                        {order_at}
                    </div>
                </div>
                <div className='second-box' >
                    <div className='inner-first-box' >
                        <img className='img-box' style={{ widows: "100%"}} src={order_de_img} alt="" />
                    </div>
                    <div className='inner-first-box' >
                        <div className='inner-first-box-2' >
                            <div className='inner-text-box' >
                                {prod_name}
                            </div>
                        </div>
                        <div className='inner-second-box' >
                            <div className='inner-text-box' >
                                {order_prod_info}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='inner-third-box' >
                    <div className='inner-text-box-1' >{order_de_cnt}</div>
                    <div className='inner-text-box-1' >{
                    order_detail_price
                    .toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원</div>
                </div>
                {deliverState == true ?
                    <div className='inner-forth-box' style={{flexWrap:"wrap"}}>
                        <div style={{width:"100%",height:"50%"}}>
                        배송완료
                        
                        </div>
                        <div  style={{width:"100%",height:"50%"}} >
                        <button className='SM-btn' style={{width:"90px"}} onClick={() => { openModalHandler(); }}>
                            리뷰쓰기
                        </button>
                        {isOpen && (
                                <ReviewWrite
                                    isOpen={isOpen}
                                    openModalHandler={openModalHandler}
                                    prodId = {prod_id}
                                    img = {order_de_img}
                                    userId = {userId}
                                />
                            )}
                        </div>
                    </div>

                    :
                    <div className='inner-forth-box' >
                        물품제작중
                    </div>
                }
            </div>
        </div>
  )
}

export default BoughtItem