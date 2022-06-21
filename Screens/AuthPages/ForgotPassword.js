import React, { Component,useState } from 'react';
import { View, Text,Dimensions,ActivityIndicator ,TouchableOpacity,TextInput,Image, StyleSheet} from 'react-native';
import {MaterialIcons } from '@expo/vector-icons'; 
import { GuavaIconLogo,EmailIcon, BackArrow } from '../../assets/SvgIcons/AllIcons';
import { ForgotPassword } from '../Services/Authentication';
import Toast from 'react-native-tiny-toast';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function ChangePassword ({navigation}) {
  const [UserEmail,SetUserEmail]=useState('saadtechs@gmail.com')
  const [IsLoading,setIsLoading]=useState(false)
  const [ErrorMessage,SetErrorMessage]=useState('')

  const ValidateEmail = (email) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return (true)
    }

    return (false)
  }
  const CheckValidations=()=>{
    if (!ValidateEmail(UserEmail)) {
      SetErrorMessage('Email is not valid')
      return
    }else{
      SetErrorMessage('')
      setIsLoading(true)
      Forgot()
    }
  }

  const Forgot=async()=>{
    try{
     if(IsLoading){
       Toast.show('Please wait',{position:Toast.position.TOP})
     }else{
       Toast.show('Conforming Record',{position:Toast.position.TOP})
       var CheckStatus=await ForgotPassword(UserEmail)
      
      if(CheckStatus.error==false){
        setIsLoading(false)
        navigation.goBack(null)
        Toast.show(CheckStatus.success_msg,{position:Toast.position.TOP}) 
      }else{
        setIsLoading(false)
         Toast.show(CheckStatus.error_msg,{position:Toast.position.TOP})

      }

     }
   }catch(e){
     Toast.show('Error '+e,{position:Toast.position.TOP})
   }
  }
    return (
      <View style={{flex:1,backgroundColor:'#fff'}}>
          <View>
            <TouchableOpacity onPress={()=>navigation.goBack(null)} style={{padding:5,margin:10}}>
               <BackArrow/>
            </TouchableOpacity>
          </View>
        <View style={{marginTop:20,alignSelf:'center'}}>
           <GuavaIconLogo/>
        </View>
        <Text style={{textAlign:'center',fontSize:24,fontWeight:'bold',marginVertical:10}}>Forgot Password</Text>
        <Text style={styles.text}></Text>
       
        <View style={{height:windowHeight/15,backgroundColor:'#e5e5ea',borderRadius:25,flexDirection:'row',alignItems:'center',width:'90%',alignSelf:'center',marginVertical:10}}>
          <View style={{backgroundColor:'#3A3A3C',width:50,height:windowHeight/15,borderRadius:30,alignItems:'center',justifyContent:'center'}}>
            <EmailIcon/>
          </View>
          <TextInput style={{marginLeft:10,flex:1,marginRight:20}}  placeholder='Email'  onChangeText={(e)=>SetUserEmail(e)} placeholderTextColor={'#8e8e93'} />
        </View>
        <Text style={{textAlign:'center',color:'red',marginBottom:10}}>{ErrorMessage}</Text>
        <View style={{alignSelf:'center',width:'80%',marginTop:40}}>
          <TouchableOpacity onPress={()=>CheckValidations()} style={{width:'100%',justifyContent:'center',alignItems:'center',borderRadius:10,height:40,backgroundColor:'#FF9F0A',}}>
            {IsLoading?
                <ActivityIndicator color={'#fff'}/>
                :
                <Text style={{justifyContent:'center',alignItems:'center',fontWeight:'bold',fontSize:18,color:'#fff'}}>Send</Text>
            }
          </TouchableOpacity>
        </View>
      </View>
    );
  
}
const styles=StyleSheet.create({
    text:{
        fontWeight:'700',
        color:'gray',
        marginLeft:25,
        marginVertical:10
    },
    TextInputContainer:{
        margin:20,
        width:'90%',
        height:60,
        borderRadius:10,
        backgroundColor:'#E5E5EA',
        // justifyContent:'center',
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:20
      },
})
