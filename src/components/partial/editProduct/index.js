import React, { useEffect, useState } from "react";
import PopupModal from "../../popupModal";
import InputField from "../../InputField";
import Button from "../../button";
import { Select } from "antd";
import { connect } from "react-redux";
import { editPorduct } from "../../../redux/slice/editProductSlice";

const EditProduct = (props) => {
  const {
    editProductModal,
    productDetails,
    setEditProductModal,
    options,
    callEditPorduct,
  } = props;
  const [product, setProduct] = useState({
    title: productDetails?.title || "",
    price: productDetails?.price || "",
    description: productDetails?.description || "",
    image: productDetails?.image || "",
    category: productDetails?.category || "",
  });
  useEffect(() => {
    setProduct({
      title: productDetails?.title || "",
      price: productDetails?.price || "",
      description: productDetails?.description || "",
      image: productDetails?.image || "",
      category: productDetails?.category || "",
    });
  }, [productDetails, editProductModal]);
  const [fieldValidation, setFieldValidation] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
    setFieldValidation({
      ...fieldValidation,
      [name]: "",
    });
  };

  const validateFields = () => {
    const requiredFields = ["title", "price", "description", "image", "category"];
    const newValidation = {};
    const imageRegex = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/i;
  
    requiredFields.forEach((field) => {
      if (field === "image") {
        newValidation[field] = !product[field] || !imageRegex.test(product[field])
          ? "Please provide a valid image URL"
          : "";
      } else {
        newValidation[field] = typeof product[field] === "string" && !product[field].trim()
          ? `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
          : "";
      }
    });
    setFieldValidation(newValidation);
    return Object.values(newValidation).every((valid) => valid === "");
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateFields()) {
      const body = {
        id: productDetails.id,
        form: product,
      };
      await callEditPorduct(body).then((response) => {
        if (response.type === "products/fulfilled") {
          setEditProductModal(false);
          alert(JSON.stringify(response.payload));
        }
      });
    }
  };
  const onCategoriesChange = async (categories) => {
    setProduct({
      ...product,
      category: categories,
    });
  };

  const handleCloseModal = () => {
    setFieldValidation({});
    setEditProductModal(false);
  };

  return (
    <div>
      <PopupModal
        isVisible={editProductModal}
        title={"Edit Product"}
        onClose={() => {
          handleCloseModal();
        }}
      >
        <form onSubmit={handleSubmit}>
          <InputField
            placeholder="Enter Title"
            label="Title"
            type="text"
            name="title"
            value={product.title}
            onChange={handleChange}
            error={fieldValidation.title}
          />
          <InputField
            placeholder="Enter Price"
            label="Price"
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            error={fieldValidation.price}
          />
          <InputField
            placeholder="Enter Description"
            label="Description"
            type="text"
            name="description"
            value={product.description}
            onChange={handleChange}
            error={fieldValidation.description}
          />
          <InputField
            placeholder="Enter Image Url"
            label="Image Url"
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            error={fieldValidation.image}
          />
          <Select
            showSearch
            size="middle"
            placeholder="Select Categories"
            onChange={onCategoriesChange}
            style={{ width: 250, marginBottom: 30 }}
            options={options}
            value={product.category}
          />
          <div style={{display:'flex', alignItems:'center',justifyContent:'center'}}>
          <Button>Edit Product</Button>
          </div>
        </form>
      </PopupModal>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    callEditPorduct: (props) => dispatch(editPorduct(props)),
  };
};

export default connect(null, mapDispatchToProps)(EditProduct);
