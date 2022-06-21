import { StatusBar } from 'expo-status-bar';
import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View,Dimensions, TouchableOpacity,Image } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import CommonHeader from '../../../Components/CommonHeader';
import { ReturnUserRecordAsync, WalletDetail } from '../../Services/Authentication';
import { ImageBasePath } from '../../Services/BasePath';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function App({navigation}) {
  const [Wallet,GetWallet]=useState('')
  const [isLoading,SetisLoading]=useState(true)
  const [UserImage,GetUserImage]=useState('')

  useEffect(()=>{
    GetUserInfo()
   
},[])
  useEffect(()=>{
      GetUserInfo()
     
  },[])
  const GetUserInfo=async()=>{
      let id=await ReturnUserRecordAsync()
      GetTransactionHistory(id[4])
      GetUserImage(id[0].image)
  }
  const GetTransactionHistory=async(id)=>{

    let detail=await WalletDetail(id)
    GetWallet(detail.wallet.fields.amount)
   
    setTimeout(() => {
    SetisLoading(false)
        
    }, 1000);


  }


  return (
    <View style={styles.container}>
        {Platform.OS=='android'&&
      <View style={{marginTop:25}}/>}
        <CommonHeader navigation={navigation} Name={'Wallet'}/>


        <View style={{height:300,backgroundColor:'#f2f2f7',marginTop:windowHeight/8,alignItems:'center',margin:10,borderRadius:20}}>
        <View style={{borderRadius:100,borderWidth:10,bottom:50,borderColor:"#fff"}}>
        <Image source={{uri:ImageBasePath+UserImage}} style={{width:windowHeight/8,height:windowHeight/8,borderRadius:100,resizeMode:'cover'}}/>
        </View> 
            {/* <Image source={require('../assets/dummy.png')} style={{width:windowHeight/8,height:windowHeight/8,resizeMode:'contain',borderRadius:50,marginTop:-windowHeight/15,}}/> */}
            <Text style={{fontWeight:'bold',fontSize:17,marginTop:10}}>James Cadby</Text>
            <Text style={{fontSize:15,marginTop:20}}>Your available balance is</Text>
           {isLoading?
           <>
           <Text></Text>
           <ActivityIndicator color="#FF9F0A" size="small"/>
           </>
           :
            <Text style={{fontWeight:'bold',fontSize:30,marginTop:10}}>${Wallet}</Text>
            }
        </View>
        <View style={{flex:1,justifyContent:'flex-end',marginBottom:50}}>
            <TouchableOpacity onPress={()=>navigation.navigate('WidthDraw')} style={{borderRadius:30,padding:15,backgroundColor:'#fa9522',justifyContent:'center',alignItems:'center',marginTop:30,marginHorizontal:windowWidth/20,}}>
                  <Text style={{color:'white',fontSize:17}}>Transfer Funds</Text>
            </TouchableOpacity>
        </View>
  
       <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  header:{
   
    flexDirection:'row',
    alignItems:'flex-end',
    justifyContent:'space-between',
  }
});