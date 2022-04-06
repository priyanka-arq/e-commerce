import { Height } from "@material-ui/icons";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/apiCalls";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
    toast.success("Student updated successfully");
    history.push("/");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <input
        style={{
          width: "400px",
          padding: "10px",
          marginBottom: "20px",
          borderRadius: "5px",
        }}
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        style={{
          width: "400px",
          borderRadius: "5px",
          padding: "10px",
          marginBottom: "20px",
        }}
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        style={{
          padding: "10px",
          width: "100px",
        }}
        onClick={handleClick}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
