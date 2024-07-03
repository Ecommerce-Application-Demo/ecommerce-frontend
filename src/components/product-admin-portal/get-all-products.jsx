import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa"; // Import the edit icon from react-icons
import getProductThunk from "../../api/asyncThunk/product-thunk/getProductThunk";
import Modal from "../../small-components/Modal-global";
import EditProduct from "./edit-product";
import ProductSearchbar from "./productSearchbar";
import AddProductSku from "./add-product-sku";
import { MdAddBox } from "react-icons/md";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { motion } from 'framer-motion';
import AddStyleInventory from "./add-style-inventory";

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
  const [productClick, setProductClick] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(allProduct);
  const [openStyleModal, setOpenStyleModal] = useState(false);
  const [openInventoryModal, setOpenInventoryModal] = useState(false);

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

  const handleEditClick = (product) => {
    setEditProduct(product);
    setModalOpen(true);
  };

  const handleClickProduct = (product) => {
    setProductClick(product);

  };


  return (
    <>
      {modalOpen &&
        <EditProduct
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          editProduct={editProduct}
        />}
      {openStyleModal &&
        <AddProductSku
          setOpenStyleModal={setOpenStyleModal}
          productClick={productClick}
        />}
      {openInventoryModal &&
        <AddStyleInventory
          dispatch={ dispatch }
          setOpenInventoryModal={setOpenInventoryModal}
          productClick={productClick}
        />}
      <div className="allProduct-admin-container">
        {allProduct?.length > 0 && <p>Total products- {allProduct?.length}</p>}
        {allProduct?.length > 0 &&
          <ProductSearchbar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            allProduct={allProduct}
            filteredProducts={filteredProducts}
            setFilteredProducts={setFilteredProducts}
          />}
        <h2 style={{ textAlign: 'center', fontSize: '25px' }}>All Products</h2>
        {filteredProducts?.length > 0 ?
          <div className="allProducts-cards-wrapper">
            {filteredProducts?.map((product, index) => (
              <div className="allProduct-card" onMouseOver={()=>handleClickProduct(product)}>
                <p className="productName-wrapper">name: <span data-tooltip-content='hii'>{product?.productName}</span></p>
                <p className="productName-wrapper">Brand: <span>{product?.brand?.brandName}</span></p>
                {productClick?.productName === product?.productName &&
                <motion.div 
                  initial={{y:20}}
                  animate={{y:0}}
                  transition={{duration: 0.3}}
                  className="productCard-btn-container">
                  <div onClick={()=>setOpenStyleModal(true)}>
                    <MdAddBox />
                    <p>Add Styles</p>
                  </div>
                  <div onClick={()=>setOpenInventoryModal(true)}>
                    <MdFormatListBulletedAdd />
                    <p>Add Inventory</p>
                  </div>
                </motion.div>}
              </div>
            ))}
          </div>
          /* {filteredProducts?.map((product,index) => (
            <tr key={product.productId} className={`admin-table-row-container ${productClick?.productName === product?.productName && 'selectedProduct'}`} onClick={()=>handleClickProduct(product)}>
              <td>{product.productName}</td>
              <td>{product?.brand?.brandName}</td>
              <td onClick={()=>handleEditClick(product)}>
              <FaEdit />
              </td>
              {productClick?.productName === product?.productName && 
              <div className="product-click-container">
                <p onClick={()=>setOpenStyleModal(true)}>Add Styles</p></div>}
            </tr>
          ))} */
          : <h3>No product found with this search.</h3>}
      </div>
    </>
  );
};

export default AllProducts;
