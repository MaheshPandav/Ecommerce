import React from "react";
import style from "./allProduct.module.scss";
import { productData } from "../../../constants";
import ProductBox from "../../productBox";

const AllProduct = () => {
  return (
    <div className={style["allproduct-main"]}>
      <div className={style["title-view"]}>
        <div className={style["product-title"]}>All Product</div>
        <div>Filltert</div>
      </div>
      <div className={style['all-product']}>
        {productData.map((item,index)=>{
            return <ProductBox  item={item} index={index}/>
        })}
      </div>
    </div>
  );
};
export default AllProduct;
