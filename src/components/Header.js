import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from '@mui/material/Badge';
import { NavLink } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import './style.css'
import { DLT } from '../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'react-bootstrap/esm/Table';
// import MenuItem from '@mui/material/MenuItem';


const Header = () => {
    const[price, setPrice]=useState(0)
    const getData = useSelector((state) => {
        return state.cartReducer.carts;


    })
    console.log(getData);

    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        // console.log(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    }

    const dlt =(id)=>{
        dispatch(DLT(id))
    }
    const total =()=>{
        let price=0;
        getData.map((ele,k)=>{
            price = ele.price * ele.qnty + price
        })
        setPrice(price)
    }
    useEffect(()=>{
        total()
    },[total])
    return (
        <>
            <Navbar bg="dark" variant="dark" style={{ height: "60px" }}>
                <Container>
                    <NavLink to='/' className='text-decoration-none text-light'>Add to Cart</NavLink>
                    <Nav className="me-auto">
                        <NavLink to='/' className='text-decoration-none text-light ms-1'>Home</NavLink>

                    </Nav>
                    <Badge badgeContent={getData.length} color="primary"
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <i className="fa-solid fa-cart-shopping text-light" style={{ fontSize: "22px", cursor: "pointer" }}></i>
                    </Badge>

                </Container>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    {getData.length ?
                        <div className='card_details' style={{ width: "24rem", padding: 10 }}>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Photo</th>
                                        <th>Restaurant Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        getData.map((e) => {
                                            return (
                                                <>
                                                    <tr>
                                                        <td>
                                                            <NavLink to={`/cart/${e.id}`} onClick={handleClose}>
                                                                <img src={e.imgdata} style={{ width: "5rem", height: "5rem" }} alt="" />
                                                            </NavLink>
                                                        </td>
                                                        <td>
                                                            <p>{e.rname}</p>
                                                            <p>Price : ₹{e.price}</p>
                                                            <p>Quantity : {e.qnty}</p>
                                                <p style={{ color: "red", fontSize: 20, cursor: "pointer" }} onClick={()=>dlt(e.id)} >
                                                                <i className='fas fa-trash smalltrash'></i>
                                                            </p>
                                                        </td>

                                                        <td className='mt-5' style={{ color: "red", fontSize: 20, cursor: "pointer" }}  onClick={()=>dlt(e.id)}>
                                                            <i className='fas fa-trash largetrash'></i>
                                                        </td>
                                                    </tr>
                                                </>
                                            )
                                        })
                                    }

                                <p className='text-center'> Total: ₹ {price}</p>
                                </tbody>
                            </Table>


                        </div>
                        : <div className='card_details d-flex justify-content-center align-items-center' style={{ width: "24rem", padding: 10, position: "relative" }}>
                            <i className='fas fa-close smallclose'
                                style={{ position: "absolute", top: 2, right: 20, fontSize: 23, cursor: "pointer" }} onClick={handleClose}></i>
                            <p style={{ fontSize: 22 }}>Your carts is empty</p>
                            <img src="./cart.gif" alt="" className='emptycart_img' style={{ width: "5rem", padding: 10 }} />
                        </div>
                    }

                </Menu>
            </Navbar>
        </>
    )
}

export default Header