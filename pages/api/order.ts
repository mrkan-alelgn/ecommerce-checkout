import { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "../../src/database";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const order = req.body;
    const response = await prismaClient.order.create({
      data: { summary: order },
    });
    res.status(200).json(response);
  }
  if (req.method === "GET") {
    const { id } = req.query;
    const order = await prismaClient.order.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(order);
  }
};
