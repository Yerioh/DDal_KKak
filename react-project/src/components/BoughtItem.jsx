import React from 'react'
import '../css/BoughtItem.css'

const BoughtItem = () => {
  return (
    <div className='BoughtItem item-first-container'>
            <div className='item-second-container'>
                <div className='first-box' >
                    <div>
                        2023/11/28 17:04:10
                    </div>
                </div>
                <div className='second-box' >
                    <div className='inner-first-box' >
                        <img className='img-box' style={{ widows: "100%"}} src="./images/GM2_누끼.png" alt="" />
                    </div>
                    <div className='inner-first-box' >
                        <div className='inner-first-box-2' >
                            <div className='inner-text-box' >
                                맨투맨
                            </div>
                        </div>
                        <div className='inner-second-box' >
                            <div className='inner-text-box' >
                                XL / 블루
                            </div>
                        </div>
                    </div>
                </div>
                <div className='inner-third-box' >
                    <div className='inner-text-box-1' >1개</div>
                    <div className='inner-text-box-1' >10,000원</div>
                </div>
                <div className='inner-forth-box' >
                    물품제작중
                </div>
            </div>
        </div>
  )
}

export default BoughtItem