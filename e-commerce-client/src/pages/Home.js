import React from "react";
import Navbar from "../components/Navbar";
import DealPrompt from "../components/DealPrompt";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import Products from "../components/Products";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <DealPrompt />
      <Navbar />
      <Slider />
      <Categories />
      <Products />
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default Home;
