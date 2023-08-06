import React from 'react'
import PopupModal from '../../popupModal';
import style from './productDetails.module.scss'
import { Rate } from 'antd';

const ProductDetails = (props) => {
    const {productDetails, productDetailsModal, setProductDetailsModal} = props
  return (
    <div>
         <PopupModal
        isVisible={productDetailsModal}
        title={"Product Details"}
        onClose={() => {
          setProductDetailsModal(false);
        }}
      >
        <div className={style['productdetails-main']}>
            <div className={style['product-image-view']}>
            <img src={productDetails.image} className={style["product-image"]} alt="" />
            </div>
            <div className={style['details-section']}>
            <div className={style["product-price"]}>Price : {productDetails.price}</div>
        <div className={style["product-name"]}>{productDetails.title}</div>
        {productDetails.rating && (
          <div>
            <Rate allowHalf defaultValue={productDetails.rating.rate} disabled />
          </div>
        )}
        <div className={style["product-desc"]}>{productDetails.description}</div>
            </div>
        </div>
      </PopupModal>
    </div>
  )
}

export default ProductDetails