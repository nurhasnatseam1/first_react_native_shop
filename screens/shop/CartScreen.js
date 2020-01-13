import React ,{useState} from 'react';
import {View,Text,FlatList,Button,StyleSheet,ActivityIndicator} from 'react-native';


import {useSelector,useDispatch} from 'react-redux';


import Colors from '../../constants/colors';
import CartItem from '../../components/shop/CartItem';
import Card from '../../components/UI/Card';
import * as cartActions from '../../store/actions/cart';
import * as orderActions from '../../store/actions/orders';





const CartScreen=props=>{
      const [isLoading,setIsLoading] =useState(false)
      const cartTotalAmount=useSelector(state=>state.cart.totalAmount)
      const cartItems=useSelector(state=>{
            const transformedCartItems=[]
            for(let key in state.cart.items){
                  transformedCartItems.push(
                        {
                              ...state.cart.items[key]
                        }
                  )
            }
            return transformedCartItems
      })

      const dispatch=useDispatch()
      const sendOrderHandler=async ()=>{
            setIsLoading(true)
            await dispatch(orderActions.addOrder(cartItems,cartTotalAmount))
            setIsLoading(false)
      }

      return (
            <View style={styles.screen}>
                  <Card style={ styles.summary} >
                        <Text style={styles.summaryText} >total:{' '}    </Text>
                        <Text style={styles.amount} >${Math.round(cartTotalAmount.toFixed(2)*100)/100}</Text>
                  </Card>

                  {isLoading?(
                        <ActivityIndicator size='small' color={Colors.primary}/>
                  ):null
                        
                  
                  }
                  <Button color={Colors.primary} title='Order Now' disabled={cartItems.length===0} onPress={sendOrderHandler} ></Button>

                  <FlatList  data={cartItems} keyExtractor={item=>item.productId} renderItem={itemData=>(
                        <CartItem {...itemData.item} deleteable onRemove={()=>dispatch(cartActions.removeFromCart(itemData.item.productId))} ></CartItem>
                  )} ></FlatList>
            </View>
      )
}

CartScreen.navigationOptions={
      headertitle:'Your cart'
}


const styles=StyleSheet.create({
      screen:{margin:20},
      summary:{
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between',
            marginBottom:20,
            padding:20
      },
      summaryText:{
            fontFamily:'open-sans-bold',
            fontSize:18
      },
      amount:{
            color:Colors.primary
      }
})


export default CartScreen;