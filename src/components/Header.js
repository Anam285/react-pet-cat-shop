import React from "react";
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
export default function Header(props) {
    return <div> 
        <header className="wrapperHead">
            
                <a className="title" href="#/">
                    <h2>Welcome to Cat Pet Shop</h2>
                </a>
                <h3> 
                <a className= "cartIcon">cart</a></h3>
           
        </header>
    </div>

}