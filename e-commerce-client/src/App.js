import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Success from "./pages/Success";
import Register from "./pages/Register";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  //const user = false;
  console.log("user", user);
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/products/:category" component={ProductList} />
        <Route exact path="/product/:id" component={Product} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/success" component={Success} />
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
