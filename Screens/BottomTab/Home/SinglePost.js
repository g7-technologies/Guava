import React, { Component, useState ,useEffect,useContext} from 'react';
import { StyleSheet,View,FlatList,Alert, Text,Modal,TextInput,Image, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { AntDesign,Feather,FontAwesome5 } from '@expo/vector-icons';
import FeedsPost from '../../../Components/FeedsPost'
import { MessageIcon,SettingsIcon,SearchIcon,GuavaIconLogo } from '../../../assets/SvgIcons/AllIcons';
import RecentPeopleorBrandSearch from '../../../Components/RecentPeopleorBrandSearch';
import { LinearGradient } from 'expo-linear-gradient';
import { AddRecentSearches, BlockUser, DeleteMyPost, DeleteRecentSearches, GetAllConnectRequest, GetAllUserList, GetUserFriendPosts, PostReportTypes, RecentSearches, registerForPushNotificationsAsync, RemoveOtherPosts, RemoveOtherUser, ReturnUserRecordAsync, SinglePost, UpdateToken, UserReportTypes } from '../../Services/Authentication';

var id=''
function Dashboard ({navigation,props,route}) {

    const [isLoading,SetisLoading]=useState(true)
    const [UserId,GetUser]=useState('')
    const [MySinglePost,GetMySinglePost]=useState([])

    const [UserFriends,GetUserFriends]=useState([])
    const [UserRportList,GetUserRportList]=useState([])
    const [UserPostList,GetUserPostList]=useState([])
    const UserNavigate=(id)=>{
        if(id==UserId)
        {
            navigation.navigate('EditProfile')
        }else{
            navigation.navigate('OtherPersonProfile',{
                personid:id,
                Myid:UserId
            })
        }
    }
   
   
    const GetSinglePost=async()=>{
      // alert(route.params.postid+''+route.params.Myid)
        let result=await SinglePost(route.params.postid,route.params.Myid)
        // console.log(result)
        alert(JSON.stringify(result))

        GetMySinglePost(result.post)
        GetUserFriends(result.post)

        // UserFriends.push(result.posts)
    }

    useEffect(()=>{
        GetUserReportList()
    },[])
    const GetUserReportList=async()=>{
      GetSinglePost()
        let user=await ReturnUserRecordAsync()
        GetUser(user[4])
        let userReports= await UserReportTypes()
        let userPosts= await PostReportTypes()

        GetUserRportList(userReports.data)
        GetUserPostList(userPosts.data)
        GetUserRportList((prevState)=>{
            prevState.push({
            "id":0,
            "name":'Other',
            "status":true
            })
            return [...prevState]
            // return [remove]
        })
        GetUserPostList((prevState)=>{
            prevState.push({
            "id":0,
            "name":'Other',
            "status":true
            })
            return [...prevState]
            // return [remove]
        })
        SetisLoading(false)
    }


    const RemovePost= async (index,m,p)=>{
      try{
        await DeleteMyPost(m,p)
        
        GetUserFriends((prevState)=>{
          prevState.splice(index,1)
          return [...prevState]
        })
      }catch(e){
        Toast.show('Some Error occure ')
      }
    }



    const RemoveOtherUserPosts=async(index,userwhoisblocking,userwhoisblocked,postid,reportType,reason)=>{    
      try{
        await RemoveOtherPosts(userwhoisblocking,postid,reportType,reason)
        
        GetUserFriends((prevState)=>{
          prevState.splice(index,1)
          return [...prevState]
        })
      }catch(e){
        Toast.show('Some Error occure '+e)
      }
    }

    const BlockOtherUser=async(m,o)=>{
      //After a user is removed this will be called

      try{
      await BlockUser(m,o)
        SetisLoading(true)
        await  FriendsPost(m)
      
      }catch(e){
        Toast.show('Some Error occure ')
      }
    }


    const ReportUser=async(my_id,otheruser_id,report_type,reason)=>{
      try{
      let r= await RemoveOtherUser(my_id,otheruser_id,report_type,reason)
      console.log( r)
      }catch(e){
        Toast.show('Some Error occure '+e)
      }
    
    }

 
    return (
      <View style={{flex:1,}}>
        <View style={{height:40,flexDirection:'row',alignItems:'center',justifyContent:'space-between',margin:20}}>
          <View>
            <GuavaIconLogo/>
          </View>  
        </View>
        <View style={{flex:1}}>
          <FlatList
          
              showsVerticalScrollIndicator={false}
              data={MySinglePost}
              renderItem={({ item, index }) => (
              
                  // <FeedsPost  BlockotherPerson={(m,o)=>BlockOtherUser(m,o)} RemoveOtherUserPost={(index,userwhoisblocking,userwhoisblocked,postid)=>RemoveOtherUserPosts(index,userwhoisblocking,userwhoisblocked,postid)}   RemoveMyPost={(i,m,p)=>RemovePost(i,m,p)}  ReportAboutUser={(m,o)=>ReportUser(m,o)}   item={item} Myid={UserId} index={index} navigation={navigation} postidis={item.pk} OtherUserid={item.author.pk}  UserPosts={UserPostList}    UserReports={UserRportList}   NavigateUser={(id)=>UserNavigate(id)}/>
                    <FeedsPost BlockotherPerson={(m,o)=>BlockOtherUser(m,o)}  RemoveOtherUserPost={(index,userwhoisblocking,userwhoisblocked,postid,reportType,reason)=>RemoveOtherUserPosts(index,userwhoisblocking,userwhoisblocked,postid,reportType,reason)} RemoveMyPost={(i,m,p)=>RemovePost(i,m,p)} ReportAboutUser={(m,o,r,e)=>ReportUser(m,o,r,e)}  item={item} Myid={UserId} index={index} navigation={navigation} OtherUserid={item.author.pk} NavigateUser={(id)=>UserNavigate(id)}     UserPosts={UserPostList} postidis={item.pk}   UserReports={UserRportList}               />
                  // <Text>{item.author.fields.username}</Text>
              )}
          />
        </View>
      </View>
    );
  
}

export default Dashboard;


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