import React, { Component,useState ,useEffect} from 'react';
import { View,Dimensions, Keyboard,Animated,Text,Image,FlatList,TextInput, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MessageSendIcon } from '../../../assets/SvgIcons/AllIcons';
import CommonHeader from '../../../Components/CommonHeader';
import LikePost from '../../../Components/LikePost';
import PostCommnet from '../../../Components/PostComment';
import { GettingPostComments, SendMyCommentOnPost } from '../../Services/Authentication';
import { useIsFocused } from "@react-navigation/native";
import { ActivityIndicator } from 'react-native-paper';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Picture_Comment ({navigation,route}) {

  const [keyboardStatus, setKeyboardStatus] = useState(0);
  const [Comment,SetComment]=useState('')
  const [sendComment,SetSendComment]=useState(false)
  const [isLoading,SetisLoading]=useState(true)


  const isFocused = useIsFocused();
  const [Commnt,GetCommnt]=useState(null)
  useEffect(()=>{
    
    GetPostComments()
  },[sendComment])

  useEffect(()=>{
    
    GetPostComments()
  },[isFocused])
  const GetPostComments=async()=>{
    SetComment('')
    let C= await GettingPostComments(route.params.myid,route.params.Postid)
    GetCommnt(C.comments)
    SetisLoading(false)
  }

  const SendComment=async()=>{
    
    let C= await SendMyCommentOnPost(route.params.myid,route.params.Postid,Comment)
  if(C.error==false){
    SetComment('')
    SetSendComment(!sendComment)
  }
  }
  
  
  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", (e) => {
      // setKeyboardStatus("Keyboard Shown");
      // alert(JSON.stringify(e.startCoordinates.height))
      setKeyboardStatus(e.endCoordinates.height<250?e.endCoordinates.height+40:e.endCoordinates.height)
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus(0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <View style={{flex:1,backgroundColor:'#fff'}}>

      <CommonHeader navigation={navigation} Name={'Comments'}/>
      <View style={{flex:1}}>
        {isLoading?
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator/>
        </View>
        :
        <FlatList
          data={Commnt}
          renderItem={({ item, index, separators }) => (
            <>

            <PostCommnet MyId={route.params.myid} Item={item.author.fields} UserId={item.author.pk} Liked={item.liked} LikedCount={item.likes_count} RepliesCount={item.replies_count} CommentId={item.pk} PostComment={item.fields.comment}  Time={item.fields.created_at} navigation={navigation}/>
            </>
          )}
        />}
      </View>
      {Platform.OS=='ios'?
      <View style={{borderWidth:0.4,marginBottom:keyboardStatus,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
        <TextInput value={Comment}  onChangeText={(e)=>SetComment(e)}   placeholder={'write a comment'} style={{width:'90%',padding:20}}/>
        <TouchableOpacity onPress={()=>SendComment()} style={{right:20}}>
        <MessageSendIcon/>
        </TouchableOpacity>
      </View>:
      // <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
      //   <TextInput  onChangeText={(e)=>SetComment(e)}  placeholder={'send message'} style={{borderWidth:1,width:'90%',padding:20}}/>
      //   <TouchableOpacity onPress={()=>SendComment()} style={{right:20}}>
      //     <MessageSendIcon/>
      //   </TouchableOpacity>
      // </View>


      <View style={{borderWidth:0.4,flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:20}}>
        <TextInput value={Comment}  onChangeText={(e)=>SetComment(e)}   placeholder={'write a comment'} style={{width:'90%',padding:20}}/>
        <TouchableOpacity onPress={()=>SendComment()} style={{right:20}}>
          <MessageSendIcon/>
        </TouchableOpacity>
      </View>
      }
     
    </View>
  );
  
}
