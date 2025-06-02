
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router";
import { Feed, Login, Profile, SignUp } from './Pages';
import Body from './Pages/Body';
import { Provider } from 'react-redux'
import appStore from './Store/store';
import Toast from './Components/ShowToast';

function App() {

  return (
    <>
      <Toast />
      <Provider store={appStore}>
        <BrowserRouter basename='/'>
          <Routes>
            <Route path='/' element={<Body />}>
              <Route path='/signup' element={<SignUp />} />
              <Route path='/login' element={<Login />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/feed' element={<Feed />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>

    </>
  )
}

export default App
