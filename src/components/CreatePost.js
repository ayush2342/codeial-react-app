
import { useState } from 'react';
import styles from '../styles/home.module.css';
import { AddPost } from '../api';
import { useToasts } from 'react-toast-notifications';
import { usePosts } from '../hooks';


const CreatePost =()=>{

    const [post,setPost]=useState('');
    const [addingPost,setAddingPost]=useState(false);
    const {addToast} = useToasts();
    const posts = usePosts();

    const handleAddPostClick=async ()=> {

       

        if(!post)
        {
            return addToast('Please enter some Value to Post',{
                appearance:'error',
        
              })

        }

        setAddingPost(true);

        const response = await AddPost(post);

        if(response.success)
        {
            setPost('');
            posts.addPostToState(response.data.post);
            addToast("Post Added Successfully",{
                appearance:'success'
            })

        }
        else{
            addToast(response.message,{
                appearance:'error'
            })

        }


        setAddingPost(false);
    }

    return (
        <div className={styles.createPost}>
            <textarea 
            className={styles.addPost}
            onChange={(event)=>{setPost(event.target.value)}}
            value={post}
            placeholder='Something on your Mind?'
            />

            <div>
                <button
                className={styles.addPostBtn}
                onClick={handleAddPostClick}
                disabled={addingPost}
                >{addingPost?'Adding Post...':'Add Post'}</button>
            </div>

        </div>
    )
}

export default CreatePost;