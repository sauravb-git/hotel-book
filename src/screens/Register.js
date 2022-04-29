import React, { useState } from 'react';
import Loader from './../components/Loader';
import Error from './../components/Error';
import Success from './../components/Success';
import axios from 'axios';
import Navber from '../components/Navber';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Register = () => {
  const { register, handleSubmit, errors, watch } = useForm();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function onSubmits() { 
    if (password === cpassword) {
      const user = {
        name,
        email,
        password,
        cpassword,
      };
      //console.log(user);
      setLoading(true);
      setError('');
      setSuccess('');
      try {
        const result = (await axios.post('users/register', user)).data;
        console.log(result);
        setSuccess(result);
        setName('');
        setEmail('');
        setPassword('');
        setCpassword('');
      } catch (error) {
        console.log(error);
        setError(error);
      }
      setLoading(false);
    } else {
      alert('Password not matched');
    }
    
  }
  return (
    <div>
      <Navber />
      {error.length > 0 && <Error msg={error}></Error>}

      <div
        className="row justify-content-center mt-5"
        style={{ padding: '0', margin: '0' }}
      >
        <div className="col-md-5 mt-5">
          {loading ? (
            <Loader />
          ) : (
            <form onSubmit={handleSubmit(onSubmits)}>
              {success.length > 0 && <Success msg={success}></Success>}
              <div className="bs">
                <h2>Register</h2> 
                  <div className="form-group">
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      name="name"
                      required
                      className="form-control"
                      ref={register({ minLength: 4 })}
                      placeholder="Name"
                    />
                    {errors.name && (
                      <span className="error red">
                        Name is Must be 4 Character
                      </span>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      name="email"
                      required
                      className="form-control"
                      ref={register({ required: true })}
                      placeholder="Email"
                    />
                    {errors.email && (
                      <span className="error red">Email is required</span>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      name="password"
                      className="form-control"
                      ref={register({ minLength: 8 })}
                      placeholder="Password"
                    />
                    {errors.password && (
                      <span className="error red">
                        Password is Must be 8 Character
                      </span>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      value={cpassword}
                      onChange={(e) => setCpassword(e.target.value)}
                      type="password"
                      required
                      name="cpassword"
                      className="form-control"
                      ref={register({
                        validate: (value) => value === watch('password'),
                      })}
                      placeholder="Confirm Password"

                    />
                    {errors.cpassword && (
                      <span className="error red">Passwords didn't match.</span>
                    )}
                  </div>

                  <button type="submit" className="btn mt-4 mb-3">
                    Register
                  </button>  

                  <br />
                 <Link style={{ color: 'black' }} to="/login" >Click here to login</Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
