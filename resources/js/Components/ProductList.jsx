import { useContext } from "react";
import { CartContext } from "../Context/CartContext";

const products = [
  { id: 1, name: "Laptop", price: 1000 },
  { id: 2, name: "Phone", price: 500 },
];

const ProductList = () => {
  const { dispatch } = useContext(CartContext);

  return (
    <div>
      <h2>Products</h2>
      {products.map(product => (
        <div key={product.id}>
          <h3>{product.name} - ${product.price}</h3>
          <button onClick={() => dispatch({ type: "ADD_TO_CART", payload: product })}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
