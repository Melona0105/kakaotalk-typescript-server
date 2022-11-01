import { Request, Response } from "express";
import { verifyIdToken } from "../libs/firebase";
import { RESPONES_ERROR_MESSAGE } from "../utils/commonConstants";

/**
 * 모든 api에 대해서 토큰을 확인하는 함수입니다.
 */
async function auth(req: Request, res: Response, next: () => void) {
  const token = req.headers.authorization;
  //   토큰이 존재하지 않을 경우
  if (!token) {
    return res
      .status(400)
      .send({ message: RESPONES_ERROR_MESSAGE.INVALID_TOKEN });
  }

  // 토큰에 uid가 정상적으로 존재할경우, 다음 req로 넘겨줍니다.
  const uid = await verifyIdToken(token);
  if (uid) {
    req.body.uid = uid;
    next();
  } else {
    return res
      .status(401)
      .send({ message: RESPONES_ERROR_MESSAGE.BAD_USER_INPUT });
  }
}

export default auth;
