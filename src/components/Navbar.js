import { useEffect, useState } from 'react';
import { useAuth } from '../hooks';
import styles from '../styles/navbar.module.css';
import {Link} from 'react-router-dom'
import { searchUsers } from '../api';

const Navbar = () => {

  const [results, setResults] = useState([]);
  const [searchText, setSearchText] = useState('');
  const auth=useAuth();

  useEffect(()=>{

    const fetchUsers =async ()=>{

      const response = await searchUsers(searchText);

      if(response.success)
      {
        setResults(response.data.users)
      }

    }

    if(searchText.length>2)
    {
      fetchUsers()
    }
    else
    {
      setResults([]);
    }

  },[searchText])

  const handleUserLinkClick = () => {
    
    setResults([]);
  };

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

      <div className={styles.searchContainer}>
        <img
          className={styles.searchIcon}
          src="data:image/png;base64,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"
          alt=""
        />

        <input
          placeholder="Search users"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        {results.length > 0 && (
          <div className={styles.searchResults}>
            <ul>
              {results.map((user) => (
                <li
                  className={styles.searchResultsRow}
                  key={`user-${user._id}`}
                >
                  <Link onClick={handleUserLinkClick} to={`/user/${user._id}`}>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/800px-User_icon_2.svg.png"
                      alt=""
                    />
                    <span>{user.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
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
