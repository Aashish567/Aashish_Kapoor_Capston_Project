import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
//import './homepage.css';

function Navigation() {

  const navbar = {
    position:"fixed",
    width:"100%"
  }

   // @ts-ignore
   const cartProducts = useSelector(state => state.cart);

    const totalCartItems = cartProducts.cartItems.reduce((total, item) => total + item.cartQuantity, 0);

    // @ts-ignore
    const favProducts = useSelector(state => state.fav);

    const totalFavourites = favProducts.favItems.length;


  return (
    <>
    <div>

    <nav 
// @ts-ignore
    style={navbar} className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    {/* <Link className="navbar-brand" to="#">Navbar</Link> */}

    <img style={{height: "50px", width:"80px"}} src="https://picsum.photos/200?random=${post.id" className="card-img-top" alt='logo'/>

    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div style={{marginLeft:"50px"}} className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
      
        <li className="nav-item dropdown">
        <Link style={{color:"black"}} className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Shop
          </Link>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to="#">Action</Link></li>
            <li><Link className="dropdown-item" to="#">Another action</Link></li>
            <li><Link className="dropdown-item" to="#">Something else here</Link></li>
          </ul>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/favourites">Favorites {totalFavourites}</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="#">Orders</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="#">Contact</Link>
        </li>
      </ul>
      
      <form className="d-flex">
  
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="#">Profile</Link>
        </li>

      
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/cart">My Cart {totalCartItems}</Link>
          </li>
        </ul>

      </form>
    </div>
  </div>
</nav>
      
    </div>
    </>
  )
}

export default Navigation;