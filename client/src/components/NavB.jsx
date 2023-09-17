import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { useEffect, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import '../app.css';
import { userContext } from '../App'
import logo from './utils/favicon.png'

const NavB = () => {
    const search = useRef();    
    const userCntxt = useContext(userContext);
    console.log(userCntxt.userState)

    useEffect(() => {
        // prevent form submission on enter
        document.querySelector("#search").addEventListener('keydown',e=>{
            if(e.keyCode===13){
                e.preventDefault();
                userCntxt.searchDispatch("?q="+search.current.value)
                navigate({
                    pathname: '/blogs',
                    search: "?q="+search.current.value
                })
            }
        })
    },[])
    
    const navigate = useNavigate();

    const handleSignout = e => {
        fetch('/api/users/signout').then(res =>
            res.json()).then(data => {
                console.log(data);
                if (data.result) {
                    navigate('/login')
                    localStorage.clear();
                    userCntxt.userDispatch(null);
                }else{
                    alert("Something went wrong");
                }
            })
    }

    return (
        <>
            <Navbar bg="light" expand="lg" fixed="top" className="p-1" collapseOnSelect={true}>
                <Container>
                    <Navbar.Brand><img src={logo} style={{
                        height: "2.5rem"
                    }}/>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link onClick={e => navigate('/')}>Home</Nav.Link>
                            <Form className="d-flex" id='search'>
                                <FormControl
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                    ref = {search}
                                />
                                <Button variant="outline-secondary" onClick={e => {
                                    userCntxt.searchDispatch("?q="+search.current.value)
                                    navigate({
                                        pathname: '/blogs',
                                        search: "?q="+search.current.value
                                    })
                                }}><i className="fas fa-search"></i></Button>
                            </Form>
                        </Nav>
                        <Nav className="my-1">
                            <DropdownButton
                                key='start'
                                id={`dropdown-button-drop-start`}
                                drop='start'
                                variant="secondary"
                                menuVariant='dark'
                                title={
                                    !userCntxt.userState ? <i className="fas fa-user-slash fa-lg" /> : (
                                        !userCntxt.userState.isAdmin ? <i className="fas fa-user fa-lg" /> : <i className="fas fa-user-cog fa-lg" />
                                    )
                                }
                            >

                                {
                                    userCntxt.userState ? (
                                        <>
                                            <Dropdown.Item eventKey="1"
                                                onClick={e=>{
                                                    userCntxt.searchDispatch("?author="+userCntxt.userState._id)
                                                    navigate(`/blogs?author=${userCntxt.userState._id}`)
                                                }}
                                            ><i className="far fa-folder me-4" />File</Dropdown.Item>

                                            <Dropdown.Item eventKey="2" onClick={
                                                e => {
                                                    navigate('/blogs/new')
                                                }
                                            }><i className="far fa-file me-4" /> New</Dropdown.Item>

                                            {
                                                userCntxt.userState.isAdmin ?
                                                    <Dropdown.Item eventKey="4" onClick={
                                                        e => {
                                                            navigate('/admin')
                                                        }
                                                    }><i className="fas fa-cog me-4"></i> Panel</Dropdown.Item> : ''
                                            }

                                            <Dropdown.Divider />
                                            <Dropdown.Item eventKey="3" onClick={handleSignout}><i className="fas fa-sign-out-alt me-4" />Signout</Dropdown.Item>
                                        </>
                                    ) :
                                        (
                                            <>
                                                <Dropdown.Item eventKey="1" onClick={
                                                    e => {
                                                        navigate('/register')
                                                    }
                                                }><i className="fas fa-user-plus fa-sm me-4" /> Register</Dropdown.Item>
                                                <Dropdown.Divider />
                                                <Dropdown.Item eventKey="2" onClick={
                                                    e => {
                                                        navigate('/login')
                                                    }
                                                }><i className="fas fa-sign-in-alt fa-sm me-4"></i> Login</Dropdown.Item>
                                            </>
                                        )
                                }

                            </DropdownButton>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div style={{ height: '70px' }}></div>
        </>
    )
}

export default NavB