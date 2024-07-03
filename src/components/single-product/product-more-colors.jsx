import React from 'react'
import { products } from '../../assets/pictures/productImageAddress';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProductMoreColors = (props) => {
    //--------redux state--------------------------
    const productMoreColorsData = useSelector((state) => state.product.productMoreColorsData);

    //----------props---------------------
    const {
        dispatch,
        styleId,
        refForExpressDeliveryBanner,
    } = props;

    const navigate = useNavigate();
    const { START, FAIL, SUCCESS, productMoreColors } = productMoreColorsData;
    
    const clickMoreColor = (product) => {
    if (styleId !== product?.styleId) {
        navigate(`/product/${product?.styleName}/${product?.styleId}/buy`,);
    };
    };
    return (
        <div className="color-container">
            <span className="moreColor-text">MORE COLORS</span>
            <div className="more-color-image-wrapper">
                {productMoreColors?.map(product => {
                    return (
                        <div className='more-color-one-card'>
                        <img 
                         src={product?.defaultImage}
                         alt='product'
                         className="more-color-image"
                         onClick={() =>clickMoreColor(product)}
                        />
                        {styleId === product?.styleId && <div className="more-color-image-overlay"/>}
                        </div>
                    )
                })}
            </div>
            {/* <div ref={refForExpressDeliveryBanner}/> */}
        </div>
    )
}

export default ProductMoreColors;
