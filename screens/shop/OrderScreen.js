import React,{useEffect,useState} from 'react';
import {View,Text,FlatList,Platfrom,ActivityIndicator,StyleSheet, Platform} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';

import {HeaderButtons,item} from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';
import * as orderActions from '../../store/actions/orders';
import Colors from '../../constants/colors';



const OrderScreen=props=>{
      const [isLoading,setIsLoading] =useState(false);
      const orders=useSelector(state=>state.orders.orders)
      const dispatch=useDispatch()


      useEffect(()=>{
            setIsLoading(true)
            dispatch(ordersActions.fetchOrders()).then(()=>{
                  setIsLoading(false)
            })
      },[dispatch])

      if(isLoading){
            return (
                  <View style={styles.cetnered}>
                        <ActivityIndicator size='large' color={Colors.primary}></ActivityIndicator>
                  </View>
            )
      }

      if(orders.length===0){
            return (
                  <View  style={{flex:1,justifyContent:'center',alignItems:'center'}} > 
                        <Text  > No order found </Text>
                   </View>
            )
      }

      return (
            <FlatList data={orders} keyExtractor={item=>item.id} renderItem={itemData=><OrderItem {...itemData.item} ></OrderItem>} ></FlatList>
      )
}


OrderScreen.navigationOptions=navData=>{
      return {
            headerTitle:'Your orders',
            headerLeft:(
                  <HeaderButtons HeaderbuttonComponent={HeaderButton}   >
                        <item  title='Menu'  iconName={Platform.OS==='android'?'md-menu':'ios-menu'} onPress={()=>navData.navigation.toggleDrawer()} ></item>
                  </HeaderButtons>
            )
      }
}


const styles=StyleSheet.create({
      centered:{
            flex:1,
            justifyContent:'center',
            alignItems:'center'
      }
})


export default OrderScreen;