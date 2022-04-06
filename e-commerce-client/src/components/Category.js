import styled from "styled-components";
import { mobile } from "..//utils/responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; //crop the image and show the cover version
  ${mobile({ height: "30vh" })}
`;
const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h1`
  color: white;
  margin: 20px;
`;
const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: white;
  color: gray;
  cursor: pointer;
  font-weight: 600;
`;

const Category = ({ item }) => {
  return (
    <Container>
      <Link to={`/products/${item.cat}`}>
        <Image src={item.img}></Image>
        <Info>
          <Title>{item.title}</Title>
          <Button>Shop Now</Button>
        </Info>
      </Link>
    </Container>
  );
};

export default Category;
