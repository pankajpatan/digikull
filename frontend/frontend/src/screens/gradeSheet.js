import {Table} from 'react-bootstrap'
const GradeSheet = (props) => {
   const arr =['Tip Calculator','JavaScript Assignment 1','Bootstrap Assignment',
'Styling First 2 assignment','Dating-Application','Git Assignment','Tribute Page'
]

props.grades.forEach((item,ind)=>item["assignment"]=arr[ind])

    return ( <div>
               <Table striped bordered hover>
  <thead>
    <tr>
    <th> Assignment</th>
      <th> Aggregate Marks</th>
      <th>Total Marks</th>
      <th>Feedback</th>
      
       
    </tr>
  </thead>
  <tbody>
    {props.grades.map(item=>{
        return (
            <tr>
                <td>
                   {item.assignment}
                </td>
                <td>
                    {item.marks}
                </td>
                <td>
                    {item.points}
                </td>
                <td>
                    {item.feedback}
                </td>
            </tr>
        )
    })}
  </tbody>
</Table>
    </div> );
}
 
export default GradeSheet;