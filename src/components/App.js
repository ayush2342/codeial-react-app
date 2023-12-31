import { Home ,Login,Register,Settings,UserProfile} from '../pages';
import {Loader,Navbar} from "./";
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
import { useAuth } from "../hooks";

// function PrivateRoute({children,...rest})
// {
//   const auth=useAuth();

//   return (
//     <Route
//     {...rest}
//     render={()=>{
//       if(auth.user)
//       {
//           return children
//       }
//       else
//       {
//         return <Navigate to='/login'/>
//       }
//     }}
//     />
//   )

// }


function Page404(){
  return(
      <h1>404</h1>
  )
}

function App() {
  const auth=useAuth();

  
  if(auth.loading)
  {
    return <Loader/>;
  }
  return (


    <div className="App">
      
       <Router>
       <Navbar/>
       
       <Routes>
          <Route path="/" element={<Home posts={[]} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/user/:userid" element={<UserProfile />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
       
       </Router>
    
    </div>
  );
}

export default App;
