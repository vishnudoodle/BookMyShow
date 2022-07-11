import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { HouseDoor, Film } from 'react-bootstrap-icons'
import { Navbar,Nav,NavDropdown, Container,NavItem } from 'react-bootstrap'
const Sidebar = () => {
  return (
    <>
      <nav className="sidebar shadow-lg d-none d-md-block" id="sidebar">
        <div className='mt-3 text-center d-flex align-items-center justify-content-center'>
         <img style={{width: '150px'}} src='https://img.freepik.com/free-vector/flat-clapperboard-icon_1063-38.jpg?w=740&t=st=1657017927~exp=1657018527~hmac=9b30b1629fe7b059a2e1b9cc2800d12bbb253922bb29c6c757a623206b55a6fc' alt='Logo'/>
        </div>
        <ul className="nav pt-5">
          <li className="nav-item d-flex justify-content-evenly ">
            <div className="nav-link">
              <Link style={{textDecoration : 'none', color:'#050914'}} to="/dashboard" >Dashboard </Link>
            </div>
            <div className="nav-link">
              <HouseDoor size={'20px'}/>
            </div>
          </li>
          <li className="nav-item d-flex justify-content-evenly">
            <div className="nav-link">
              <Link style={{textDecoration : 'none', color:'#050914'}} to="/movie" > Movie </Link>
            </div>
            <div className="nav-link ms-4">
              <Film size={'20px'}/>
            </div>
          </li>
        </ul>
      </nav>
      <Navbar className='d-block d-md-none shadow'>
        <Container fluid={true}>
          <div>
            <Navbar.Brand href="/" className="pt-2"><img style={{width: '100px'}} src='https://img.freepik.com/free-vector/flat-clapperboard-icon_1063-38.jpg?w=740&t=st=1657017927~exp=1657018527~hmac=9b30b1629fe7b059a2e1b9cc2800d12bbb253922bb29c6c757a623206b55a6fc' alt='Logo'/></Navbar.Brand>
          </div>
          <Nav className="m-auto p-5 p-md-0 align-center" as="ul">
            <Nav.Item as="li"> 
              <NavLink className="text-dark h5" style={{paddingRight: '60px', textDecoration :'none'}}to="/dashboard">Dashboard</NavLink>
            </Nav.Item>
            <NavItem as="li">
              <NavLink className="text-dark h5" style={{paddingRight: '60px',textDecoration :'none'}} to="/movie">Movie</NavLink>
            </NavItem>                
          </Nav>
        </Container>
    </Navbar>
    </>
  )
}

export default Sidebar