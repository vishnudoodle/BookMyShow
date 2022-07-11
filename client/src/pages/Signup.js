import React ,{useEffect, useState} from 'react'
import Axios from '../config/axios'
import { Container, Row ,Col} from 'react-bootstrap'
import { Lock , ArrowReturnRight, Envelope } from 'react-bootstrap-icons'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [error , seterror] = useState('')
    let navigate = useNavigate()
    useEffect(() => {
        if(localStorage.getItem('token') !== null && localStorage.getItem('token')  !== undefined){
            navigate('/dashboard')
        }else{
            navigate('/signup')
        }
    }, [])
    const SubmitForm = async (e) =>{
        e.preventDefault();
        await Axios.post('/user/create',{
            email,
            password
        }).then(res =>{
            if(res.data.msg){
                seterror(res.data.msg)
            }else {
                console.log("user created")
                navigate('/')
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
                            <h3 className='text-center p-3'>New here?</h3>
                            <h6 className='text-center p-2'>Signing up is easy. It only takes a few steps</h6>
                            {error ? <h4 className='text-danger h5'>{error}</h4>: ''}
                            <div className='mt-4'>
                            <label className='form-label' htmlFor="email">Email address</label>
                            <div className='input-group'>
                            <span className='input-group-text'><Envelope /></span>
                            <input
                                id="email"
                                type="email"
                                className="form-control"
                                placeholder="Enter email"
                                value={email}
                                onChange= {e => setemail(e.target.value)}
                            />
                            </div>
                            </div>
                            <div className="my-4">
                            <label className='form-label' htmlFor="password">Password</label>
                            <div className='input-group'>
                            <span className='input-group-text'><Lock /></span>
                            <input
                                id="password"
                                type ="password"
                                className="form-control"
                                placeholder='Enter a password'
                                onChange= {e => setpassword(e.target.value)}
                            />
                            </div>
                            </div>
                            <div className="d-grid my-5">
                                <button type="submit" className="btn btn-primary" style={{backgroundColor :'#262b40' , borderColor : "#262b40"}}>
                                    Sign Up
                                </button>
                            </div>
                            <div className='text-center mb-3'>
                                <span className='fw-normal'>Already have an account?
                                    <Link className='fw-bold h6' to ="/" style={{ textDecoration : 'none' , color: "#262b40"}}> Login <ArrowReturnRight size={25}/></Link>
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

export default Signup