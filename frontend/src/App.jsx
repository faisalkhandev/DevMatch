
import './App.css'
import Header from './components/Header'
import { BrowserRouter, Route, Routes } from "react-router";
import Login from './Pages/Login';

function App() {

  return (
    <>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/login' element={<Login />} />
        </Routes>

      </BrowserRouter>

      <Header />
    </>
  )
}

export default App
