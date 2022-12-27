import logo from './logo.svg';
import './App.css';
import Register from './pages/Register';
import AllUser from './pages/AllUser';
import Home from './pages/Home';
import Profile from './pages/Profile'
import Login from './pages/Login';
import { AdminProtected, UserProtected } from './Auth';
import Dashboard from './pages/Dashboard';
import { Route, Routes } from 'react-router-dom';
import Error from './Error';
// import Register from './pages/Register';
function App() {
  return (
    <div className="App">
      <Home />
      <Routes>


        <Route path='/' element={<Dashboard />}></Route>
      <Route path={"/all-user"} element={<AdminProtected cmp={AllUser} />} />
        <Route path='*' element={<Error />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
      <Route path={"/profile"} element={<UserProtected cmp={Profile} />} />
      {/* <Route path={"/verification"} element={<UserProtected cmp={Profile} />} /> */}
        {/* <Route path='/profile' element={<Profile />}></Route> */}
      {/* <Route path={"/ad"} element={<AdminProtected cmp={Profile} />} /> */}
        {/* <Route path='/all-user' element={<AllUser />}></Route> */}

      </Routes>


      {/* Hello */}
      {/* <Register /> */}
      {/* <Login /> */}
    </div>
  );
}

export default App;


// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhmMzM4ZmQ3LWFkMTEtNDRhMS1iNTI2LWU0ZjM0YWI4MjAxYiIsImlhdCI6MTY2OTk5NzIzMX0.KTKIxUK_mqaR9K1wooe89R3s3TTT5qlijA3r4Sm9YLU"