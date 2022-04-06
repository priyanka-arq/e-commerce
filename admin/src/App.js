import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./app.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { Fragment } from "react";
import { useSelector } from "react-redux";

function App() {
  const currentUser = useSelector((state) => state.user.currentUser.isAdmin);
  const admin = currentUser ? true : false;

  // const admin = JSON.parse(
  //   JSON.parse(localStorage.getItem("persist:root")).user
  // ).currentUser.isAdmin;

  console.log("isAdmin", admin);
  return (
    <Router className="App">
      <Switch>
        {admin ? (
          <Fragment>
            <Topbar />
            <div className="container">
              <Sidebar />
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/users">
                <UserList />
              </Route>
              <Route path="/user/:userId">
                <User />
              </Route>
              <Route path="/newUser">
                <NewUser />
              </Route>
              <Route path="/Products">
                <ProductList />
              </Route>
              <Route path="/product/:productId">
                <Product />
              </Route>
              <Route path="/newProduct">
                <NewProduct />
              </Route>
            </div>
          </Fragment>
        ) : (
          <Route exact path="/login">
            <Login />
          </Route>
        )}
      </Switch>
    </Router>
  );
}

export default App;
