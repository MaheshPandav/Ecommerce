import React from "react";
import style from "./productBox.module.scss";
import { BsEye } from "react-icons/bs";
import { BiSolidPencil } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { Rate } from "antd";

const ProductBox = (props) => {
  const { item, handleDelete } = props;
  return (
    <div className={style["productbox-main"]}>
      <div className={style["productbox"]}>
        <img src={item.image} className={style["product-image"]} />
        <div className={style["product-price"]}>Price : {item.price}</div>
        <div className={style["product-name"]}>{item.title}</div>
        <div>
          <Rate allowHalf defaultValue={item.rating.rate} disabled />
        </div>
        <div className={style["product-desc"]}>{item.description}</div>

        <div className={style["action"]}>
          <div>
            <BsEye size={22} color="green" style={{ cursor: "pointer" }} />
          </div>
          <div>
            <BiSolidPencil
              size={22}
              color="orange"
              style={{ cursor: "pointer" }}
            />
          </div>
          <div>
            <AiOutlineDelete
              size={22}
              color="red"
              style={{ cursor: "pointer" }}
              onClick={() => handleDelete(item.id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductBox;
