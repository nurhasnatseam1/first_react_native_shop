import React from 'react';
import {createSwitchNavigator,createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import {Platform } from 'react-native';
import {Ionicons} from '@expo/vector-icons';


import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
import ProdcutDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrderScreen from '../screens/shop/OrderScreen';
import UserProductsScreen from '../screens/user/UserProductScreen';
import EditProductScreen from '../screens/user/EditProductScreen';

import AuthScreen from '../screens/user/AuthScreen';


import Colors from '../constants/colors';


const defaultNavOptions={
      headerStyle:{
            backgroundColor:Platform.OS==='android'?Colors.primary:''
      },
      headerTitleStyle:{
            fontFamily:'open-sans-bold'
      },
      headerBackTitleStyle:{
            fontFamily:'open-sans'
      },
      headerTintColor:Platform.OS === 'android' ?'white' :Colors.primary
}



const ProductsNavigator=createStackNavigator({
      ProductsOverview:ProductOverviewScreen,
      ProductDetail:ProdcutDetailScreen,
      Cart:CartScreen,
},{
      defaultNavigationOptions:defaultNavOptions,
      navigationOptions:{
            drawerIcon:drawerconfig=>{
                  return(
                        <Ionicon name={Platform.OS==='android'?'md-cart':'ios-cart'} size={23} color={drawerconfig.tintColor} ></Ionicon>
                  )
            }
      }
}
)


const ordersNavigator=createStackNavigator({
      Orders:OrderScreen
},{
      navigationOptions:{
            drawerIcon:drawerconfig=>(
                  <Ionicon name={Platform.OS === 'android'?'md-list':'ios-list' } size={23} color={drawerconfig.tintColor} ></Ionicon>
            )
      },
      defaultNavigationOptions:defaultNavOptions
})




const adminNavigator=createStackNavigator({
      UserProducts:UserProductsScreen,
      EditProduct:EditProductScreen
},{
      navigationOptions:{
            drawerIcon:drawerconfig=>(
                  <Ionicon name={Platform.OS==='android'?'md-create':'ios-create'} size={23} color={drawerconfig.tintColor} ></Ionicon>
            )
      },
      defaultNavigationOptions:defaultNavOptions
})



const ShopNavigator=createDrawerNavigator({
      Products:ProductsNavigator,
      Orders:ordersNavigator,
      Admin:adminNavigator,
},{
      contentOptions:{
            activeTintColor:Colors.primary
      }
})



const AuthNavigator=createStackNavigator({
      Auth:AuthScreen
},{
      defaultNavigationOptions:defaultNavOptions
})



const MainNavigator=createSwitchNavigator({
      Auth:AuthNavigator,
      Shop:ShopNavigator,
})


export default createAppContainer(MainNavigator)