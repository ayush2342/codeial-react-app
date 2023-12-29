import styles from '../styles/settings.module.css';
import { useAuth } from '../hooks';
import { useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { Navigate, useParams } from 'react-router-dom';
import { addFriend, fetchUserProfile, removeFriend } from '../api';
import { Loader } from '../components';



const UserProfile = () => {

    const [user,setUser]=useState({});
    const [loading,setLoading]=useState(true);
    const[requestInProgress,setRequestInProgress]=useState(false);
    const auth=useAuth();
    const {userid}=useParams();
    const {addToast}=useToasts();
    console.log(auth)
    
   

    useEffect(()=>{

      const getUser = async ()=>{
        
        const response = await fetchUserProfile(userid);

        if(response.success)
        {
            setUser(response.data.user);
        }
        else{

          addToast(response.message,{
            appearance:'error'
          }
        )
        return <Navigate to='/'/>;
        }
        
        setLoading(false);
      }

      getUser()

    },[userid,addToast])
    
    if (!auth.user) {
      return <Navigate to='/login'/>;
    
    }

    if(loading)
  {
    return <Loader/>;
    
  }
  
  const checkIfUserIsAFriend = ()=>{

    const friends = auth.user.friends;


    const friendList = friends.map((friend)=>{
      return friend.to_user._id

    })

    const index= friendList.indexOf(userid);

    if(index!==-1)
    {
      return true;
    }

    return false;

  }

  const showAddFriendBTN=checkIfUserIsAFriend();

  const handleRemoveFriendClick = async ()=>
  {
    setRequestInProgress(true);

    const friend = auth.user.friends.filter((friend)=>{
      return friend.to_user._id===userid
    })
    const response = await removeFriend(userid);

    if(response.success)
    {

      auth.updateUserFriends(false,friend[0]);

      addToast('Friend Removed Successfully',{
        appearance:'success'
      })

    }
    else
    {
      addToast(response.message,{
        appearance:'error'
      })
    }
    
    setRequestInProgress(false);
  }

  const handleAddFriendClick =async ()=>
  {
    setRequestInProgress(true);

    const response = await addFriend(userid);

    if(response.success)
    {
      const {friendship} = response.data;

      auth.updateUserFriends(true,friendship);

      addToast('Friend Added Successfully',{
        appearance:'success'
      })

    }
    else
    {
      addToast(response.message,{
        appearance:'error'
      })
    }
    
    setRequestInProgress(false);

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
        <div className={styles.fieldLabel}>Name</div>
        <div className={styles.fieldValue}>{user.name}</div>
      </div>


      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{user.email}</div>
      </div>

    


      <div className={styles.btnGrp}>

        {showAddFriendBTN?
        <button className={`button ${styles.saveBtn}`} disable={requestInProgress} onClick={handleRemoveFriendClick}>
          {requestInProgress?'Removing friend':'Remove friend'}</button>:
        <button className={`button ${styles.saveBtn}`} disable={requestInProgress} onClick={handleAddFriendClick}>{requestInProgress?'Adding friend':'Add friend'}</button>}
        
      </div>
    </div>
  );
};

export default UserProfile;
