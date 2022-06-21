import React, { Component, useState ,useEffect} from 'react';
import { View, Text,Dimensions ,ActivityIndicator,TouchableOpacity,TextInput,Image, StyleSheet} from 'react-native';
import {MaterialIcons } from '@expo/vector-icons'; 
import { BackArrow, GuavaIconLogo, LockIcon } from '../../../assets/SvgIcons/AllIcons';
import CommonHeader from '../../../Components/CommonHeader';
import { GetUserRecordAsync, ReturnUserRecordAsync, UpdatePassword } from '../../Services/Authentication';
import Toast from 'react-native-tiny-toast';
const windowHeight = Dimensions.get('window').height;

export default function ChangePassword ({navigation}) {
    const[OldPassword,SetOldPassword]=useState('')
    const[NewPassword,SetNewPassword]=useState('')
    const [ErrorMessage,SetErrorMessage]=useState('')
    const [IsLoading,setIsLoading]=useState(false)
    
    const [UserID,GetUserID]=useState('')
   
    useEffect(()=>{
        GetUserInfo()
    },[])
    
      GetUserInfo=async()=>{
        var UserRecord=await ReturnUserRecordAsync()
        GetUserID(UserRecord[4])
      }
  const CheckValidations=()=>{
    if (OldPassword=='') {
      SetErrorMessage('Old Password not valid')
      return
    }else if(NewPassword.length<6){
        SetErrorMessage('Password not valid')
      return 
    }else{
      SetErrorMessage('')
      setIsLoading(true)
      Update()
    }
  }
  const Update=async()=>{
   
    
    try{
     if(IsLoading){
       Toast.show('Please wait',{position:Toast.position.TOP})
     }else{
       Toast.show('Updating Info',{position:Toast.position.TOP})
       var CheckStatus=await UpdatePassword(UserID,OldPassword,NewPassword,NewPassword)
      
      if(CheckStatus.error==false){
        Toast.show(CheckStatus.success_msg,{position:Toast.position.TOP})
         navigation.goBack(null)
       setIsLoading(false)
      }else{
        setIsLoading(false)
         Toast.show(CheckStatus.error_msg,{position:Toast.position.TOP})
          
      }

     }
   }catch(e){
    setIsLoading(false)
     Toast.show('Error '+e,{position:Toast.position.TOP})
   }
  }
    return (
      <View style={{flex:1,backgroundColor:'#fff'}}>
        <View style={{marginTop:20}}/>
        <CommonHeader navigation={navigation} Name={'Change Password'}/>
        <View style={{height:50}}/>
        <Text style={styles.text}>Old Password</Text>
          <View style={{height:windowHeight/15,backgroundColor:'#e5e5ea',borderRadius:25,flexDirection:'row',alignItems:'center',marginVertical:5,width:'90%',alignSelf:'center'}}>
            <View style={{backgroundColor:'#3A3A3C',width:50,height:windowHeight/15,borderRadius:30,alignItems:'center',justifyContent:'center'}}>
            <LockIcon/>
            </View>
            <TextInput  style={{marginLeft:10,flex:1,marginRight:20}}  placeholder='xxxxxxxxx ... Old Password'   onChangeText={(e)=>SetOldPassword(e)} placeholderTextColor={'#8e8e93'} />
          </View>
          <View style={{height:20}}/>
          <Text style={styles.text}>New Password</Text>
          <View style={{height:windowHeight/15,backgroundColor:'#e5e5ea',borderRadius:25,flexDirection:'row',alignItems:'center',marginVertical:5,width:'90%',alignSelf:'center'}}>
            <View style={{backgroundColor:'#3A3A3C',width:50,height:windowHeight/15,borderRadius:30,alignItems:'center',justifyContent:'center'}}>
            <LockIcon/>
            </View>
            <TextInput  style={{marginLeft:10,flex:1,marginRight:20}}  placeholder='xxxxxxxxx ... minumum 6 digit'   onChangeText={(e)=>SetNewPassword(e)} placeholderTextColor={'#8e8e93'} />
          </View>
        
        <Text style={{textAlign:'center',color:'red',marginBottom:10}}>{ErrorMessage}</Text>

        <View style={{alignSelf:'center',width:'80%'}}>
        <TouchableOpacity onPress={()=>CheckValidations()} style={{width:'100%',justifyContent:'center',alignItems:'center',borderRadius:10,height:60,backgroundColor:'#FF9F0A'}}>
          {IsLoading?
            <ActivityIndicator color={'#fff'}/>
            :
            <Text style={{justifyContent:'center',alignItems:'center',fontWeight:'bold',fontSize:18,color:'#fff'}}>Update</Text>
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
        marginLeft:30,
        marginVertical:5
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
