import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Row, Col, ListGroup, InputGroup, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { filterForCategoryThunk, filterForNameThunk, getProductsThunk } from '../store/slices/products.slice';

const Home = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [search, setSearch] = useState("")
    const [categories, setCategories] = useState([])

    const products = useSelector(state => state.products)

    useEffect(() => {
        dispatch(getProductsThunk())

        axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/products/categories")
            .then(res => setCategories(res.data.data.categories))
    }, [dispatch])

    return (
        <div className='padding'>
            <Row>
                <Col lg={3} style={{paddingTop: "20px"}}>
                    <h4>Categories</h4>
                <ListGroup>
                    {categories.map((category) => (
                    <ListGroup.Item
                        key={category.id}
                        onClick={() => dispatch(filterForCategoryThunk(category.id))}
                        style={{cursor: "pointer"}}
                    >                        
                        {category.name}
                    </ListGroup.Item>
                    ))}
                </ListGroup>
                </Col>

                <Col>
                    <InputGroup className="mb-3" style={{paddingTop: "60px"}}>
                        <Form.Control
                            placeholder="Filter for name"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                        />
                        <Button
                            variant="outline-secondary"
                            onClick={() => dispatch(filterForNameThunk(search))}
                        >
                            Search
                        </Button>
                    </InputGroup>

                    <Row xs={1} md={2} xl={3} className="g-4">
                        {products.map((product) => (
                            <Col key={product.id}>
                                <Card onClick={() => navigate(`/products/${product.id}`)} style={{cursor: "pointer", padding:"20px", border: "solid 1px red"}}>
                                    <div className="productImg">
                                        <img src={product.productImgs[0]} alt="" height="150px" />
                                    </div>
                                    {/* <Card.Img variant="top" src={product.productImgs[0] height="200px"} /> */}
                                    <Card.Body>
                                        <Card.Title style={{height: "50px"}}>{product.title}</Card.Title>
                                        <Card.Text> <b>Price: $</b>{product.price}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>

                </Col>
            </Row>
        </div>
    );
};

export default Home;
