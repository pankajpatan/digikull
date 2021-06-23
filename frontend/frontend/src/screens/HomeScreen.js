import react, { useEffect, useState } from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
const HomeScreen = () => {
  const [batch, setbatch] = useState([])
  const [user, setuser] = useState([])

  const userLogin = useSelector(state => state.userLogin)
  const { error, loading, userInfo } = userLogin
  useEffect(() => {
    const { token } = userInfo
    const config = {
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }

    axios.get(userInfo && userInfo.isAdmin ? "api/batch/get_batches/" : "api/batch/my_batches/", config).
      then(res => {
        console.log(res.data)
        setbatch(res.data)
      }).catch(err => console.log(err))

    axios.get('api/users/get_users/', config).then(res => setuser(res.data)).catch(err => console.log(err))
  }, [])

  return (<div>


    <h1>Batch List</h1>

    <div>
      <Row>
        {batch.map(item => (
          <Col key={item._id} sm={12} md={6} lg={4} xl={3}>
           <Link to={`studentlist/${item._id}`}>   <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                {user.filter(elem => elem._id == item.class_cordinator).map(item => {
                  return (
                    <Card.Text>
                      {`class cordinator : ${item.name} `}
                    </Card.Text>
                  )
                })}

                <Link style={{ marginRight: "10px" }} to={`studentlist/${item._id}`} > Students </Link>
                {userInfo && userInfo.isAdmin && <Link to={`updatebatch/${item._id}`} > Update </Link>}
              </Card.Body>
            </Card></Link>
          </Col>
        ))}
      </Row>

    </div>

  </div>);
}

export default HomeScreen;