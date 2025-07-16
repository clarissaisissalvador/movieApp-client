import { useState, useEffect} from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import {useNavigate, Link } from 'react-router-dom';

import { Notyf } from 'notyf';

import '../index.css'

export default function Register() {
	
	const notyf = new Notyf();	
	const navigate = useNavigate()
	
	const [email,setEmail] = useState("");
	const [password,setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
 
    const [isActive, setIsActive] = useState(false);

	console.log(email);
	console.log(password);
	console.log(confirmPassword)

	useEffect(()=>{

		if((email !== "" && password !=="" && confirmPassword !=="") && (password === confirmPassword)){

			setIsActive(true)

		} else {

			setIsActive(false)

		}

	},[email,password,confirmPassword])

	function registerUser(e) {

		e.preventDefault();

		fetch('https://fitnessapi-salvador-pj5e.onrender.com/users/register',{

		method: 'POST',
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({

			email: email,
			password: password

		})
		})
		.then(res => res.json())
		.then(data => {

		if(data.message === "Registered Successfully"){

			setEmail('');
			setPassword('');
			setConfirmPassword('');

			notyf.success("Registration successful")
			console.log(data.message);
			navigate('/login')

		} else if (data.error === "Email invalid") {

                notyf.error("Email is invalid");

        } else if (data.error === "Password must be atleast 8 characters") {

                notyf.error("Password must be at least 8 characters");

        } 

		})
		.catch(err => {
    console.error("Fetch error:", err);
    notyf.error("Server error. Please try again later.");
  });

	}

    return (
    		<div id="register">
    		<section className="d-flex justify-content-center container">
			  <Col md={6} className="p-4 border form-p w-75">
			    <Form id="form-register" className="py-4" onSubmit={(e) => registerUser(e)}>
			    <div className="mt-3 text-center mb-5 text-white">
			      <h1>Sign Up</h1>
			      <p>Please fill in your details to create your account</p>
			     </div>

			      <Form.Group className="mb-3">
			        <Form.Label>Email:</Form.Label>
			        <Form.Control
			          type="email"
			          placeholder="Email"
			          required
			          value={email}
			          onChange={(e) => setEmail(e.target.value)}
			        />
			      </Form.Group>

			     <Row className="mb-3">
			        <Col md={6}>
			      <Form.Group className="mb-3">
			        <Form.Label>Password</Form.Label>
			        <Form.Control
			          type="password"
			          placeholder="Password"
			          required
			          value={password}
			          onChange={(e) => setPassword(e.target.value)}
			        />
			      </Form.Group>
				</Col>

				<Col md={6}>
			      <Form.Group className="mb-3">
			        <Form.Label>Confirm Password</Form.Label>
			        <Form.Control
			          type="password"
			          placeholder="Confirm Password"
			          required
			          value={confirmPassword}
			          onChange={(e) => setConfirmPassword(e.target.value)}
			        />
			      </Form.Group>
			      </Col>
				</Row>

				<div className="d-flex justify-content-center pt-3">
			      {isActive ? 
			        <Button type="submit" id="submitBtn2" className="w-100">
			          Sign Up
			        </Button>
			       : 
			        <Button type="submit" id="submitBtn" className="w-50 " disabled>
			          Sign Up
			        </Button>
			      }
				</div>	

			      <p className="mt-2 text-center text-white">
				  Already have an account? <Link to="/login" className="text-decoration-none login-link">Login</Link>
				</p>
			    </Form>
			  </Col>
			  </section>
			</div>

			  

    )

}