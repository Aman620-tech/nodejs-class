import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';


const Login = () => {


    let navigate = useNavigate()

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const handelChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    const Submit = async (e) => {
        e.preventDefault()
        const { email, password } = user
        const userData = { email, password }
        console.log("userData", userData)

        const apiData = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(userData)
        }

        const api = await fetch('http://localhost:3001/user/login', apiData)
        const apiResponse = await api.json()
        console.log("response", apiResponse)

        if (apiResponse.status === 200) {

            // token 

            localStorage.setItem("token",apiResponse.token)
            navigate('/')
            // console.log("apiResponse.response.token",apiResponse.token)



            // window.alert(apiResponse.response)
        }
        if (apiResponse.status === 400) {
            window.alert(apiResponse.response)
        }

    }

    return (
        <div>  <div>
            <Row>
                <Col></Col>
                <Col>
                    {/* name, email, password  */}
                    <Form>

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

        </div></div>
    )
}

export default Login