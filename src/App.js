import './App.css';
import { render } from 'react-dom';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Navber from './components/Navber';
import Home from './screens/Home';
import Booking from './screens/Booking';
import Register from './screens/Register';
import Login from './screens/Login';
import Profile from './screens/Profile';
import Admin from './screens/Admin/Admin';

function App() {
  return (
    <div className="App">  
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bookings" exact element={<Profile />} />
          <Route
            path="/book/:roomid/:fromdate/:todate"
            exact
            element={<Booking />}
          /> 
          <Route path="/login" exact element={<Login />} /> 
          <Route path="/register" exact element={<Register />  } />  
          <Route path="/admin/saurav" exact element={<Admin />  } /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
