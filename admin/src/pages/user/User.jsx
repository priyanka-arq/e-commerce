import {
  CalendarToday,
  LocationSearching,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { MailOutline } from "@mui/icons-material";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./user.css";
import { updateUser } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { userRequest } from "../../networkRequest";
import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";

export default function User() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const location = useLocation();
  const customerId = location.pathname.split("/")[2];
  const dispatch = useDispatch();

  const customer = useSelector((state) =>
    state.customer.customers.find((customer) => customer._id === customerId)
  );

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    //make unique file
    const fileName =
      new Date().getTime() + file.name || new Date().getTime() + customer.img;

    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const user = {
            ...inputs,
            img: downloadURL,
          };
          updateUser(customerId, user, dispatch);
        });
      }
    );
  };

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newuser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img src={customer.img} alt="" className="userShowImg" />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{customer.fullName}</span>
              <span className="userShowUsertitle">{customer.title}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{customer.username}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{customer.createdAt}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{customer.contact}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{customer.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{customer.address}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <lable>Username</lable>
                <input
                  name="username"
                  onChange={handleChange}
                  className="userUpdateInput"
                  type="text"
                  placeholder={customer.username}
                />
              </div>
              <div className="userUpdateItem">
                <lable>Full Name</lable>
                <input
                  name="fullName"
                  onChange={handleChange}
                  className="userUpdateInput"
                  type="text"
                  placeholder={customer.fullName}
                />
              </div>
              <div className="userUpdateItem">
                <lable>Title</lable>
                <input
                  name="title"
                  onChange={handleChange}
                  className="userUpdateInput"
                  type="text"
                  placeholder={customer.title}
                />
              </div>
              <div className="userUpdateItem">
                <lable>Email</lable>
                <input
                  name="email"
                  onChange={handleChange}
                  className="userUpdateInput"
                  type="text"
                  placeholder={customer.email}
                />
              </div>
              <div className="userUpdateItem">
                <lable>Contact</lable>
                <input
                  name="contact"
                  onChange={handleChange}
                  className="userUpdateInput"
                  type="text"
                  placeholder={customer.contact}
                />
              </div>
              <div className="userUpdateItem">
                <lable>Address</lable>
                <input
                  name="address"
                  onChange={handleChange}
                  className="userUpdateInput"
                  type="text"
                  placeholder={customer.address}
                />
              </div>
              <div className="newuserItem">
                <label>Gender</label>
                <div className="newuserGender">
                  <input
                    onChange={handleChange}
                    type="radio"
                    name="gender"
                    id="male"
                    placeholder={customer.gender}
                  />
                  <label for="male">Male</label>
                  <input
                    onChange={handleChange}
                    type="radio"
                    name="gender"
                    id="male"
                    placeholder={customer.gender}
                  />
                  <label for="female">Female</label>
                  <input
                    onChange={handleChange}
                    type="radio"
                    name="gender"
                    id="male"
                    placeholder={customer.gender}
                  />
                  <label for="other">Other</label>
                  <input
                    onChange={handleChange}
                    type="radio"
                    name="gender"
                    id="other"
                    placeholder={customer.gender}
                  />
                </div>
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img src={customer.img} alt="" className="userUpdateImg" />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input
                  onChange={(e) => setFile(e.target.files[0])}
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                />
              </div>
              <button onClick={handleClick} className="userUpdateButton">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
