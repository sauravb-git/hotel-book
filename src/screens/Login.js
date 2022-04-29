import React,{useState} from 'react';
import Loader from './../components/Loader';
import Error from './../components/Error';
import  axios  from 'axios';
import Navber from '../components/Navber';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function Login() {
    setLoading(true);
    const user = {
      email,
      password,
    };
    //console.log(user);
    try {
      const result = (await axios.post('users/login', user)).data;
      console.log(result);
      localStorage.setItem('currentUser', JSON.stringify(result));
      window.location.href = '/';
    } catch (error) {
      console.log(error);
      setError('Invalid Credentials');
    }
    setLoading(false);
  }


  return (
    <div>
        <Navber /> 

      <div className="row justify-content-center mt-5"
       style={{ padding: '0', margin: '0' }}
      > 
        <div className="col-md-5 mt-5">
        {error.length > 0 &&  <Error msg={error}></Error>}
        {loading ? (
            <Loader />
          ) : ( 
          <div className="bs">
          
            <h2>Login</h2>

            <input
              type="text"
              className="form-control"
              placeholder="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              className="form-control"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            
              <button className="btn btn-primary mt-3" onClick={Login}>
                Login
              </button>
              <br />
            <Link style={{ color: 'black' }} to="/register" >Click here to register</Link>
          </div> )} 
        </div>
      </div>
    </div>
  );
};

export default Login;
