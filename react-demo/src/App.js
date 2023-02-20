import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import data from "./components/back/Data/Data";
import Cart from "./components/back/front/Cart/Cart";
import Header from "./components/back/front/Header/Header";
import Products from "./components/back/front/Products/Products";
import Signup from "./components/back/front/Signup/Signup";

const App = () => {
  const { productItems } = data;
  const [cartItems, setCartItems] = useState([]);

  const handleAddProduct = (product) => {
    const ProductExist = cartItems.find((item) => item.id === product.id);
    if (ProductExist) {
      setCartItems(
        
        cartItems.map((item) => 
        item.id === product.id  
        ? { ...ProductExist, quantity: ProductExist.quantity + 1} 
        : item,
        localStorage.setItem("cartItems", JSON.stringify(cartItems))
        )
      );
    } else {
      setCartItems([...cartItems, {...product, quantity: 1}]);
      localStorage.setItem("cartItems", JSON.stringify(cartItems))
    }
    
  };

  const handleRemoveProduct = (product) => {
    const ProductExist = cartItems.find((item) => item.id === product.id);
    if(ProductExist.quantity === 1){
      setCartItems(cartItems.filter((item) => item.id !== product.id));
      localStorage.setItem("cartItems", JSON.stringify(cartItems))
    } else {
      setCartItems(
        cartItems.map((item) => item.id === product.id ? {...ProductExist, quantity: ProductExist.quantity -1 }
        : item,
        localStorage.setItem("cartItems", JSON.stringify(cartItems))
        )
      );
    }
  };

  const handleCartClearance = () => {
    setCartItems([]);
    JSON.parse(localStorage.removeItem("cartItems"))
  }

  useEffect(() => {
    setCartItems(localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : []
  );
  }, []);

  return (
    <div>
      <Router>
        <Header cartItems={cartItems}/>
        <Routes>
          <Route path="/" element={<Products productItems={productItems} 
          cartItems={cartItems} 
          handleAddProduct={handleAddProduct} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} 
          handleAddProduct={handleAddProduct}
          handleRemoveProduct={handleRemoveProduct}
          handleCartClearance={handleCartClearance}/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;
