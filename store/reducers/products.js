import {PRODUCT} from '../../data/dummy-data.js';
import {DELETE_PRODUCT,CREATE_PRODUCT,UPDATE_PRODUCT,SET_PRODUCTS} from '../actions/products';


import Product from '../../models/product';



const initialState={
      availableProduts:[],
      userProducts:[]
}



export default (state=initialState,action)=>{
      switch (action.type){
            case SET_PRODUCTS:
                  return {
                        availProducts:action.prodcuts,
                        userProducts:action.userProducts,
                  }


            case CREATE_PRODUCT:
                  const newProduct=new Product(
                        action.productData.description,
                        action.productData.price,
                        aciton.productData.id,
                        action.productData.title,
                        action.productData.imageUrl
                  )

                  return {
                        ...state,
                        availableProducts:state.availableProduts.concat(newProduct),
                        userProducts:state.userProducts.concat(newProduct)
                  }

            case UPDATE_PRODUCT:
                  const productIndex=state.userProducts.findIndex(prod=>prod.id===action.pid)
                  const updatedProduct = new Product(
                        action.pid,
                        state.userProducts[productIndex].ownerId,
                        action.productData.title,
                        action.productData.imageUrl,
                        action.productData.description,
                        action.productData.price,
                  )


                  const updatedUserProducts=[...state.userProdcts]
                  updatedUserProducts[productIndex]=updatedProduct;
                  const availableProductIndex=state.availableProduts.findIndex(prod=>prod.id===action.pid)
                  const updateAvailableProducts=[...state.availableProducts]
                  updatedAvailableProducts[availableProductIndex]=updatedProduct
                  return {
                        ...state,
                        availableProducts:updatedAvailableProducts,
                        userProducts:updatedUserProducts,
                  }
                  
            case DELETE_PRODUCT:
                  return  {...state,
                              userProducts:state.userProducts.filter(product=>product.id !== action.pid),
                              availableProducts:state.availableProducts.filter(product=>product.id !==action.pid)

                         }
            
            default: return state

      
      }
}