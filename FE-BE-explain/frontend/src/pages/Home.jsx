import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'

import './Home.css'
const Home = () => {
  const navigate = useNavigate()
  const Logout = () => {
    console.log("Hello duniya")
    localStorage.clear()
    navigate('/login')

  }

  return (
    <div className='home'>
      <div className='home_menu'>

        <Button className='Button' onClick={() => navigate('/')}>
          Home
        </Button>
      </div>
      <div className='home_menu'>
        <Button className='Button' onClick={() => navigate('/all-user')}>
          All User
        </Button>
      </div>
      {
        localStorage.getItem("token") ? (<>
          <div className='home_menu'>
            <Button className='Button' onClick={Logout}>Logout</Button>
          </div>

        </>) : (<>
          <div className='home_menu'>
            <Button className='Button' onClick={() => navigate('/login')}>
              Login
            </Button>
          </div>
          <div className='home_menu'>
            <Button className='Button' onClick={() => navigate('/register')}>
              Register
            </Button>
          </div>
        </>)
      }

      

      <div className='home_menu'>
        <Button className='Button' onClick={() => navigate('/profile')}>
          Profile
        </Button>
      </div>



    </div>
  )
}

export default Home