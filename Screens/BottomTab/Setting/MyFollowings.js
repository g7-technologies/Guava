import React, { Component,useState } from 'react';
import { View,FlatList,TouchableOpacity,Image, Text,StyleSheet,TextInput } from 'react-native';
import { AntDesign,Feather } from '@expo/vector-icons';
import { ImageBasePath } from '../../Services/BasePath';
import PrivateSearch from '../../../Components/PrivateSearch'
export default function ({navigation,Followings}) {
  const [Follow, GetFollowing] = useState(Followings);
  const [AllFollowing, AllGetFollowing] = useState(Followings);

  
  const FilterUserArray = (param) => {
    
    var u =AllFollowing;
    var ara = [];
    for (var i = 0; i < u.length; i++) {
      var x = u[i].username.toUpperCase();
      if (x.match(param.toUpperCase())) {
        ara.push(u[i]);
      }
    }
    if (param.length == 0) {
      GetFollowing(AllFollowing)
    } else {
      GetFollowing(ara)
    }
  };
  return (
    <View style={{flex:1,backgroundColor:'#fff'}}>
       <PrivateSearch UserName={(u)=>FilterUserArray(u)}/>
      <FlatList           
        data={Follow}
        renderItem={({ item, index, separators }) => (
          <>
            <TouchableOpacity  onPress={()=>navigation.push('OtherPersonProfile',{personid:item.id})} activeOpacity={0.9} key={index} style={{flexDirection:'row',marginTop:10,marginHorizontal:18,justifyContent:'space-between',alignItems:'center'}} > 
              <View style={{flexDirection:'row',alignItems:'center'}}>
                  <Image source={{uri:ImageBasePath+item.image}} style={{width:60,height:60,borderRadius:100}} />
                  <Text style={{marginLeft:10}}>{item.username}</Text>
              </View>
              {/* <Feather name="arrow-up-right" size={24}color="#3A3A3C" /> */}
            </TouchableOpacity>
            <View style={{borderWidth:0.4,borderColor:'#E5E6F5',marginTop:10,width:'90%',alignSelf:'center'}}/>
          </>
        )}
      />

    </View>
    )
  
}

const styles=StyleSheet.create({
  SearchContainer:{
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
