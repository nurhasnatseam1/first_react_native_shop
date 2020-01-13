import React,{useState} from 'react';
import {createStore,combineReducers,applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {Provider, } from 'react-redux';
import {AppLoading} from 'expo';
import * as Font from 'expo-font';
import reduxThunk from 'redux-thunk';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore, persistReducer } from 'redux-persist'
import {AsyncStorage} from 'react-native';




import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import orderReducer from './store/reducers/orders';
import authReducer from './store/reducers/auth'



import ShopNavigator from './navigation/ShopNavigator';



const rootReducer=combineReducers({
  products:productsReducer,
  cart:cartReducer,
  orders:orderReducer,
  auth:authReducer,
})


//redux-persist
const persistConfig={
  key:'root',
  storage:AsyncStorage,
  whitelist:['auth'],
}


const persistedReducer = persistReducer(persistConfig, rootReducer)
//ersisted store
const store=createStore(persistedReducer,composeWithDevTools(applyMiddleware(reduxThunk)))
//persistor
const persistor = persistStore(store)

const fetchFonts=()=>{
  return Font.loadAsync({
    'open-sans':require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold':require('./assets/fonts/OpenSans-Bold.ttf'),
    'open-sans-light':require('./assets/fonts/OpenSans-Light.ttf')
  })
}


export default function App(){
  const [fontLoaded,setFontLoaded]=useState(false)
  if(!fontLoaded){
    return (
      <AppLoading startAsync={fetchFonts} onFinish={()=>setFontLoaded(true)} ></AppLoading>
    )
  }

  return (
    <Provider store={store} >
       <PersistGate loading={null} persistor={persistor}>
           <ShopNavigator/>
       </PersistGate>
    </Provider>
  )
}