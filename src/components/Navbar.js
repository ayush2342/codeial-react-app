import { useAuth } from '../hooks';
import styles from '../styles/navbar.module.css';
import {Link} from 'react-router-dom'

const Navbar = () => {

  const auth=useAuth();

  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <Link to="/">
          <img
            alt=""
            src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
          />
        </Link>
      </div>

      <div className={styles.rightNav}>
        {auth.user&&<div className={styles.user}>
          <a href="/settings">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsyA44JdhHChP6kGqx36BolQq4Hn7z2yGekw&usqp=CAU"
              alt=""
              className={styles.userDp}
            />
          </a>
          <span>{auth.user.name}</span>
        </div>}

        <div className={styles.navLinks}>
          <ul>
            {auth.user?
            <li onClick={auth.logout}>
              <Link to="/login">Log out</Link>
            </li>:<>
            <li>
              <Link to="/login">Log in</Link>
            </li>
            
            <li>
              <Link to="/register">Register</Link>
            </li>

            </>}
            
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
