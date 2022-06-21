import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { StyleSheet,ScrollView,ActivityIndicator, Text,TextInput, View,Dimensions, TouchableOpacity,Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import { BackArrow } from '../../../assets/SvgIcons/AllIcons';
import CommonHeader from '../../../Components/CommonHeader';
import { GetUserRecordAsync, ReturnUserRecordAsync, SetWalletPrice } from '../../Services/Authentication';
import Toast from 'react-native-tiny-toast';
import { ImageBasePath } from '../../Services/BasePath';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function App({navigation}) {
  const [UserID,GetUserID]=useState('')
  const [UserImage,GetUserImage]=useState('')

  const [IsLoading,setIsLoading]=useState(false)
  const [Price,SetPrice]=useState(null)


  useEffect(()=>{
    GetUserInfo()
  },[])


  GetUserInfo=async()=>{
    var UserRecord=await ReturnUserRecordAsync()
    var price=(UserRecord[0].post_coins).toString()
    GetUserImage(UserRecord[0].image)
    SetPrice(price)
    GetUserID(UserRecord[4])
   
   
  }
  CheckValidation=()=>{
    if(Price==0){
      alert('Please Update Price')
      return
    }else{
      Update()
    }
  }
  Update=async()=>{
    try{
    
    
    setIsLoading(true)
    var CheckStatus=await SetWalletPrice(UserID,Price)
    if(CheckStatus.error==false){
      
     GetUserRecordAsync(JSON.stringify(CheckStatus.user.fields) )
   
      navigation.goBack(null)
     setIsLoading(false)
    }else{
      setIsLoading(false)
       Toast.show(CheckStatus.error_msg,{position:Toast.position.TOP})

    }
  }catch(e){
    setIsLoading(false)
      Toast.show('Error Occure'+e)
  }
    
  }

  return (


    
    <ScrollView style={styles.container}>
      {Platform.OS=='android'&&
     
     <View style={{marginTop:25}}/>}
        <CommonHeader navigation={navigation} Name={'Set Price'}/>


        <View style={{height:300,backgroundColor:'#f2f2f7',marginTop:windowHeight/8,alignItems:'center',margin:10,borderRadius:20}}>
        <View style={{borderRadius:100,borderWidth:10,bottom:50,borderColor:"#fff"}}>
        <Image source={{uri:ImageBasePath+UserImage}} style={{width:windowHeight/8,height:windowHeight/8,borderRadius:100,resizeMode:'cover'}}/>
        </View> 
            {/* <Image source={require('../assets/dummy.png')} style={{width:windowHeight/8,height:windowHeight/8,resizeMode:'contain',borderRadius:50,marginTop:-windowHeight/15,}}/> */}
            <Text style={{fontWeight:'bold',fontSize:17,marginTop:10}}>James Cadby</Text>
            <Text style={{fontSize:15,marginTop:20}}>Your Coins Price Per Post</Text>
            <View style={{flexDirection:'row',marginTop:20,alignItems:'center',justifyContent:'center'}}>
              <TextInput defaultValue={Price}  keyboardType='number-pad' onChangeText={(e)=>SetPrice(e)} maxLength={4} style={{fontSize:20,textAlign:'center',width:'100%',padding:10,fontWeight:'bold'}}/>
            </View>
        </View>
        <View style={{flex:1,justifyContent:'flex-end',marginBottom:50}}>
            <TouchableOpacity  onPress={()=>CheckValidation()} style={{borderRadius:30,padding:15,backgroundColor:'#fa9522',justifyContent:'center',alignItems:'center',marginTop:30,marginHorizontal:windowWidth/20,}}>
            {IsLoading?
                <ActivityIndicator color={'#fff'}/>
                :
                  <Text style={{color:'white',fontSize:17}}>Confirm</Text>
            }
            </TouchableOpacity>
        </View>
  
       <StatusBar style="auto" />
    </ScrollView>
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
  }
});