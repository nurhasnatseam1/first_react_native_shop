import Order from '../../models/order';
export const ADD_ORDER='ADD_ORDER';
export const SET_ORDERS='SET_ORDERS';



export const fetchOrders=()=>{
      console.log('balbalbal')
      return async (dispatch,getState)=>{
            console.log('bal')
            const userId=getState().auth.userId;
            const token=getState().auth.token;
            const date=new Date()
            console.log(userId)
            const response=await fetch(`https://react-native-c77d7.firebaseio.com/orders/${userId}.json?auth=${token}`)
            if(!response.ok){
                  throw new Error('Something went wrong')
            }
            const resData=await response.json()
            const loadedOrders=[]
            for(const key in resData){
                  loadedOrders.push(
                        new Order(
                              key,resData[key].cartItems,
                              resData[key].totalAmount,
                              new Date(resData[key],date)
                        )
                  )
            }
            dispatch({type:SET_ORDERS,orders:loadedOrders})
      }
}


export const addOrder=(cartItems,totalAmount)=>{
      return async (dispatch,getState)=>{

            const token=getState().auth.token;
            const userId=getState().auth.userId;
            console.log(userId)
            const date=new Date()
            const response=await fetch(`https://react-native-c77d7.firebaseio.com/orders/${userId}.json?auth=${token}`,{
                  method:'POST',
                  headers:{
                        'Content-Type':'application/json'
                  },
                  body:JSON.stringify({
                        cartItems,
                        totalAmount,
                        date:date.toISOString()
                  })
            })

            if(!response.ok){
                  throw new Error('Something went wrong')
            }

            const resData=await response.json()

            dispatch({
                  type:ADD_ORDER,
                  orderData:{
                        id:resData.name,
                        items:cartItems,
                        amount:totalAmount,
                        date:date
                  }
            })
      }
}