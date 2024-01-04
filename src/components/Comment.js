
import PropTypes from 'prop-types'
import styles from '../styles/home.module.css';
import {getTimeDifference} from '../utils'
import { deleteComment, toggleLike } from '../api';
import { useToasts } from 'react-toast-notifications';
import { useAuth,usePosts} from '../hooks';
import { useState } from 'react';

function Comment({comment,post})
{
  const auth=useAuth();
  const {addToast}=useToasts();
  const [requestInProgress,setRequestInProgress]=useState(false);
  const posts=usePosts();


  const handleDeleteComment=async()=>{

    setRequestInProgress(true);

    const response = await deleteComment(comment._id);

    if(response.success)
    {
      posts.deleteCommentFromState(post._id,comment._id)

      addToast("Comment Deleted Successfully",{
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
  const handleCommentLikeClick=async ()=>{

    const response=await toggleLike(comment._id,'Comment')
        
            if(response.success)
                {
                    if(response.data.deleted)
                    {
                      addToast("Comment Like Removed Successfully",{
                        appearance:'success'
                    })
                    }    
                    else
                    {
                      addToast("Comment Like Added Successfully",{
                        appearance:'success'
                    })
                    }
        
                }
                else
                {
                    addToast(response.message,{
                        appearance:'error'
                    })
        
                }

  }
    return (


<div className={styles.postCommentsItem}>
            <div className={styles.postCommentHeader}>
              <span className={styles.postCommentAuthor}>{comment.user.name}</span>
              <span className={styles.postCommentTime}>{getTimeDifference(comment.createdAt)}</span>
              <span className={styles.postCommentLikes}> <button onClick={handleCommentLikeClick}>
             <img
              src="https://img.freepik.com/free-vector/like-button-thumbs-up-cartoon-style_78370-1159.jpg?size=338&ext=jpg&ga=GA1.1.1546980028.1703980800&semt=ais"
              alt="likes-icon"
            /> 
            </button> {comment.likes.length} </span>
            </div>

            <div className={styles.postCommentContent}>{comment.content}
            {auth.user._id===comment.user._id&&<span className={styles.postCommentLikes}> <button 
            onClick={handleDeleteComment}
            disabled={requestInProgress}>
             <img
              src="data:image/png;base64,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"
              alt="delete-icon"
            /> 
            </button> </span>}
            </div>
          </div>
    )
}

Comment.propTypes = {
    comment:PropTypes.object.isRequired
  }

export default Comment;


