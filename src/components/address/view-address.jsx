import React, { useState } from 'react'

const ViewAddress = (props) => {
    const {addressData} = props;
    const [clickCard,setClickCard] = useState(false);
    const mouseEnterOnCard =() =>{
        setClickCard(true);
    }
    const mouseRemoveFromCard =() =>{
        setClickCard(false);
    }

  return (
    <div className='viewAddress-main-container'>
        {addressData.length === 0 ? 
        <div className='viewAddress-empty-wrapper'>
            <h1>No Address Found, Please Try To Add Address</h1>
        </div> 
        :
        addressData?.map((item,index)=>{
            return (
        <div className='viewAddress-card-wrapper' onMouseEnter={mouseEnterOnCard} onMouseLeave={mouseRemoveFromCard}>
                <p>Kingshuk Roy</p>
                <p className='viewAddress-address-type'>Home</p>
                <div className='viewAddress-card-addressBar'>
                    <p>z-5/174/A</p>
                    <p>kolkata: 700018</p>
                </div>
                {clickCard && 
                <>
                    <p>West Bengal</p>
                    <p>Mobile: 7003874065</p>
                <div className='viewAddress-card-footer-btn'>
                    <div>Edit</div>
                    <div style={{border:'1px solid grey', color:'grey'}}>Remove</div>
                </div>
                </>
                }
        </div>      
            )
        })
        }
        {/* <div className='viewAddress-card-wrapper' onMouseEnter={mouseEnterOnCard} onMouseLeave={mouseRemoveFromCard}>
                <p>Kingshuk Roy</p>
                <p className='viewAddress-address-type'>Home</p>
                <div className='viewAddress-card-addressBar'>
                    <p>z-5/174/A</p>
                    <p>kolkata: 700018</p>
                </div>
                {clickCard && 
                <>
                    <p>West Bengal</p>
                    <p>Mobile: 7003874065</p>
                <div className='viewAddress-card-footer-btn'>
                    <div>Edit</div>
                    <div style={{border:'1px solid grey', color:'grey'}}>Remove</div>
                </div>
                </>
                }
        </div> */}
    </div>
  )
}

export default ViewAddress;