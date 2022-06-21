import React, { Component,useState,useEffect } from 'react';
import { View,Modal, Text,TouchableOpacity,Image, Keyboard } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { BlankSpace, LocationIcon, LockProfileIcon } from '../../../assets/SvgIcons/AllIcons';
import { AntDesign ,EvilIcons} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Map from './Map'
import PrivatePost from './HidePost'
import { CreatePosts, ReturnUserRecordAsync } from '../../Services/Authentication';
import Toast from 'react-native-tiny-toast';
import { ActivityIndicator } from 'react-native-paper';

function PostPage ({navigation,route}) {
  
  const [image, setImage] = useState(route.params.imagePath);
  const [UserID, SetUserID] = useState(null);
  const [Pinned, SetPinned] = useState(false);
  const [Private, SetPrivate] = useState(false);
  const [BusinessPost, SetBusinessPost] = useState(0);
  const [Pins, SetPins] = useState(0);
const [isLoading,SetisLoading]=useState(false)


  const [image64, setImage64] = useState([]);
  const [Descrition,SetDescription]=useState('')

  const [Location, ShowLocation] = useState(null);
  const [PrivateMode, ShowPrivateMode] = useState(false);

  const [UserLocation, SetLocation] = useState(null);
  const [Friends, SelectedFriend] = useState([]);

  useEffect(()=>{
    GetUserInfio()
  },[])
  const GetUserInfio=async()=>{
   var Data= await ReturnUserRecordAsync()
   var id=Data[4];
    SetUserID(id)
  }
  

  const Post=async()=>{
  
    if(isLoading){
      Toast.show('Please wait')
      return
    }

    

    
    let image=[]
    let video=[]

    // setImage64(image)
    if(route.params.fileType=='video'){
      video.push(`data:video/mp4;base64,${route.params.base64Path}`)
    video
    }else if(route.params.fileType=='image'){
      image.push(`data:image/jpeg;base64,${route.params.base64Path}`)
    }
    const CheckStatus=await CreatePosts(UserID,Descrition,Pinned,Private,BusinessPost,Pins,UserLocation,image,Friends,video)
    if(CheckStatus.error==false){
      // Toast.show(CheckStatus)
      SetisLoading(false)
      navigation.goBack(null)
    }else{
      Toast.show(CheckStatus.error_msg)
      SetisLoading(false)


    }
  }

  


  
    return (
      <View style={{flex:1,backgroundColor:'#fff'}}>
        <View style={{marginTop:20}}/>
        <View style={{flexDirection:'row',justifyContent:'space-between',padding:20}}>
          <BlankSpace/>
          <Text style={{fontWeight:'bold'}}>Craete New Post </Text>
          <View>
           {isLoading?
           <ActivityIndicator/>: 
           
          <Text onPress={()=>{SetisLoading(true),Post()}} style={{color:'#4493F9',padding:10,}}>Post</Text>
           }
          </View>
        </View>
        <View style={{marginTop:40}} />
        <View style={{height:140,padding:10,flexDirection:'row',width: '90%',alignSelf:'center',borderColor:'#DADADA',borderWidth:1}}>
          <Image source={{uri:image}} style={{width:120,height:120}}/>
          <View style={{marginLeft:10,width:'60%'}}>
            <TextInput onChangeText={(e)=>SetDescription(e)} multiline={true} placeholderTextColor="#3A3A3C" placeholder="Say something about your post... "/>
          </View>
        </View>
        <View style={{marginLeft:20,marginTop:20,height:70,justifyContent:'space-between'}}>
          <TouchableOpacity onPress={()=>ShowPrivateMode(true)} style={{flexDirection:'row',alignItems:'center'}}>
          <LockProfileIcon/>
          <Text style={{marginLeft:10,fontWeight:'600'}}>Private Mode</Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={()=>ShowLocation(true)} style={{flexDirection:'row',marginTop:15,alignItems:'center'}}>
            <LocationIcon/>
            <Text style={{marginLeft:10,fontWeight:'600'}}>Add Location</Text>
          </TouchableOpacity>
          {/* {Location?
        <Map/>:null  
        } */}
       <View style={{height:50,marginTop:20}} onPress={()=>Keyboard.dismiss()}>
       {UserLocation&& <Text style={{fontWeight:'600'}}>Selected Location</Text>}
        {UserLocation&&
        <View style={{flexDirection:'row',marginTop:10}}>
          <EvilIcons name="location" size={24} color="black" />
          <Text style={{marginLeft:10,fontWeight:'500'}}>{UserLocation}</Text>
        </View>
        }
         </View>

         {   
          PrivateMode?
          <Modal 
            
            animationType='none'
            //  transparent={true}
            visible={PrivateMode}
            onRequestClose={() => {ShowPrivateMode(false)}}
          >

              <View style={{flex:1,backgroundColor:'#0c0b19'}}>
                <PrivatePost HideModal={(e,friends)=>{ShowPrivateMode(e),SelectedFriend(friends)}} UserList={Friends}/>
              </View>
          </Modal>:null 
        }

        {   
          Location?
          <Modal 
            
            animationType='none'
            //  transparent={true}
            visible={Location}
            onRequestClose={() => {ShowLocation(false)}}
          >

              <View style={{flex:1,backgroundColor:'#0c0b19'}}>
                <Map from_parent_data={(address)=>{address==''?null:SetLocation(address),ShowLocation(false)}} navigation={navigation}  />
              </View>
          </Modal>:null 
        }
        </View>
        <TouchableOpacity style={{flex:1,}} onPress={()=>Keyboard.dismiss()}/>
        
      </View>
    );
  
}

export default PostPage;
