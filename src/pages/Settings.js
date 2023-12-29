import styles from '../styles/settings.module.css';
import { useAuth } from '../hooks';
import { useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { Navigate } from 'react-router-dom';


const Settings = () => {

    const auth = useAuth();
    const [editMode,setEditMode]=useState(false);
    const [name,setName]=useState(auth.user?.name?auth.user.name:'');
    const [password,setpassword]=useState('');
    const [confirmPassword,setconfirmPassword]=useState('');
    const [savingForm,setsavingForm]=useState(false);
    const {addToast} = useToasts();

    const clearForm =()=>{
      setName('');
      setpassword('');
      setconfirmPassword('');
    }

    const updateprofile = async ()=>{

      setsavingForm(true);

      let error = false;
      
      if(!name||!password||!confirmPassword)
      {
        addToast('Please fill in all the Fields',{
          appearance:'error'
        })

        error=true;

      }
      
      else if(password!==confirmPassword)
      {
        addToast('Password and Confirm Password do not Match',{
          appearance:'error'
        })

        error=true;

      }

      if(error){
        return setsavingForm(false);
      }

      const response = await auth.updateUser(auth.user._id,name,password,confirmPassword);

      if(response.success)
      {
        setEditMode(false);
        setsavingForm(false);
        addToast('User updated Successfully',{
          appearance:'success'
        })

        clearForm();
      }

      else
      {
        addToast(response.message,{
          appearance:'error'
        })

      }

      setsavingForm(false);

    }

    
    if (!auth.user) {
      return <Navigate to='/login'/>;
    
    }



  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsyA44JdhHChP6kGqx36BolQq4Hn7z2yGekw&usqp=CAU"
          alt=""
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{auth.user?.email}</div>
      </div>

      <div className={styles.field}>
        {editMode?<input type="text" value={name} autoComplete='name' onChange={(event)=>{
        setName(event.target.value);
        }}/>:<>
        <div className={styles.fieldLabel}>Name</div>
        <div className={styles.fieldValue}>{auth.user?.name}</div>
        </>
        }
        
      </div>

      {editMode&&<>
        <div className={styles.field}>
        <div className={styles.fieldLabel}>Password</div>
        <input type="password" value={password} onChange={(event)=>{
        setpassword(event.target.value);
        }}/>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Confirm Password</div>
        <input type="password" value={confirmPassword} onChange={(event)=>{
        setconfirmPassword(event.target.value);
        }}/>
      </div>
      </>}


      <div className={styles.btnGrp}>
        {editMode?<>
        <button className={`button ${styles.saveBtn}`} disabled={savingForm} onClick={updateprofile}>{savingForm?'Saving Profile...':'Save Profile'}</button>
        <button className={`button ${styles.goBack}`} onClick={()=>{setEditMode(false)}}>Go Back</button></> : 
        <button className={`button ${styles.editBtn}`} onClick={()=>{setEditMode(true)}}>Edit Profile</button>}
      </div>
    </div>
  );
};

export default Settings;
