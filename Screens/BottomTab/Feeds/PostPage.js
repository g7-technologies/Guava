import React, { Component,useState,useEffect } from 'react';
import { StyleSheet,Dimensions,View,Modal,ActivityIndicator, Text,TouchableOpacity,Image, Keyboard } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { BlankSpace, LocationIcon, LockProfileIcon } from '../../../assets/SvgIcons/AllIcons';
import { AntDesign ,EvilIcons} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Map from './Map'
import { CreatePinnedPosts, CreatePosts, ReturnUserRecordAsync } from '../../Services/Authentication';
import Toast from 'react-native-tiny-toast';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
function PostPage ({navigation,route}) {
  
  const [image, setImage] = useState(route.params.imagePath==''?'':route.params.imagePath);
  const [UserID, SetUserID] = useState(route.params.myid);
  const [OtherUserID, GetOtherUserID] = useState(route.params.otheruserid);
  const [CoinmodalVisible, setCoinModalVisible] = useState(false);

  const [Pinned, SetPinned] = useState(true);
  const [Private, SetPrivate] = useState(false);
  const [BusinessPost, SetBusinessPost] = useState(route.params.otheruserid);
  const [Pins, SetPins] = useState(route.params.OtherUserCoins);
const [isLoading,SetisLoading]=useState(false)


  const [image64, setImage64] = useState(route.params.base64Path);
  const [Descrition,SetDescription]=useState('')

  const [Location, ShowLocation] = useState(null);
  const [PrivateMode, ShowPrivateMode] = useState(false);

  const [UserLocation, SetLocation] = useState(null);
  const [Friends, SelectedFriend] = useState([]);

  
  

  const Post=async()=>{
   
    if(isLoading){
      Toast.show('Please wait',{position:Toast.position.TOP})
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
    const CheckStatus=await CreatePinnedPosts(UserID,Descrition,Pinned,Private,BusinessPost,Pins,UserLocation,image,Friends,video)
    
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
        <View style={{flexDirection:'row',justifyContent:'space-between',padding:20}}>
          <BlankSpace/>
          <Text style={{fontWeight:'bold'}}>Craete New Post </Text>
          <View>
         
          <Text onPress={()=>{setCoinModalVisible(!CoinmodalVisible)}} style={{color:'#4493F9'}}>Use Coins</Text>
           
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
        <View  style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={CoinmodalVisible}
            onRequestClose={() => {
              setCoinModalVisible(!CoinmodalVisible);
            }}>
            <TouchableOpacity onPress={()=>setCoinModalVisible(!CoinmodalVisible)} style={styles.centeredView}>
              <View style={styles.modalView}>
                <Image style={{width:'50%',height:'70%',resizeMode:'center'}} source={require('../../../assets/transfercoins.png')}/>
               <Text style={{fontWeight:'bold',marginBottom:'10%'}}>{route.params.OtherUserCoins} coins will be detucted</Text>
                <TouchableOpacity
                  style={{ ...styles.openButton, backgroundColor: '#FC9919' }}
                  onPress={() => {
                   SetisLoading(true), Post()
                  }}>
                    {isLoading?
                  <ActivityIndicator color={'#fff'}/>: 
                  <Text style={styles.textStyle}>Confirm</Text>}
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Modal>

          
        </View>
      </View>
    );
  
}

export default PostPage;


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