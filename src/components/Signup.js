import React,{useState} from 'react'
import {auth,fs} from '../Config/Config'
import { Link, Navigate } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import './Signup.css'

export const Signup = () => {

  const history = useNavigate();

  const [fullName, setFullName]=useState('');
  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');

  const [errorMsg, setErrorMsg]=useState('');
  const [successMsg, setSuccesMsg]=useState('');

  const handleSignup=(e)=>{
    e.preventDefault();
    // console.log(fullName, email, password);
    auth.createUserWithEmailAndPassword(email,password).then((Credentials)=>{
      console.log(Credentials);
      fs.collection('users').doc(Credentials.user.uid).set({
        FullName: fullName,
        Email: email,
        Password: password
      }).then(()=> {
         setSuccesMsg('Signup Successfull. You will now get redirected to Login');
         setFullName('');
         setEmail('');
         setPassword('');
         setErrorMsg('');
         setTimeout(()=>{
            setSuccesMsg('');
            history('/login');
         } ,2000)
      }).catch(error=>setErrorMsg(error.message));
    }).catch((error)=>{
       setErrorMsg(error.message)
    })
  }


  return (
    <div className='container'>
      <br></br>
      <br></br>
      <h1 className='sign'>Sign up</h1>
      <hr></hr>
      {successMsg&&<>
      <div className="success-msg">{successMsg}</div>
      <br></br>
      </>
      }
      <form className='form-goup' autoComplete='off' onSubmit={handleSignup}>
      <div className='fln'><label>Full Name</label>
        <input type="text" className='form-control' required
        onChange={(e)=>setFullName(e.target.value)} value={fullName}></input>
        <br></br></div>

        <div className='seml'><label>Email</label>
        <input type="email" className='form-control' required
        onChange={(e)=>setEmail(e.target.value)} value={email}></input>
        <br></br></div>

         <div className='spsd'> <label>Password </label>
        <input type="password" className='form-control' required
        onChange={(e)=>setPassword(e.target.value)} value={password}></input>
        <br></br></div>
       
        <div className='btn-box'>
        <span className='snot'>Already have an account Login
          <Link to ='/login' className='link'>Here</Link></span>
          <button type='submit' className='sn-bt'>SIGN UP</button>
        </div>
      </form>
      {errorMsg&&<>
        <br></br>
      <div className="error-msg">{errorMsg}</div>
      </>}
    </div>
  )   
}


