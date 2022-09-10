import { NextFunction, Request, Response } from "express";
import { ErrorDataResponse } from "../../../shared/application/data/error-data-response";
import { HttpDataResponseBuilder } from "../../../shared/application/data/http-data-response-builder";
import { JWTServiceImpl } from "../../application/service/jwt-service";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.header('Authorization')
  const accessTokenHeader = authorization?.split('Bearer ')[1]
  req.headers['accesstoken'] = accessTokenHeader as string

  if (!accessTokenHeader) {
    const errors = [
      {
        message: 'Faltando token de acesso'
      } as ErrorDataResponse
    ] as ErrorDataResponse[]

    const unauthorizedMessage = new HttpDataResponseBuilder<void>()
      .create()
      .withUnauthorizedMessage(errors)
      .build()

    return res
      .status(unauthorizedMessage.statusCode)
      .json(unauthorizedMessage.body)
  }

  const jwtService = new JWTServiceImpl()
  const payload = jwtService.getTokenPayloadValue(accessTokenHeader)
  
  if(!payload){
    const errors = [
      {
        message: 'Token inválido.'
      } as ErrorDataResponse
    ] as ErrorDataResponse[]

    const unauthorizedMessage = new HttpDataResponseBuilder<void>()
      .create()
      .withUnauthorizedMessage(errors)
      .build()

    return res
      .status(unauthorizedMessage.statusCode)
      .json(unauthorizedMessage.body)
  }

  next()
}