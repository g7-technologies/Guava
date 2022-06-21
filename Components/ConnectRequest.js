import React, { useEffect, useState } from 'react';
import { Text, View,Dimensions,TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ConnectIcon } from '../assets/SvgIcons/AllIcons';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ConnectRequest  ({navigation,params,connceted,requested,ChangeReqestStatus})  {
   const [Connected,IsConnected]=useState(connceted) 
   const [Requested,IsRequested]=useState(requested) 
   

    return(
    <View >
        {Connected?
            <TouchableOpacity onPress={()=>{IsConnected(!Connected),ChangeReqestStatus(!Requested)}}>
                <LinearGradient
                    style={{width:windowWidth/3,height:40,borderRadius:5,borderWidth:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}
                    // Button Linear Gradient
                    colors={['#FC9919', '#F38645']}
                    >
                <Text style={{fontSize:15,color:'#fff'}}>Connected</Text>
                </LinearGradient>
            </TouchableOpacity>
            :
            <View style={{width:windowWidth/3,height:40,borderRadius:5,borderWidth:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
            {Requested?
            <TouchableOpacity onPress={()=>{IsRequested(!Requested),ChangeReqestStatus(!Requested)}} style={{width:windowWidth/3,height:40,borderRadius:5,borderWidth:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>

            <LinearGradient
                style={{width:windowWidth/3,height:40,borderRadius:5,borderWidth:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}
                // Button Linear Gradient
                colors={['#FC9919', '#F38645']}
                >
                    {/* {connceted? */}
                    <Text style={{fontSize:15,color:'#fff'}}>Request Send</Text>

                    {/* <Text style={{fontSize:15,color:'#fff'}}>Request send</Text> */}
                    {/* } */}
            </LinearGradient>
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={()=>{IsRequested(!Requested),ChangeReqestStatus(!Requested)}} style={{width:windowWidth/3,height:40,borderRadius:5,borderWidth:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                <ConnectIcon/>
                <Text style={{marginLeft:10,fontSize:15}}>Connect</Text>
            </TouchableOpacity>
            }
            </View>

           
        }
    </View>
   )
};


