import React from "react";
import style from "./productBox.module.scss";
import { BsEye } from "react-icons/bs";
import { BiSolidPencil } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { Rate, notification } from "antd";

const ProductBox = (props) => {
  const { item, handleDelete, handleViewProduct, handleEditModal } = props;
  const token = localStorage.getItem("token");

  const handleEdit = () => {
    if (token) {
      handleEditModal(item);
    } else {
      // Show an error notification if the user doesn't have permission
      notification.error({
        message: 'Permission Error',
        description: 'You do not have permission to edit. You need to login first',
      });
    }
  };
  
  const handleDeletes = () => {
    if (token) {
      handleDelete(item.id);
    } else {
      // Show an error notification if the user doesn't have permission
      notification.error({
        message: 'Permission Error',
        description: 'You do not have permission to delete.  You need to login first',
      });
    }
  };
  return (
    <div className={style["productbox-main"]}>
      <div className={style["productbox"]}>
        <img src={item.image} className={style["product-image"]} alt="" />
        <div className={style["product-price"]}>Price : {item.price}</div>
        <div className={style["product-name"]}>{item.title}</div>
        {item.rating && (
          <div>
            <Rate allowHalf defaultValue={item.rating.rate} disabled />
          </div>
        )}
        <div className={style["product-desc"]}>{item.description}</div>
        <div className={style["action"]}>
          <BsEye onClick={()=>handleViewProduct(item)}/>
          <BiSolidPencil onClick={handleEdit}/>
          <AiOutlineDelete onClick={handleDeletes} />
        </div>
      </div>
    </div>
  );
};

export default ProductBox;
