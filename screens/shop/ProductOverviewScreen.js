import React, {useEffect,useState,useCallback} from 'react';
import {View,Text,FlatList,Button,Platform,ActivityIndicator,StyleSheet} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import {HeaderButton} from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';



import * as cartActions from '../../store/actions/cart';
import * as productActions from '../../store/actions/products';
import Colors from  '../../constants/colors';


const productsOverviewScreen=props=>{
      const [isLoading,setIsLoading] =useState(false);
      const [isRefreshing,setIsRefreshing]=useState(false);
      const [error,setError] =useState()
      const products=useSelector(state=>state.products.availableProducts)
      const dispatch=useDispatch()

      const loadProducts=useCallback(async ()=>{
            setError(null);
            setIsRefreshing(true);
            console.log('i am here')
            try{

                  await dispatch(productActions.fetchProducts())

            }catch(error){
                  setError(error.message)
            }

            setIsRefreshing(false);
      },[dispatch,setIsLoading,setError])

      useEffect(()=>{
            const willFocusSub=props.navigation.addListener(
                  'willFocus',
                  loadProducts
            )
            return ()=>{
                  willFocusSub.remove();
            }
      },[loadProducts])

      useEffect(()=>{
            setIsLoading(false);
            loadProducts().then((res)=>{
                  setIsLoading(false)
            })
      },[dispatch,loadProducts])


      const selectItemHandler=(id,title)=>{
            props.navigation.navigate('ProductDetail',{
                  productId:id,
                  productTitle:title
            })
      }

      if(error){
            console.log('where there is a fire,there is smoke')
            console.log(error)
            return (
                  <View style={styles.centered} >
                        <Text>An Error occured</Text>
                        <Button title="Try Again" onPress={loadProducts} color={Colors.primary} ></Button>
                  </View>
            )
      }


      if(!isLoading && products.length===0){
            return (
                  <View style={styles.centered} >
                        <Text>No products found</Text>
                  </View>
            )
      }
      return (
            <FlatList onRefresh={loadProducts} refreshing={isRefreshing} data={products} keyExtractor={item=>item.id} renderItem={itemData=>(
                  <ProductItem image={itemData.item.image} title={itemData.item.title} price={itemData.item.price} onSelect={()=>{
                        selectItemHandler(itemData.item.id,itemData.item.title)
                  }} >
                                    <Button color={Colors.primary} title='To Cart' onPress={()=>dispatch(cartActions.addToCart(itemData.item))} />
                                    <Button color={Colors.primary} title='View Detail' onPress={()=>{
                                    selectItemHandler(itemData.item.id,itemData.item.title)
                                    }}/>
                  </ProductItem>
            )} ></FlatList>


      )
}

productsOverviewScreen.navigationOptions=navData=>({
      headerTitle:'All Products',
      headerLeft:(
            <HeaderButtons HeaderButtonComponent={HeaderButton} >
                  <Item title='Menu' iconName={Platform.OS === 'android' ? 'md-menu' :'ios-menu'} onPress={()=>{navData.navigation.toggleDrawer()}} ></Item>
            </HeaderButtons>
      ),
      headerRight:(
            <HeaderButtons  HeaderButtonComponent={HeaderButton}  >
                  <Item title='Cart' iconName='ios-cart' onPress={()=>{
                        navData.navigation.navigate('Cart')
                  }} ></Item>
            </HeaderButtons>
      )
})

const styles=StyleSheet.create({
      centered:{
            flex:1,
            justifyContent:'center',
            alignItems:'center',
      }
})

export default productsOverviewScreen;