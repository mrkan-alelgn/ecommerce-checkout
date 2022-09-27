import { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "../../../src/database";
import { getErrorMessage } from "../../../utility/helpers";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    try {
      await prismaClient.shoppingCart.deleteMany({
        where: {},
      });
      res.status(200).json({});
    } catch (error) {
      return res.status(400).json({ message: getErrorMessage(error) });
    }
  }
};
