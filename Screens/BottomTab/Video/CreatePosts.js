import React, { Component,useState,useEffect } from 'react';
import { View,Modal, Text,TouchableOpacity,Image, Keyboard, Dimensions, ImageBackground } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { BlankSpace, LocationIcon, LockProfileIcon } from '../../../assets/SvgIcons/AllIcons';
import Images from './Images'
import Videos from './Videos'
import { Audio, Video } from 'expo-av';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { base64example } from '../../Services/BasePath';
import { AntDesign } from '@expo/vector-icons';
const Width=Dimensions.get('window').width
function PostPage ({navigation,route}) {
  const [Gallery,GalleryActive]=useState(true)
  const [VideoGallery,VideoGalleryActive]=useState(false)
  const [filetype,Filtype]=useState('')

  const [file,SelectedFile]=useState('')
  const ref=React.useRef()

  const UpdateImageOrVideo=(file,type)=>{
    
    Filtype(type)
    SelectedFile(file.uri)
  }
 
React.useEffect(() => {
  if (route.params?.post) {
    SelectedFile(route.params?.post)
  }
}, [route.params?.post]);
useEffect(()=>{
  getPhotos()
  

},[])
const getPhotos =async () => {
  const status=await MediaLibrary.requestPermissionsAsync()
  if(status!=='granted'){
    var d= await MediaLibrary.getAssetsAsync({first:1,mediaType:'photo'})
   
    Filtype('image')
    SelectedFile(d.assets[0].uri);

  }

};
const FormatSizeUnits=(bytes)=>{
  if      (bytes >= 1073741824) { bytes = (bytes / 1073741824).toFixed(2) + " GB"; }
  else if (bytes >= 1048576)    { bytes = (bytes / 1048576).toFixed(2) + " MB"; }
  else if (bytes >= 1024)       { bytes = (bytes / 1024).toFixed(2) + " KB"; }
  else if (bytes > 1)           { bytes = bytes + " bytes"; }
  else if (bytes == 1)          { bytes = bytes + " byte"; }
  else                          { bytes = "0 bytes"; }
  return bytes;
}
ConvertToBase64=async()=>{
  var data= await FileSystem.getInfoAsync(file)
  var size=FormatSizeUnits(data.size)
  var ToBase64=await FileSystem.readAsStringAsync(data.uri, {
    encoding:FileSystem.EncodingType.Base64
  })
  navigation.navigate('Dashboard',{
    'imagePath':filetype=='v'?'':file,
    'base64Path':ToBase64,
    'fileType':filetype
  })
  
}

  
    return (
      <View style={{flex:1,backgroundColor:'#fff'}}>
        <View style={{marginTop:20}}/>
        <View style={{flexDirection:'row',justifyContent:'space-between',padding:20}}>
        <AntDesign name="closecircle" onPress={()=>Filtype('v')} size={24}  style={{alignSelf:'flex-end'}}  />

          <Text style={{fontWeight:'bold'}}> New Story </Text>
         <TouchableOpacity  style={{backgroundColor:'#fff',width:50,borderRadius:4,alignItems:'center',justifyContent:'center',elevation:4}} onPress={()=>ConvertToBase64()}>
          <Text   style={{color:'#4493F9'}}>Next</Text>
         </TouchableOpacity>
        </View>
     
        <View style={{flex:1.4,backgroundColor:'#fff'}}>
          <View style={{width:250,alignSelf:'center',justifyContent:'center',alignItems:'center'}}>
           
            {filetype=='image'?
            <View style={{alignSelf:'center',width:'100%'}}>
                
            
            <Image source={{uri:file}} style={{width:'100%',height:'100%',alignSelf:'center',resizeMode:'cover'}}/>
             
            </View>
            :
            <>
            {filetype=='v'?
              <>
              </>:
            <>
           
            <Video
            style={{width:'100%',height:'100%',alignSelf:'center',resizeMode:'cover'}}
              source={{
                uri: file,
              }}
              useNativeControls
            />
            </>
            }
            </>
           
            }
          </View>
        </View>
        <View style={{flex:1.2,backgroundColor:'orange'}}>
            <View style={{flexDirection:'row',alignItems:'center',backgroundColor:'#F2F2F7',justifyContent:'space-between',width:'100%',height:40}}>
                <TouchableOpacity onPress={()=>{ref.current.scrollTo({x:Width*0})}} style={{borderRightWidth:0,borderWidth:1,borderColor:'gray',width: '33.5%',height:40,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'gray',textAlign:'center',}}>Gallery</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate('TakePhoto')} style={{borderWidth:1,borderRightWidth:0,borderColor:'gray',width: '33.5%',height:40,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'gray',textAlign:'center'}}>Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{ref.current.scrollTo({x:Width})}} style={{borderWidth:1,borderColor:'gray',width: '33.5%',height:40,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'gray',textAlign:'center',}}>Video</Text>
                </TouchableOpacity>
            </View>
            <ScrollView ref={ref}  showsHorizontalScrollIndicator={false} pagingEnabled={true} horizontal={true}>
              <View style={{width:Width}}>
                <Images Selected={(path,type)=>UpdateImageOrVideo(path,type)}/>
              </View>
              <View style={{width:Width}}>
                <Videos Selected={(path,type)=>UpdateImageOrVideo(path,type)}/>
              </View>
            </ScrollView>
            
        </View>
       
      </View>
    );
  
}

export default PostPage;
