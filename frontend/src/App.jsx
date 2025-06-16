
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router";
import { Connections, Feed, Login, Profile, Requests, SignUp } from './Pages';
import Body from './Pages/Body';
import { Provider } from 'react-redux'
import appStore from './Store/store';
import PrivateRoute from './routes/PrivateRoute';
import 'react-toastify/dist/ReactToastify.css';
import Toast from './components/Toast';
import Chat from './Pages/Chat';
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
              <Route
                path='/profile'
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
                path='/feed'
                element={
                  <PrivateRoute>
                    <Feed />
                  </PrivateRoute>
                }
              />
              <Route
                path='/friends'
                element={
                  <PrivateRoute>
                    <Connections />
                  </PrivateRoute>
                }
              />
              <Route
                path='/requests'
                element={
                  <PrivateRoute>
                    <Requests />
                  </PrivateRoute>
                }
              />
              <Route
                path='/chat/:userId'
                element={
                  <PrivateRoute>
                    <Chat />
                  </PrivateRoute>
                }
              />

            </Route>

          </Routes>
        </BrowserRouter>
      </Provider>

    </>
  )
}

export default App
