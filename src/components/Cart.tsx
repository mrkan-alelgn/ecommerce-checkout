import { Product } from "@prisma/client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import IconButton from "@mui/material/IconButton";
import styles from "../../styles/cart.module.css";

interface Cart {
  product: Product;
  quantity: Number;
}
interface state {
  data: Cart[];
  loading: boolean;
}
interface cartProps {
  cartProducts: { data: Cart[]; loading: boolean };
  setCartProducts: React.Dispatch<React.SetStateAction<state>>;
}
const Cart: React.FC<cartProps> = ({ cartProducts, setCartProducts }) => {
  const router = useRouter();
  const [subtotal, setSubtotal] = useState<any>(
    (cartProducts.data as Cart[])
      .map((cart: any) => {
        return cart.product.price * cart.quantity;
      })
      .reduce((a, b) => a + b, 0)
  );
  useEffect(() => {
    const getProducts = async () => {
      await fetch(`http://localhost:3000/api/cart`)
        .then((res) => res.json())
        .then((json) => {
          setCartProducts({ data: json, loading: false });
        });
    };
    getProducts();
  }, []);
  useEffect(() => {
    setSubtotal(
      (cartProducts.data as Cart[])
        .map((cart: any) => {
          return cart.product.price * cart.quantity;
        })
        .reduce((a, b) => a + b, 0)
    );
  }, [cartProducts]);

  if (cartProducts.loading) return null;
  if (!cartProducts.data) return <p>No data</p>;
  const handleClick = async (productId: Number) => {
    await fetch(`http://localhost:3000/api/cart/remove?product=${productId}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setCartProducts({ data: json, loading: false });
      });
  };
  const handleCheckout = async () => {
    const summary = JSON.stringify({
      subtotal: subtotal.toFixed(2),
      tax: (subtotal * 0.07).toFixed(2),
      total: (subtotal + subtotal * 0.07).toFixed(2),
    });
    await fetch(`http://localhost:3000/api/order`, {
      method: "POST",
      body: JSON.stringify(summary),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => router.push(`/checkout/${json.id}`));
  };
  return (
    <div className={styles.cartContainer}>
      <p>Shopping cart</p>
      {(cartProducts.data as Cart[]).map((cart: Cart) => {
        return (
          <div className={styles.productsContainer} key={cart.product.id}>
            <p className={styles.cartProducts}>
              {`${cart.product.name} x ${cart.quantity}`}
            </p>
            <IconButton
              color="error"
              component="label"
              onClick={() => handleClick(cart.product.id)}
              style={{ margin: "0px" }}
            >
              <IndeterminateCheckBoxIcon style={{ margin: "0px" }} />
            </IconButton>
          </div>
        );
      })}
      <p>Subtotal:${subtotal.toFixed(2)}</p>
      <p>Tax:${(subtotal * 0.07).toFixed(2)}</p>
      <p>Total:${(subtotal + subtotal * 0.07).toFixed(2)}</p>
      <button className={styles.cartButton} onClick={() => handleCheckout()}>
        Checkout
      </button>
    </div>
  );
};

export default Cart;
