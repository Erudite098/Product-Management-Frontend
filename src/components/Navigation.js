import '../Styles/App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar } from 'react-bootstrap';

function Navigation() {
    return (
        <Navbar className="custom-nav bg-dark sticky-top">
            <Container>
                <Navbar.Brand href="#" className="text-light">Product Management</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                <Navbar.Text className='text-light'>
                    Signed in as: <a href="#login" className='text-light'>Admin</a>
                </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>  
    )
}

export default Navigation;