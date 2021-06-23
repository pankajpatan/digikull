import React, { useState, useEffect  } from 'react';
import {useSelector} from 'react-redux'
import { Modal, Button ,Form} from "react-bootstrap";
import {useHistory} from 'react-router-dom'

import axios from 'axios'
export default function UpdateBatch(props) {
    const [show, setShow] = useState(false);
    const [name, setname] = useState('')
    const [classCordinator, setclassCordinator] = useState(null)
    const [user,setuser] = useState([])
    const [response,setresponse] = useState('')

    const {id} = props.match.params
    // console.log(id)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin
    const history = useHistory()
    const data ={
        name : name ,
        class_cordinator : classCordinator
    }
    useEffect(()=>{
        const {token}  = userInfo
        const config = {
          headers: {
              'Content-type': 'application/json' ,
              'Authorization' : `Bearer ${token}`
          }
      }
      axios.get('api/users/get_users/',config).then(res=>setuser(res.data)).catch(err=>console.log(err))
      axios.get(`api/batch/single_batch/${id}`,config).then(res=>{
          console.log(res.data)
        setname(res.data.name)
      }).catch(err=>console.log(err))


    },[])

    const submitHandler = (e) =>{
        e.preventDefault()
        const {token}  = userInfo
        const config = {
          headers: {
              'Content-type': 'application/json' ,
              'Authorization' : `Bearer ${token}`
          }
      }
        axios.put(`api/batch/batch_update/${id}/`,data,config).then(res=>setresponse(res)).catch(err=>console.log(err))

    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Open Update Modal
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Batch</Modal.Title>
                </Modal.Header>
                <Modal.Body>
              
                        {response && <h2 style={{color:"red"}}>Batch Updated</h2>}
                        
                        <Form onSubmit={submitHandler}>

                            <Form.Group controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter name'
                                    value={name}
                                    onChange={(e) => setname(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>


                            <Form.Group controlId='classCordinaator'>
                                <Form.Label>class cordinator</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={classCordinator}
                                    onChange={(e) => setclassCordinator(e.target.value)}
                                >
                                    {user.map(x => {
                                        return (
                                            <option value={x._id} >
                                                {x.name}
                                            </option>
                                        )
                                    })}
                                </Form.Control>
                            </Form.Group>

                            <Button type='submit' variant='primary'>
                                Update
                            </Button>
                        </Form>
                
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

