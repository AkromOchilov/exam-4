import jwt, { JwtPayload } from 'jsonwebtoken';

let secret = 'olma'

export default {
  sign: ( payload: any ) => jwt.sign( payload, secret ),
  verify: ( token: any ) => jwt.verify( token, secret ) as JwtPayload
}