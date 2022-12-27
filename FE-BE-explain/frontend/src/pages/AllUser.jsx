import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const AllUser = () => {


  let navigate =   useNavigate()

  const [user, setUser] = useState([])
  const users = async () => {
    const apiData = {
      headers: {
        "token": localStorage.getItem("token")
      },
      method: "GET",
    }

    const api = await fetch('http://localhost:3001/user/all-user', apiData)
    const apiResponse = await api.json()
    console.log("response", apiResponse)
    setUser(apiResponse.user)

  }

  useEffect(() => {
    users()
  }, [])

  console.log("user", user)




  return (
    <div>

      <div class="table-responsive">
        <table class="table table-primary">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
            </tr>
          </thead>
          <tbody>
            {user && user?.map((data, index) => {
              return (
                <tr class="">
                  <td scope="row">{data.id}</td>
                  <td scope="row">{data.name}</td>
                  <td scope="row">{data.email}</td>
                  <td scope="row">
                    {data.role === "user" ? (<>
                      <Button variant="success">{data.role}</Button>{' '}
                    </>) : data.role === "employee" ? (<>
                      <Button variant="warning">{data.role}</Button>{' '}
                    </>) : (<><Button variant="danger">{data.role}</Button>{' '}
                    </>)
                    }


                  </td>
                </tr>
              )
            })}


          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AllUser