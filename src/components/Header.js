import React from "react";
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
export default function Header(props) {
    return <div> 
        <header className="wrapperHead">
            
                <a className="title" href="#/">
                    <h2>Welcome to Cats4Life</h2>
                </a>
                <h3> 
                <a className= "cartIcon">cart</a></h3>
           
        </header>
    </div>

}