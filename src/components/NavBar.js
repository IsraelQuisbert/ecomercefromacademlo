import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCartThunk } from '../store/slices/cart.slice';
import CartSideBar from './CartSideBar';

const NavBar = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const token = localStorage.getItem("token")


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        const token = localStorage.getItem("token")
        
        if(token){
            setShow(true);
        } else{
            navigate("/login")
        }
    }


    const logout = () => {
        localStorage.setItem("token", "")
        navigate("/login")
    }

    useEffect(() => {
        dispatch(getCartThunk())
    }, [dispatch])

    console.log();

    return (
        <div>
            <Navbar bg="primary" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="/#/">E - Commerce</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/#/purchases">Purchases</Nav.Link>
                            <Nav.Link role="button" onClick={handleShow}>Cart</Nav.Link>
                            {
                                token? (
                                    <Nav.Link role="button" onClick={logout}>Log out</Nav.Link>
                                ) : (
                                    <Nav.Link href="/#/login">Login</Nav.Link>
                                )
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <CartSideBar show={show} handleClose={handleClose}/>
        </div>
    );
};

export default NavBar;

