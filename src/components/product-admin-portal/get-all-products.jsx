import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa"; // Import the edit icon from react-icons
import getProductThunk from "../../api/asyncThunk/product-thunk/getProductThunk";
import Modal from "../../small-components/Modal-global";
import EditProduct from "./edit-product";

const AllProducts = () => {
  const dispatch = useDispatch();
  const { allProduct } = useSelector((state) => state.getProducts);
  const addProductCategories = useSelector((state) => state.addProductCategory);

  const { getAllProductThunk } = getProductThunk;
  const {
    addProduct
  } = addProductCategories;
  
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState();

  useEffect(() => {
    dispatch(getAllProductThunk());
  }, []);

  useEffect(() => {
    if (addProduct.START) {
      setTimeout(() => {
        dispatch(getAllProductThunk());
      }, 500);
    }
  }, [addProduct.START]);

  const handleEditClick =(product)=>{
    setEditProduct(product);
    setModalOpen(true);
  }
  return (
    <>
        {modalOpen && <EditProduct modalOpen={modalOpen} setModalOpen={setModalOpen} editProduct={editProduct}/>}
        <div className="allProduct-admin-container">
      <h2 style={{textAlign:'center', fontSize:'25px'}}>All Products</h2>
      <table>
        <thead>
          <tr className="admin-table-heading-container">
            <td>No.</td>
            <td>Product Name</td>
            <td>Product Brand Name</td>
            <td>Edit</td>
          </tr>
        </thead>
        <tbody className="admin-tableB">
          {allProduct?.map((product,index) => (
            <tr key={product.productId} className="admin-table-row-container">
              <td>{index+1}</td>
              <td>{product.productName}</td>
              <td>{product?.brand?.brandName}</td>
              <td onClick={()=>handleEditClick(product)}>
                  <FaEdit />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
    </>
  );
};

export default AllProducts;
