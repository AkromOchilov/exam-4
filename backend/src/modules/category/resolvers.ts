import Category from './../../models/category.model'
import { resolve } from 'path'
import { createWriteStream } from 'fs'
import jwt from './../../utils/jwt'

export default {
  Query: {
    category: async () => {
      let categories = await Category.find()
      if ( !( categories.length ) ) {
        return {
          status: 404,
          message: 'categories not found'
        }
      }

      return {
        status: 200,
        message: 'all categories',
        data: categories
      }
    }
  },

  Mutation: {
    createCategory: async ( _: any, { file, category_name }, {token} ) => {
      try {
        let {id} = jwt.verify(token)
        if(!id){
          return {
            status: 403,
            message: 'token is required'
          }
        }

        let { filename, createReadStream } = await file.file
        let uniqueFilename = Date.now()+"."+ filename.replace( /\s/g, '' )
        let newCategory = await Category.create( { category_name, category_image: uniqueFilename } )
        const stream = createReadStream();
        const out = createWriteStream( resolve( "uploads", uniqueFilename ) );
        await stream.pipe( out );



        return {
          status: 200,
          message: 'category created',
          data: newCategory
        }
      } catch ( error ) {
        console.log( error )
      }
    },


    updateCategory: async(_:any, {id, category_name}, {token})=>{
      try {
        let auth = jwt.verify(token)
        if(!auth.id){
          return {
            status: 403,
            message: 'token is required'
          }
        }
        let newCategory = await Category.findByIdAndUpdate({_id: id}, {category_name},)
        return {
          status: 200,
          message: 'changed',
          data: newCategory
        }
        
      } catch (error) {
        console.log(error)
      }
    },
    deleteCategory:async(_:any, {id}, {token})=>{
      try {
       let auth = jwt.verify(token)
        if(!auth.id){
          return {
            status: 403,
            message: 'token is required'
          }
        }
       console.log(id)
       await Category.findByIdAndDelete({_id: id})
  
       return {
       status: 200,
       message: 'deleted'
     } 
    } catch (error) {
        console.log(error) 
    }
    },
  }

}