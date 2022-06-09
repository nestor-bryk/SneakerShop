import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

function Header(props) {

    const { totalPrice } = useCart();

    return (
        <header className='d-flex justify-between align-center p-40'>
            <Link to={'/'}>
                <div className='d-flex align-center'>
                    <img width={40} height={40} src="/img/header/logo.png" />
                    <div>
                        <h3 className="text-uppercase">Sneaker<span>S</span>hop</h3>
                        <p className="opacity-5">Shop better sneakers</p>
                    </div>
                </div>
            </Link>
            <ul className='d-flex'>
                <li className="mr-30 cu-p" onClick={props.onClickDrawer}>
                    <img width={18} height={18} src="/img/header/card.svg" />
                    <span>{totalPrice} $</span>
                </li>
                <li className="mr-20 cu-p">
                    <Link to={"/favorites"}>
                        <img width={18} height={18} src="/img/header/heard.svg" />
                    </Link>
                </li>
                <li>
                    <Link to={'/orders'}>
                        <img width={18} height={18} src="/img/header/union.svg" />
                    </Link> 
                </li>
            </ul>
        </header>
    )
}

export default Header;