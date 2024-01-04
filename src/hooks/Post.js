import { useContext, useEffect, useState } from "react";
import {PostsContext} from '../providers';
import {getPosts} from "../api";


export const usePosts = ()=>{
    return useContext(PostsContext);
  }
  
  export const useProvidePosts =()=>{
  
    const [posts,setPosts]=useState(null);
    const [loading,setLoading]=useState(true);
  
    useEffect(()=>{
  
      const fetchPosts = async ()=>{
  
         const response = await getPosts(1,7);
         
         if(response.success)
         {
          setPosts(response.data.posts)
         }
  
         setLoading(false)
      }
  
      fetchPosts()
    },[])
  
    const addPostToState =(post)=>{

      const newPost =[post,...posts];
      setPosts(newPost);
    }

    const addCommentToState =(post_id,comment)=>{


      const newPost =posts.map((post)=>{
      if(post._id===post_id)
      {
        return {...post,comments:[...post.comments,comment]}
      }
      return post;
      })

     
      setPosts(newPost);
    }

    const deleteCommentFromState =(post_id,comment_id)=>{


      const newPost =posts.map((post)=>{
      if(post._id===post_id)
      {
        const updatedComments = post.comments.filter(
          (comment) => comment._id !== comment_id
        );

        return {...post,
          comments: updatedComments}
      }
      return post;
      })

     
      setPosts(newPost);
    }
  
    return {
      data:posts,
        loading,
        addPostToState,
        addCommentToState,
        deleteCommentFromState
    }
  }