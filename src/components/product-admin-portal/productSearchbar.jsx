import React, { useEffect, useState } from 'react'

const ProductSearchbar = ({
  allProduct,
  searchQuery,
  setSearchQuery,
  filteredProducts,
  setFilteredProducts,
}) => {

useEffect(() => {
  if (allProduct.length > 0) { // Check if allProducts is available
    const filtered = allProduct.filter((product) => {
      const lowerProductName = product.productName.toLowerCase();
      const lowerProductId = product.productId?.toLowerCase(); // Optional filtering by productId
      const lowerSearchQuery = searchQuery.toLowerCase();

      return lowerProductName.includes(lowerSearchQuery) || (lowerProductId && lowerProductId.includes(lowerSearchQuery));
    });
    setFilteredProducts(filtered);
  }
}, [searchQuery, allProduct]);

  return (
    <div>
      <input
        value={searchQuery}
        placeholder='search in all products'
        onChange={(e)=> setSearchQuery(e.target.value)}
        className='productSearchbar'
      />
    </div>
  )
}

export default ProductSearchbar
