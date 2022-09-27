import { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "../../../src/database";
import { getErrorMessage } from "../../../utility/helpers";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { product } = req.query;
      const [, , cartItems] = await prismaClient.$transaction([
        prismaClient.shoppingCart.deleteMany({
          where: { productId: Number(product), quantity: 1 },
        }),
        prismaClient.shoppingCart.updateMany({
          where: { productId: Number(product), quantity: { gt: 1 } },
          data: {
            quantity: {
              decrement: 1,
            },
          },
        }),
        prismaClient.shoppingCart.findMany({
          select: {
            product: true,
            quantity: true,
          },
        }),
        prismaClient.shoppingCart.findMany({
          select: {
            product: true,
            quantity: true,
          },
        }),
      ]);
      res.status(200).json(cartItems);
    } catch (error) {
      return res.status(400).json({ message: getErrorMessage(error) });
    }
  }
};
