import React from 'react'
import { products } from '../../assets/pictures/productImageAddress';
import { useSelector } from 'react-redux';

const ProductMoreColors = (props) => {
    //--------redux state--------------------------
    const productMoreColorsData = useSelector((state) => state.product.productMoreColorsData);

    //----------props---------------------
    const {
        dispatch,
        styleId,
        refForExpressDeliveryBanner,
    } = props;

    const { START, FAIL, SUCCESS, productMoreColors } = productMoreColorsData;
    
    return (
        <div className="color-container">
            <span className="moreColor-text">MORE COLORS</span>
            <div className="more-color-image-wrapper">
                {productMoreColors?.map(product => {
                    return (
                        <img src={product?.defaultImage} alt='product' className="more-color-image" />
                    )
                })}
            </div>
            {/* <div ref={refForExpressDeliveryBanner}/> */}
        </div>
    )
}

export default ProductMoreColors;
