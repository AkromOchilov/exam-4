import Food from './../../models/food.model'
import { createWriteStream } from 'fs'
import { resolve } from 'path'
import jwt from './../../utils/jwt'

export default {
  Query: {
    food: async ( _: any, { foodId } ) => {
      let foods = await Food.find( { category_id: foodId } )
      if ( !( foods.length ) ) {
        return {
          status: 404,
          message: 'No foods here yet...'
        }
      }

      return {
        status: 200,
        message: 'All foods',
        data: foods
      }
    },
    foods: async () => {
      try {
        let foods = await Food.find()
      if ( !( foods.length ) ) {
        return {
          status: 404,
          message: 'No foods here yet...'
        }
      }
  
      return {
        status: 200,
        message: 'All foods',
        data: foods
      }
      } catch (error) {
        console.log(error)
      }
    },
  },


  Mutation: {
    createYourFood: async ( _: any, { foodImage, category_id, food_name, food_price }, {token} ) => {
      try {
        let {id} = jwt.verify(token)
        if(!id){
          return {
            status: 403,
            message: 'token is required'
          }
        }

        const { filename, createReadStream } = foodImage.file;
        const uniqueFilename = Date.now() + filename.replace( /\s/g, '' );
        const newFood = await Food.create( {
          category_id,
          food_name,
          food_image: uniqueFilename,
          food_price,
        } );

        const stream = createReadStream();
        const out = createWriteStream( resolve( "uploads", uniqueFilename ) );
        await stream.pipe( out );

        return {
          status: 200,
          message: 'Food created',
          data: newFood
        };
      } catch ( error ) {
        console.log( error );
      }
    },

    deleteFood: async(_:any, {id}, {token})=>{
      try {
        let author = jwt.verify(token)
        if(!author.id){
          return {
            status: 403,
            message: 'token is required'
          }
        }
        await Food.findOneAndDelete({_id: id})

        return {
          status: 200,
          message: 'deleted'
        }
      } catch (error) {
        console.log(error)
        return {
          status: 500,
          message: 'error while deleting'
        }
      }
    },
    updateFood: async(_:any, {id, food_name, food_price}, {token})=>{
      try {
        let auth = jwt.verify(token)
        if(!auth.id){
          return {
            status: 403,
            message: 'token is required'
          }
        }
        let updatedFood = await Food.findByIdAndUpdate({_id: id}, {food_name, food_price})

        return {
          status: 200,
          message: 'updated'
        }
      } catch (error) {
        console.log(error)
      }
    }
  },

 
}