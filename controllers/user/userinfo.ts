import { Request, Response } from "express";

async function userInfo(req: Request, res: Response) {
  console.log("유저인포입니다.");
  // TODO: db 연결하고 이름 쏘기
  res.send("userinfo");
}

export default userInfo;
