import { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "../../../src/database";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { product } = req.query;
    await prismaClient.shoppingCart.upsert({
      where: {
        productId: Number(product),
      },
      update: {
        quantity: {
          increment: 1,
        },
      },
      create: {
        productId: Number(product),
        quantity: 1,
      },
    });
    const cartItems = await prismaClient.shoppingCart.findMany({
      select: {
        product: true,
        quantity: true,
      },
    });
    res.status(200).json(cartItems);
  }
};
