import { useContext, useEffect, useState } from "react";
import {AuthContext} from '../providers';
import { login as userLogin ,register,editProfile, fetchUserFriends} from "../api";
import { LOCALSTORAGE_TOKEN_KEY,setItemInLocalStorage,getItemFromLocalStorage,removeItemFromLocalStorage } from "../utils";
import { jwtDecode } from 'jwt-decode';

export const useAuth = ()=>{
    return useContext(AuthContext);
}

export const useProvideAuth =()=>{

    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{

      const getUser = async ()=>{

        const userToken= getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);

        if(userToken)
        {
            const user = jwtDecode(userToken);

            let friends=[];

            const response= await fetchUserFriends();
            if(response.success)
            {
              friends=response.data.friends
            }
            setUser({
              ...user,
              friends
            });
        }

        setLoading(false);

      }

      getUser();

    },[])

    const updateUser = async (userID,name,password,confirmPassword)=>
    {
      const response=await editProfile(userID,name,password,confirmPassword);

        
    if(response.success)
    {
        setUser(response.data.user);
        setItemInLocalStorage(
          LOCALSTORAGE_TOKEN_KEY,
          response.data.token?response.data.token:null
          );
      return {
        success:true
      }
    }
    else
    {
      return {
        success:false,
        message:response.message
      }
    }

    }


    const login = async (email,password)=>{
       
        const response=await userLogin(email,password);

    if(response.success)
    {

        setItemInLocalStorage(
            LOCALSTORAGE_TOKEN_KEY,
            response.data.token?response.data.token:null
            );

        const user =response.data.user;

        let friends=[];

        const response1= await fetchUserFriends();
        
        if(response1.success)
        {
          friends=response1.data.friends
        }
        setUser({
          ...user,
          friends
        });
          
      return {
        success:true
      }
    }
    else
    {
      return {
        success:false,
        message:response.message
      }
    }
    };

    const signup = async (name, email, password, confirmPassword) => {
        const response = await register(name, email, password, confirmPassword);
    
        if (response.success) {
          return {
            success: true,
          };
        } else {
          return {
            success: false,
            message: response.message,
          };
        }
      };

    const logout =()=>{
        setUser(null);
        removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
    };

    const updateUserFriends =(addFriend,friend)=>{

      if(addFriend)
      {
        
        setUser({
          ...user,
          friends:[...user.friends,friend]
        })
        return;

      }

      const newFriends=user.friends.filter((userFriends)=>{
        return userFriends.to_user._id!==friend.to_user._id
      })

      setUser({
        ...user,
        friends:newFriends
      })


      

    }

    return {
        user,
        loading,
        signup,
        login,
        logout,
        updateUser,
        updateUserFriends
    }

}
