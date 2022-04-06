import styled from "styled-components";
import Navbar from "../components/Navbar";
import DealPrompt from "../components/DealPrompt";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import { Add, Remove } from "@material-ui/icons";
import { mobile } from "..//utils/responsive";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../networkRequest";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImageContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
  font-weight: 200;
`;
const Description = styled.p`
  margin: 20px 0px;
`;
const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTilte = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  border-radius: 5px;
  font-weight: 500;

  &:hover {
    background-color: #bce5f5;
  }
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQunatity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();

  //for product selection
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get(`products/find/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [id]);

  //for quantity selection
  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQunatity(quantity - 1);
    } else {
      setQunatity(quantity + 1);
    }
  };

  const handleClick = () => {
    //call addProduct reducx action and pass payload of quantity and price and sipatch action
    dispatch(addProduct({ ...product, quantity, color, size }));
    console.log("quantity", quantity);
  };
  return (
    <Container>
      <Navbar />
      <DealPrompt />
      <Wrapper>
        <ImageContainer>
          <Image src={product.img} />
        </ImageContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Description>{product.description}</Description>
          <Price>{product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTilte>Color</FilterTilte>
              {product.color &&
                product.color.map((c) => (
                  <FilterColor color={c} key={c} onClick={() => setColor(c)} />
                ))}
            </Filter>

            <Filter>
              <FilterTilte>Size</FilterTilte>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                {product.size &&
                  product.size.map((s) => (
                    <FilterSizeOption key={s}>{s}</FilterSizeOption>
                  ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQuantity("dec")} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQuantity("inc")} />
            </AmountContainer>
            <Button onClick={handleClick}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <NewsLetter />
      <Footer />
    </Container>
  );
};

export default Product;
