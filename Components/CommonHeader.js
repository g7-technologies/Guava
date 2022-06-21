import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {AntDesign} from '@expo/vector-icons'; 
import { BackArrow, BlankSpace, LikeIcon } from '../assets/SvgIcons/AllIcons';
 export default function CommonHeader  ({Name,navigation,backgroundColor})  {
    return(
    <View style={{flexDirection:'row',backgroundColor:backgroundColor,marginHorizontal:10,justifyContent:'space-between'}}>  
        <TouchableOpacity onPress={()=>navigation.goBack(null)}>
        <BackArrow/>
        </TouchableOpacity>
        <Text style={{fontWeight:'bold'}}>{Name}</Text>
        <BlankSpace/>
    </View>
   )
};


