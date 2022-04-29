import React,{useState} from 'react';
import { Link } from 'react-router-dom';

const Navber = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  
  
  function Logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
    
  }

 

  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <Link className="navbar-brand" to="/">
           HOTEL BOOKING
        </Link> 

        <button
          className="custom-toggler navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample09"
          aria-controls="navbarsExample09"
          aria-expanded={!isNavCollapsed ? true : false}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
           <span className="navbar-toggler-icon">
            <i className="fas fa-bars" style={{ color: "white" }}></i>
          </span>
        </button>
        <div
          className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`}
          id="navbarsExample09"
        >
          <ul className="navbar-nav" style={{ marginLeft: 'auto' }}>
            {currentUser?.isAdmin === false || currentUser?.isAdmin === true ? (
              <div  className="dropdown"  onClick={() => setOpenDropdown(!openDropdown)}  >
                <p
                  className="dropdown-toggle nav-link"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fa fa-user-circle"></i> {currentUser?.name}
                </p>
                <div
                  className={`dropdown-menu ${openDropdown ? 'show' : ''}`}
                  aria-labelledby="dropdownMenuButton"
                >
                  {currentUser?.isAdmin === true ? (
                    <Link className="dropdown-item" to="/admin/saurav">
                      Admin Dashbord
                    </Link>
                  ) : (
                    ' '
                  )}
                  <Link className="dropdown-item" to="/bookings">
                    Profile
                  </Link>
                  <p  className="dropdown-item" onClick={Logout}  >
                    <i className="fas fa-sign-out-alt"></i>Logout
                  </p>
                </div>
              </div>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  <i className="fas fa-sign-in-alt"></i> Login
                </Link>
              </li>
            )} 
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navber;
