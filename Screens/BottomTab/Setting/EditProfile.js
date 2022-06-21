import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect ,useMemo,useState} from 'react';
import { StyleSheet, Text, View,Dimensions,FlatList, TouchableOpacity,Image,TextInput, ScrollView, Platform,  } from 'react-native';
import { AntDesign,FontAwesome5 } from '@expo/vector-icons'; 
import FeedsPost from '../../../Components/FeedsPost'
import {BackArrow, FeedImage} from '../../../assets/SvgIcons/AllIcons'
import { BlockUser, DeleteMyPost, GetFollowerRecordAsync, GetFollowingRecordAsync, GetMyPosts, GetOtherUserInfo, GetUserRecordAsync, PostReportTypes, RemoveOtherPosts, RemoveOtherUser, ReturnUserRecordAsync, UserReportTypes} from '../../Services/Authentication';
import { useIsFocused } from "@react-navigation/native";
import { ImageBasePath } from '../../Services/BasePath';
import { LinearGradient } from 'expo-linear-gradient';
import Toast from 'react-native-tiny-toast';
import {ActivityIndicator} from 'react-native-paper'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function App({navigation}) {
    const [Follower, GetFollower] = useState([]);
    const [Following, GetFollowing] = useState([]);
    const [user,GetUser]=useState('')
    const [UserID,GetUserID]=useState('')
    const [UserRportList,GetUserRportList]=useState([])
    const [UserPostList,GetUserPostList]=useState([])
    const [isLoading,SetisLoading]=useState(true)
    const [UserPosts,GetUserPosts]=useState([])
    const isFocused = useIsFocused();

  
    useEffect(()=>{
       if(isFocused)
       GetUserInfo()

   
    },[isFocused])
    
   
    useEffect(()=>{
      GetUserReportList()
    },[])
    const GetUserReportList=async()=>{
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
    }
    
    const  GetUserInfo=async()=>{   
      var UserRecord=await ReturnUserRecordAsync()
      GetFollower( UserRecord[1])
      GetFollowing( UserRecord[2])
      GetUser(UserRecord[0])
  

      GetUserID(UserRecord[4])
      var CheckData=await GetOtherUserInfo(0,UserRecord[4])

      GetFollowerRecordAsync(JSON.stringify(CheckData.followers))
      GetFollowingRecordAsync(JSON.stringify(CheckData.followings))
      GetUserRecordAsync(JSON.stringify( CheckData.user.fields))
      GetFollower( CheckData.followers)
      GetFollowing( CheckData.followings)
     
      GetUser(CheckData.user.fields)
   
      var myposts=await GetMyPosts(0,UserRecord[4])
      GetUserPosts(myposts.posts)
      SetisLoading(false)
    }

    const UserNavigate=(id)=>{  
      if(id==UserID)
      {
        navigation.push('EditProfile')
      }else if(id==route.params.personid){
          
      }else{
          
        navigation.push('OtherPersonProfile',{
          personid:id,
          
          }
        )
      }
    }
    const RemoveOtherUserPosts=async(index,userwhoisblocking,userwhoisblocked,postid,reportType,reason)=>{    
      try{
        await RemoveOtherPosts(userwhoisblocking,postid,reportType,reason)
        
        GetUserPosts((prevState)=>{
          prevState.splice(index,1)
          return [...prevState]
        })
      }catch(e){
        Toast.show('Some Error occure '+e)
      }
    }

    const RemovePost= async (index,m,p)=>{
      try{
        await DeleteMyPost(m,p)
        
        GetUserPosts((prevState)=>{
          prevState.splice(index,1)
          return [...prevState]
        })
      }catch(e){
        Toast.show('Some Error occure ')
      }
    }

    const BlockOtherUser=async(m,o)=>{
      //After a user is removed this will be called

      try{
       await BlockUser(m,o)
        SetisLoading(true)
        await GetUserInfo()
       
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
    <View style={styles.container}>
      {Platform.OS=='android'&&
     
      <View style={{marginTop:25}}/>}
        <View style={styles.header}>
            <TouchableOpacity onPress={()=>navigation.goBack(null)} style={{padding:5,margin:10}}>
            <BackArrow/>
            </TouchableOpacity>
            <Text style={{padding:10,fontWeight:'bold',marginRight:20}}>Profile</Text>
            <TouchableOpacity>
                {/* <Entypo style={{marginRight:10,paddingBottom:5}} name="dots-three-vertical" size={24} color="black" /> */}
            </TouchableOpacity>
        </View>

     <ScrollView contentContainerStyle={{paddingBottom:20}}>
            <View style={{marginHorizontal:windowHeight/60,}}>
                <View style={{marginTop:10,flexDirection:'row',alignItems:'center'}}>
                    <Image source={{uri:ImageBasePath+user.image}} style={{width:windowHeight/8,height:windowHeight/8,resizeMode:'cover',borderRadius:100}}/>
                    <View style={{flex:1,flexDirection:'row',justifyContent:'space-evenly'}}>
                       
                        <TouchableOpacity onPress={()=>navigation.navigate('Followers',{
                            'Followers':Follower,
                            'Followings':Following
                        })} style={{alignItems:'center'}}>
                            <Text style={{fontWeight:'bold',fontSize:17}}>{Follower.length}</Text>
                            <Text>Followers</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>navigation.navigate('Followers',{
                            'Followers':Follower,
                            'Followings':Following
                        })} style={{alignItems:'center'}}>
                            <Text style={{fontWeight:'bold',fontSize:17}}>{Following.length}</Text>
                            <Text>Following</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <Text style={{fontWeight:'bold',marginLeft:10,marginTop:5,fontSize:15}}>{user.username}</Text>
                    <Text style={{marginLeft:10,marginTop:5,fontSize:15}}>Welcome!!!</Text>
                    <Text style={{marginLeft:10,marginTop:5,fontSize:15}}>{user.bio}</Text>
                    <Text style={{marginLeft:10,marginTop:10,color:'#4493f9'}}>{user.email}</Text>
                    {/* <Text>{ImageBasePath}</Text> */}
                </View>
                <View style={{flexDirection:'row',marginTop:20,justifyContent:'space-evenly'}}>
                    <TouchableOpacity onPress={()=>navigation.navigate('EditProfile')} style={{width:windowWidth/1.4,height:40,borderRadius:5,borderWidth:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                        <AntDesign name="edit" size={30} color="black" />
                        <Text style={{marginLeft:10,fontSize:15}}>Edit Profile</Text>
                    </TouchableOpacity>
                    
                </View>
                <View style={{height:windowHeight/15,elevation:12,borderRadius:10,shadowOffset:{width:1,height:1},shadowOpacity:0.2,justifyContent:'center',alignItems:'center',backgroundColor:'#fff',marginTop:20,flexDirection:'row',}}>
                 <FeedImage/>       
                </View>
        
            

            </View>
            {/* {
              UserPosts.map((item,index)=>{
                return(
                  
                  <FeedsPost  RemovePostFromIndex={(i,m,p)=>RemovePost(i,m,p)}  item={item} Myid={UserID} index={index} navigation={navigation} OtherUserid={item.author.pk} NavigateUser={(id)=>UserNavigate(id)}/>
                        
                  
                )
              })
            } */}
            {isLoading?
            <View>
              <Text style={{marginVertical:50,textAlign:'center',fontWeight:'bold'}}>Please wait getting latest record</Text>
              <ActivityIndicator color={'#FF9F0A'} size="large"/>
              
              </View>
              :
            <FlatList
            
              ListEmptyComponent={()=>{
                return(
                <View style={{justifyContent:'center',alignItems:'center'}}>
                  <Text style={{marginVertical:50,fontWeight:'700'}}>No Post Found</Text>
              
                </View>
                )
              }}
              showsVerticalScrollIndicator={false}
              data={UserPosts}
              renderItem={({ item, index }) => (
              
                <FeedsPost BlockotherPerson={(m,o)=>BlockOtherUser(m,o)}  RemoveMyPost={(i,m,p)=>RemovePost(i,m,p)} RemoveOtherUserPost={(index,userwhoisblocking,userwhoisblocked,postid,reportType,reason)=>RemoveOtherUserPosts(index,userwhoisblocking,userwhoisblocked,postid,reportType,reason)} ReportAboutUser={(m,o,r,e)=>ReportUser(m,o,r,e)}  item={item} Myid={UserID} index={index} navigation={navigation} OtherUserid={item.author.pk} NavigateUser={(id)=>UserNavigate(id)}     UserPosts={UserPostList} postidis={item.pk}   UserReports={UserRportList}               />
              
              )}
            />}

        </ScrollView> 
          

       
  
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
  },

});
