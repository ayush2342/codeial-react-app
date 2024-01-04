
import { useState } from 'react';
import styles from '../styles/home.module.css';
import { useToasts } from 'react-toast-notifications';
import { AddComment } from '../api';
import { usePosts } from '../hooks';


const CreateComment =({post_id})=>{

    const [comment,setComment]=useState('');
    const [loading,setLoading]=useState(false);
    const {addToast} =useToasts();
    const posts =usePosts();

    const handleKeyPress=async ()=>{
        
        if(!comment)
        {
            return addToast("Comment field should not be empty",{
                appearance:'error'
            })
        }

        setLoading(true);

        const response = await AddComment(post_id,comment);

        if(response.success)
        {
            setComment('');
            posts.addCommentToState(post_id,response.data.comment)

            addToast("Comment Added Successfully",{
                appearance:'success'
            })

        }
        else
        {
            addToast(response.message,{
                appearance:'error'
            })

        }



        setLoading(false);
    }

    return (
        <div className={styles.postCommentBox}>
          <input type='text' 
          placeholder="Start typing a comment" 
          value={comment}
          disabled={loading} 
          onChange={(event)=>{
            setComment(event.target.value)
          }}

          onKeyDown={(event)=>{
            if(event.key==='Enter'){
                handleKeyPress();
            }
            }}
          
          />
        </div>
    )
}

export default CreateComment;