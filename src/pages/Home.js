import styles from '../styles/home.module.css';
import PropTypes from 'prop-types';
import { useState,useEffect } from 'react';
import {getPosts} from '../api/index';
import {Loader} from "../components";

import {Comment} from '../components'
const Home = () => {

  const [posts,setPosts]=useState([]);
  const [loading,setLoading]=useState(true)

  useEffect(()=>{

    const fetchPosts = async ()=>{

       const response = await getPosts(1,3);
       if(response.success)
       {
        setPosts(response.data.posts)
       }

       setLoading(false)
    }

    fetchPosts()
  },[])

  if(loading)
  {
    return <Loader/>;
  }

  return (
    <div className={styles.postsList}>
      {
        posts.map((post)=>{
        return (<div className={styles.postWrapper} key={`post-${post._id}`}>
      <div className={styles.postHeader}>
        <div className={styles.postAvatar}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/800px-User_icon_2.svg.png"
            alt="user-pic"
          />
          <div>
            <span className={styles.postAuthor}>{post.user.name}</span>
            <span className={styles.postTime}>a minute ago</span>
          </div>
        </div>
        <div className={styles.postContent}>{post.content}</div>

        <div className={styles.postActions}>
          <div className={styles.postLike}>
            <img
              src="https://cdn.pixabay.com/photo/2020/09/30/07/48/heart-5614865_1280.png"
              alt="likes-icon"
            />
            <span>5</span>
          </div>

          <div className={styles.postCommentsIcon}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1380/1380338.png"
              alt="comments-icon"
            />
            <span>2</span>
          </div>
        </div>
        <div className={styles.postCommentBox}>
          <input placeholder="Start typing a comment" />
        </div>

        <div className={styles.postCommentsList}>
          {post.comments.map((comment)=>{

            return (<Comment comment={comment}/>)
          })}
        </div>
      </div>
    </div>)

        })
      }
      
    </div>
  );
};

Home.propTypes = {
  posts:PropTypes.array.isRequired
}

export default Home;
