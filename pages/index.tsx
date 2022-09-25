import { Product } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import React, { useState } from "react";
import NavBar from "../src/components/NavBar";
import styles from "../styles/index.module.css";
import Card from "../src/components/Card";

interface HomeProps {
  products: Product[];
}
interface CartProduct {
  product: Product;
  quantity: Number;
}
interface state {
  data: CartProduct[];
  loading: boolean;
}

const Home: NextPage<HomeProps> = ({ products }: HomeProps) => {
  const [cartProducts, setCartProducts] = useState<state>({
    data: [],
    loading: true,
  });
  return (
    <div id={styles.appContainer}>
      <NavBar setCartProducts={setCartProducts} cartProducts={cartProducts} />
      <div className={styles.homeContainer}>
        {products.map((product: Product) => {
          return (
            <Card
              product={product}
              setCartProducts={setCartProducts}
              key={product.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`http://localhost:3000/api/products`);
  const data = await res.json();
  return {
    props: { products: data },
  };
};

export default Home;
