
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router";
import { Login, Profile, SignUp } from './Pages';


function App() {

  return (
    <>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element={<Body />}>
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
            <Route path='/profile' element={<Profile />} />
          </Route>
        </Routes>

      </BrowserRouter>

    </>
  )
}

export default App
