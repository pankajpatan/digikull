import React,{useEffect} from 'react';
import {Table} from 'react-bootstrap'
const AttendenceSheet = (props) => {
    // console.log(props,'attednece')
   
    return ( <div>
               <Table striped bordered hover>
  <thead>
    <tr>
      
      
      <th>Meeting start time</th>
      <th>Join Time</th>
      <th>Leave Time</th>
      <th>Duration</th>
       
    </tr>
  </thead>
  <tbody>
    { props.attendence.map(item=>{
        return (
            <tr>
               
                <td>
                    {item.meeting_start_time}
                </td>
                <td>
                    {item.join_time}
                </td>
                <td>
                    {item.leave_time}
                </td>
                <td>
                    {item.duration}
                </td>
                
            </tr>
        )
    })
    
    }
  </tbody>
</Table>
    </div> );
}
 
export default AttendenceSheet;