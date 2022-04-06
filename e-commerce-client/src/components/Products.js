import styled from "styled-components";
import Product from "./Product";
import { popularProducts } from "../utils/data";
import { useEffect, useState } from "react";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20px;
`;

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  //console.log("filters", Object.entries(filters));
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:3000/api/products?category=${cat}`
            : "http://localhost:3000/api/products"
        );
        setProducts(res.data);
      } catch (err) {}
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => (a.createdAt = b.createdAt))
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - a.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - b.price)
      );
    }
  }, [sort]);

  return (
    <Container>
      {cat
        ? filteredProducts.map((product) => (
            <Product product={product} key={product.id} />
          ))
        : products.map((product) => (
            <Product product={product} key={product.id} />
          ))}
    </Container>
  );
};

export default Products;
