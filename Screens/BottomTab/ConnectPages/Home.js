import { StatusBar } from 'expo-status-bar';
import React, { Component, useEffect, useState,useContext } from 'react';
import { StyleSheet, FlatList,Text, View,Dimensions, TouchableOpacity,Image,TextInput } from 'react-native';
import { AntDesign,Feather ,Entypo,SimpleLineIcons} from '@expo/vector-icons'; 
import { GuavaIconLogo } from '../../../assets/SvgIcons/AllIcons';
import { ScrollView } from 'react-native-gesture-handler';
import AcceptorRejectProposal from '../../../Components/AcceptorRejectProposal';
// import {AnimatedLayout} from 'react-native-reanimated'
import { ThemeContext } from '../../../App';
import { useIsFocused } from "@react-navigation/native";
import { AllBrnads, AllPartnershipRequest, PartnershipAccept, PartnershipReject, RetriveBrands, RetrivePartnershipRequest, ReturnUserRecordAsync, StoreBrands, StorePartnershipRequest } from '../../Services/Authentication';
import { ImageBasePath } from '../../Services/BasePath';
import { ActivityIndicator } from 'react-native-paper';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function  App ({navigation}) {

const [User,GetUser]=useState('')
const [Requests,GetAllRequests]=useState([])
const [UserID,GetUserID]=useState('')
const [isLoading,SetisLoading]=useState(true)
const [Brands,GetBrands]=useState([])
const [BrandsCount,GetBrandsCount]=useState([])
const [GetBusinessImage,SetBusinessImage]=useState('')
const [setBrands,SetBrands]=useState([])

const [status,GetStstus]=useState(false)



const isFocused = useIsFocused();
  
useEffect(()=>{
   if(isFocused)
 
  GetUserRecord()
},[isFocused])
useEffect(()=>{
  GetUserRecord()
},[status])


const GetUserRecord=async()=>{
  var UserRecord=await ReturnUserRecordAsync()
  let RetrivePartnerships=await RetrivePartnershipRequest()
  if(JSON.parse(RetrivePartnerships)!=null || JSON.parse(RetrivePartnerships)!=undefined){
    GetAllRequests( JSON.parse(RetrivePartnerships) ) 
    SetisLoading(false)
  }
  
  // alert(JSON.stringify(UserRecord))
  GetUser(UserRecord[0])
  GetUserID(UserRecord[4])
  SetBusinessImage(UserRecord[0].business_image?UserRecord[0].business_image:UserRecord[0].image)

  const brand=await RetriveBrands()

  let setbrand=JSON.parse(brand)
  SetBrands(setbrand)
  //----------->>>>>>>>>>> GetBrands(brand)
  GetAllBrands(UserRecord[4])
  PartnershipRequest(UserRecord[4])
}
const Context=useContext(ThemeContext)
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', (e) => {
 
  var SeenAllConnectRequest=Context[3]
  SeenAllConnectRequest()

    
    });

    return unsubscribe;
  }, [navigation]);

  const PartnershipRequest=async (id)=>{
    let result=await AllPartnershipRequest(id)
    GetAllRequests(result.requests) 
    StorePartnershipRequest(JSON.stringify( result.requests))
   
   
    SetisLoading(false)
   

  }

  const UpdateList=async(e,s,id)=>{
  GetStstus(s)
  let oldBrandsLength=BrandsCount
    if(s){
      try{
      let accept=await PartnershipAccept(id)
      
      let AcceptedPerson=Requests[index]
      GetBrandsCount(oldBrandsLength+1)
      
      console.log('accepted')
      console.log(accept)
    }catch(e){
      GetBrandsCount(oldBrandsLength-1)
    }
    }else{
    let reject= await PartnershipReject(id)
    console.log('Rejected')
    console.log(reject)
    }
 
      Requests.splice(e,1)
      StorePartnershipRequest(JSON.stringify(Requests))
      GetAllBrands(UserID)
  }

  const GetAllBrands=async(id)=>{
  //  let brand=await RetriveBrands()
  //  let setbrand=JSON.parse(brand)
  //  GetBrands(setbrand)
    let b=await AllBrnads(id)
    GetBrands(b.brands)
    let brandslength=b.brands
    GetBrandsCount(brandslength.length)
    StoreBrands(JSON.stringify(b.brands) )
    SetBrands(b.brands)
    
    // console.log(b.brands)
  }
  // useEffect(()=>{
  //   alert(RemoveItem)
  //   if(RemoveItem!=null){
  //     alert(RemoveItem)
  //     dataSet.splice(RemoveItem,1)
  //     GetdataSet(dataSet)
  //   }
  // },[dataSet])
 
   
    
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
          <View style={styles.header}>
              <TouchableOpacity style={{paddingVertical:10}}>
                  <GuavaIconLogo/>
              </TouchableOpacity>
          </View>

          <View style={{marginHorizontal:windowHeight/40,}}>
              <View style={{marginTop:10}}>
              <Image source={{uri:ImageBasePath+GetBusinessImage}} style={{width:windowHeight/8,height:windowHeight/8,borderRadius:100,resizeMode:'cover'}}/>

                  {/* <Image source={require('../assets/dummy.png')} style={{width:windowHeight/8,height:windowHeight/8,resizeMode:'cover'}}/> */}
                  <Text style={{fontWeight:'bold',marginLeft:10,marginTop:5,fontSize:15}}>{User.business_name?User.business_name: User.name}</Text>
                  <Text style={{marginLeft:10,marginTop:5,fontSize:15}}>{User.business_description?User.business_description:User.bio}</Text>
                  {/* <Text style={{marginLeft:10,marginTop:5,fontSize:15}}>Artist</Text>
                  <Text style={{marginLeft:10,marginTop:5,fontSize:15}}>Musician</Text> */}
                  <Text style={{fontWeight:'bold',marginLeft:10,marginTop:10,color:'#4493f9',fontSize:15}}>{BrandsCount}   Partnerships</Text>
              </View>
              <View style={{flexDirection:'row',marginTop:20,justifyContent:'space-evenly'}}>
                  <TouchableOpacity onPress={()=>navigation.navigate('EditProfile')} style={{width:windowWidth/2,height:40,borderRadius:5,borderWidth:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                      <AntDesign name="edit" size={30} color="black" />
                      <Text style={{marginLeft:10,fontSize:15}}>Edit Profile</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>navigation.navigate('PartnerShip',{
                    brands:setBrands
                  })} style={{width:windowWidth/3,height:40,borderRadius:5,borderWidth:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                      <SimpleLineIcons name="diamond" size={24} color="black" />
                      <Text style={{marginLeft:10,fontSize:15}}>Brands</Text>
                  </TouchableOpacity>
              </View>

           
              {isLoading?
              <View style={{marginTop:50,alignItems:'center'}}>
                <View style={{flexDirection:'row'}}>
                <Text style={{fontWeight:'700'}}>Searching    </Text>
                <ActivityIndicator/>
                </View>
              </View>:
             <View>
               {Requests.length<1?
               <View style={{marginTop:50,alignItems:'center'}}>
                 <Image style={{width:150,height:150}} source={require('../../../assets/Aggrement.png')}/>
                 <Text style={{color:'gray'}}>No Partnership Requests</Text>
               </View>:
               <View>
              {

                Requests.map((item,index)=>{
                  return(
                    <AcceptorRejectProposal Myid={UserID} item={item} navigation={navigation} index={index} updateList={(e,s,id)=>{UpdateList(e,s,id)}}/>
                  )
                })
              }</View>}
              </View>}
              
          </View>
            

        
    
        <StatusBar style="auto" />
      </ScrollView>
    );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  header:{
    height:windowHeight/8,
    flexDirection:'row',
    alignItems:'flex-end',
    justifyContent:'space-between',
    paddingHorizontal:20,
  },

});