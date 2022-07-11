import React ,{useEffect, useState} from 'react'
import Sidebar from '../components/Sidebar';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams} from 'react-router-dom'
import Axios from '../config/axios'
import { Geo } from 'react-bootstrap-icons'

const Location = () => {
    const {id} = useParams()
    const [locationdetails,setlocationdetails] = useState([])
    useEffect(() => {
        Axios.post('/location/singlelocation',{
            location: id
        }).then(res =>{
            console.log(res.data)
            setlocationdetails(res.data)
        }).catch(e => console.log(e))
    }, [])
  return (
    <div className='container-fluid body-wrapper'>
      <Sidebar />
      <div className='main-panel'>
        <Container className='mt-5'>
            <h3 className='fw-boldder text-center shadow-lg p-3'> Welcome To  <span style={{color: '#262b40'}}>{id}</span> <Geo /></h3>
          <Row className='mt-5 text-center g-4'>
            {locationdetails.map((locationdetail)=> {
                return (
                    <Col lg={6}>
                        <div className="card card-style" style={{ backgroundColor: '#F3797E' }}>
                        <div className="card-body text-center">
                            <p key={locationdetail._id}>{locationdetail.theatrename}</p>
                            <h2 key={locationdetail._id}>Location : {locationdetail.location}</h2>
                            <p key={locationdetail._id}>Price: {locationdetail.price}</p>
                            {locationdetail.timing.map((timing, i)=> {
                                return( 
                                <p key={i}>timing: {timing}</p> 
                            )})}
                        </div>
                        </div>
                    </Col>
                )
            }) }
          </Row>
        </Container>
        
      </div>
      
    </div>
  )
}


export default Location