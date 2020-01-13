import React from 'react';
import {View,Text,StyleSheet,TouchableOpacity, Platform} from 'react-native';
import {Ionicon} from '@expo/vector-icons';



const CartItem=props=>{

      let productPrice=props.productPrice
      if(!props.productPrice && props.amount){
            productPrice=props.amount
      }

      return(
            <View style={styles.cartItem} >
                  <View style={styles.itemData}>
                        <Text styles={styles.quantity} >{props.quantity}</Text>
                        <Text styles={styles.mainText} >{props.title}</Text>
                  </View>
                  <View style={styles.itemData} >
                        <Text style={styles.mainText} >
                              {productPrice.toFixed(2)}
                        </Text>
                        {props.deletable && (
                              <TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
                                    <Ionicon name={Platform.OS === 'android'?'md-trash' :'ios-trash'} size={23} color='red'></Ionicon>
                              </TouchableOpacity>
                        )}
                  </View>
            </View>
      )
}


const styles=StyleSheet.create({
      cartItem:{
            padding:10,
            backgroundColor:'white',
            flexDirection:'row',
            justifyContent:'space-between',
            marginHorizontal:20
      },
      itemData:{
            flexDirection:'row',
            alignItems:'center',
      },
      quantity:{
            fontFamily:'open-sans-bold',
            fontSize:16,
      },
      deleteButton:{
            marginLeft:20
      }
})


export default CartItem;