import { useState } from 'react';
import styles from '../styles/login.module.css';
import { useToasts } from 'react-toast-notifications';
import { useAuth } from '../hooks';

const Login = () => {

  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const[logginIn,setLoggin]=useState(false);
  const {addToast}=useToasts();
  const auth=useAuth();
  console.log(auth)

  const handleSubmit = async (event)=>{
    event.preventDefault();

    if(!email||!password)
    {
      return addToast('Please Enter both Email and Password',{
        appearance:'error',

      })

    }

    setLoggin(true);

    const response=await auth.login(email,password);

    if(response.success)
    {
      addToast("Successfully Logged In",{
        appearance:'success'
      })
    }
    else
    {
      addToast(response.message,{
        appearance:'error'
      })
    }

    setLoggin(false);


  }


  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Log In</span>

      <div className={styles.field}>
        <input type="email" placeholder="Email" onChange={(event)=>{
          setEmail(event.target.value)}}/>
      </div>

      <div className={styles.field}>
        <input type="password" placeholder="Password" onChange={(event)=>{
          setPassword(event.target.value)
        }}/>
      </div>

      <div className={styles.field} >
        <button disabled={logginIn}>
          {logginIn?'Logging In...':'Log In'}
          </button>
      </div>
    </form>
  );
};

export default Login;
