import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch } from 'react-redux';
import CardsData from './CardsData';
import './style.css'
import { ADD } from '../redux/actions/actions';

const Cards = () => {

    const [data, setData] = useState(CardsData);
    // console.log(data);
    const dispatch = useDispatch();
    const send = (el) => {
        // console.log(el);
        dispatch(ADD(el))
       
        // console.log(ADD(el))
    }
    return (
        <div className='container mt-2'>
            <h2 className='text-center'>Add to Cart Projects</h2>
            <div className="row d-flex align-items-center justify-content-center">
                {
                    data.map((element, id) => {
                        return (<>

                            <Card style={{ width: '22rem', border: 'none' }} className='mx-2 mt-4 card_style'>
                                <Card.Img variant="top" src={element.imgdata} style={{ height: "16rem", borderRadius: '5px' }} className="mt-3" />
                                <Card.Body>
                                    <Card.Title>{element.rname}</Card.Title>
                                    <Card.Text>
                                        Price:  ₹{element.price}
                                    </Card.Text>
                                    <div className="button_div d-flex justify-content-center">
                                        <Button variant="primary" className='col-12' onClick={() => send(element)}>Add to Cart</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </>)

                    })
                }

            </div>
        </div>
    )
}

export default Cards