import { Product } from "@prisma/client";
import Image from "next/image";
import styles from "../../styles/card.module.css";

interface Props {
  product: Product;
  setCartProducts: React.Dispatch<React.SetStateAction<any>>;
}

const Card: React.FC<Props> = ({ product, setCartProducts }) => {
  const handleClick = async (productId: Number) => {
    await fetch(`http://localhost:3000/api/cart/add?product=${productId}`, {
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
  return (
    <div className={styles.cardContainer}>
      <Image src={`/${product.imgSrc}`} alt="item" width={200} height={200} />
      <div className={styles.textContainer}>
        <p>{product.name}</p>
        <p>{`$${product.price}`}</p>
        <p>{product.description}</p>
        <button
          className={styles.cardButton}
          onClick={() => handleClick(product.id)}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default Card;
