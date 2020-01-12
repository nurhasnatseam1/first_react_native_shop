import React from 'react';
import {ScrollView,View,Text,image,Button,StyleSheet} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';


import Colors from '../../constants/colors';
import * as cartActions from '../../store/actions/cart';



const ProductDetailScreen=props=>{
      const productId=props.navigation.getParam('productId')
      const selectedProduct=useSelector(state=>state.products.availbaleProducts.find(product=>product.id===productId))
      const dispatch=useDispatch()

      return (
            <ScrollView>
                  <Image  style={styles.image} source={{uri:selectedProduct.imageUrl}} ></Image>
                  <View style={styles.actions} >
                        <Button color={Colors.primary} title='Add to cart' onPress={()=>dispatch(cartActions.addToCart(selectedProduct))} ></Button>
                  </View>
      <Text style={styles.price} >{selectedProduct.price.toFixed(2)}</Text>
<Text style={styles.description}> {selectedProduct.description}</Text>
            </ScrollView>
      )
}

ProductDetailScreen.navigationOptions=navData=>{
      {headerTitle:navData.navigation.getParam('productTitle')}
}




const styles =StyleSheet.create({
      iamge:{
            width:'100%',
            height:300,
      },actions:{
            marginVertical:10,alignItems:'center'
      },
      price:{
            fontSize:20,
            color:'#888',
            textAlign:'center',
            marginVertical:20,
            fontFamily:'open-sans-bold',
      },
      description:{
            fontFamily:'open-sans',
            fontSize:14,
            textAlign:'center',
            marginHorizontal:20,
      }
})


export default ProductDetailScreen;