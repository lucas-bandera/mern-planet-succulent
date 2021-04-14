import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Col, Row, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { FaTimes } from 'react-icons/fa'

import Message from '../components/Message'
import Loader from '../components/Loader'

import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listOrders } from '../actions/orderActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

const ProfileScreen = ({ location, history }) => {
    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ confirmPassword, setConfirmPassword ] = useState('')
    const [ message, setMessage ] = useState(null)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {loading, error, user} = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const orderList = useSelector(state => state.orderList)
    const { loading: ordersLoading, error:ordersError, orders } = orderList

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if(!userInfo) {
            history.push('/login')
        } else {
            if(!user.name || success) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
                dispatch(listOrders())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [history, userInfo, redirect, user, success, dispatch])

    const submitHandler = (e) => {
        e.preventDefault()
        
        if(password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            // DISPATCH UPDATE PROFILE
            dispatch(updateUserProfile({
                id: user._id,
                name,
                email,
                password
            }))
            
        }

    }

    return (
        <Row>
            <Col md={3}>
            <h2>User profile</h2>

                {success && <Message variant='success'>Profile updated!</Message>}
                {message && <Message variant='warning'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='name' placeholder='Enter your name' 
                        value={name} 
                        onChange={(e)=> setName(e.target.value)}></Form.Control>
                    </Form.Group>
                    
                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type='email' placeholder='Enter email' 
                        value={email} 
                        onChange={(e)=> setEmail(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Enter password' 
                        value={password} 
                        onChange={(e)=> setPassword(e.target.value)}></Form.Control>
                    </Form.Group>
                    
                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type='password' placeholder='Confirm password' 
                        value={confirmPassword} 
                        onChange={(e)=> setConfirmPassword(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary'>
                        Update
                    </Button>

                </Form>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
                { ordersLoading ? <Loader /> : ordersError ? <Message variant='danger'>{ordersError}</Message> : (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>{ order.isPaid ? order.paidAt.substring(0, 10) : <FaTimes style={{color: 'red'}} /> }</td>
                                    <td>{ order.isDelivered ? order.deliveredAt.substring(0, 10) : <FaTimes style={{color: 'red'}} /> }</td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button variant='dark' className='btn-sm'>
                                                Details
                                            </Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    )
}

export default ProfileScreen

