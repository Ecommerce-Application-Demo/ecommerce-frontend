import React, { useState } from "react";
import AddCategories from "../components/product-admin-portal/add-categories";
import AddProduct from "../components/product-admin-portal/add-product";
import AddProductSku from "../components/product-admin-portal/add-product-sku";
import AllProducts from "../components/product-admin-portal/get-all-products";
// Import other components for other functionalities

const ProductAdminPage = () => {
  // State to track which component to display
  const [selectedComponent, setSelectedComponent] = useState('ADD_CATEGORIES');
  const [code, setCode] = useState();

  // Function to handle the click on each h3
  const handleItemClick = (componentName) => {
    // Update the state to the selected component
    setSelectedComponent(componentName);
  };

  const handleCode =(e)=> {
    setCode(e.target.value);
  };

  // Function to render the selected component
  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case "ADD_CATEGORIES":
        return <AddCategories />;
      case "ADD_PRODUCT":
        return <AddProduct />;
      case "ADD_SKU":
        return <AddProductSku />;
      case "ALL_PRODUCTS":
        return <AllProducts />;
      default:
        return null;
    }
  };

  return (
    <div className="global-margin">
      {code !== "1213" ? (
          <input
            id="code"
            className="admin-secret-input"
            placeholder="Type your secret code for add categories"
            name="code"
            value={code}
            onChange={handleCode}
          />
      )
      :
     <div className="admin-portal-container">
        <div className="leftSide-admin-portal">
          <h3 onClick={() => handleItemClick("ADD_CATEGORIES")} className={selectedComponent === 'ADD_CATEGORIES' ? 'active' : ''}>
            ADD CATEGORIES
          </h3>
          <h3 onClick={() => handleItemClick("ADD_PRODUCT")} className={selectedComponent === 'ADD_PRODUCT' ? 'active' : ''}>ADD PRODUCT</h3>
          <h3 onClick={() => handleItemClick("ADD_SKU")} className={selectedComponent === 'ADD_SKU' ? 'active' : ''}>ADD SKU</h3>
          <h3 onClick={() => handleItemClick("ALL_PRODUCTS")} className={selectedComponent === 'ALL_PRODUCTS' ? 'active' : ''}>ALL PRODUCTS</h3>
        </div>
        <div className="rightSide-admin-portal">
          {renderSelectedComponent()}
        </div>
      </div>}
    </div>
  );
};

export default ProductAdminPage;
