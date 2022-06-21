import React, { Component,useState,useEffect } from 'react';
import { View,Dimensions,ScrollView,Button,ActivityIndicator, Text ,TouchableOpacity,TextInput,Image, StyleSheet, Platform} from 'react-native';
import { EmailIcon, GuavaIconLogo, HashtagNameIcon, PersonIcon,DatetimeIcon, LockIcon, BackArrow, BlankSpace, DropDownIcon } from '../../assets/SvgIcons/AllIcons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'
import Toast from 'react-native-tiny-toast';
import { SignUpCheck } from '../Services/Authentication';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function ChangePassword ({navigation}) {

  const [UserName,SetUserName]=useState('Umar_Mughal')
  const [Name,SetName]=useState('Umar')
  const [UserEmail,SetUserEmail]=useState('umarmughal@gmail.com')
  const [UserDOB,SetUserDOB]=useState(null)
  const [UserPassword,SetUserPassword]=useState('aaaaaa')
  const [ErrorMessage,SetErrorMessage]=useState('')
  const [IsLoading,setIsLoading]=useState(false)


  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    var PresentDate=new Date()
    if(date>PresentDate){
      Toast.show('Invalid Date Selected',{position:Toast.position.TOP})
      return
    }
   
    var da= moment(date).format('DD-MM-YYYY')
   
    SetUserDOB(da)
    hideDatePicker();
  };


  const ValidateEmail = (email) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return (true)
    }

    return (false)
  }
  
  const CheckValidations=()=>{
    if(UserName==''){
      SetErrorMessage('User Name is not valid')
      return
    }else if(Name==''){
      SetErrorMessage('Name is not valid')
      return
    }else if (!ValidateEmail(UserEmail)) {
      SetErrorMessage('Email is not valid')
      return
    }else if(UserDOB==null){
      SetErrorMessage('Date of birth is not valid')
      return
    }
    else if(UserPassword.length<6){
      SetErrorMessage('Password is not valid')
      return
    }else{
      SetErrorMessage('')
      setIsLoading(true)
      SignUp()
    }
  }

  const SignUp=async()=>{
    try{
     if(IsLoading){
       Toast.show('Please wait',{position:Toast.position.TOP})
     }else{
       Toast.show('Conforming Record',{position:Toast.position.TOP})
       var CheckStatus=await SignUpCheck(UserName,Name,UserEmail,UserDOB,UserPassword)
      
      if(CheckStatus.error==false){
        setIsLoading(false)
        navigation.goBack(null)
        Toast.show(CheckStatus.success_msg,{position:Toast.position.TOP}) 
      }else{
        setIsLoading(false)
         Toast.show(CheckStatus.error_msg,{position:Toast.position.TOP})

      }

     }
   }catch(e){
     Toast.show('Error '+e,{position:Toast.position.TOP})
   }
  }
   
  
  

    return (
      <ScrollView style={{flex:1,backgroundColor:'#fff'}}>
        <View style={{flexDirection:'row',marginTop:15,justifyContent:'space-between'}}>  
          {/* <MaterialIcons onPress={()=>navigation.goBack(null)} style={{marginLeft:10}} name="keyboard-backspace" size={30} color="black" /> */}
          <TouchableOpacity style={{marginLeft:10}} onPress={()=>navigation.goBack(null)}>
            <BackArrow/>
          </TouchableOpacity>
          <GuavaIconLogo/>
          <BlankSpace/>
        </View>
        <Text style={{textAlign:'center',marginTop:30,fontSize:30,fontWeight:'bold'}}>Let’s Get Started!</Text>
        <Text style={{textAlign:'center',marginTop:10}}>Please fill the certains and create an account</Text>
  
        <View style={{margin:20}}>
          <View style={{height:windowHeight/15,backgroundColor:'#e5e5ea',borderRadius:25,flexDirection:'row',alignItems:'center',marginVertical:5}}>
            <View style={{backgroundColor:'#3A3A3C',width:50,height:windowHeight/15,borderRadius:30,alignItems:'center',justifyContent:'center'}}>
              <HashtagNameIcon/>
            </View>
            <TextInput onChangeText={(e)=>SetUserName(e)} style={{marginLeft:10,flex:1,marginRight:20}}  placeholder='James_Cadby_95'   placeholderTextColor={'#8e8e93'} />
          </View>
          <View style={{height:windowHeight/15,backgroundColor:'#e5e5ea',borderRadius:25,flexDirection:'row',alignItems:'center',marginVertical:5}}>
            <View style={{backgroundColor:'#3A3A3C',width:50,height:windowHeight/15,borderRadius:30,alignItems:'center',justifyContent:'center'}}>
              <PersonIcon/>
            </View>
            <TextInput onChangeText={(e)=>SetName(e)} style={{marginLeft:10,flex:1,marginRight:20}}  placeholder='James Cadby'   placeholderTextColor={'#8e8e93'} />
          </View>
          <View style={{height:windowHeight/15,backgroundColor:'#e5e5ea',borderRadius:25,flexDirection:'row',alignItems:'center',marginVertical:5}}>
            <View style={{backgroundColor:'#3A3A3C',width:50,height:windowHeight/15,borderRadius:30,alignItems:'center',justifyContent:'center'}}>
              <EmailIcon/>
            </View>
            <TextInput onChangeText={(e)=>SetUserEmail(e)} style={{marginLeft:10,flex:1,marginRight:20}}  placeholder='info@yourmail.com'   placeholderTextColor={'#8e8e93'} />
          </View>
          <View style={{height:windowHeight/15,backgroundColor:'#e5e5ea',borderRadius:25,flexDirection:'row',alignItems:'center',marginVertical:5}}>
            <View style={{backgroundColor:'#3A3A3C',width:50,height:windowHeight/15,borderRadius:30,alignItems:'center',justifyContent:'center'}}>
              <DatetimeIcon/>
            </View>
            <View style={{marginLeft:10,flex:1,marginRight:20}}  >
            {UserDOB==null?
              <Text style={{color:'#8e8e93'}}>12/6/1993</Text>
              :
              <Text style={{color:'#8e8e93'}}>{UserDOB}</Text>
            }
            </View>
            <TouchableOpacity onPress={()=>showDatePicker()} style={{marginRight:10}}>
            <DropDownIcon/>
            </TouchableOpacity>
          </View>
          <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
          />
          <View style={{height:windowHeight/15,backgroundColor:'#e5e5ea',borderRadius:25,flexDirection:'row',alignItems:'center',marginVertical:5}}>
            <View style={{backgroundColor:'#3A3A3C',width:50,height:windowHeight/15,borderRadius:30,alignItems:'center',justifyContent:'center'}}>
              <LockIcon/>
            </View>
            <TextInput onChangeText={(e)=>SetUserPassword(e)}  style={{marginLeft:10,flex:1,marginRight:20}}  placeholder='xxxxxxxxx ... minumum 6 digit'   placeholderTextColor={'#8e8e93'} />
          </View>
          
            
        </View>
        <Text style={{textAlign:'center',color:'red',marginBottom:10}}>{ErrorMessage}</Text>
        <View style={{alignSelf:'center',width:'80%'}}>
          <TouchableOpacity onPress={()=>CheckValidations()} style={{width:'100%',justifyContent:'center',alignItems:'center',borderRadius:10,height:60,backgroundColor:'#FF9F0A'}}>
          {IsLoading?
            <ActivityIndicator color={'#fff'}/>
            :
            <Text style={{justifyContent:'center',alignItems:'center',fontWeight:'bold',fontSize:18,color:'#fff'}}>Sign UP</Text>
          }
          </TouchableOpacity>
        </View>
        {Platform.OS=='ios'? <View style={{alignSelf:'center',height:250}}/>:null}
        
        
      </ScrollView>
    );
  
}
const styles=StyleSheet.create({
    text:{
        fontWeight:'700',
        color:'gray',
        marginLeft:20
    },
    TextInputContainer:{
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
})
