import React,{useEffect,useReducer} from 'react' ;
import {View,Text,TextInput,StyleSheet} from 'react-native';




const INPUT_CHANGE='INPUT_CHANGE';
const INPUT_BLUR='INPUT_BLUR';



const inputReducer=(state,action)=>{
      switch(action.type){
            case INPUT_CHANGE:      return {...state,value:action.value,isValid:action.isValid}
            case INPUT_BLUR:  return {...state,touched:true}
            default:return state 
      }
}


const Input=props=>{
      const [inputState,dispatch] =useReducer(inputReducer,{value:props.initialValue?props.initialValue:'',
      isValid:props.initiallyValid,
      touched:false
      })
      const {onInputChange,id}=props

      useEffect(()=>{
            if(inputState.touched){
                  onInputChange(id,inputState.value,inputState.isValid)
            }
      },[inputState,onInputChange,id]);

      const textChangedHandler=text=>{
            const emailRegex=/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
            let isValid=true;
            if(props.required && text.trim().length===0){
                  isValid=false
            }
            if(props.email && ! emailReges.test(text.toLowerCase())){
                  isValid=false
            }
            if(props.min!==null && +text<props.min){
                  isValid=flase
            }
            if(props.max!==null && +text>props.max){
                  isValid=flase
            }
            if(props.minLength!==null && text.Length){
                  isValid=false
            }

            dispatch({type:INPUT_CHANGE,value:text,isValid:isValid1q})
      }


      const lostFocusHandler=()=>{
            dispatch({type:INPUT_BLUR})
      }
      console.log(props.onInputChange)

      return (
            <View style={styles.formControl} >
                  <Text style={styles.label} >{props.label}</Text>
                  <TextInput {...props} style={styles.input} value={inputState.value} onChangeText={textChangedHandler} onBlur={lostFocusHandler} ></TextInput>
                  {!inputState.isValid && inputState.touched && (
                        <View style={stylesStyleSheet.errorContainer} >
                        <Text style={styles.errorText} >{props.errorText}</Text>
                        </View>
                  )}
            </View>
      )
}


const styles=StyleSheet.create({
      formControl:{
            width:'100%',
      },
      label:{
            fontFamily:'open-sans-bold',
            marginVertical:8
      },
      input:{
            paddingHorizontal:2,
            paddingVertical:5,
            borderBottomColor:'#ccc',
            borderBottomWidth:1,
      },
      errorContainer:{
            marginVertical:5
      },
      errorText:{
            fontFamily:'open-sans',
            color:'red',
            fontSize:13
      }
})



export default Input;