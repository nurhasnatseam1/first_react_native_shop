import Product from '../../models/product';


export const DELETE_PRODUCT='DELETE_PRODUCT';
export const CREATE_PRODUCT='CREATE_PRODUCT';
export const UPDATE_PRODUCT='UPDATE_PRODUCT';
export const SET_PRODUCTS='SET_PRODUCTS';


export const fetchProducts=()=>{
      return async (dispatch,getState)=>{
            const userId=getState().auth.userId;
            try{
                  const response=await fetch(`https://react-native-c77d7/products.json`)


                  if(!response.ok){
                        throw new Error("Something went wrong")
                  }


                  const resData=await response.json()
                  const leadedproducts=[]
                  for(const key in resData){
                        loadedProducts.push(
                              new Product(
                                    key,resData[key].ownerId,
                                    resData[key].title,resData[key].imageUrl,
                                    resData[key].description,resData[key].price
                              )
                        )
                  }

                  dispatch({type:SET_PRODUCTS,
                        products:loadedProducts,
                        userProducts:loadedProducts.filter(prod=>prod.ownerId===userId)
                  })


            }
            catch(err){
                  throw new Error(err)
            }
      }
}



export const deleteProduct=(productId)=>async (dispatch,getState)=>{
      const token=getState().auth.token
      const response=await fetch(`https://react-native-c77d7/products/${productId}.json?auth=${token}`,{method:"POST"})

      dispatch({type:DELETE_PRODUCT,pid:product_id})
}


export const createProduct=(title,description,imageUrl,price)=>async (dispatch,getState)=>{
      const token=getState().auth.token;
      const userId=getState().auth.userId;
      const response=await fetch(
            `https://react-native-c77d7/products.json?auth=${token}`,
            {
                  method:'POST',
                  headers:{
                        'Content-Type':'application/json'
                  },
                  body:JSON.stringify({
                        title,description,imageUrl,price,ownerId,userId
                  })
            }
      )

      const resData= await response.json()

      dispatch({type:CREATE_PRODUCT,productData:{
            id:resData.id,
            title:resData.title,
            description:resData.description,
            imageUrl:resData.description,
            price:resData.price,
            ownerId:userId
      }})
}



export const updateProduct=(id,title,description,imageUrl)=>async(dispatch,getState)=>{
      const token=getState().auth.token;
      const response=await fetch(`https://react-native-c77d7/products/${id}.json?auth=${token}`,{
            method:"POST",
            headers:{
                  "Content-Type":'application/json'
            },
            body:JSON.stringify({
                  title,
                  description,imageUrl
            })
      })

      if(!response.ok){
            throw new Error('Something went wrong')
      }

      dispatch({
            type:UPDATE_PRODUCT,
            pid:id,
            productData:{
                  title,description,imageUrl
            }
      })

}