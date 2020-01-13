export const SIGNUP='SIGNUP';
export const LOGIN='LOGIN';

const webApi='AIzaSyDK85IarfReplRORRUVzkSLbP4LbBk-5UU'

const signUp=`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDK85IarfReplRORRUVzkSLbP4LbBk-5UU`
const loginUrl=`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${webApi}`

export const signup=(email,password)=>async dispatch=>{
      const response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDK85IarfReplRORRUVzkSLbP4LbBk-5UU',{method:"POST",headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password,returnSecureToken:true})})
      if(!response.ok){
            const errorResData=await response.json()
            const errorId=errorResData.error.message
            let message='Something went wrong'
            if(errorId==='EMAIL_EXISTS'){
                  message='this email already exists'
            }

            throw new Error(message)
            const resData=await response.json()
            dispatch({
                  type:'SIGNUP',
                  token:resData.idToken,
                  userId:resData.localId
            })
      }
}


export const login = (email,password)=>async dispatch=>{
      const response =await fetch(loginUrl,{
            method:"POST",
            headers:{
                  'Content-Type' :'application/json'
            },
            body:JSON.stringify({
                  email,password,returnSecureToken:true
            })
      })
      if(!response.ok){
            const errorResData=await response.json();
            const errorId=errorResData.error.message;
            let message='Something went wrong'
            if(errorId==='EMAIL_NOT_FOUND'){
                  message='This email could not be found'
            }
            else if(errorId==='INVALID_PASSWORD'){
                  message='this password is not valid'
            }

            throw new Error(message)
           
      }


      const resData=await response.json()
      dispatch({type:'LOGIN',token:resData.idToken,userId:resData.localId})
}