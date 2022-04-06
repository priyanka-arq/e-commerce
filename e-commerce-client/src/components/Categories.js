import styled from "styled-components";
import { categories } from "../utils/data";
import Category from "./Category";
import { mobile } from "..//utils/responsive";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: 0, flexDirection: "column" })}
`;

const Categories = () => {
  return (
    <div>
      <Container>
        {categories.map((item) => (
          <Category item={item} key={item.id} />
        ))}
      </Container>
    </div>
  );
};

export default Categories;
