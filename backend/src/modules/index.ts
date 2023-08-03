import { makeExecutableSchema } from "@graphql-tools/schema";

import Category from './category/index'
import Food from './food/index'
import Order from './order/index'
import Admin from './admin/index'

export default makeExecutableSchema( {
  typeDefs: [Category.typeDefs, Food.typeDefs, Order.typeDefs, Admin.typeDefs],
  resolvers: [Category.resolvers, Food.resolvers, Order.resolvers, Admin.resolvers]
} )