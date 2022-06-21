import  React,{useState,useEffect} from 'react';
import { StyleSheet,View,Text,Modal,TextInput,TouchableOpacity ,FlatList} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {  AntDesign} from '@expo/vector-icons';
import HomePage from './HomePage';
import Settings from '../../BottomTab/Setting/Setting_Dashboard'
import MessageList from './MessageList';
import OtherPersonProfile from './OtherPersonProfile';
import OtherPersonConnectProfile from './OtherPersonConnectProfile'
import Connect from '../ConnectPages/Connect_Dashboard'
import Chat from '../Feeds/Chat'
import Picture_Comment from '../Feeds/Comment'
import PartnerShipWith from './PartnerShipWith';
import ReplyComment from './Comment';
import EditProfile from '../Setting/EditProfile'
import Reply from './Reply'
import GuavaPoints from '../Setting/GuavaPoints';
import Transaction from '../Setting/Transactions';
import CreatePinnedPost from './CreatePinnedPost'
import PostPage from './PostPage'
import TakePhoto from './TakePicture'

const Stack = createStackNavigator();

import Followers from '../Setting/Followers'

function MyStack({navigation,route}) {

  return (
    
    <Stack.Navigator >
      <Stack.Screen name="Home"   component={HomePage} options={{headerShown:false}}/>
      <Stack.Screen name="Message" component={MessageList} options={{headerShown:false}}/> 
      <Stack.Screen name="Chat"   component={Chat} options={{headerShown:false}}/>
      <Stack.Screen  name="Settings" component={Settings} options={{headerShown:false}}/>
      <Stack.Screen  name="Connect" component={Connect} options={{headerShown:false}}/>
      <Stack.Screen name="OtherPersonProfile" component={OtherPersonProfile} options={{headerShown:false}}/> 
      <Stack.Screen name="OtherPersonConnectProfile" component={OtherPersonConnectProfile} options={{headerShown:false}}/> 
      <Stack.Screen name="PartnerShips" component={PartnerShipWith} options={{headerShown:false}}/> 
      <Stack.Screen name="ReplyComment" component={ReplyComment} options={{headerShown:false}}/> 
      <Stack.Screen name="EditProfile" component={EditProfile} options={{headerShown:false}}/> 
      <Stack.Screen name="Followers" component={Followers} options={{headerShown:false}}/>
      <Stack.Screen name="PicComment" component={Picture_Comment}  options={{headerShown:false}}  />
      <Stack.Screen name="Reply" component={Reply} options={{headerShown:false}}  />
      <Stack.Screen name="GuavaPoints" component={GuavaPoints} options={{headerShown:false}}  />
      <Stack.Screen name="Transaction" component={Transaction} options={{headerShown:false}}  />
      <Stack.Screen name="CreatePinnedPost" component={CreatePinnedPost} options={{headerShown:false}}  />
      <Stack.Screen name="PostPage" component={PostPage} options={{headerShown:false}}  />
      <Stack.Screen name="TakePhoto" component={TakePhoto} options={{headerShown:false}}/>
     
      
      

    </Stack.Navigator>
    

  );


    
  
  
 
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: { 
    backgroundColor: 'white',
    width:'100%',
    height:'100%',
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
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
  ClearHistoryContainer:{
    flexDirection:'row',
    alignItems:'center',
    alignSelf:'center'
  },
  SearchedHistory:{
      flex:1,marginTop:10
  }
  
});
export default MyStack