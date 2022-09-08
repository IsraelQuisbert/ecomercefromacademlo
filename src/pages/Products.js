import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { addToCartThunk } from '../store/slices/cart.slice';
import { filterForCategoryThunk } from '../store/slices/products.slice';

const Products = () => {

    const {id} = useParams()
    const [product, setProduct] = useState({})
    const navigate = useNavigate()

    const [quantity, setQuantity] = useState("0")

    const productsList = useSelector(state => state.products)
    const dispatch = useDispatch()

    useEffect(() =>{
        axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/`)
            .then(res => {
                const productSearched = res.data.data.products.find(productItem => productItem.id === Number(id))
                setProduct(productSearched)
                dispatch(filterForCategoryThunk(productSearched.category.id))
            })
    },[id, dispatch]);


    const addToCart = () =>{
        const product = {
            id,
            quantity
        }
        dispatch(addToCartThunk(product))
        console.log(product);
    }

    return ( 
        <div>
            <div className='flex-w'>
                <p><Link to="/" style={{textDecoration: "none"}}><h2>Home</h2></Link></p>
                
                <p><h4>{product.title}</h4></p>
            </div>
            <div className='flex-w j-c' >

                <div>
                    <img src={product?.productImgs?.[0]} alt="" height="300px"/>
                </div>


                <div className='details'>
                    <h3>{product.title}</h3>
                    <p>{product.description}</p>

                    <div className='flex-w'>
                        <div className='price'>
                            <p>Price:</p>
                            <p><b>$ {product.price}</b></p>
                        </div>
                        <div className='input'>
                            <p>Quantity:</p>
                            <input 
                                type="number" 
                                placeholder='0' 
                                onChange={e =>setQuantity(e.target.value)} 
                                value={quantity}
                                width={"200px"}
                            />
                        </div>
                    </div>

                    <Button onClick={addToCart} style={{marginTop: "20px"}}>Add to Cart</Button>

                </div>
            </div>

            <div>
                <h2><b>Similar Products!!!</b></h2>
                
                {
                    productsList.map(productItem =>(
                        <div key={productItem.id}>
                            <img onClick={() => navigate(`/products/${productItem.id}`)} src={productItem.productImgs[0]} alt="" height="300px"/>
                            <h4>{productItem.title}</h4>
                            <p><b>Price: $</b>{productItem.price}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Products;