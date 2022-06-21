import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,Dimensions, TouchableOpacity,Image,TextInput } from 'react-native';
import { Entypo } from '@expo/vector-icons'; 



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function Post() {
  return (
  
        <View>
            <View style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
                {/* <Image source={require('../../assets/dummy.png')} style={{width:60,height:60,resizeMode:'cover',marginLeft:windowWidth/20,borderWidth:2,borderColor:'#ffa519',borderRadius:50}}/> */}
                <Text style={{marginLeft:windowWidth/40,fontWeight:'bold',fontSize:17,flex:1}}>James Cadby</Text>
                <Entypo style={{marginRight:windowWidth/30,}} name="dots-three-vertical" size={24} color="black" />
            </View>
            <View style={{marginTop:10,marginLeft:windowWidth/15}}>
                <Text>Food Foundations!!</Text>
            </View>
            <View style={{marginTop:10}}>
                {/* <Image source={require('../../assets/dummy2.png')} style={{width:windowWidth,height:windowHeight/1.8,resizeMode:'cover'}}/> */}
            </View>
            <View style={{flexDirection:'row',marginTop:10,paddingHorizontal:windowWidth/20}}>
                <View style={{flex:1,flexDirection:'row'}}>
                    {/* <Image source={require('../../assets/like.png')} style={{width:25,height:25,resizeMode:'contain'}}/>
                    <Image source={require('../../assets/comment.png')} style={{width:20,height:20,resizeMode:'contain',marginLeft:15}}/>
                    <Image source={require('../../assets/tags.png')} style={{width:20,height:20,resizeMode:'contain',marginLeft:15}}/> */}
                </View>

                <View style={{flexDirection:'row'}}>
                    <Text style={{color:'#95959a',fontWeight:'bold'}}>15 </Text>
                    <Text style={{color:'#95959a'}}>likes </Text>
                    <Text style={{color:'#95959a',fontWeight:'bold'}}>.10 </Text>
                    <Text style={{color:'#95959a'}}>comments</Text>
                    <Text style={{color:'#95959a',fontWeight:'bold'}}>.5 </Text>
                    <Text style={{color:'#95959a'}}>shares</Text>
                </View>
            </View>
        </View>

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
