import React, { Component } from 'react';
import { View, Text,Image } from 'react-native';
import { ReturnUserRecordAsync } from '../Services/Authentication';
import * as Notifications from 'expo-notifications';
export default function CheckLoginApp ({navigation}){
 
  React.useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(notification => {
   console.log('notification ')
   console.log(notification)
   console.log('notification ')


    });
    return () => subscription.remove();
  }, []);
  React.useEffect(() => {
    CheckLoginStatus()
  }, []);
  const CheckLoginStatus=async()=>{
   var data= await ReturnUserRecordAsync()
     var state=data[3]
    //  alert(typeof state)
     if(state=="1"){
         navigation.replace('Dashboard')
     }else if(state=="0"){
        navigation.replace('Home')
     }else{
        navigation.replace('Home')
     }
     
  }

    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#fff'}}>
        <Image  source={require('../../assets/Loading.gif')}/>
      </View>
    );
  
}
