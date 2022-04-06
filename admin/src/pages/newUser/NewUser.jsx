import React from "react";
import "./newUser.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addUser } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useState } from "react";

export default function NewUser() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);

  const dispatch = useDispatch();
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    //make unique file
    const fileName = new Date().getTime() + file.name;

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
          addUser(user, dispatch);
        });
      }
    );
  };

  return (
    <div className="newuser">
      <h1 className="newuserTitle">New User</h1>
      <form className="newuserForm">
        <div className="newuserItem">
          <label>Username</label>
          <input
            name="username"
            onChange={handleChange}
            type="text"
            placeholder="merry99"
          />
        </div>
        <div className="newuserItem">
          <label>Full Name</label>
          <input
            name="fullName"
            onChange={handleChange}
            type="text"
            placeholder="Merry Chan"
          />
        </div>
        <div className="newuserItem">
          <label>Title</label>
          <input
            name="title"
            onChange={handleChange}
            type="text"
            placeholder="Merry Chan"
          />
        </div>
        <div className="newuserItem">
          <label>Email</label>
          <input
            name="email"
            onChange={handleChange}
            type="email"
            placeholder="merry@gmail.com"
          />
        </div>
        <div className="newuserItem">
          <label>Contact</label>
          <input
            name="contact"
            onChange={handleChange}
            type="email"
            placeholder="merry@gmail.com"
          />
        </div>
        <div className="newuserItem">
          <label>Passowrd</label>
          <input
            name="password"
            onChange={handleChange}
            type="password"
            placeholder="password"
          />
        </div>
        <div className="newuserItem">
          <label>Address</label>
          <input
            name="address"
            onChange={handleChange}
            type="text"
            placeholder="Sydney | Australia"
          />
        </div>
        <div className="newuserItem">
          <label>Admin</label>
          <select
            onChange={handleChange}
            type="isAdmin"
            className="newUserSelect"
            name="active"
            id="active"
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
        <div className="newuserItem">
          <label>Image</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="newuserItem">
          <label>Gender</label>
          <div className="newuserGender">
            <input
              onChange={handleChange}
              type="radio"
              type="radio"
              name="gender"
              id="male"
            />
            <label for="male">Male</label>
            <input
              onChange={handleChange}
              type="radio"
              type="radio"
              name="gender"
              id="male"
            />
            <label for="female">Female</label>
            <input
              onChange={handleChange}
              type="radio"
              type="radio"
              name="gender"
              id="male"
            />
            <label for="other">Other</label>
          </div>
        </div>

        <button onClick={handleClick} className="newUserButton">
          Create
        </button>
      </form>
    </div>
  );
}
