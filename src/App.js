import './App.css';
import { Routes, useNavigate, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from "axios";
import Navbar from "./components/Navbar";
import PhoneDetails from "./pages/PhoneDetails"
import Home from './pages/Home';
import Error from './pages/Error';
import NotFound from './pages/NotFound';
function App() {

  const [phonesList, setPhonesList] = useState([])
  const [fetchingPhones, setFetchingPhones] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    getPhonesList()
  }, [])

  const getPhonesList = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/phones`)

      setTimeout(() => {
        setPhonesList(response.data)
        setFetchingPhones(false)
      }, 1000)
    } catch(err) {
      navigate("/error")
    }
  }

  return (
    <div className='App'>
      <Navbar phonesList={phonesList}/>
      <div id='page'>
        <Routes>
          <Route path="/" element={ <Home /> }/>
          <Route path="/phone-details/:phoneId" element={ <PhoneDetails phonesList={phonesList}/>}/>

          <Route path="/error" element={ <Error />}/>
          <Route path="/*" element={ <NotFound />}/>
        </Routes>
      </div>
    </div>
  )
}

export default App;
