import * as jwt from 'jsonwebtoken'
import { config } from '../../../shared/application/data/config'
import { TokenPayload } from '../data/object-value/token-payload'

export interface JWTService{
  createToken(payload: TokenPayload): string

  getTokenPayloadValue(accessToken: string): TokenPayload | null
}

export class JWTServiceImpl{
  createToken(payload: TokenPayload): string {
    const secret = config.jwt.secret

    return jwt.sign(payload, secret, {
      expiresIn: config.jwt.time
    })
  }

  getTokenPayloadValue(accessToken: string): TokenPayload | null {
    try {
      const secret = config.jwt.secret

      return jwt.verify(accessToken, secret) as TokenPayload | null
    } catch {
      return null
    }
  }
}