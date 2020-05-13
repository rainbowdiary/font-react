import React from 'react';
import { connect } from "umi";
import ProductList from "@/components/ProductList"

const Products = ({ dispatch, products }) => {
  function handleDelete(id: string) {
    console.log(id);
    dispatch({ type: "products/delete", payload: id, })
  }
  return (
    <div>
      <h2>List of Products</h2>
      <ProductList onDelete={handleDelete} products={products}></ProductList>
    </div>
  )
}


export default connect((products) => {
  return products.products
})(Products)