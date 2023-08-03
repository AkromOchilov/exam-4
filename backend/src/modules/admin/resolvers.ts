import Admin from './../../models/admin.model'
import jwt from './../../utils/jwt'

export default {

  Mutation: {
    postAdmin: async ( parent: any, { username, password } ) => {
      let user = await Admin.findOne( { username, password } );

      if ( !user ) {
        return {
          status: 404,
          message: 'User not found'
        }
      }

      return {
        status: 200,
        message: 'successful login',
        token: jwt.sign( { id: user._id, username: user.username } )
      }
    },
  }
}