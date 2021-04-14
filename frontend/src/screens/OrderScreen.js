import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap'

// COMPONENTS
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'

// ACTIONS
import { getOrderDetails } from '../actions/orderActions'

const OrderScreen = ({ match }) => {
    const orderId = match.params.id

    const dispatch = useDispatch()

    const addDecimals = (num) => {
        return (Math.round(num * 100)/100).toFixed(2)
    }

    const orderDetails = useSelector(state=> state.orderDetails)
    const {order, loading, error} = orderDetails


    if(!loading) {
        order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    }

    useEffect(() => {
        if(!order || order._id !== orderId) {
            dispatch(getOrderDetails(orderId))
        }
    }, [order, orderId])

    

    return (
        <>
    {
    loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
     <>
        <h1>Order: {orderId}</h1>

        <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Name:</strong> {order.user.name}
                            </p>
                            <p>
                                <strong>Email:</strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                            </p>
                            <p>
                                <strong>Address:</strong>
                                {order.shippingAddress.country}, 
                                {order.shippingAddress.city}, 
                                {order.shippingAddress.address}, 
                                {order.shippingAddress.postalCode} 
                            </p>
                            
                            { order.isDelivered ? <Message variant='success'>Delivered on {order.delivered}</Message> :
                            <Message variant='danger'>Not Delivered</Message>
                            }
                        </ListGroup.Item>
                        
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method:</strong>
                                {order.paymentMethod}
                            </p>
                            { order.isPaid ? <Message variant='success'>Paid on {order.paidAt}</Message> :
                            <Message variant='danger'>Not paid</Message>
                            }
                        </ListGroup.Item>
                        
                        <ListGroup.Item>
                            <h2>Ordered Items</h2>
                            {order.orderItems.length === 0 ? 
                                <Message>Your order is empty</Message> 
                                : (
                                    <ListGroup.Item variant='flush'>
                                        {order.orderItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name} fluid rounded />
                                                    </Col>
                                                    <Col>
                                                        <Link to={`/product/${item.product}`}>
                                                            {item.name}
                                                        </Link>
                                                    </Col>
                                                    <Col md={4}>
                                                        {item.qty}x {item.price} = ${item.qty * item.price}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup.Item>
                                )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${addDecimals(order.shippingPrice)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${addDecimals(order.taxPrice)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${addDecimals(order.totalPrice)}</Col>
                                </Row>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col>
            </Row>
    </>
         )}    </> )
}

export default OrderScreen
 