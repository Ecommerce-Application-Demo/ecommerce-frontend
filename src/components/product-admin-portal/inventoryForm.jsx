import React from 'react';
import { toast } from 'react-toastify';

const InventoryForm = ({ size, formData, setFormData, warehouses, selectedWarehouses, setSelectedWarehouses }) => {
  const handleWarehouseChange = (e) => {
    const warehouseId = e.target.value;
    if (!warehouseId) return;
    if (selectedWarehouses.includes(`${size.size}-${warehouseId}`)) {
      toast.info('This warehouse is already selected for this size.');
      return;
    }
    setFormData((prevData) => ({
      ...prevData,
      [size.size]: {
        ...prevData[size.size],
        [warehouseId]: {
          quantity: prevData[size.size]?.[warehouseId]?.quantity,
        },
      },
    }));
    setSelectedWarehouses((prev) => [...prev, `${size.size}-${warehouseId}`]);
  };

  const handleQuantityChange = (e, warehouseId) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [size.size]: {
        ...prevData[size.size],
        [warehouseId]: {
          quantity: value,
        },
      },
    }));
  };

  const handleRemoveWarehouse = (warehouseId) => {
    setFormData((prevData) => {
      const newSizeData = { ...prevData[size.size] };
      delete newSizeData[warehouseId];
      return {
        ...prevData,
        [size.size]: newSizeData,
      };
    });
    setSelectedWarehouses((prev) => prev.filter((wh) => (
      wh !== `${size.size}-${warehouseId}`)));
  };

  return (
    <div className="inventory-form">
      <div className='inventoryForm-titleWrapper'>
        <h2>Inventory Form for Size: {size.size}</h2>
        <div>
          <select onChange={handleWarehouseChange}>
            <option value="">Select Warehouse</option>
            {warehouses.map((warehouse) => (
              <option key={warehouse.warehouseId} value={warehouse.warehouseId}>
                {warehouse.warehouseName}
              </option>
            ))}
          </select>
        </div>
      </div>
      {Object.keys(formData[size.size] || {}).map((warehouseId) => (
        <div key={warehouseId} className='inventoryForm-contentWrapper'>
          <h3>Warehouse: {warehouses.find(w => w.warehouseId.toString() === warehouseId)?.warehouseName}</h3>
          <label>Quantity:</label>
          <input
            type="number"
            value={formData[size.size][warehouseId]?.quantity}
            onChange={(e) => handleQuantityChange(e, warehouseId)}
          />
          <button onClick={() => handleRemoveWarehouse(warehouseId)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default InventoryForm;
