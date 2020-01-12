import React from 'react';
import {View,Text,Image,StyleSheet,TouchableOpacity,TouchableNativeFeedback,Platform} from 'react-native';
import Card from '../UI/Card';




const ProductItem=props=>{
      let touchableCmp=TouchableOpacity
      Platform.OS==='android' && Platform.version>=21 ? touchablecmp=TouchableNativeFeedback:null
      return (
            <Card style={styles.product} >
                  <TouchableCmp  onPress={props.onSelect} useForeground >
                        <View>
                              <View style={styles.imageContainer} >
                                    <Image style={styles.image} source={{uri:props.image}}/>
                              </View>
                              <View style={styles.details} >
                                    <Text style={styles.title} >{props.title}</Text>
                                    <Text style={styles.price} > {props.price.toFixed(2)} </Text>
                              </View>
                              <View style={styles.action} >{ props.children }</View>
                        </View>
                  </TouchableCmp>
            </Card>
      )
}

const styles=StyleSheet.create({
      product:{
            height:300,
            margin:20,
      },
      touchable:{
            borderRadius:10,
            overflow:'hidden'
      },
      imageContainer:{
            width:'100%',
            height:'60%',
            borderTopLeftRadius:10,
            borderTopRightRadius:10,
            overflow:'hidden'
      },
      price:{
            fontFamily:'open-sans',
            fontSize:14,
            color:'#888',

      },
      image:{
            width:'100%',
            height:'100%',
      },
      details:{
            alignItems:'center',
            height:'17%',
            padding:10
      },
      title:{
            fontFamily:'open-sans',
            fontSize:14,
            color:'#888'
      },
      actions:{
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',
            height:'23%',
            paddingHorizontal:20
      }
})

export default ProductItem;