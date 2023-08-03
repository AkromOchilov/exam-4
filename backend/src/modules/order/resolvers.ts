import Order from './../../models/order.model'

export default {
  Query: {
    orders: async () => {
      let orders = await Order.find()

      if ( !( orders.length ) ) {
        return {
          status: 404,
          message: "No orders yet"
        }
      }

      return {
        status: 200,
        message: 'all orders',
        data: orders
      }
    }
  },

  Mutation: {
    orders: async ( _: any, { username, contact, orders } ) => {
      await Order.create( { username, contact, orders } )
      console.log( username, contact, orders )
      return {
        status: 200,
        message: 'keldi'
      }
    }
  }
}