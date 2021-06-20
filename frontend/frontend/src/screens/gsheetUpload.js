import React, { useState, useEffect  } from 'react';
import { Modal, Button ,Form} from "react-bootstrap";
import { useSelector } from 'react-redux';
import axios from 'axios'
import Loader from '../component/loader'
const Grades = () => {
    const [show, setShow] = useState(false);
    const [batch, setbatch] = useState(null);
    const [fetch,setfetch] = useState([])
    const [file,setfile] = useState(null)
    const [uploading,setUploading] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    console.log(batch,'batch')
    useEffect(()=>{
        
    const { token } = userInfo
    const config = {
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
    axios.get('api/batch/get_batches',config).then(res=>setfetch(res.data)).catch(err=>console.log(err))
    },[])


    const submitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData()

        formData.append('myfile', file)
        formData.append('batch', batch)

        setUploading(true)
        const { token } = userInfo
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data' ,
                    'Authorization': `Bearer ${token}`
                }
            }

            const { data } = await axios.post('/api/student/upload_grades/', formData, config)

            console.log(data)
            
            setUploading(false)

        } catch (error) {
            setUploading(false)
        }
    }

    return ( <div>
              <Button variant="primary" onClick={handleShow}>
                Open Update Modal
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Grades Upload</Modal.Title>
                </Modal.Header>
                <Modal.Body>
              
                        {/* {response && <h2 style={{color:"red"}}>Uploaded</h2>} */}
                        
                        <Form onSubmit={submitHandler}>

                        <Form.File
                                    id='image-file'
                                    label='Choose File'
                                    custom
                                    onChange={(e)=>setfile(e.target.files[0])}
                                >

                                </Form.File>
                                {uploading && <Loader />}

                            <Form.Group controlId='batch'>
                                <Form.Label>class cordinator</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={batch}
                                    name = "batch"
                                    onChange={(e) => setbatch(e.target.value)}
                                >
                                    {fetch.map(x => {
                                        return (
                                            <option value={x._id} >
                                                {x.name}
                                            </option>
                                        )
                                    })}
                                </Form.Control>
                            </Form.Group>

                            <Button type='submit' variant='primary'>
                                Upload
                            </Button>
                        </Form>
                
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    
                </Modal.Footer>
            </Modal>
    </div> );
}
 
export default Grades;