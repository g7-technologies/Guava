import React, { Component, useState ,useEffect,useContext,useRef} from 'react';
import { StyleSheet,View,FlatList,Alert, Text,Modal,TextInput,Image, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { AntDesign,Feather,FontAwesome5 } from '@expo/vector-icons';
import FeedsPost from '../../../Components/FeedsPost'
import { MessageIcon,SettingsIcon,SearchIcon,GuavaIconLogo } from '../../../assets/SvgIcons/AllIcons';
import RecentPeopleorBrandSearch from '../../../Components/RecentPeopleorBrandSearch';
import { LinearGradient } from 'expo-linear-gradient';
import { AddRecentSearches, BlockUser, DeleteMyPost, DeleteRecentSearches, GetAllConnectRequest, GetAllUserList, GetUserFriendPosts, PostReportTypes, RecentSearches, registerForPushNotificationsAsync, RemoveOtherPosts, RemoveOtherUser, ReturnUserRecordAsync, UpdateToken, UserReportTypes } from '../../Services/Authentication';
import { ActivityIndicator } from 'react-native-paper';
import { ImageBasePath } from '../../Services/BasePath';
import { useIsFocused } from "@react-navigation/native";
import { ThemeContext } from '../../../App';
import  AsyncStorage  from '@react-native-community/async-storage';
import { NotificationsBasePath } from '../../Services/BasePath';
import * as Notifications from 'expo-notifications';
// var id=''
function Dashboard ({navigation,props}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [Search, SearchBrandorName] = useState('');
  const [RecentSearch, GetRecentSearch] = useState([]);
  const [isLoading,SetisLoading]=useState(true)
  const [UserId,GetUser]=useState(0)
  const [UserFriends,GetUserFriends]=useState(null)
  const [Users,GetAllUser]=useState([])
  const [expopushtoken,setexpopushtoken]=useState(null)
  const Context=useContext(ThemeContext)
  const [Messagecount,SetMessageCount]=useState(0)

  const isFocused = useIsFocused();
  const [UserRportList,GetUserRportList]=useState([])
    const [UserPostList,GetUserPostList]=useState([])


    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    const LastresponseListener = useRef();

    const lastNotificationResponse = Notifications.useLastNotificationResponse();

    useEffect(() => {
      if (
        lastNotificationResponse &&
        lastNotificationResponse.notification.request.content.data.url &&
        lastNotificationResponse.actionIdentifier === Notifications.DEFAULT_ACTION_IDENTIFIER
      ) {
        console.log('Last notification response')
        console.log(lastNotificationResponse.notification);
      }
    }, [lastNotificationResponse]);
    useEffect(() => {
  
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        console.log('Received ')
        console.log(notification);
       
        setNotification(notification);
      });
  
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
       console.log('Response ')
        console.log(response);
      });

    
      return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }, []);
  

 const UserNavigate=(id)=>{
 
    if(id==UserId)
    {
      navigation.navigate('EditProfile')
    }else{
      navigation.navigate('OtherPersonProfile',{
        personid:id,
        Myid:UserId
       }
     )
    }
  }
   
  const RemoveSpecificResult=async(index,id)=>{  
   
    
    if(RecentSearch.length==1){
      GetRecentSearch([])
      return
    }
    RecentSearch.splice(index, 1);
    GetRecentSearch(RecentSearch) 
    await DeleteRecentSearches(id)
  }

  useEffect(()=>{
    GetUserReportList()
  },[])
  var ws;
    connection = (id) => {

  
    
     try{
     ws = new WebSocket(NotificationsBasePath+id+'/');
   
       ws.onopen = () => {
         console.log('Start Connectio notification');
         alert('Login Socket start')
       };
   
       ws.onmessage = e => {
         
         const data = JSON.parse(e.data);
         
         console.log('onmessage.........')
         console.log(data)
         if(data.type=='message_count'){
           //set message count
           let SetAllMessageRequest=Context[6]
           SetAllMessageRequest(data.count)
          
         }
         if(data.type=='post_notifications'){
           //set request count
          
           let SetAllConnectRequest=Context[5]

           SetAllConnectRequest(data.requests_count)
           //set notification count
           let SetAllNotification=Context[4]
           SetAllNotification(data.notifications_count)
           // set notification array
           let SetNotificationArray=Context[9]
           SetNotificationArray(data.notifications)
   
         }
         console.log(data)
        console.log('onmessage.........')
         
       };
       ws.onerror = e => {
         console.log('error',JSON.stringify(e));
      //  alert('error connection for id '+id)
       
   
       };
       ws.onclose = e => {
         console.log('onclose',  JSON.stringify(e));
      // connection(id)
        
         //  alert('close connection for id '+id)
       };
   
     } catch (error) {
       console.log(error);
       // Handle error
       return console.warn(error);
     }
   }
  const GetUserReportList=async()=>{
    var isloggedin=await AsyncStorage.getItem("userLoggedin")
   
    let UserRecord=await ReturnUserRecordAsync()
   try{
  
    if(isloggedin=="1"){     
      setTimeout(() => {
        connection(UserRecord[4])
        GetExpoToken(UserRecord[4])
      }, 10000);  

      }else if(isloggedin=="0"){
        
        // alert('user not login'+d)
          // connection(data[4])
      }


   let userReports= await UserReportTypes()
   let userPosts= await PostReportTypes()
  //  alert(JSON.stringify(userReports))

   GetUserRportList(userReports.data)
   GetUserPostList(userPosts.data)
   setTimeout(() => {
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
   }, 1000);
    

  }catch(e){
    alert(JSON.stringify(e))
    }
  }
  // useEffect(()=>{GetExpoToken()},[])
    
  const GetExpoToken=async(id)=>{
   let token =await registerForPushNotificationsAsync()
   

   setTimeout(async() => {
    
   
     let res=await UpdateToken(id,token)
     if(res.error==false){
      let SetAllMessageRequest=Context[6]
      let SetAllConnectRequest=Context[5]
      let SetAllNotification=Context[4]
      let SetNotificationArray=Context[9]
      SetAllMessageRequest(res.messages_count)
      SetAllNotification(res.notifications_count)
      SetAllConnectRequest(res.requests_count)
      SetNotificationArray(res.notifications)
     }

    //  var SetAllConnectRequest=Context[5]
    //  var SetAllNotification=Context[4]

  console.log('token')
    console.log(res)
  console.log('token')

     
    // alert(UserId+' '+token)
   }, 1000);
  }

  useEffect(()=>{
    if(isFocused)
    GetUserInfo()
  
 },[isFocused])


  
  const GetUserInfo=async()=>{
    var UserRecord=await ReturnUserRecordAsync()
    GetUser(UserRecord[4])
    // id=UserRecord[4]
    FriendsPost(UserRecord[4])
    var recentSearch=await RecentSearches(UserRecord[4])
   
    GetRecentSearch(recentSearch.searches)

  }


  const FriendsPost=async(id)=>{
   

    setTimeout(async() => {
      
    var Checkdata=await GetUserFriendPosts(id)
    
  console.log(Checkdata)
      if(Checkdata.error==false)
      {
        GetUserFriends(Checkdata.posts)
      
        SetisLoading(false)
        
      }else{
        SetisLoading(false)
      }
    }, 1000);
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

  const SearhUser=async(search)=>{
   
    SearchBrandorName(search)
    const AllUser=await GetAllUserList(UserId,search)
  
    GetAllUser(AllUser.users)
  }
  
  const AddToRecentSearch=async(id)=>{
   let recent= await AddRecentSearches(UserId,id)
   console.log(recent)
  }
    return (
      <View style={{flex:1,}}>
        <View style={{height:40,flexDirection:'row',alignItems:'center',justifyContent:'space-between',margin:20}}>
          <View>
            <GuavaIconLogo/>
          </View>
          <View style={{flexDirection:'row',alignItems:'center',width:120,justifyContent:'space-around'}}>
              <TouchableOpacity onPress={()=>navigation.navigate('Settings')}>
                <SettingsIcon/>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>
                {
                  // let SeenAllMessageRequest=Context[7]
                  // SeenAllMessageRequest(null)
                  navigation.navigate('Message')}}>
                <View>
                  {Context[8]>0?
                  <View style={StyleSheet.absoluteFill}>
                    <View style={{alignSelf:'flex-end',backgroundColor:'#FC9919',left:10,bottom:10,width: 22,height:22,borderRadius:20}}> 
                    <Text style={{textAlign:'center',top:2,fontWeight:'bold',color:'#fff',}}>{Context[8]}</Text>
                    </View>
                  </View>:null}
                <MessageIcon/>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>setModalVisible(true)} >
                <SearchIcon/>
              </TouchableOpacity>
          </View>
        </View>
        {isLoading?
        <ActivityIndicator/>  
        :
        <FlatList
          ListEmptyComponent={()=>{
            return(
            <View style={{height:Dimensions.get('window').height,justifyContent:'center',alignItems:'center'}}>
              <Image source={require('../../../assets/login_logo.png')} style={{width:150,height: 150,bottom:150,resizeMode:'contain'}}/>
              <Text style={{bottom:100,fontWeight:'700'}}>No Post Found</Text>
              <TouchableOpacity onPress={()=>setModalVisible(true)} style={{width:200}}>
                  <LinearGradient
                  colors={['#FC9919', '#F38645']}
                  style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:10,borderRadius:10}}
                  >
              
                  <View style={{flexDirection:'row',alignItems:'center'}}>
                    <AntDesign name="search1" size={24} color="#fff" />
                    <Text style={{color:'#fff'}}>  Search</Text>
                  </View>
                  <FontAwesome5 name="user-friends" size={24} color="#fff" />
              

                </LinearGradient>
              </TouchableOpacity>
            
            </View>
            )
          }}
         showsVerticalScrollIndicator={false}
          data={UserFriends}
          renderItem={({ item, index }) => (
            // <FeedsPost  BlockotherPerson={(m,o)=>BlockOtherUser(m,o)} RemoveOtherUserPost={(index,userwhoisblocking,userwhoisblocked,postid)=>RemoveOtherUserPosts(index,userwhoisblocking,userwhoisblocked,postid)}   RemoveMyPost={(i,m,p)=>RemovePost(i,m,p)}  ReportAboutUser={(m,o)=>ReportUser(m,o)}   item={item} Myid={UserId} index={index} navigation={navigation} postidis={item.pk} OtherUserid={item.author.pk}  UserPosts={UserPostList}    UserReports={UserRportList}   NavigateUser={(id)=>UserNavigate(id)}/>
            <FeedsPost BlockotherPerson={(m,o)=>BlockOtherUser(m,o)}  RemoveOtherUserPost={(index,userwhoisblocking,userwhoisblocked,postid,reportType,reason)=>RemoveOtherUserPosts(index,userwhoisblocking,userwhoisblocked,postid,reportType,reason)} RemoveMyPost={(i,m,p)=>RemovePost(i,m,p)} ReportAboutUser={(m,o,r,e)=>ReportUser(m,o,r,e)}  item={item} Myid={UserId} index={index} navigation={navigation} OtherUserid={item.author.pk} NavigateUser={(id)=>UserNavigate(id)}     UserPosts={UserPostList} postidis={item.pk}   UserReports={UserRportList}               />

          )}
        />
        }
      {modalVisible?
        <View style={styles.centeredView}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false)
            }}>
            <View style={styles.centeredView}>

              <View style={styles.modalView}>
              <AntDesign name="arrowleft" onPress={()=>setModalVisible(false)} size={24} color="#3A3A3C" />
                <View style={styles.SearchContainer}>
                    <AntDesign name="search1" size={24} color="#5B61B9" />
                    <TextInput autoFocus={modalVisible?true:false} onChangeText={(e)=>SearhUser(e)} placeholder="Search" placeholderTextColor="#9597AD" style={{paddingLeft:10,width:'100%',height:55}}/>
                </View>
                <View>
                {Search.length<1?
                  <View>
                    {RecentSearch==undefined?null:  RecentSearch.length<1?null:
                      <View style={styles.ClearHistoryContainer} >
                        <Text style={{color:'#3A3A3C',fontWeight:'bold',fontSize:18}}>Recent Search</Text>
                        <Text style={{color:'#C4C4C4'}}> - - - - - - - - - - - - - - - - - </Text>
                        <TouchableOpacity onPress={()=>GetRecentSearch([])} >
                          <Text style={{color:'#DB0000',fontWeight:'bold',fontSize:18}}>Clear All</Text>
                        </TouchableOpacity>
                      </View> 
                    }
                  </View>
                :null}
                </View>
                <View style={styles.SearchedHistory}>
                  {Search==undefined?null: Search.length>0?
                    <FlatList
                      
                      data={Users}
                      renderItem={({ item, index, separators }) => (
                        <>
                          <TouchableOpacity onPress={()=>{setModalVisible(false),
                          navigation.navigate('OtherPersonProfile',{
                             personid:item.id,
                          }),
                          AddToRecentSearch(item.id)
                          }} activeOpacity={0.9} key={index} style={{flexDirection:'row',marginTop:10,marginHorizontal:18,justifyContent:'space-between',alignItems:'center'}} > 
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Image source={{uri:ImageBasePath+item.image}} style={{width:50,height: 50,borderRadius:100}} />
                                <Text style={{marginLeft:10}}>{item.username}</Text>
                            </View>
                            <Feather name="arrow-up-right" size={24}color="#3A3A3C" />
                          </TouchableOpacity>
                          <View style={{borderWidth:0.4,borderColor:'gray',width:'90%',alignSelf:"center",marginVertical:5}} />
                        </>
                      )}
                    />
                    :
                    <View>
                    {RecentSearch==undefined?null: RecentSearch.length<1?
                    <View>
                      {/* <Text style={{textAlign:'center',color:'#d44325'}}>Recent Search history Empty</Text> */}
                    </View>
                    :
                    <View>
                      {
                        RecentSearch.map((item,index)=>{
                          return(
                            
                            <RecentPeopleorBrandSearch user={item} userkey={item.key} setModalVisible={(e)=>setModalVisible(e)} navigation={navigation} index={index} updateList={(index,id)=>{RemoveSpecificResult(index,id)}}/>      
                           
                          )
                        })
                      }
                    </View>
                    
                    }
                    </View>
                  }
                  {Platform.OS=='ios'?<View style={{height:240}}/>:null}
                  
                </View>     
                
              </View>
            </View>
          </Modal>

      
        </View>
        :null 
      }
       
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