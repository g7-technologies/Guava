import React, { Component, useEffect,useState } from 'react';
import { View, ActivityIndicator,Text,Dimensions,TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { EmailIcon, UpdateButton } from '../../../assets/SvgIcons/AllIcons';
import CommonHeader from '../../../Components/CommonHeader';
import { GetFollowerRecordAsync, GetFollowingRecordAsync, GetUserRecordAsync, ReturnUserRecordAsync, UpdateEmail } from '../../Services/Authentication';
import Toast from 'react-native-tiny-toast';
const windowHeight = Dimensions.get('window').height;

export default function EditPersonalProfile({navigation}) {
  const [user,GetUser]=useState('')
  const [UserID,GetUserID]=useState('')
  const [UserEmail,SetUserEmail]=useState('')
  const [IsLoading,setIsLoading]=useState(false)
  const [ErrorMessage,SetErrorMessage]=useState('')

  
  useEffect(()=>{
    GetUserInfo()
  },[])

  GetUserInfo=async()=>{
    var UserRecord=await ReturnUserRecordAsync()
    GetUser(UserRecord[0])
    SetUserEmail(UserRecord[0].email)
    GetUserID(UserRecord[4])
  }

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
      Update()
    }
  }
  const Update=async()=>{
   
    
    try{
     if(IsLoading){
       Toast.show('Please wait',{position:Toast.position.TOP})
     }else{
       Toast.show('Updating Info',{position:Toast.position.TOP})
       var CheckStatus=await UpdateEmail(UserID,UserEmail)
      //  console.log(CheckStatus)
       GetUserRecordAsync(JSON.stringify(CheckStatus.user.fields) )
      //  GetFollowerRecordAsync(JSON.stringify(CheckStatus.followers))
      //  GetFollowingRecordAsync(JSON.stringify(CheckStatus.followings))
      if(CheckStatus.error==false){
        Toast.show(CheckStatus.success_msg,{position:Toast.position.TOP})
        //  navigation.replace('Dashboard')
       setIsLoading(false)
      }else{
        setIsLoading(false)
         Toast.show('error'+CheckStatus.error_msg,{position:Toast.position.TOP})
          console.log(CheckStatus.error_msg)
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
        <CommonHeader navigation={navigation} Name={'Change Email'} />
          <Text style={{textAlign:'center',fontSize:30,marginVertical:40,fontWeight:'bold'}}>Change Email</Text>
          <View style={{height:windowHeight/15,backgroundColor:'#e5e5ea',borderRadius:25,flexDirection:'row',alignItems:'center',marginVertical:5,width:'90%',alignSelf:'center'}}>
            <View style={{backgroundColor:'#3A3A3C',width:50,height:windowHeight/15,borderRadius:30,alignItems:'center',justifyContent:'center'}}>
              <EmailIcon/>
            </View>
            <TextInput defaultValue={user.email} style={{marginLeft:10,flex:1,marginRight:20}}  placeholder='info@yourmail.com'  onChangeText={(e)=>SetUserEmail(e)} placeholderTextColor={'#8e8e93'} />
          </View>
        <Text style={{textAlign:'center',color:'red',marginBottom:10}}>{ErrorMessage}</Text>

        <View style={{alignSelf:'center',width:'80%'}}>
          <TouchableOpacity  onPress={()=>{CheckValidations()}} style={{borderRadius:40,padding:10,height:50,backgroundColor:'#fa9522',justifyContent:'center',alignItems:'center',marginTop:30}}>
              {IsLoading?
              <ActivityIndicator color={'#fff'}/>
              :
              <Text style={{color:'white',fontSize:17}}>Update</Text>}
          </TouchableOpacity>
        </View>
        
      </View>
    );
  
}
