import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import logo from "../../assets/icons/logo.png";
import navbarStyles from "./navbar.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/action/userAction";
// import axios from "../../api/axios";
// import { useContext } from "react";
// import AuthContext from "../../context/AuthProvider";

export const Navbar = () => {
  // const { auth } = useContext(AuthContext);
  let {isAuthenticated} = useSelector((state) => state.user)
  const dispatch = useDispatch();

  const [toggleMenu, setToggleMenu] = useState(false);
  const [data, setData] = useState({});

  // Data is passed in local storage from sign in form
  useEffect(() => {
    const response = localStorage.getItem("response");
    if (response) {
      setData(JSON.parse(response));
    }
  }, []);

  const navigate = useNavigate();
  const handleLogout = () => {
    // navigate("/");
    // localStorage.removeItem("response");
    // window.location.reload();
    dispatch(logout())
  };

  return (
    <div className={navbarStyles.navbar}>
      <div className={navbarStyles.navbar_links_logo}>
        <img src={logo} alt="logo" />
      </div>

      <div className={navbarStyles.navbar_links}>
        <div className={navbarStyles.navbar_links_container}>
          <p>
            <Link to="/">Home</Link>
          </p>
          {(isAuthenticated) ? 
          <p>
            <Link to="/orders">Orders</Link>
          </p> : null
          }
          <p>
            <Link to="/RegisterAsProfessional">Register As Professional</Link>
          </p>
          {/* <p>
            {data.role === "admin" ? (
              <Link to="/admin-dashboard">Admin Dashboard</Link>
            ) : data.role === "professional" ? (
              <Link to="/under-construction">Professional Dashboard</Link>
            ) : (
              <Link to="/under-construction">User Dashboard</Link>
            )}
          </p> */}
          <p>
            <Link to="/ContactUs">Contact Us</Link>
          </p>
        </div>
      </div>

      <div className={navbarStyles.navbar_sign}>
        {isAuthenticated ? null : 
        <p className={navbarStyles.signIn}>
          {data.role ? data.fullName : <Link to="/SignIn">Sign in</Link>}
        </p>}
        <p className={navbarStyles.logout}>
          {isAuthenticated ? (
            <span onClick={handleLogout} className="text-white">Logout</span>
          ) : (
            <Link to="/SignUp">
              <span className="text-white">Sign up</span>
            </Link>
          )}
        </p>
      </div>
      <div className={navbarStyles.navbar_menu}>
        {toggleMenu ? (
          <RiCloseLine
            color="#fff"
            size={30}
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <RiMenu3Line
            color="#fff"
            size={30}
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <div className={navbarStyles.navbar_menu_background}>
            <div
              className={`${navbarStyles.navbar_menu_container} ${navbarStyles.scale_up_center}`}
            >
              <div className={navbarStyles.navbar_menu_container_links}>
                <p onClick={() => setToggleMenu(false)}>
                  <Link to="/">Home</Link>
                </p>
                {(isAuthenticated) ? 
                <p onClick={() => setToggleMenu(false)}>
                  <Link to="/orders">Orders</Link>
                </p> : null
                }
                {/* <p onClick={() => setToggleMenu(false)}>
                  <Link to="/RegisterAsProfessional">
                    Register As Professional
                  </Link>
                </p> */}
                {/* <p onClick={() => setToggleMenu(false)}>
                  {data.role === "admin" ? (
                    <Link to="/admin-dashboard">Admin Dashboard</Link>
                  ) : data.role === "professional" ? (
                    <Link to="/under-construction">Professional Dashboard</Link>
                  ) : (
                    <Link to="/under-construction">User Dashboard</Link>
                  )}
                </p> */}
                <p onClick={() => setToggleMenu(false)}>
                  <Link to="/ContactUs">Contact Us</Link>
                </p>
              </div>
              <div className={navbarStyles.navbar_menu_container_links_sign}>
                {isAuthenticated ? null :
                <p
                  onClick={() => setToggleMenu(false)}
                  className={navbarStyles.signIn}
                >
                  {data.role ? (
                    data.fullName
                  ) : (
                    <Link to="/SignIn">Sign in</Link>
                  )}
                </p>
                }
                <div
                  onClick={() => setToggleMenu(false)}
                  className={navbarStyles.logout}
                >
                  {isAuthenticated ? (
                    <p onClick={handleLogout}>Logout</p>
                  ) : (
                    <Link to="/SignUp">
                      <p>Sign up</p>
                    </Link>
                  )}
                </div>
              </div>
              <div
                onClick={() => setToggleMenu(false)}
                className={navbarStyles.navbar_close_button}
              >
                <RiCloseLine size={40} />
              </div>
            </div>
          </div>
        )}
      </div>
      <Outlet />
    </div>
  );
};
