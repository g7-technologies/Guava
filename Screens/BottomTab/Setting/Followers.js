import React ,{useState,useEffect, useRef}from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MyFollowings from './MyFollowings';
import MyFollowers from './MyFollowers';
import {View,Dimensions,Animated,ScrollView,Text} from 'react-native'
import { ReturnUserRecordAsync } from '../../Services/Authentication';
import CommonHeader from '../../../Components/CommonHeader';
import { useIsFocused } from '@react-navigation/core';
const Tab = createMaterialTopTabNavigator();
const Width=Dimensions.get('window').width

export default function Follower({navigation,route}) {
  console.log(route)
  const ref=React.useRef()
  const scrollX=React.useRef(new Animated.Value(0)).current
  
  return (
    <>
    <CommonHeader Name="Search User" backgroundColor="#fff" navigation={navigation}/>
    <View style={{width:'100%',flexDirection:'row',padding:10,backgroundColor:'#fff'}}>
      <View style={{width:'50%'}}>
        <Text style={{textAlign:'center',fontWeight:'bold'}}>Followers</Text>
      </View>
      <View style={{width:'50%'}}>
        <Text style={{textAlign:'center'}}>Following</Text>
      </View>
     
    </View>
    <Animated.View style={{borderWidth:2,borderColor:'#FF9F0A',width:'50%',transform:[{
      translateX:scrollX.interpolate({
        inputRange:[0,1],
        outputRange:[0,Width]
      })
    
    }
    ]}} />

    {/* <View style={{backgroundColor:'#3A3A3C'}}> */}
    {/* </View> */}

    <ScrollView  onScroll={Animated.event(
        [
          {nativeEvent: 
            {contentOffset: 
              {
                x:scrollX
              }
            }
          }
        ],
       
        //  {listener: (event) => console.log(event)}, // Optional async listener
      )}
      
        ref={ref}  showsHorizontalScrollIndicator={false}  horizontal={true}>
     

      <View style={{width:Width}}>
        <MyFollowers navigation={navigation} Followers={route.params.Followers} />
      </View>
      <View style={{width:Width}}>
        <MyFollowings navigation={navigation} Followings={route.params.Followings}/>
      </View>
    </ScrollView>
    </>
  );
}