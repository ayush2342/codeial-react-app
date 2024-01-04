import {API_URLS,LOCALSTORAGE_TOKEN_KEY} from '../utils'
import { getFormBody } from '../utils'



const customFetch = async (url , {body, ...customConfig})=>
{

    const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY)

    const headers ={
        'content-type': 'application/x-www-form-urlencoded'
    }

    if(token)
    {
        headers.Authorization =`Bearer ${token}`
    }

    const config ={
        ...customConfig,
        headers:{
            ...headers,
            ...customConfig.headers
        }
    }

    if(body)
    {
        config.body = getFormBody(body);
    }

    try {

        const response =await fetch(url,config);
        const data = await response.json()

        if(data.success)
        {
            return {
                data:data.data,
                success:true

            }
        }

        throw new Error(data.message)
        
        
    } catch (error) {
        console.error('Error')
        return {
            message:error.message,
            success:false

        }
    }


}

export const getPosts = (page=1,limit=5)=>
{
    return customFetch(API_URLS.posts(page,limit),{
        method:'GET'
    });
}

export const login=(email,password)=>{
    return customFetch(API_URLS.login(),{
        method:'post',
        body:{
            email,
            password
        }
    })
}

export const register=async (name,email,password,confirmPassword)=>{
    return customFetch(API_URLS.signup(),{
        method:'POST',
        body:{
            name,
            email,
            password,
            confirm_password:confirmPassword
        }
    })
}

export const editProfile=async (userID,name,password,confirmPassword)=>{
    return customFetch(API_URLS.editUser(),{
        method:'POST',
        body:{
            id:userID,
            name,
            password,
            confirm_password:confirmPassword
        }
    })
}

export const fetchUserProfile=async (userid)=>{
    return customFetch(API_URLS.userInfo(userid),{
        method:'GET'
    })
}

export const fetchUserFriends=async ()=>{
    return customFetch(API_URLS.friends(),{
        method:'GET'
    })
}

export const addFriend=async (userId)=>{
    return customFetch(API_URLS.createFriendship(userId),{
        method:'POST'
    })
}

export const removeFriend=async (userId)=>{
    return customFetch(API_URLS.removeFriend(userId),{
        method:'POST'
    })
}

export const AddPost=async (content)=>{
    return customFetch(API_URLS.createPost(),{
        method:'POST',
        body:{
            content
        }
    })
}

export const AddComment=async (post_id,content)=>{
    return customFetch(API_URLS.comment(),{
        method:'POST',
        body:{
            post_id,
            content
        }
    })
}

export const toggleLike=async (itemId,itemType)=>{
    return customFetch(API_URLS.toggleLike(itemId,itemType),{
        method:'POST'
    })
}

export const deleteComment=async (commentId)=>{
    return customFetch(API_URLS.deleteComment(commentId),{
        method:'POST'
    })
}

