import { ShoppingCart as ShoppingCartIcon } from "@mui/icons-material";
import { Box, AppBar, Toolbar, Typography } from "@mui/material";
import { Product } from "@prisma/client";
import React, { useState } from "react";
import { ReactElement } from "react";
import Cart from "./Cart";

interface CartProduct {
  product: Product;
  quantity: Number;
}
interface state {
  data: CartProduct[];
  loading: boolean;
}
interface NavProps {
  cartProducts: any;
  setCartProducts: React.Dispatch<React.SetStateAction<state>>;
}
const NavBar: React.FC<NavProps> = ({
  cartProducts,
  setCartProducts,
}): ReactElement => {
  const [showCart, setShowCart] = useState(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Bobalicious
          </Typography>
          <p color="inherit" style={{ marginRight: "10px" }}>
            Welcome back, Tom!
          </p>
          <ShoppingCartIcon
            style={{ cursor: "pointer" }}
            onClick={() => setShowCart(!showCart)}
          />
          {showCart && (
            <Cart
              setCartProducts={setCartProducts}
              cartProducts={cartProducts}
            />
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
