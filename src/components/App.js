import { useEffect, useState } from "react";
import {getPosts} from '../api/index'
import { Home ,Login} from '../pages';
import {Loader,Navbar} from "./";
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";


function About(){
  return(
      <h1>About</h1>
  )
}

function UserInfo(){
  return(
      <h1>About</h1>
  )
}

function Page404(){
  return(
      <h1>404</h1>
  )
}

function App() {

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


    <div className="App">
      
       <Router>
       <Navbar/>
       
       <Routes>
          <Route path="/" element={<Home posts={posts} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/user?dhdi" element={<UserInfo />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
       
       </Router>
    
    </div>
  );
}

export default App;
