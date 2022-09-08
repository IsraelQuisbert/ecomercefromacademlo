import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPurchasesThunk } from '../store/slices/purchases.slice';

const Purchases = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const purchases = useSelector(state => state.purchases)

    useEffect(() =>{
        dispatch(getPurchasesThunk())
    },[dispatch])

    // console.log(purchases);
    return (
        <div>
            <h2>PURCHASES</h2>
            <div>
                {
                    purchases.map(purchase => (
                        <div key={purchase.cart.products.id} className="Buys"> Compraste:
                            {
                                purchase.cart.products.map(product => (
                                    <li key={product.id} onClick={() => navigate(`/products/${product.id}`)}>
                                        {product.title} x ${product.price}                                       
                                    </li>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Purchases;