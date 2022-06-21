// import React, { Component } from 'react';
// import { View,Dimensions, Text,Image } from 'react-native';
// import { LikeIcon } from '../../../assets/SvgIcons/AllIcons';
// import CommonHeader from '../../../Components/CommonHeader';
// import LikePost from '../../../Components/LikePost';
// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

// export default function Picture_Comment ({navigation}) {



//   return (
//     <View style={{flex:1,backgroundColor:'#fff'}}>
//       <CommonHeader navigation={navigation} Name={'Comments'}/>
//       <View style={{flexDirection:'row',alignItems:'center',marginLeft:10,marginVertical:10,justifyContent:'space-between',marginHorizontal:10}}>
//         <View style={{flexDirection:'row',alignItems:'center'}}>
//         <Image source={{uri:"https://images.pexels.com/photos/3147528/pexels-photo-3147528.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"}} style={{width:windowHeight/12,height:windowHeight/12,borderRadius:100,resizeMode:'cover'}}/>
//         <View style={{marginLeft:5}}>
//           <Text style={{fontWeight:'bold'}}>James Cadby</Text>
//           <Text style={{marginTop:5}}>why did the chicken cross the road?</Text>
//         </View>
//         </View>
//         <LikePost/>
//       </View>
//       <View style={{flexDirection:'row',marginLeft:70,justifyContent:'space-between'}}>
//         <View style={{flexDirection:'row'}}>
//           <Text style={{color:'#8E8E93'}}>235 Likes</Text>
//           <Text onPress={()=>navigation.navigete('PicComment')} style={{marginHorizontal:10,color:'#FF9F0A'}}>Reply</Text>
//           <Text style={{color:'#8E8E93'}}>23 Replies</Text>
//         </View>
//         <Text style={{marginRight:15,color:'#8E8E93'}}>1h</Text>
//       </View>
     
//     </View>
//   );
  
// }
