import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
// import logo from "../../assets/icons/logo.png";
import navbarStyles from "./navbar.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/action/userAction";
import logo from "../../assets/cropped_image.png";

import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';

// import axios from "../../api/axios";
// import { useContext } from "react";
// import AuthContext from "../../context/AuthProvider";

export const Navbar = () => {
  // const { auth } = useContext(AuthContext);
  let { isAuthenticated } = useSelector((state) => state.user)
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
    setAnchorEl(null);
  };


  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={navbarStyles.navbar}>
      <div className={navbarStyles.navbar_links_logo}>
        <img src={logo} alt="logo" />
        {/* <span className="fw-bold fs-1">HomeBuddy</span> */}
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
        {
          isAuthenticated ? null :
            // <p className={navbarStyles.signIn}>
            <Link className={navbarStyles.signIn} to="/SignIn">Sign in</Link>
          /* </p> */
        }
        {/* <div className=''> */}
        {isAuthenticated ? (
          // <span onClick={handleLogout} className="fs-4 text-white">Logout</span>
          <>
            <Tooltip title={<span style={{ fontSize: '12px', color: 'white' }}>Account Settings</span>}>
              <IconButton
                onClick={handleClick}
                size="small"
                // sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar sx={{ width: 32, height: 32, color: 'white' }} />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              // onClick={handleClose}
              PaperProps={{
                style: {
                  width: 150,
                },
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleClose} className="fs-4 fw-bolder">
                <Link to="/profile" className="d-flex align-items-center no-hover-black w-100">
                  <Avatar sx={{ width: 32, height: 32, color: 'red', marginLeft: '-8px', marginRight: '12px', backgroundColor: 'white' }} /> Profile
                </Link>
              </MenuItem>
              <MenuItem onClick={handleLogout} className="fs-4 fw-bolder">
                <ListItemIcon>
                  <Logout fontSize="large" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Link to="/SignUp" className={navbarStyles.signUp} >
            Sign up
          </Link>
        )}
        {/* </div> */}
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
    </div >
  );
};
