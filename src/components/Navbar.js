import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';


import UserContext from "../context/UserContext"
import { useContext } from 'react';

export default function Navigation(){
	const { user } = useContext(UserContext);
	return(
		<>
		<section>
			<Navbar expand="lg" className="custom-navbar fixed-top shadow">
				<Container>
					<Navbar.Brand href="#home" className="fw-bold text-white">ScreenTalks</Navbar.Brand>
					<Navbar.Toggle aria-controls="navbar-nav" />
					<Navbar.Collapse id="navbar-nav" className="w-100">
						<Nav className="ms-auto gap-5">
							<Nav.Link as={Link} to="/" className="text-white">Home</Nav.Link>
						{user.id !== null
							? 
							<>
							<Nav.Link as={Link} to="/movies" className="text-white">Movies</Nav.Link>
							<Nav.Link as={Link} to="/logout" className="text-white">Logout</Nav.Link>
							</>
							:
							<>
							<Nav.Link as={Link} to="/login" className="text-white">Login</Nav.Link>
							<Nav.Link as={Link} to="/register" className="text-white border-start">Sign Up</Nav.Link>
							</>
						}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</section>
		</>

		)
}