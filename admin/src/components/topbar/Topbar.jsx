import React from "react";
import {
  NotificationsNone,
  Language,
  Settings,
  LanguageOutlined,
  SettingsApplications,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./topbar.css";
import { logout } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Topbar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector((state) => state.user.currentUser.isAdmin);
  const admin = currentUser ? true : false;

  const handleLogout = (e) => {
    e.preventDefault();
    logout(dispatch);
    history.push("/login");
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">ShopMax Admin..</span>
        </div>
        <div className="topRight">
          <div>
            {!admin ? (
              <Link className="topbarLogin" to="/login">
                <span>Login</span>
              </Link>
            ) : (
              <Link className="topbarLogin" to="/"></Link>
            )}
          </div>
          <div>
            <button className="topbarLogout" onClick={handleLogout}>
              Logout
            </button>
          </div>
          <div className="topbarIconContainer">
            <LanguageOutlined />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <SettingsApplications />
          </div>
          <img
            src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="topAvatar"
          />
        </div>
      </div>
    </div>
  );
}
