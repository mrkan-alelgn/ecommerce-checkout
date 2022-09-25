// import { Order } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NavBar from "../../src/components/NavBar";
import { Product } from "@prisma/client";
import styles from "../../styles/index.module.css";

interface Order {
  subtotal: number;
  tax: number;
  total: number;
}
interface CartProduct {
  product: Product;
  quantity: Number;
}
interface state {
  data: CartProduct[];
  loading: boolean;
}

const Checkout = () => {
  const router = useRouter();
  const { orderId } = router.query;
  const [order, setOrder] = useState<Order>();
  const [cartProducts, setCartProducts] = useState<state>({
    data: [],
    loading: true,
  });
  useEffect(() => {
    const getOrder = async () => {
      await fetch(`http://localhost:3000/api/order?id=${orderId}`)
        .then((response) => response.json())
        .then((json) => setOrder(JSON.parse(json.summary)));
    };
    getOrder();
    console.log;
  }, []);

  return (
    <div id={styles.appContainer}>
      <NavBar setCartProducts={setCartProducts} cartProducts={cartProducts} />
      <div className={styles.checkoutContainer}>
        <p>Subtotal:${order?.subtotal}</p>
        <p>Tax:${order?.tax}</p>
        <p>Total:${order?.total}</p>
      </div>
    </div>
  );
};
export default Checkout;
