import React from "react";
import styled from "styled-components";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import { fontSize, style } from "@material-ui/system";
import { Badge } from "@material-ui/core";
import { mobile } from "..//utils/responsive";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Fragment } from "react";
import { logout } from "../redux/apiCalls";

const Container = styled.div`
  height: 60px;
  color: #fff;
  ${mobile({ height: "50px" })}/* background-color: #323232; */
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  color: #323232;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ padding: "10px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;
const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  border-radius: 5px;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  ${mobile({ marginLeft: "5px" })}
`;

const Input = styled.input`
  width: 200px;
  height: 20px;
  border: none;
  ${mobile({ width: "50px" })}

  &:focus {
    outline: none;
  }
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Center = styled.div`
  flex: 1;
`;

const Logo = styled.h1`
  font-weight: bold;
  text-align: center;
  ${mobile({ fontSize: "24px" })}
`;

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleLogout = (e) => {
    e.preventDefault();
    logout(dispatch);
    history.push("/login");
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>Search</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 18 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>ShopMax...</Logo>
        </Center>

        <Right>
          {user ? (
            <MenuItem onClick={handleLogout}>Logout </MenuItem>
          ) : (
            <Fragment>
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "black" }}
              >
                <MenuItem>Register</MenuItem>
              </Link>
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "black" }}
              >
                <MenuItem>SignIn</MenuItem>
              </Link>
            </Fragment>
          )}

          <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined color="action" />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
