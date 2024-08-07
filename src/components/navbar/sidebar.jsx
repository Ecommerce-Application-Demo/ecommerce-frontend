import React, { useEffect, useRef } from "react";
import { BiSolidUserDetail } from "react-icons/bi";
import { FaAngleRight } from "react-icons/fa6";
import { toast } from "react-toastify";
import { reset } from "../../redux/Slices/userSlice";
import userApi from "../../api/asyncThunk/userApi";
import { Link } from "react-router-dom";

const SideNavbar = (props) => {
  const { 
    dispatch,
    isLoggedIn,
    loggedInUserName,
    navigate, 
    setSidebarOpen, 
    sidebarOpen,
  } = props;

  const { logout } = userApi;

  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen, setSidebarOpen]);

  const handleClickSignup = () => {
    setSidebarOpen(false);
    navigate("/login-signup");
  };

  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .then((res) => {
        toast.success('Your account has been logged out successfully.');
        console.log(res);
        navigate('/');
      })
      .catch((error) => {
        toast.error('An error occurred during logout.');
        console.log(error);
      });
    dispatch(reset());
  }

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="side-navbar-main-container">
      <div className="side-navbar-container" ref={ref}>
        {isLoggedIn ? (
          <div className="side-navbar-login-section">
            <div className="side-navbar-user-icon-wrapper">
              <BiSolidUserDetail size={60} />
            </div>
            {loggedInUserName}
          </div>
        ) : (
          <div
            className="side-navbar-login-section-withoutlogin"
            onClick={handleClickSignup}
          >
            <p>SIGN UP | LOGIN</p>
          </div>
        )}
        <div className="side-navbar-masterCategory-section">
          <div>
            <p>MEN</p>
            <FaAngleRight />
          </div>
          <div>
            <p>WOMEN</p>
            <FaAngleRight />
          </div>
          <div>
            <p>KIDS</p>
            <FaAngleRight />
          </div>
          <div>
            <p>FOOTWEAR</p>
            <FaAngleRight />
          </div>
        </div>
        { isLoggedIn && 
        (
          <div className="side-navbar-account-section">
            <Link to={'/my/dashboard'} className="side-navbar-account-link" onClick={handleCloseSidebar}><p>ACCOUNT</p></Link>
            <Link to={'/my/dashboard'} className="side-navbar-account-link" onClick={handleCloseSidebar}><p>ORDERS</p></Link>
            <Link to={'/my/dashboard'} className="side-navbar-account-link" onClick={handleCloseSidebar}><p>CANCELATIONS</p></Link>
            <Link to={'/my/dashboard'} className="side-navbar-account-link" onClick={handleCloseSidebar}><p>CONTACT US</p></Link>
            <p className="side-navbar-account-link" onClick={handleLogout}>LOGOUT</p>
          </div>
        )}
      </div>
      <div className="sidebar-overlay"></div>
    </div>
  );
};

export default SideNavbar;
