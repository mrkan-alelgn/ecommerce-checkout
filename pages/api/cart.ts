import { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "../../src/database";
import { getErrorMessage } from "../../utility/helpers";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const cartItems = await prismaClient.shoppingCart.findMany({
        select: {
          product: true,
          quantity: true,
        },
      });
      res.status(200).json(cartItems);
    } catch (error) {
      return res.status(400).json({ message: getErrorMessage(error) });
    }
  }
};
