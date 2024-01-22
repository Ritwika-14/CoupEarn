import react, { useContext } from "react";
import Profile from "./profile";
import pic from "./logo1.png";

const Header = () => {
  return (
    <header class="header">
      <a href="#" class="logo">
        <img className="logo2" src={pic} />
      </a>
      <nav class="navbar">
        <a href="#home" class="active">
          Home
        </a>
        <a href="#buy">Buy</a>
        <a href="#sell">Sell</a>
        <a href="#review">Review</a>
        <a href="#contact">Contact</a>
      </nav>
      <Profile />
      <div class="buttons">
        <button id="search-btn">
          <i class="fas fa-search"></i>
        </button>
        <button id="cart-btn">
          <i class="fas fa-shopping-cart"></i>
        </button>
        <button id="menu-btn">
          <i class="fas fa-bars"></i>
        </button>
      </div>
      <div class="search-form">
        <input
          type="text"
          class="search-input"
          id="search-box"
          placeholder="Search"
        />
        <i class="fas fa-search"></i>
      </div>
    </header>
  );
};
export default Header;
