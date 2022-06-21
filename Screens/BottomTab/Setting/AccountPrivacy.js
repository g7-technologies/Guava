import React, { Component,useState,useEffect } from 'react';
import { View,Switch,ScrollView,Button, Text ,TouchableOpacity,TextInput,Image, StyleSheet, Platform} from 'react-native';
import {MaterialIcons } from '@expo/vector-icons'; 

import * as ImagePicker from 'expo-image-picker';
import { BackArrow, BlankSpace, LockProfileIcon } from '../../../assets/SvgIcons/AllIcons';
import CommonHeader from '../../../Components/CommonHeader';
import { AccountPrivacy, GetUserRecordAsync, ReturnUserRecordAsync } from '../../Services/Authentication';

export default function AcoountPrivate ({navigation}) {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => {
      setIsEnabled(previousState => !previousState)
      Update()
    };
    Update=async()=>{
      // alert(!e)
      var CheckStatus=await AccountPrivacy(UserID)

      if(CheckStatus.error==false){
       GetUserRecordAsync(JSON.stringify(CheckStatus.user.fields) )
      }else{
        Toast.show(CheckStatus.error_msg,{position:Toast.position.TOP})
      }
    }
  
    const [UserID,GetUserID]=useState('')
   
    useEffect(()=>{
      GetUserInfo()
    },[])


    GetUserInfo=async()=>{
      var UserRecord=await ReturnUserRecordAsync()
   
    
     setIsEnabled(UserRecord[0].profile_private)
      GetUserID(UserRecord[4])
    }
  


    return (
      <ScrollView style={{flex:1,backgroundColor:'#fff'}}>
        <View style={{marginTop:20}}/>
        <CommonHeader navigation={navigation} Name={'Privacy'}/>

        <View style={{marginTop:50,}}>
           <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between',marginHorizontal:10}}>
               <View style={{flexDirection:'row',alignItems:'center'}}>
                <LockProfileIcon/>
                <Text style={{fontWeight:'bold',marginLeft:10,}}>Private Account</Text>
               </View>
               <View style={{marginRight:20}}>
               <Switch
                    trackColor={{ false: '#767577', true: '#FF9F0A' }}
                    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
                </View>
            </View>
        </View>
      
        
      </ScrollView>
    );
  
}
const styles=StyleSheet.create({
    text:{
        fontWeight:'700',
        color:'gray',
        marginLeft:20
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
