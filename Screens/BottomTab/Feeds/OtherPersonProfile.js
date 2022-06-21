import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text,Modal,FlatList,TouchableOpacity, View,Dimensions,Image,TextInput, ScrollView } from 'react-native';
import { AntDesign,FontAwesome5 } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';
import FeedsPost from '../../../Components/FeedsPost'
import Follow from '../../../Components/Follow';
import CommonHeader from '../../../Components/CommonHeader';
import { BlockUser, CreateGroup, DeleteMyPost, Followup, GetMyPosts, GetOtherUserInfo, PostReportTypes, RemoveOtherPosts, RemoveOtherUser, ReturnUserRecordAsync, UserReportTypes } from '../../Services/Authentication';
import { ActivityIndicator } from 'react-native-paper';
import { ImageBasePath } from '../../Services/BasePath';
import { useIsFocused } from "@react-navigation/native";



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function App({navigation,route}) {
    const [User,GetUser]=useState({fields:{bio:'',email:'',username:''}})
    const [UserPosts,GetUserPosts]=useState([])
    const [UserFollower,GetUserFollower]=useState([])
    const [UserFollowing,GetUserFollowing]=useState([])
    const [IsFollowing,GetIFollowing]=useState(false)
    const [isLoading,SetisLoading]=useState(true)
    const [Myid,GetMyid]=useState(route.params.Myid)
    const [MyCoins,GetMyCoins]=useState(0)
    const [OtherUserCoins,GetOtherUserCoins]=useState(0)
    const [CoinmodalVisible, setCoinModalVisible] = useState(false);
    const [ProfilePrivate,SetProfilePrivate]=useState(false)
    const [UserRportList,GetUserRportList]=useState([])
    const [UserPostList,GetUserPostList]=useState([])
    const [PartnershipConnected,UserPartnerShipConnected]=useState(false)
    const [PartnershipRequested,UserPartnerShipRequested]=useState(false)
    const [Reviews,UserReviews]=useState(false)

    const isFocused = useIsFocused();
const [GetBusinessImage,SetBusinessImage]=useState('')


     const GetUserDetail=async()=>{
        var data=await ReturnUserRecordAsync()
        GetMyid(data[4])
        GetMyCoins(data[0].coins)
       setTimeout(() => {
        GetOtherUserDetail(data[4])
       }, 500);
       
        
    }

    const UserNavigate=(id)=>{  
      if(id==Myid)
      {
        navigation.navigate('EditProfile')
      }else if(id==route.params.personid){
          
      }else{
          
        navigation.push('OtherPersonProfile',{
          personid:id,
          
          }
        )
      }
    }
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
    
    useEffect(()=>{
        if(isFocused)
       
        GetUserDetail()
     },[isFocused,])
    

    const GetOtherUserDetail=async(id)=>{
        var CheckData=await GetOtherUserInfo(id,route.params.personid)
        var myposts=await GetMyPosts(id,route.params.personid)
console.log('***************')
UserReviews(CheckData.reviews)
console.log('***************')
        SetProfilePrivate(CheckData.user.fields.profile_private)
        GetOtherUserCoins(CheckData.user.fields.post_coins)
        UserPartnerShipConnected(CheckData.partnership_connected)
        UserPartnerShipRequested(CheckData.partnership_requested)
     
        GetUser(CheckData.user.fields)

        SetBusinessImage(CheckData.user.fields.business_image?CheckData.user.fields.business_image:CheckData.user.fields.image)
        GetUserFollowing(CheckData.followings)
        GetUserFollower(CheckData.followers)
        GetIFollowing(CheckData.follow)
        GetUserPosts(myposts.posts)
        SetisLoading(false)
          
    }
    const CheckCoins=()=>{
     if(!PartnershipConnected){
        alert("Become a Partner First")
       return
     }
      
      if(MyCoins>OtherUserCoins){
        navigation.navigate('CreatePinnedPost',{
          'myid':Myid,
         'otheruserid':route.params.personid,
          'OtherUserCoins':OtherUserCoins,
          'MyCoins':MyCoins
        })
      }else{
        setCoinModalVisible(!CoinmodalVisible)

      }
    }
    const Create_Group=async()=>{
     
      let group=await CreateGroup(Myid,route.params.personid)
      
      navigation.navigate('Chat',{
          myid:Myid,
          otheruserid:route.params.personid,
          otherusername:User.username,
          roomid:group.room_id
        })
      
    }

  
   const BlockOtherUser=async(m,o)=>{
    //After a user is removed this will be called

    try{
     await BlockUser(m,o)
      SetisLoading(true)
      await  GetOtherUserDetail()
     
    }catch(e){
      Toast.show('Some Error occure ')
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


  const ReportUser=async(my_id,otheruser_id,report_type,reason)=>{
    try{
    let r= await RemoveOtherUser(my_id,otheruser_id,report_type,reason)
    console.log( r)
    }catch(e){
      Toast.show('Some Error occure '+e)
    }
   
  }



    if(isLoading){
        return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator/>
        </View>
        )
    }else
  return (
    
    <View style={styles.container}>
        <CommonHeader Name={User.username} navigation={navigation}/>

        <ScrollView contentContainerStyle={{paddingBottom:20}}>
            <View style={{marginHorizontal:windowHeight/60,}}>
                <View style={{marginTop:10,flexDirection:'row',alignItems:'center'}}>
                    <Image source={{uri:ImageBasePath+User.image}} style={{width:windowHeight/8,height:windowHeight/8,borderRadius:50,resizeMode:'cover'}}/>
                    <View style={{flex:1,flexDirection:'row',justifyContent:'space-evenly'}}>
                        
                        <TouchableOpacity onPress={()=>navigation.push('Followers',{
                           'Followers':UserFollower,
                           'Followings':UserFollowing
                        })}style={{alignItems:'center'}}>
                            <Text style={{fontWeight:'bold',fontSize:17}}>{UserFollower.length}</Text>
                            <Text>Followers</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>navigation.push('Followers',{
                           'Followers':UserFollower,
                            'Followings':UserFollowing
                        })} style={{alignItems:'center'}}>
                            <Text style={{fontWeight:'bold',fontSize:17}}>{UserFollowing.length}</Text>
                            <Text>Following</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <Text style={{fontWeight:'bold',marginLeft:10,marginTop:5,fontSize:15}}>{User.username}</Text>
                    <Text style={{marginLeft:10,marginTop:5,fontSize:15}}>Welcome!!!</Text>
                    <Text style={{marginLeft:10,marginTop:5,fontSize:15}}>{User.bio}</Text>
                    <Text style={{marginLeft:10,marginTop:10,color:'#4493f9'}}>{User.email}</Text>
                </View>
                <View style={{flexDirection:'row',marginTop:20,justifyContent:'space-evenly'}}>
                    <Follow ChangeFollowStatus={async(e)=>{
                        var state=e?'follow':'unfollow'
                        const status=await Followup(Myid,route.params.personid,state)
                        if(status.error==false){

                        if(state=='unfollow'){
                          SetProfilePrivate(true)
                        }else if(state=='follow'){
                          SetProfilePrivate(false)
                        }
                            console.log('works')
                        }else{
                            alert('some error')
                        }

                    }} isFollowing={IsFollowing}/>
                     <TouchableOpacity onPress={()=>navigation.navigate('OtherPersonConnectProfile',{
                        id:route.params.personid,
                        myid:Myid,
                        image:ImageBasePath+GetBusinessImage,
                      
                        name:User.business_name?User.business_name:User.username,
                        bio:User.business_description?User.business_description:User.bio,
                        connected:PartnershipConnected,
                        requested:PartnershipRequested,
                        reviews:Reviews
                      })} style={{width:windowWidth/3.2,height:40,borderRadius:5,borderWidth:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontSize:15}}>Partnership</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>Create_Group()} style={{width:windowWidth/4,height:40,borderRadius:5,borderWidth:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontSize:15}}>Message</Text>
                    </TouchableOpacity>
                </View>
                
                <TouchableOpacity onPress={()=> CheckCoins()} style={{alignSelf:'center',borderRadius:5,marginTop:20,elevation:4,paddingHorizontal:10,padding:10,backgroundColor:'#fff',width:'90%',shadowOpacity:1,shadowColor:'#3badfb',shadowOffset:{width:1,height:1}}}>
                  <Text style={{textAlign:'center',textTransform:'uppercase',fontWeight:'bold',color:'#3badfb'}}>Create Pinned Post ({OtherUserCoins})</Text>
                </TouchableOpacity>
            </View>
            
            {ProfilePrivate ?
            <View style={{flex:1,marginTop:100,justifyContent:'center',alignItems:'center'}}> 
              <Text>Profile is Private</Text>
            </View>
              :
            <FlatList
            ListEmptyComponent={()=>{
              return(
                <View style={{height:Dimensions.get('window').height,justifyContent:'center',alignItems:'center'}}>
                  <Image source={require('../../../assets/login_logo.png')} style={{width:150,height: 150,bottom:150,resizeMode:'contain'}}/>
                  <Text style={{bottom:100,fontWeight:'700'}}>No Post Found</Text>
                    {/* <TouchableOpacity onPress={()=>setModalVisible(true)} style={{width:200}}>
                      <LinearGradient
                          colors={['#FC9919', '#F38645']}
                          style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:10,borderRadius:10}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                          <AntDesign name="search1" size={24} color="#fff" />
                          <Text style={{color:'#fff'}}>Search</Text>
                        </View>
                        <FontAwesome5 name="user-friends" size={24} color="#fff" />            
                      </LinearGradient>
                    </TouchableOpacity> */}
                </View>
              )
              }}
              showsVerticalScrollIndicator={false}
                data={UserPosts}
                renderItem={({ item, index }) => (
                  
                  // <FeedsPost BlockotherPerson={(m,o)=>BlockOtherUser(m,o)} RemoveMyPost={(i,m,p)=>RemovePost(i,m,p)} RemoveOtherUserPost={(index,userwhoisblocking,userwhoisblocked,postid)=>RemoveOtherUserPosts(index,userwhoisblocking,userwhoisblocked,postid)}   ReportAboutUser={(m,o)=>ReportUser(m,o)}  item={item} Myid={Myid} index={index} navigation={navigation}  OtherUserid={item.author.pk}   postidis={item.pk} NavigateUser={(id)=>UserNavigate(id)}/>
                  <FeedsPost BlockotherPerson={(m,o)=>BlockOtherUser(m,o)}  RemoveOtherUserPost={(index,userwhoisblocking,userwhoisblocked,postid,reportType,reason)=>RemoveOtherUserPosts(index,userwhoisblocking,userwhoisblocked,postid,reportType,reason)} RemoveMyPost={(i,m,p)=>RemovePost(i,m,p)} ReportAboutUser={(m,o,r,e)=>ReportUser(m,o,r,e)}  item={item} Myid={Myid} index={index} navigation={navigation} OtherUserid={item.author.pk} NavigateUser={(id)=>UserNavigate(id)}     UserPosts={UserPostList} postidis={item.pk}   UserReports={UserRportList}               />
                  
                  
                )}
        />}
          

        </ScrollView>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={CoinmodalVisible}
            onRequestClose={() => {
              setCoinModalVisible(!CoinmodalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Image style={{width:'50%',height:'70%',resizeMode:'center'}} source={require('../../../assets/Coins.png')}/>
                <Text  style={styles.modalText} onPress={()=>{setCoinModalVisible(!CoinmodalVisible),navigation.navigate('GuavaPoints')}}>Don't have enough coins add some </Text>
              
                <Text  style={[styles.modalText,{fontWeight:'300',textDecorationLine:'underline'}]} onPress={()=>{setCoinModalVisible(!CoinmodalVisible),navigation.navigate('GuavaPoints')}}>Buy Some Coins</Text>
                <TouchableOpacity
                  style={{ ...styles.openButton, backgroundColor: '#FC9919' }}
                  onPress={() => {
                    setCoinModalVisible(!CoinmodalVisible);
                  }}>
                  <Text style={styles.textStyle}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          
        </View>

       
  
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
    height:windowHeight/9,
    flexDirection:'row',
    alignItems:'flex-end',
    justifyContent:'space-between',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width:'80%',
    height:'40%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    width:'100%',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight:'bold'
  },

});