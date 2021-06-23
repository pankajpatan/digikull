import React, { useState, useEffect  } from 'react';
import { Modal, Button ,Form} from "react-bootstrap";
import { useSelector } from 'react-redux';
import axios from 'axios'
import Loader from '../component/loader'
const Attendence = (props) => {
    const [show, setShow] = useState(false);
    const [err, seterr] = useState(false);

    const [file,setfile] = useState(null)
    const [uploading,setUploading] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    const {id} = props.match.params

  


    const submitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData()

        formData.append('myfile', file)
   

        setUploading(true)
        const { token } = userInfo
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data' ,
                    'Authorization': `Bearer ${token}`
                }
            }

            const { data } = await axios.post(`/api/student/upload_attendence/${id}/`, formData, config)

            console.log(data)
            
            setUploading(false)

        } catch (error) {
            setUploading(false)
            seterr(true)
        }
    }

    return ( <div>
              <Button variant="primary" onClick={handleShow}>
                Open Update Modal
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Attendence Upload</Modal.Title>
                    {err && <p>Something Went Wrong!!</p>}
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


                            <Button type='submit' variant='primary'>
                                Update
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
 
export default Attendence;