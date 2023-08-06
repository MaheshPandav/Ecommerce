import React, { useState } from "react";
import PopupModal from "../../popupModal";
import InputField from "../../InputField";
import Button from "../../button";
import { Select } from "antd";
import { connect } from "react-redux";
import { addProduct } from "../../../redux/slice/addProductSlice";

const AddNewProduct = (props) => {
  const {
    addProductModal,
    setAddProductModal,
    options,
    callAddProduct,
    setAllProductData,
    allProductData,
  } = props;
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });

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
    const requiredFields = [
      "title",
      "price",
      "description",
      "image",
      "category",
    ];
    const newValidation = {};
    const imageRegex = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/i;
    requiredFields.forEach((field) => {
      if (field === "image") {
        newValidation[field] =
          !product[field].trim() || !imageRegex.test(product[field])
            ? "Please provide a valid image URL"
            : "";
      } else {
        newValidation[field] = product[field].trim()
          ? ""
          : `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });
    setFieldValidation(newValidation);
    return Object.values(newValidation).every((valid) => valid === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateFields()) {
      await callAddProduct(product).then((response) => {
        if (response.type === "products/fulfilled") {
          setAllProductData([...allProductData, response.payload]);
          setProduct({
            title: "",
            price: "",
            description: "",
            image: "",
            category: "",
          });
          setAddProductModal(false);
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
    setProduct({
      title: "",
      price: "",
      description: "",
      image: "",
      category: "",
    });
    setFieldValidation({});
    setAddProductModal(false);
  };
  return (
    <div>
      <PopupModal
        isVisible={addProductModal}
        title={"Add Product"}
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
          />
          <div style={{display:'flex', alignItems:'center',justifyContent:'center'}}>
          <Button>Add Product</Button>
          </div>
        </form>
      </PopupModal>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    callAddProduct: (props) => dispatch(addProduct(props)),
  };
};

export default connect(null, mapDispatchToProps)(AddNewProduct);
