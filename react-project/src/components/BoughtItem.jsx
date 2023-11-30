import React from 'react'
import '../css/BoughtItem.css'


const BoughtItem = ({order_at, order_de_img, prod_name, order_prod_info, order_de_cnt, order_detail_price}) => {

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
                <div className='inner-forth-box' >
                    물품제작중
                </div>
            </div>
        </div>
  )
}

export default BoughtItem