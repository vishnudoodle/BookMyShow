import React ,{useEffect, useState} from 'react'
import Axios from '../config/axios'
import { Container, Row ,Col} from 'react-bootstrap'
import { EnvelopeOpen, Unlock , ArrowReturnLeft } from 'react-bootstrap-icons'
import { Link,  useNavigate } from 'react-router-dom'
const Home = () => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [error , seterror] = useState('')
    let navigate = useNavigate()
    useEffect(() => {
        if(localStorage.getItem('token') !== null && localStorage.getItem('token')  !== undefined){
            navigate('/dashboard')
        }else{
            navigate('/')
        }
    }, [])
    const SubmitForm = async (e) =>{
        e.preventDefault();
        await Axios.post('/user/login',{
            email,
            password
        }).then(res =>{
            if(res.data.token){
                console.log("login success")
                if(res.data.token !== null && res.data.token !== undefined){
                    localStorage.setItem('token' , res.data.token)
                    navigate('/dashboard')
                }
            }else{
                seterror(res.data.msg)
            }
        }).catch(e => console.log(e))
    }
  return (
    <>
    <div className="d-flex align-items-center my-5">
        <Container className="container mt-5">
            <Row className="justify-content-center">
                <Col className='col-12 col-md-5 col-lg-4'>
                    <div className='p-4 w-100 shadow-lg'>
                    <form className='form-group px-4 mt-4'
                        onSubmit={SubmitForm}
                        >
                        <h3 className='text-center p-3'>Hello! let's get started</h3>
                        <h6 className='text-center p-2'>Sign in to continue.</h6>
                        {error ? <h4 className='text-danger h5'>{error}</h4>: ''}
                        <div className='mt-4'>
                        <label className='form-label' htmlFor="email">Email address</label>
                        <div className='input-group'>
                        <span className='input-group-text'><EnvelopeOpen /></span>
                        <input
                            id="email"
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            required = {true}
                            value={email}
                            onChange= {e => setemail(e.target.value)}
                        />
                        </div>
                        </div>
                        <div className="my-4">
                        <label className='form-label' htmlFor="password">Password</label>
                        <div className='input-group'>
                        <span className='input-group-text'><Unlock /></span>
                        <input
                            id="password"
                            type ="password"
                            className="form-control"
                            placeholder='Enter a password'
                            required = {true}
                            onChange= {e => setpassword(e.target.value)}
                        />
                        </div>
                        </div>
                        <div className="d-grid my-5">
                            <button type="submit" className="btn btn-primary" style={{backgroundColor :'#262b40' , borderColor : "#262b40"}}>
                                Sign In
                            </button>
                        </div>
                        <div className='text-center mb-3'>
                            <span className='fw-normal'>Not Registered?
                                <Link className='fw-bold h6' to ="/signup" style={{ textDecoration : 'none' , color: "#262b40"}}> Create Account <ArrowReturnLeft size={25}/></Link>
                            </span>
                        </div>
                    
                    </form>
                    </div>
                </Col>
            </Row>
        </Container>
    </div>
    </>
  )
}

export default Home