import React ,{useEffect, useState} from 'react'
import Sidebar from '../components/Sidebar';
import Axios from '../config/axios'
import {useNavigate } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap';
import { Person, Power } from 'react-bootstrap-icons'

const Dashboard = () => {
  const [user,setuser] = useState({})
  let navigate = useNavigate()
  useEffect(() => {
      if(localStorage.getItem('token') !== null && localStorage.getItem('token')  !== undefined){
        navigate('/dashboard')
      }else{
        navigate('/')
      }

      Axios.get('/user/me',{
        headers: {
          'Authorization' : `Bearer ${localStorage.getItem('token')}`
        }
      }).then(res =>{
          setuser(res.data[0])
      }).catch(e => console.log(e))
  }, [])

  const logout = ()=>{
    Axios.get('/user/logout',{
      headers: {
        'Authorization' : `Bearer ${localStorage.getItem('token')}`
      }
    }).then(res =>{
        localStorage.removeItem('token')
        navigate('/')
        console.log(res.data)
    }).catch(e => console.log(e))
  }
  return (
    <div className='container-fluid body-wrapper'>
      <Sidebar />
      <div className='main-panel'>
        <Container className='mt-5'>
          <Row className='justify-content-center align-items-center g-3'>
            <Col sm={12} md={10} >
              <h3 className='fw-boldder text-center shadow-lg p-3'> <Person size={'40px'}/> Welcome <span style={{color: '#262b40'}}>{user.email}</span></h3>
            </Col>
            <Col sm={12} md={2} >
              <div className='p-3 shadow-lg text-center'>
                <h4><Power /><a onClick={logout}> Logout</a></h4>
              </div>              
            </Col>
          </Row>
          <Row className='mt-5 g-4'>
            <Col md={4}>
              <div className="card card-style" style={{ backgroundColor: '#F3797E' }}>
                <div className="card-body text-center">
                  <p>Today Booking</p>
                  <h2>1000</h2>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="card card-style" style={{ backgroundColor: '#7DA0FA' }}>
                <div className="card-body text-center">
                  <p>Today Movie Booking</p>
                  <h2>600</h2>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="card card-style" style={{ backgroundColor: '#4747A1' }}>
                <div className="card-body text-center">
                  <p>Today Travel Booking</p>
                  <h2>900</h2>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <Container className='container-lg'>
          <Row className='mt-5'>
            <Col md={6}>
              <div className='p-2 shadow-lg'>
                <img src='https://img.freepik.com/free-vector/office-workers-analyzing-researching-business-data_74855-4445.jpg' />
              </div>
            </Col>
            <Col md={6}>
              <div className='p-2 shadow-lg'>
              <img src='https://img.freepik.com/free-vector/setup-analytics-concept-illustration_114360-1438.jpg' />
              </div>
              
            </Col>
          </Row>
          </Container>
      </div>
      
    </div>
  )
}


export default Dashboard