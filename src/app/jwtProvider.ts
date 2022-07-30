import {Jwt, JwtPayload, sign, verify, SignOptions} from "jsonwebtoken"

export class JwtProvider {
  secretKey = "49UKZU60X1b7Em97VKeeW0blpvSsAm3m";

  constructor() {
  }

  generate(payload: JwtPayload) {
    const k = sign(payload, this.secretKey, {expiresIn: '1h'});
    return k
  }

  verify(token: string) {
    return verify(token, this.secretKey, {complete: true})
  }
}
