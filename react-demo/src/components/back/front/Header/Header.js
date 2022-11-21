import React from 'react'
import { Link } from 'react-router-dom'
import { FaShoppingCart } from "react-icons/fa"
import "./Header.css"
const Header = ({ cartItems }) => {
  return (
    <header className="header">
        <div>
            <h1>
                <Link to="/" className='logo'>
                   Shop
                </Link>
            </h1>
        </div>
        <div className="header-links">
            <ul>
                <li className="home-container">
                    <Link to="/">Home</Link>
                </li>
            </ul>
            <ul>
                <li className="signup-container">
                    <Link to="/signup">Signup</Link>
                </li>
            </ul>
            <ul>
                <li className="cart-container">
                   
                    <Link to="/cart"><FaShoppingCart className="shopping-icon"/>Cart</Link>
                    
                    <span className="cart-length">
                        {cartItems.length === 0 ? "" : cartItems.length}
                    </span>
                </li>
            </ul>
        </div>
    </header>
  )
}

export default Header
