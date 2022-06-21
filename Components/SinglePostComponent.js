import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet,Modal,ActivityIndicator, Text, View,Dimensions, TouchableOpacity,Image,TextInput } from 'react-native';
import { Entypo,Ionicons ,EvilIcons,FontAwesome,AntDesign} from '@expo/vector-icons'; 
// import {MenuProvider,Menu,MenuOptions,MenuOption,MenuTrigger,} from 'react-native-popup-menu';
import { LockProfileIcon,MessageIconSmall,BookMarkIcon,LikeIcon, PinIcon, Report } from '../assets/SvgIcons/AllIcons';
import  LikePost  from './LikePost';
import BookmarkPost from './BookmarkPost';
import ActionMenu from './ActionMenu';
import { Audio, Video } from 'expo-av';
import { BasePath, ImageBasePath } from '../Screens/Services/BasePath';
import {  SharePost } from '../Screens/Services/Authentication';
import Toast from 'react-native-tiny-toast';
// import RadioButtonRN from 'radio-buttons-react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function Post({item,navigation,Myid,NavigateUser,OtherUserid,RemovePostFromIndex,index,RemoveOtherUserPost,postidis,BlockotherPerson,RemoveMyPost,ReportAboutUser,UserReports,UserPosts}) {
  
  const [likes,countLike]=useState(item.likes_count)
  const [share,countshare]=useState(item.share_count)
  const [hasshare,HasShared]=useState(false)
  const [ShareModalVisible, setShareModalVisible] = useState(false);
  const [isLoading,SetisLoading]=useState(false)
  const [MenuVisible,ActionMenuVisible] = useState(false);

  //Block User or Its Post

  const [UserWhoisBlocking,GetUserWhoisBlocking]=useState('')
  const [UserWhoisBlocked,GetUserWhoisBlocked]=useState('')
  const [Postid,GetPostid]=useState('')
  const [Postindex,GetPostindex]=useState('')
const [Reason,ExplainReason]=useState('')
  const [UserReportCategory,SetUserReportCategory]=useState(null)
  const [ModalType,SetModalType] = useState('');
