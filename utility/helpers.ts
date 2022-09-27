import type { NextApiResponse } from "next";
export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}
export function getResponse(data: any, res: NextApiResponse) {
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: "data not found" });
  }
}
