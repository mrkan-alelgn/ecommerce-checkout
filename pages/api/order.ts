import { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "../../src/database";
import { getErrorMessage, getResponse } from "../../utility/helpers";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const order = req.body;
      const response = await prismaClient.order.create({
        data: { summary: order },
      });
      res.status(200).json(response);
    } catch (error) {
      return res.status(400).json({ message: getErrorMessage(error) });
    }
  }
  if (req.method === "GET") {
    try {
      const { id } = req.query;
      const order = await prismaClient.order.findUnique({
        where: {
          id: Number(id),
        },
      });
      getResponse(order, res);
    } catch (error) {
      return res.status(400).json({ message: getErrorMessage(error) });
    }
  }
};
