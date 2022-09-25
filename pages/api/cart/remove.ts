import { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "../../../src/database";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { product } = req.query;
    await prismaClient.shoppingCart.deleteMany({
      where: { productId: Number(product), quantity: 1 },
    });
    await prismaClient.shoppingCart.updateMany({
      where: { productId: Number(product), quantity: { gt: 1 } },
      data: {
        quantity: {
          decrement: 1,
        },
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
