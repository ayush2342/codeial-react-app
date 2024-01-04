import styles from '../styles/home.module.css';
import PropTypes from 'prop-types';
import {Loader} from "../components";
import {Link} from 'react-router-dom'
import { useAuth, usePosts } from '../hooks';
import { Navigate } from 'react-router-dom';
import {getTimeDifference} from '../utils'
import {Comment,FriendsList,CreatePost} from '../components'
import CreateComment from '../components/CreateComment';
import { toggleLike } from '../api';
import { useToasts } from 'react-toast-notifications';

const Home = () => {
  const auth=useAuth();
  const posts = usePosts();
  const {addToast} =useToasts();


  if (!auth.user) {
    return <Navigate to='/login'/>;
  
  }

  if(posts.loading)
  {
    return <Loader/>;
  }


  return (
    <div className={styles.home}>
      
    <div className={styles.postsList}>
    <CreatePost/>
      {
        posts.data.map((post)=>{

          const handlePostLikeClick=async ()=>{

            const response=await toggleLike(post._id,'Post')
        
            if(response.success)
                {
                    if(response.data.deleted)
                    {
                      addToast("Post Like Removed Successfully",{
                        appearance:'success'
                    })
                    }    
                    else
                    {
                      addToast("Post Like Added Successfully",{
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


          
        return (<div className={styles.postWrapper} key={`post-${post._id}`}>
      <div className={styles.postHeader}>
        <div className={styles.postAvatar}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/800px-User_icon_2.svg.png"
            alt="user-pic"
          />
          <div>
            <Link 
            to={{
              pathname:`/user/${post.user._id}`,
              state:{
              user:post.user
            }
          }} 
            className={styles.postAuthor}>{post.user.name}</Link>
            <span className={styles.postTime}>{getTimeDifference(post.createdAt)}</span>
          </div>
        </div>
        <div className={styles.postContent}>{post.content}</div>

        <div className={styles.postActions}>
          <div className={styles.postLike}>
            <button onClick={handlePostLikeClick}>
            <img
              src="https://cdn.pixabay.com/photo/2020/09/30/07/48/heart-5614865_1280.png"
              alt="likes-icon"
            />
            </button>
            
            <span>{post.likes.length}</span>
          </div>

          <div className={styles.postCommentsIcon}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1380/1380338.png"
              alt="comments-icon"
            />
            <span>{post.comments.length}</span>
          </div>
        </div>

        <CreateComment post_id={post._id}/>

        <div className={styles.postCommentsList}>
          {post.comments.map((comment)=>{

            return (<Comment comment={comment} post={post} key={`post-comment-${comment._id}`} />)
          })}
        </div>


      </div>
    </div>)

        })
      }
      </div>
      <FriendsList />
    </div>
  );
};

Home.propTypes = {
  posts:PropTypes.array.isRequired
}

export default Home;
