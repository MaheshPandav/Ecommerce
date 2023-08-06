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

const AllProduct = (props) => {
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

  const allProducts = () => {
    callgetAllProduct().then((response) => {
      setAllProductData(response.payload);
    });
  };

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
    if (inputValue !== '') {
      const filterValue = allProductData.filter((product) =>
      product.title.toLowerCase().includes(inputValue.toLowerCase())
  );
   setAllProductData(filterValue)
    }
    setSearchLoading(true)
    if (inputValue !== '') {
      typingTimer = setTimeout(() => {
        setSearchLoading(false)
      }, typingTimeout);
    } else {
      setSearchLoading(false)
    }
  };

  return (
    <>
      {laoding || deleteProduct.isLoading ? <Loading type="overlay" /> : null}
      <div className={style["allproduct-main"]}>
        <div className={style["title-view"]}>
          <div className={style["product-title"]}>All Products</div>
          <div className={style["product-title"]}>
            <Search
              placeholder="Search product by name"
              enterButton="Search"
              size="large"
              loading={searchLoading}
              style={{ width: 380 }}
              onChange={handleSearch}
            />
          </div>
          <div>
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
        </div>
        <div className={style["all-product"]}>
          {allProductData &&
            allProductData?.map((item, index) => {
              return (
                <ProductBox
                  item={item}
                  index={index}
                  handleDelete={handleDelete}
                />
              );
            })}
        </div>
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
