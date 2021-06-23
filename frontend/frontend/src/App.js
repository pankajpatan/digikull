import { Container } from 'react-bootstrap'
import { HashRouter as Router, Route } from 'react-router-dom'
import Header from './component/Header'
import Attendence from './screens/asheetUpload'
import Grades from './screens/gsheetUpload'
import Createbatch from './screens/createBatch'
import StudentList from './screens/studentList'
import HomeScreen from './screens/HomeScreen.js'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import UpdateBatch from './screens/updateBatch'
import StudentDetails from './screens/studentDetails'
// import Attendence from './screens/asheetUpload'



function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path='/' component={LoginScreen} exact />
          <Route path='/home' component={HomeScreen}  />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/createbatch' component={Createbatch} />
          <Route path='/updatebatch/:id' component={UpdateBatch} />
          <Route path='/uploadgrade/:id' component={Grades} />
          <Route path='/attendence/:id' component={Attendence} />
          {/* <Route path='/asheetupload' component={Attendence} /> */}
          <Route path='/studentlist/:id' component={StudentList} />
          <Route path='/studentdetails/:id' component={StudentDetails} />

        </Container>
      </main>
   
    </Router>
  );
}

export default App;