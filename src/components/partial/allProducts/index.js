import React, { useEffect, useState } from "react";
import style from "./allProduct.module.scss";
import ProductBox from "../../productBox";
import { connect } from "react-redux";
import { getAllProduct } from "../../../redux/slice/getAllProductSlice";
import { deleteProduct } from "../../../redux/slice/deleteProductSlice";
import Loading from "../../Loader";
import { Select } from "antd";
import { getProductCategories } from "../../../redux/slice/getProductCatagorySlice";
import { getProductByCategories } from "../../../redux/slice/getProductByCategoriesSlice";
import { Input } from "antd";
import Button from "../../button";
import AddNewProduct from "../addProduct";
import ProductDetails from "../productDetails";
import EditProduct from "../editProduct";

const AllProduct = (props) => {
  const token = localStorage.getItem("token");
  const {
    callgetAllProduct,
    callDeleteProduct,
    laoding,
    deleteProduct,
    callGetProductCategories,
    produCtcategories,
    callGetProductByCategories,
  } = props;
  const { Search } = Input;
  const [allProductData, setAllProductData] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [addProductModal, setAddProductModal] = useState(false);
  const [productDetails, setProdctDetails] = useState({});
  const [productDetailsModal, setProductDetailsModal] = useState(false);
  const [editProductModal, setEditProductModal] = useState(false);
  const [search, setSearch] = useState('');

  const allProducts = () => {
    callgetAllProduct().then((response) => {
      setAllProductData(response.payload);
    });
  };

  const handleViewProduct = (item) => {
    setProdctDetails(item);
    setProductDetailsModal(true);
  };

  const handleEditModal = (item) =>{
    setEditProductModal(true)
    setProdctDetails(item);
  }

  const options = produCtcategories?.map((item) => ({
    value: item,
    label: item,
  }));

  useEffect(() => {
    allProducts();
    callGetProductCategories();
  }, [callgetAllProduct]);

  const handleDelete = async (id) => {
    await callDeleteProduct(id).then((response) => {
      if (response.type === "products/fulfilled") {
        setAllProductData(
          allProductData.filter((product) => product.id !== id)
        );
      } else {
        console.log("error");
      }
    });
  };
  const onCategoriesChange = async (categories) => {
    try {
      if (categories === undefined) {
        const response = await callgetAllProduct();
        setAllProductData(response.payload);
      } else {
        const response = await callGetProductByCategories(categories);
        if (response.payload && response.payload.length > 0) {
          setAllProductData(response.payload);
        } else {
          setAllProductData([]);
        }
      }
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
  };

  let typingTimer;
  const typingTimeout = 1000;

  const handleSearch = (event) => {
    clearTimeout(typingTimer);
    const inputValue = event.target.value;
    if (inputValue !== "") {
      const filterValue = allProductData.filter((product) =>
        product.title.toLowerCase().includes(inputValue.toLowerCase())
      );
      setAllProductData(filterValue);
    }
    if(inputValue === ""){
      allProducts();
    }
    setSearchLoading(true);
    if (inputValue !== "") {
      typingTimer = setTimeout(() => {
        setSearchLoading(false);
      }, typingTimeout);
    } else {
      setSearchLoading(false);
    }
  };

  const handleAddProduct = () => {
    setAddProductModal(true);
  };

  return (
    <>
      {laoding || deleteProduct.isLoading ? <Loading type="overlay" /> : null}
      <div className={style["allproduct-main"]}>
        <div className={style["title-view"]}>
          <div className={style["product-title"]}>All Products</div>
   
          {token && <Button onClick={handleAddProduct}>Add Product</Button>}
        </div>
        <div className={style['filter-view']}>
            <Search
              placeholder="Search product by name"
              enterKeyHint="hello"
              size="large"
              loading={searchLoading}
              style={{ width: 250 }}
              onChange={handleSearch}
            />
            <Select
              showSearch
              allowClear
              size="large"
              placeholder="Select Categories"
              onChange={onCategoriesChange}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              style={{ width: 250 }}
              options={options}
            />
        </div>
   
        <div className={style["all-product"]}>
          {allProductData &&
            allProductData?.map((item, index) => {
              return (
                <ProductBox
                  item={item}
                  index={index}
                  handleDelete={handleDelete}
                  handleViewProduct={handleViewProduct}
                  handleEditModal={handleEditModal}
                />
              );
            })}
        </div>
        <AddNewProduct
          addProductModal={addProductModal}
          setAddProductModal={setAddProductModal}
          options={options}
          setAllProductData={setAllProductData}
          allProductData={allProductData}
        />
        <ProductDetails
          productDetailsModal={productDetailsModal}
          productDetails={productDetails}
          setProductDetailsModal={setProductDetailsModal}
        />
        <EditProduct
        editProductModal={editProductModal}
        productDetails={productDetails}
        setEditProductModal={setEditProductModal}
        options={options}
        />
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    allProductS: state.allProductS.allProduct,
    laoding: state.allProductS.isLoading,
    deleteProduct: state.deleteProduct,
    produCtcategories: state.produCtcategories.productCategories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    callgetAllProduct: () => dispatch(getAllProduct()),
    callDeleteProduct: (props) => dispatch(deleteProduct(props)),
    callGetProductCategories: () => dispatch(getProductCategories()),
    callGetProductByCategories: (props) =>
      dispatch(getProductByCategories(props)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProduct);
