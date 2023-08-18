import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import {auth} from '../Config/Config'
import {useNavigate} from 'react-router-dom'
import './Login.css'

export const Login = () => {

  const history = useNavigate();

  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');

  const [errorMsg, setErrorMsg]=useState('');
  const [successMsg, setSuccesMsg]=useState('');

  const handleLogin=(e)=>{
    e.preventDefault();
    // console.log(email, password);
    auth.signInWithEmailAndPassword(email,password).then(()=>{
      setSuccesMsg('Login Successfull. You will now get redirected to Home Page');
      setEmail('');
      setPassword('');
      setErrorMsg('');
      setTimeout(()=>{
         setSuccesMsg('');
         history('/');
      } ,2000)
    }).catch(error=>setErrorMsg(error.message));

  }



  return (
    <div className='container'>
      <br></br>
      <br></br>
      <h1 className='log'>Login</h1>
      <hr></hr>
      {successMsg&&<>
      <div className="success-msg">{successMsg}</div>
      <br></br>
      </>
      }
      <form className='form-group' autoComplete='off' onSubmit={handleLogin}>
        <div className='eml'><label >Email </label>
        <input type="email" className='form-control' required
        onChange={(e)=>setEmail(e.target.value)} value={email}></input>
        <br></br></div>
       <div className="psd">
       <label>Password </label>
        <input type="password" className='form-control' required
        onChange={(e)=>setPassword(e.target.value)} value={password}></input>
        <br></br>
       </div>
        
        <div className="btn-box">
        <span className='not'>Don't have an account Signup
          <Link to='/signup' className='link'>Here</Link></span>
          <button type="submit" className='bn-bt'>Login</button>
        </div>
      </form>
      {errorMsg&&<>
        <br></br>
      <div className="error-msg">{errorMsg}</div>
      </>}
    </div>
  )
}
