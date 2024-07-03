import React, { useEffect, useState } from 'react';
import Modal from '../../small-components/Modal-global';
import getProductThunk from '../../api/asyncThunk/product-thunk/getProductThunk';
import { useSelector } from 'react-redux';
import { FaChevronDown } from 'react-icons/fa';
import InventoryForm from './inventoryForm';
import addCategoriesProductThunk from '../../api/asyncThunk/product-thunk/addCategories-thunk';
import { toast } from 'react-toastify';

const AddStyleInventory = ({
  dispatch,
  productClick,
  setOpenInventoryModal,
}) => {
  //redux states-----------------------
  const allStylesOfProductData = useSelector((state) => state.getProducts.allStylesOfProductData);
  const allSizesOfStyleData = useSelector((state) => state.getProducts.allSizesOfStyleData);
  const allWarehouseData = useSelector((state) => state.getProducts.allWarehouseData); // Assuming warehouses are stored in Redux state


  //hooks---------------------------
  const [isOpen, setIsOpen] = useState(false);
  const [productStyle, setProductStyle] = useState('select a product style');
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [formData, setFormData] = useState({});
  const [selectedWarehouses, setSelectedWarehouses] = useState([]);

  const { allStylesOfProduct } = allStylesOfProductData;

  useEffect(() => {
    dispatch(getProductThunk.getAllStylesOfProduct(productClick?.productId));
    dispatch(getProductThunk.getAllWarehouse());

  }, [productClick]);

  const handleOptionClick = (style) => {
    setProductStyle(style?.styleName);
    dispatch(getProductThunk.getAllSizesOfStyle(style?.styleId));
    setIsOpen(false);
  };

  const handleSizeClick = (size) => {
    if (!selectedSizes.includes(size)) {
      setSelectedSizes((prevSizes) => [...prevSizes, size]);
    }
  };

  const handleSubmit = () => {
    const response = [];
    selectedSizes.forEach((size) => {
      Object.keys(formData[size?.size] || {}).forEach((warehouseId) => {
        if (formData[size?.size][warehouseId]?.quantity) {
          response.push({
            skuId: size?.skuId,
            warehouse: {
              warehouseId: Number(warehouseId),
            },
            quantity: formData[size?.size][warehouseId]?.quantity,
          });
        }
      });
    });
    if (response?.length > 0) {
        dispatch(addCategoriesProductThunk.addStyleInventory(response)).unwrap()
        .then(() => {
          toast.success("Style inventory added successfully.");
        })
        .catch(() => {
          toast.error("There was an error while adding the inventory.");
        });
    }
  };

  const isSubmitDisabled = () => {
    for (const size of selectedSizes) {
      for (const warehouseId in formData[size.size]) {
        if (!formData[size.size][warehouseId].quantity) {
          return true;
        }
      }
    }
    return false;
  };

  return (
    <Modal
      onClose={() => setOpenInventoryModal(false)}
      title={`Add Inventory of ${productClick?.productName}`}
      width='40vw'
      height='70vh'
      widthForTab='80vw'
      heightForTab='80vh'
      widthForMobile='100vw'
      heightForMobile='85vh'
      footer= <button onClick={handleSubmit} className='inventoryModal-footer' disabled={isSubmitDisabled()}>Submit</button>
    >
      <div className='productAdmin-inventory-container'>
        <button className={`selectStyledropdown-toggle ${isOpen ? 'toggleopen' : ''}`} onClick={() => setIsOpen(!isOpen)}>
          <span>{productStyle}</span>
          <span className={`arrow-icon ${isOpen ? 'open' : ''}`}>
            <FaChevronDown />
          </span>
        </button>
        {isOpen && (
          <ul className='style-dropdown-menu'>
            {allStylesOfProduct?.map((style, index) => (
              <li key={index} onClick={() => handleOptionClick(style)} className='style-dropdown-menuitem'>
                <span>{style?.styleName}</span>
                <div style={{ background: style?.colourHexCode }}></div>
              </li>
            ))}
          </ul>
        )}
        {allSizesOfStyleData?.allSizesOfStyle?.length > 0 && (
          <div className='allSizes-container'>
            <h3>All Sizes</h3>
            <div className='sizes-wrapper'>
              {allSizesOfStyleData?.allSizesOfStyle?.map((sizes) => (
                <div key={sizes?.size} className='individual-size' onClick={() => handleSizeClick(sizes)}>
                  {sizes?.size}
                </div>
              ))}
            </div>
          </div>
        )}
        {selectedSizes.map((size) => (
          <InventoryForm
            key={size}
            size={size}
            formData={formData}
            setFormData={setFormData}
            warehouses={allWarehouseData?.allWarehouse}
            selectedWarehouses={selectedWarehouses}
            setSelectedWarehouses={setSelectedWarehouses}
          />
        ))}
      </div>
    </Modal>
  );
};

export default AddStyleInventory;
