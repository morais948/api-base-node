import { Connection } from "mongoose"
import { DataResponse } from "../../../shared/application/data/data-response"
import { User } from "../../domain/data/entity/user"
import { ObjectId } from 'mongodb'

export interface AuthDataAccess {
  getUserByEmail(email: string): Promise<DataResponse<User>>
}

export class AuthDataAccessImpl implements AuthDataAccess {

  private readonly _connection: Connection

  constructor(connection: Connection) {
    this._connection = connection
  }

  async getUserByEmail(email: string): Promise<DataResponse<User>> {
    try {
      const user = await this._connection.db.collection('users').findOne({ email })
      
      if(!user){
        return {
          success: false,
          data: null,
          errors: []
        }
      }

      return {
        success: true,
        data: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          hashPassword: user.password
        },
        errors: []
      }
    } catch (error) {
      return {
        success: false,
        data: null,
        errors: []
      }
    }
  }
}