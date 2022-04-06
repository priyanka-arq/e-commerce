import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import styled from "styled-components";
import dressImage from "../images/dressImage.jpeg";
import dress1Image from "../images/dress1Image.jpeg";
import { useState } from "react";
import { sliderItems } from "../utils/data";
import { mobile } from "../utils/responsive";

const Container = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100vh;
  display: flex;
  /* background-color: teal; */
  position: relative;
  ${mobile({ display: "none" })}
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute; //  with declaring position: absolute; for child, make parents position: relative;
  top: 0; // top: 0,   bottom: 0;  margin: auto; will center the arrow
  bottom: 0;
  margin: auto;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  opacity: 0.5;
  cursor: pointer;
  z-index: 2;
`;

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  transition: all 1.5s ease; //animate slider
  transform: translateX(
    ${(props) => props.slideIndex * -100}vw
  ); //move slider on X axis
`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg};
`;

const ImageContainer = styled.div`
  height: 100%;
  flex: 1;
`;

const Image = styled.img`
  height: 80%;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`;

const Title = styled.h1`
  font-size: 50px;
`;

const Description = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`;
const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  cursor: pointer;
  background-color: transparent;
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState();
  const handleClick = (direction) => {
    if (direction == "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 4);
      console.log("Left slideIndex", slideIndex);
    } else {
      setSlideIndex(slideIndex < 4 ? slideIndex + 1 : 0);
      console.log("Right slideIndex", slideIndex);
    }
  };
  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item) => (
          <Slide bg={item.bg} key={item.id}>
            <ImageContainer>
              <Image src={item.img}></Image>
            </ImageContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Description>{item.desc}</Description>
              <Button>Shop Now</Button>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

export default Slider;
