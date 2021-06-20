import { Tabs ,Tab } from "react-bootstrap";
import { useSelector } from "react-redux";
import React,{useState,useEffect} from 'react';
import GradeSheet from "./gradeSheet";
import AttendenceSheet from "./attendenceSheet";
import axios from 'axios'
const StudentDetails = (props) => {
    const [key, setKey] = useState('Attendence');
    const [grades, setgrades] = useState([]);
    const [attendence, setattendence] = useState([]);
    const {id} = props.match.params
    console.log(id)
    const userLogin = useSelector(state => state.userLogin)
    const {  userInfo } = userLogin

    useEffect(()=>{
        const {token}  = userInfo
        const config = {
          headers: {
              'Content-type': 'application/json' ,
              'Authorization' : `Bearer ${token}`
          }
      }
        axios.get(`api/student/get_student_attendence/${id}/`,config).then(res=>setattendence(res.data)).catch(err=>console.log(err))
        axios.get(`api/student/get_student_grades/${id}/`,config).then(res=>setgrades(res.data)).catch(err=>console.log(err))
    },[])
    return (  <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
    >
      <Tab eventKey="Attendence" title="Attendence">
        <AttendenceSheet attendence ={attendence}/>
       
      </Tab>
      <Tab eventKey="Gradesheet" title="Gradesheet">
      <GradeSheet grades ={grades} />
      </Tab>
     
    </Tabs>
    
    );
}
 
export default StudentDetails;