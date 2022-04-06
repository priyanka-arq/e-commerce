import styled from "styled-components";
import { mobile } from "..//utils/responsive";

const Conatiner = styled.div`
  background-color: #fcba03;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  font-size: 14px;
  font-weight: 400;
  ${mobile({ padding: "5px" })}
`;

const DealPrompt = () => {
  return (
    <Conatiner>
      Super Special! Hurry up! Free Shipping available on order over $49
    </Conatiner>
  );
};

export default DealPrompt;
