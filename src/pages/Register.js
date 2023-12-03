import { useState } from 'react';
import styles from '../styles/register.module.css';
import { useToasts } from 'react-toast-notifications';
// import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks';

const Register = () => {
    
  const[name,setName]=useState('');  
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const[confirmPassword,setConfirmPassword]=useState('');
  const {addToast}=useToasts();

  const [signingUp, setSigningUp] = useState('');
  const auth = useAuth();
//   const history = useHistory();

const handleLoginNavigation = () => {
    window.location.href = '/login';
  };

  const handleSubmit = async (event)=>{
    event.preventDefault();
    setSigningUp(true);

    let error = false;

    if(!name||!email||!password||!confirmPassword)
    {
       addToast('Please fill all the fields',{
        appearance:'error',

      })
      error = true;
    }

    
    else if(password!==confirmPassword)
    {
        addToast('Password and Confirm Password do not match.Please try again',{
            appearance:'error',
    
          })
      error = true;
    }

    if (error) 
    {
        return setSigningUp(false);
    }


    const response= await auth.signup(name,email,password,confirmPassword);

    if(response.success)
    {
        // history.push('/login');
        
        setSigningUp(false);

      addToast("User Successfully Registered.Navigating to Login Page.",{
        appearance:'success'
      })

      setTimeout(() => {
        handleLoginNavigation();
      }, 1700);
      
    }
    else
    {
      addToast(response.message,{
        appearance:'error'
      })
    }

    setSigningUp(false);


  }


  return (
    <form className={styles.registerForm} onSubmit={handleSubmit}>
      <span className={styles.registerSignupHeader}>Sign Up</span>

      <div className={styles.field}>
        <input type="text" placeholder="Name" onChange={(event)=>{
          setName(event.target.value)}}/>
      </div>

      <div className={styles.field}>
        <input type="email" placeholder="Email" onChange={(event)=>{
          setEmail(event.target.value)}}/>
      </div>

      <div className={styles.field}>
        <input type="password" placeholder="Password" onChange={(event)=>{
          setPassword(event.target.value)
        }}/>
      </div>

      <div className={styles.field}>
        <input type="password" placeholder="Confirm Password" onChange={(event)=>{
          setConfirmPassword(event.target.value)
        }}/>
      </div>

      <div className={styles.field} >
      <button disabled={signingUp}>
          {signingUp ? 'Signing up...' : 'Sign Up'}
        </button>
      </div>
    </form>
  );
};

export default Register;