const [ErrorMsg,SetErrorMsg]=useState('')
  const data = [
    {
      label: 'data 1',
      accessibilityLabel: 'Your label'
     },
     {
      label: 'data 2',
      accessibilityLabel: 'Your label'
     }
    ];



  
  const ReportOtherUserPost=(index,my,user,type)=>{
  //  depending upon type modal will be called
    GetPostindex(index)
    GetUserWhoisBlocking(my)
    GetUserWhoisBlocked(user)
    SetModalType(type)
   
    ActionMenuVisible(true)

  }

  const CallBlockUser=(m,o)=>{
    // BlockotherPerson(Postindex,UserWhoisBlocking,UserWhoisBlocked,postidis)
    //CallBlock user Api
    //then under function 
    BlockotherPerson(m,o)
  }
  const ReportPost=()=>{
    if(UserReportCategory==null){
      SetErrorMsg('Select at least one option')
      return
    }else if(UserReportCategory==0 && Reason=='' ){
      SetErrorMsg('Please tell us reason')
      return
    }
    ActionMenuVisible(false)
    RemoveOtherUserPost(Postindex,UserWhoisBlocking,UserWhoisBlocked,postidis,UserReportCategory,Reason)
    SetUserReportCategory(null)
    SetErrorMsg('')
    ExplainReason('')
    // alert('block post')
  }
  const ReportUser=()=>{
    // RemoveOtherUserPost(Postindex,UserWhoisBlocking,UserWhoisBlocked,postidis)

    if(UserReportCategory==null){
      SetErrorMsg('Select at least one option')
      return
    }else if(UserReportCategory==0 && Reason=='' ){
      SetErrorMsg('Please tell us reason')
      return
    }
    ActionMenuVisible(false)
    ReportAboutUser(UserWhoisBlocking,UserWhoisBlocked,UserReportCategory,Reason)
    SetUserReportCategory(null)
    SetErrorMsg('')
    ExplainReason('')
    //Call Api myid,userid,description
  }
 
  const IncressorDecressLikes=(status)=>{
   
    if(status){
      countLike(likes-1)
      
    }else{
      countLike(likes+1)
    }
  }
  
  const ShareUserPost=async(postid)=>{
   if(hasshare){

   }else{
    countshare(share+1)
     let shared= await SharePost(Myid,postid)
    console.log(shared)
    if(shared.error==false){
      setShareModalVisible(!ShareModalVisible)
      SetisLoading(false)
      Toast.show(shared.success_msg,{position:Toast.position.TOP})
    }else{
      HasShared(false)
      SetisLoading(false)
      countshare(share-1)
      Toast.show(shared.error_msg,{position:Toast.position.TOP})
      setShareModalVisible(!ShareModalVisible)
    }

  }
    // let shared= await SharePost(Myid,postid)
    // console.log(shared)

  }
  
  const IsPostShared=(shared,item)=>{
    return(
      <>
      {shared?
      <View style={{flexDirection:'row'}}>
        <Text style={{marginLeft:5,fontWeight:'bold',}}>{item.author.fields.username} {item.author.fields.profile_private&& <LockProfileIcon/>}</Text>
        
        <Text style={{marginLeft:5,marginRight:10,color:'gray',fontStyle:'italic',width: '80%',}}>has shared <Text onPress={()=>NavigateUser(item.post_user.pk,OtherUserid)} style={{fontWeight:'bold',textDecorationLine:'underline'}}>{item.post_user.fields.username}</Text> post</Text>
      </View>:
      <View>
         <Text style={{marginLeft:5,fontWeight:'bold',fontSize:18,marginRight:10}}>@{item.author.fields.username} {item.author.fields.profile_private&& <LockProfileIcon/>}</Text>
         
      </View>
      }
      </>

    )
  }
  const DeleteMyOwnPost=(i,m,p)=>{
    // alert()
    RemoveMyPost(i,m,p)
    // alert(i+''+''+m+''+p)
  }

  const ReturnPostType=(type)=>{
    var  d;
    if(type==''){
      return
    }
    if(type=='reportuser'){
        d=UserReports.map((item,index)=>{
        return(
          <TouchableOpacity onPress={()=>SetUserReportCategory(item.id)}>
            <View style={{flexDirection:'row',marginVertical:4,alignItems:'center'}}>
              {item.id==UserReportCategory?
              <AntDesign name="checkcircle" size={24} color="blue" />
              :
              <AntDesign name="checkcircleo" size={20} color="black" />
              }
              <Text style={{fontWeight:'700',marginLeft:10,fontSize:16}}>{item.name}</Text>
              <Text>{item.id}</Text>
            </View>
          </TouchableOpacity>
        
        )
      })
    }else if(type=="reportpost"){
      d=UserPosts.map((item,index)=>{
        return(
          <TouchableOpacity onPress={()=>SetUserReportCategory(item.id)}>
            <View style={{flexDirection:'row',marginVertical:4,alignItems:'center'}}>
              
              <Text style={{fontWeight:'700',marginLeft:10,fontSize:16}}>{item.name}</Text>
              <Text>{item.id}</Text>
            </View>
          </TouchableOpacity>
        
        )
      })
    }else{
      return(
        <View>
        <Text>Nothing</Text>
        <Text>{type}</Text>
        </View>
      )
    }

    return d
  }
  return (
    <>
     
        <View activeOpacity={1} style={{marginTop:10}}>
      
          <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:10}}>
            <TouchableOpacity onPress={()=>NavigateUser(item.author.pk,OtherUserid)}  style={{flexDirection:'row',alignItems:'center'}}>
              <Image source={{ uri:`${ImageBasePath}${item.author.fields.image}` }} style={{width:60,height:60,marginLeft:10,resizeMode:'cover',borderWidth:2,borderColor:'#ffa519',borderRadius:50}}/>
              </TouchableOpacity>
              <View style={{width:'75%'}}>
               {IsPostShared(item.fields.shared,item)}
                {item.fields.location==""?null:
                <View style={{flexDirection:'row',marginTop:5}}>
                <EvilIcons name="location" size={24} color="black" />
                <TouchableOpacity onPress={()=>navigation.navigate('ShowLocationAddedByUser',{
                  location:item.fields.location
                })}>
                <Text style={{marginLeft:5,marginRight:10,fontStyle:'italic',fontSize:12,color:'#3A3A3C'}} >{item.fields.location=="null"?'':item.fields.location}</Text>
                </TouchableOpacity>
                </View>}
              </View>
              
             
           
              {/* <ActionMenu onDeletePost={(i,m,p,o)=>RemovePostFromIndex(i)} index={index}  myid={Myid} postid={ item.pk}  OtherUserid={OtherUserid}/> */}
              <ActionMenu onDeletePost={(i,m,p,o)=>DeleteMyOwnPost(i,m,p,o)} BlockUser={(m,o)=>CallBlockUser(m,o)} ReportUserPost={(index,myid,userid,type,)=>ReportOtherUserPost(index,myid,userid,type)} index={index}  myid={Myid} postid={item.pk}  OtherUserid={OtherUserid}/>


          </View>

          <View style={{marginTop:10,marginLeft:10,flexDirection:'row',width:'97%',justifyContent:'space-between'}}>
            <Text style={{color:'#3A3A30'}}>{item.fields.caption}</Text>
            {item.fields.pinned&&<PinIcon/>}
          </View>
          
          <View style={{marginTop:10}}>
            {item.media.length<1?null:
           <View style={{width:windowWidth,height:windowHeight/1.8,}}>
           
           {item.media[0].image!=""?
            <Image  source={{uri:ImageBasePath+item.media[0].fields.image}} style={{width:windowWidth,height:windowHeight/1.8,resizeMode:'cover'}}/>
           :
               <Video
             
                style={{width:windowWidth,height:windowHeight/1.8,resizeMode:'cover'}}
                source={{
                  uri: ImageBasePath+ item.media[0].fields.video,
                }}
                useNativeControls
              />
              }
            </View>
            }
            
          </View>
          <View style={{flexDirection:'row',marginTop:10,marginHorizontal:5,}}>
            <View style={{flex:1,flexDirection:'row'}}>
              <View style={{width:125,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <LikePost  Postid={item.pk} like={item.liked} onpress={(e)=>{IncressorDecressLikes(e)}} id={Myid} />
                <TouchableOpacity onPress={()=>navigation.push('PicComment',{
                  Postid:item.pk, 
                  myid:Myid
                })} style={{marginHorizontal:5}}>
                   <MessageIconSmall/>
                </TouchableOpacity>
                <BookmarkPost bookmarked={item.favorite}  Postid={item.pk}   id={Myid} />
                
                 {/* onPress={()=>{HasShared(true),ShareUserPost(item.pk)}} */}
                <TouchableOpacity onPress={()=>setShareModalVisible(!ShareModalVisible)}>
                  <FontAwesome  name="share" size={24} color="gray" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{flexDirection:'row',alignItems:'center'}}>
              <Text style={{color:'#95959a',fontWeight:'bold'}}>{likes} </Text>
              <Text style={{color:'#95959a'}}>likes </Text>
                <Ionicons name="ellipse-sharp" size={4} color="#95959a" />
              <Text style={{color:'#95959a',fontWeight:'bold'}}> {item.comments_count} </Text>
              <Text style={{color:'#95959a'}}>comments </Text>
                <Ionicons name="ellipse-sharp" size={4} color="#95959a" />
              <Text style={{color:'#95959a',fontWeight:'bold'}}> {share} </Text>
              <Text style={{color:'#95959a'}}> shares</Text>
            </View>
          </View>
          
            
        </View>
        
        <View  style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={ShareModalVisible}
            onRequestClose={() => {
              setShareModalVisible(!ShareModalVisible);
            }}>
            <>
            <TouchableOpacity onPress={()=>setShareModalVisible(!ShareModalVisible)} style={styles.centeredView}>
              <View style={styles.modalView}>
                <Image style={{width:'50%',height:'75%',resizeMode:'center'}} source={require('../assets/Share.png')}/>
               <Text style={{color:'gray',marginBottom:20}}>Post will be shared on your Timeline</Text>
                <TouchableOpacity
                  style={{ ...styles.openButton, backgroundColor: '#FC9919' }}
                  onPress={() => {
                  //  SetisLoading(true), Post()
                  SetisLoading(true),HasShared(true),ShareUserPost(item.pk)
                 
                  
                  }}>
                    {isLoading?
                  <ActivityIndicator color={'#fff'}/>: 
                  <Text style={styles.textStyle}>Share Now</Text>}
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            </>
          </Modal>

          
        </View>

        <View  style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={MenuVisible}
            onRequestClose={() => {
              ActionMenuVisible(!MenuVisible);
            }}>
            <>
            <TouchableOpacity onPress={()=>ActionMenuVisible(!MenuVisible)} style={styles.centeredView}>
              
           
              <View style={{...styles.modalView,justifyContent:'space-between'}}>
              <Text style={{color:'red',top:5,fontWeight:'bold'}}>{ErrorMsg}</Text>
                {ModalType=='reportuser'?
                <Image style={{width:'50%',height:'50%',resizeMode:'center'}} source={require('../assets/ReportUser.jpg')}/>
                :
                <Image style={{width:'50%',height:'50%',resizeMode:'center'}} source={require('../assets/ReportUser.jpg')}/>
                }
               
                <View style={{justifyContent:'flex-start',width:'100%',alignSelf:'flex-start'}}>
                {ModalType=='reportuser'?
                <View style={{marginLeft:10}}>
                <Text style={{color:'gray',fontWeight:'700',textAlign:'center',marginBottom:10,marginLeft:5,fontStyle:'italic'}}>what you see wrong about this user</Text>
               { ReturnPostType(ModalType)}
                
                
                </View>
                :
                <View>
                <Text style={{fontWeight:'bold',textAlign:'center',marginLeft:10}}>Whats wrong with this post</Text>
                { ReturnPostType(ModalType)}
                </View>
               
                }

                {UserReportCategory==0&&
                 <TextInput onChangeText={(e)=>ExplainReason(e)} style={{padding:10,width:'90%',alignSelf:'center',borderBottomWidth:0.4,borderColor:'gray'}} placeholder="Explain Problem ......"/>
                }
                
                </View>
                <TouchableOpacity
                  style={{ ...styles.openButton, backgroundColor: '#FC9919' }}
                  onPress={() => {
                  //  SetisLoading(true), Post()
                  ModalType=='reportuser'?ReportUser():ReportPost()
                 
                  
                  }}>
                    {isLoading?
                  <ActivityIndicator color={'#fff'}/>: 
                  <Text style={styles.textStyle}>Submit Report</Text>}
                </TouchableOpacity>

              </View>
              
              
            </TouchableOpacity>
            </>
          </Modal>

          
        </View>

    </>
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
  centeredView: {
    flex: 1,
  top:50,
   alignItems:'center'
    
  },
  modalView: {
    
    backgroundColor: 'white',
    borderRadius: 20,
    width:'80%',
    height:'60%',
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
    alignSelf:'flex-end'
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
