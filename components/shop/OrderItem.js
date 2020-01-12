import React,{useState} from 'react';
import {Veiw,Text,Button,StyleSheet} from 'react-native';


import CartItem from './CartItem';
import Colors from '../../constants/colors';
import Card from '../UI/Card';


const OrderItem=props=>{
      const [showDetails,setShowDetails]=useState(false)
      return (
            <Card style={styles.orderItem} >
                  <View style={styles.summery} >
                        <Text style={styles.totalAmount} >{props.totalAmount.toFixed(2)}</Text>
                        <Text style={styles.data} > {props.date}  </Text>
                  </View>
                  <Button color={Colors.primary} title={showDetail?'Hide Details' :''}/>
            </Card>
      )
}



const styles=StyleSheet.create({
      orderItem:{
            margin:20,padding:10,alignItems:'center'
      },
      summery:{
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
            width:'100%',
            marginBottom:15,
      },
      totalAmount:{
            fontFamily:'open-sans-bold',
            fontSize:16,
      },date:{
            fontSize:16,
            fontFamily:'open-sans',
            color:'#888'
      },
      detailedItems:{
            width:'100%'
      }
})

export default OrderItem;