import { useState, useEffect, useContext } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

import {useNavigate, Link} from 'react-router-dom';
import '../index.css'

import { Notyf } from 'notyf';

import UserContext from '../context/UserContext';

export default function Login() {

	const notyf = new Notyf(); 
	const navigate = useNavigate()

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isActive, setIsActive] = useState(true);

	const { setUser } = useContext(UserContext);

	function authenticate(e) {
		e.preventDefault();
		fetch('https://movieapi-salvador-20n7.onrender.com/users/login', {
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

			if(data.access !== undefined){
				localStorage.setItem('token', data.access);
				retrieveUserDetails(data.access)
				setEmail('');
				setPassword('');

				notyf.success(`You are now logged in`);
				navigate('/')

			} else if (data.error === "Email and password do not match") {

				notyf.error(`Incorrect Credentials`);

			} else {

				notyf.error(`${email} does not exist`);
			}

		})

	}

	function retrieveUserDetails(token){
		fetch('https://movieapi-salvador-20n7.onrender.com/users/details', {
			headers : {
				Authorization : `Bearer ${token}`
			}
		})
		.then(response => response.json())
		.then(data => {
			setUser({
				id: data.user._id,
				isAdmin: data.user.isAdmin
			})
		})
	}

	useEffect(() => {
		if(email !== '' && password !== ''){
			setIsActive(true);
		}else{
			setIsActive(false);
		}

	}, [email, password]);
	return (
		<Row className="justify-content-center px-3" id="login">
		<Col xs={12} sm={12} md={10} lg={8} xl={6} className="pt-5 mt-5">
		<div className="p-4 w-100 mx-auto mt-4 pt-3 mb-5 pb-5 my-5">
		<Form onSubmit={(e) => authenticate(e)} id="loginForm">
		<h1 className="mb-4 text-center title-red">Login</h1>

		<Form.Group className="mb-3">
		<Form.Label className="text-white">Email address</Form.Label>
		<Form.Control
		type="email"
		placeholder="Enter email"
		required
		value={email}
		onChange={(e) => setEmail(e.target.value)}
		/>
		</Form.Group>

		<Form.Group className="mb-3">
		<Form.Label className="text-white">Password</Form.Label>
		<Form.Control
		type="password"
		placeholder="Password"
		required
		value={password}
		onChange={(e) => setPassword(e.target.value)}
		/>
		</Form.Group>

		<p className="text-center small text-white">Don't have an Account? <Link to="/register" className="text-decoration-none signup">Sign Up</Link></p>

		<div className="d-flex justify-content-center pt-3">
		{ isActive ? 
			<Button className="w-50 text-center" type="submit" id="loginBtn1">
			Login
			</Button>
			: 
			<Button className="w-50 text-center"type="submit" id="loginBtn2" disabled>
			Login
			</Button>
		}
		</div>

	</Form>
	</div>
</Col>
</Row>
)
}