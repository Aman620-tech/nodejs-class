import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Navigate, useNavigate } from 'react-router-dom';

// hooks


const Register = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handelChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    const Submit = async (e) => {
        e.preventDefault()
        const { name, email, password } = user
        const userData = { name, email, password }
        console.log("userData", userData)

        const apiData = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(userData)
        }

        const api = await fetch('http://localhost:3001/user/admin-register', apiData)
        const response = await api.json()
        console.log("response", response)

        if (response.status === 200) {
            window.alert(response.response)
            localStorage.setItem("token")
            navigate('/')
        }
        if (response.status === 400) {
            window.alert(response.response)
        }

    }

    return (
        <div>
            <Row>
                <Col></Col>
                <Col>
                    {/* name, email, password  */}
                    <Form>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name='name' value={user.name} onChange={handelChange} placeholder="name" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name='email' value={user.email} onChange={handelChange} placeholder="abc@example.com" />
                        </Form.Group>



                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>password</Form.Label>
                            <Form.Control type="password" name='password' value={user.password} onChange={handelChange} />
                        </Form.Group>

                        <button onClick={Submit}>Submit</button>

                    </Form>
                </Col>
                <Col></Col>
            </Row>

        </div>
    )
}

export default Register