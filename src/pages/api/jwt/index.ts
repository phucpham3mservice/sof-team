import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "GET") {
    const token = jwt.sign(
      req.body,
      (req.query.env === "prod"
        ? process.env.SECRET_PROD
        : process.env.SECRET) || "TEST",
      {
        expiresIn: "1m",
      }
    );
    res.status(200).json({ message: "ok", token });
  } else {
    res.status(400).json({ message: "Not found!" });
  }
}
