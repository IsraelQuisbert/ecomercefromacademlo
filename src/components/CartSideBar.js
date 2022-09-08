import React from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { buyCartThunk } from '../store/slices/cart.slice';

const CartSideBar = ({show, handleClose}) => {

    const products = useSelector(state => state.cart)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const selectProduct = (product) =>{
        handleClose()
        navigate(`/products/${product.id}`)
    }
    // console.log(products);

    return (
        <div>
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div>
                        {
                            products.map(product => (
                                <div className='Buys' key={product.id} onClick={() => selectProduct(product)}>
                                    <p><b>{product?.title}</b></p>
                                    <p>quantity: {product.productsInCart?.quantity}</p>
                                    <p>price: ${product?.price}</p>
                                </div>
                            ))
                        }
                    </div>
                    <Button onClick={() => dispatch(buyCartThunk())}>Buy</Button>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
};


export default CartSideBar;