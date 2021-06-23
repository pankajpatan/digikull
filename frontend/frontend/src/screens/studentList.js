import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import axios from 'axios'

const StudentList = (props) => {
    const [student, setstudent] = useState([])
    const { id } = props.match.params

    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    const handleClick = (id) => {
        props.history.push(`studentdetails/${id}`)
    }
    useEffect(() => {
        const { token } = userInfo
        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        axios.get(`api/student/get_students/${id}/`, config).then(res => setstudent(res.data)).catch(err => console.log(err))
    }, [])
    return (<div>
        <div style={{display:'flex',flexDirection: 'row-reverse'}} >
           {userInfo && !userInfo.isAdmin && <Link to={`/attendence/${id}`}> <span>Upload Attendence</span> </Link>}
           {userInfo && !userInfo.isAdmin && <Link style={{marginRight:'40px'}} to={`/uploadgrade/${id}`} ><span>Upload Grades</span></Link>}
        </div>
        <Table striped bordered hover>
            <thead>
                <tr>

                    <th> Name</th>
                    <th>Email</th>
                    <th>Total Grades</th>
                    <th>Class Attended</th>
                </tr>
            </thead>
            <tbody>
                {student.map(item => {
                    return (
                        <tr >
                            <td>
                                <Link to={`/studentdetails/${item._id}`}>{item.name}</Link>
                            </td>
                           
                            <td>
                                {item.email}
                            </td>
                            <td>
                                {item.total_grades}
                            </td>
                            <td>
                                {`${item.total_class_attended}%`}
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    </div>);
}

export default StudentList;