import { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "../../src/database";
import { getErrorMessage, getResponse } from "../../utility/helpers";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const products = await prismaClient.product.findMany();
      getResponse(products, res);
    } catch (error) {
      return res.status(400).json({ message: getErrorMessage(error) });
    }
  }
};
