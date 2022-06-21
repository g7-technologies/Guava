import React, { Component, useState, useEffect } from 'react';
import { View, Dimensions, ScrollView, Button, ActivityIndicator, Text, TouchableOpacity, TextInput, Image, StyleSheet, Platform } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import * as ImagePicker from 'expo-image-picker';
import { BackArrow, BlankSpace, LockIcon, HashtagNameIcon, PersonIcon, EmailIcon, DatetimeIcon, UpdateButton, DropDownIcon } from '../../../assets/SvgIcons/AllIcons';
import CommonHeader from '../../../Components/CommonHeader';
import { GetUserRecordAsync, ManageAccount, ManageBusinessAccount, ReturnUserRecordAsync } from '../../Services/Authentication';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ImageBasePath } from '../../Services/BasePath';
import moment from 'moment'
import Toast from 'react-native-tiny-toast';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function ChangePassword({ navigation }) {

  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);


  const [AsyncAimage, SetAsyncImage] = useState(null);

  const [UserName, SetUserName] = useState(null);
  const [Name, SetName] = useState(null);
  const [Bio, SetBio] = useState(null)
  const [IsLoading, setIsLoading] = useState(false)
  const [UserDOB, SetUserDOB] = useState(null)
  const [UserID, SetUserID] = useState(null)
  const [ErrorMessage, SetErrorMessage] = useState('')


  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    var PresentDate = new Date()
    if (date > PresentDate) {
      Toast.show('Invalid Date Selected', { position: Toast.position.TOP })
      return
    }

    var da = moment(date).format('DD-MM-YYYY')
    SetUserDOB(da)

    hideDatePicker();
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true
    });


    if (!result.cancelled) {
      setImage(result.uri);
      setImageBase64(`data:image/jpg;base64,${result.base64}`)
    }
  };

  useEffect(() => {
    GetUserInfio()
  }, [])
  const GetUserInfio = async () => {
    var Data = await ReturnUserRecordAsync()
    var user = Data[0];
    var id = Data[4];

    // setImage(user.image)
    SetAsyncImage(user.business_image)
    SetUserName(user.username)
    SetName(user.business_name)
    SetUserDOB(user.dob)
    SetUserID(id)
    SetBio(user.business_description)

  }
  const CheckValidations = () => {
    if (Name == '') {
      SetErrorMessage('Name is not valid')
      return
    } else if (Bio == '') {
      SetErrorMessage('Bio is not valid')
      return
    } else {
      SetErrorMessage('')
      setIsLoading(true)
      UpdateProfile()
    }
  }

  const UpdateProfile = async () => {
    try {
      if (IsLoading) {
        Toast.show('Please wait', { position: Toast.position.TOP })
      } else {
        Toast.show('Conforming Record', { position: Toast.position.TOP })
        var CheckStatus = await ManageBusinessAccount(UserID, Name, Bio, imageBase64)


        if (CheckStatus.error == false) {
          GetUserRecordAsync(JSON.stringify(CheckStatus.user.fields))

          setIsLoading(false)
          navigation.goBack(null)
          Toast.show(CheckStatus.success_msg, { position: Toast.position.TOP })
        } else {
          setIsLoading(false)
          Toast.show(CheckStatus.error_msg, { position: Toast.position.TOP })
        }

      }
    } catch (e) {
      setIsLoading(false)
      Toast.show('Error ' + e, { position: Toast.position.TOP })
    }
  }


  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ marginTop: 20 }} />
      <CommonHeader navigation={navigation} Name={'Manage Business Profile'} />
      <View style={{ marginTop: 50, alignSelf: 'center' }}>
        {/* <GuavaIconLogo/> */}


        <TouchableOpacity onPress={pickImage}>
          {image == null ?
            <Image source={{ uri: `${ImageBasePath}${AsyncAimage}` }} style={{ alignSelf: 'center', width: 100, height: 100, borderRadius: 100 }} />
            :
            <Image source={{ uri: image }} style={{ alignSelf: 'center', width: 100, height: 100, borderRadius: 100 }} />
          }
        </TouchableOpacity>
        <Text style={{ fontSize: 10, textAlign: 'center', marginTop: 8 }}>Gava Business Logo </Text>
      </View>
      <View style={{ margin: 20 }}>
        {/* <View style={{height:windowHeight/15,backgroundColor:'#e5e5ea',borderRadius:25,flexDirection:'row',alignItems:'center',marginVertical:5}}>
            <View style={{backgroundColor:'#3A3A3C',width:50,height:windowHeight/15,borderRadius:30,alignItems:'center',justifyContent:'center'}}>
              <HashtagNameIcon/>
            </View>
            <TextInput style={{marginLeft:10,flex:1,marginRight:20}}  placeholder='James_Cadby_95'  onChangeText={(e)=>SetUserName(e)} defaultValue={UserName} placeholderTextColor={'#8e8e93'} />
          </View> */}
        <View style={{ height: windowHeight / 15, backgroundColor: '#e5e5ea', borderRadius: 25, flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
          <View style={{ backgroundColor: '#3A3A3C', width: 50, height: windowHeight / 15, borderRadius: 30, alignItems: 'center', justifyContent: 'center' }}>
            <PersonIcon />
          </View>
          <TextInput style={{ marginLeft: 10, flex: 1, marginRight: 20 }} placeholder='Business Name' onChangeText={(e) => SetName(e)} defaultValue={Name} placeholderTextColor={'#8e8e93'} />
        </View>
        <View style={{ height: windowHeight / 15, backgroundColor: '#e5e5ea', borderRadius: 25, flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
          <View style={{ backgroundColor: '#3A3A3C', width: 50, height: windowHeight / 15, borderRadius: 30, alignItems: 'center', justifyContent: 'center' }}>
            <AntDesign name="exclamationcircleo" size={24} color="#fff" />
          </View>
          <TextInput style={{ marginLeft: 10, flex: 1, marginRight: 20 }} placeholder='About Your Business' onChangeText={(e) => SetBio(e)} defaultValue={Bio} placeholderTextColor={'#8e8e93'} />
        </View>
        {/* <View style={{height:windowHeight/15,backgroundColor:'#e5e5ea',borderRadius:25,flexDirection:'row',alignItems:'center',marginVertical:5}}>
            <View style={{backgroundColor:'#3A3A3C',width:50,height:windowHeight/15,borderRadius:30,alignItems:'center',justifyContent:'center'}}>
              <EmailIcon/>
            </View>
            <TextInput style={{marginLeft:10,flex:1,marginRight:20}}  placeholder='info@yourmail.com'  onChangeText={(e)=>setemail(e)} placeholderTextColor={'#8e8e93'} />
          </View> */}
        {/* <View style={{height:windowHeight/15,backgroundColor:'#e5e5ea',borderRadius:25,flexDirection:'row',alignItems:'center',marginVertical:5}}>
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
          </View> */}
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        {/* <View style={{height:windowHeight/15,backgroundColor:'#e5e5ea',borderRadius:25,flexDirection:'row',alignItems:'center',marginVertical:5}}>
            <View style={{backgroundColor:'#3A3A3C',width:50,height:windowHeight/15,borderRadius:30,alignItems:'center',justifyContent:'center'}}>
              <LockIcon/>
            </View>
            <TextInput style={{marginLeft:10,flex:1,marginRight:20}}  placeholder='xxxxxxxxx'  onChangeText={(e)=>setemail(e)} placeholderTextColor={'#8e8e93'} />
          </View> */}


      </View>
      <Text style={{ textAlign: 'center', color: 'red', marginBottom: 10 }}>{ErrorMessage}</Text>

      <View style={{ alignSelf: 'center', width: '80%' }}>
        <TouchableOpacity onPress={() => { CheckValidations() }} style={{ borderRadius: 40, padding: 10, height: 50, backgroundColor: '#fa9522', justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
          {IsLoading ?
            <ActivityIndicator color={'#fff'} />
            :
            <Text style={{ color: 'white', fontSize: 17 }}>Update</Text>}
        </TouchableOpacity>
      </View>
      {Platform.OS == 'ios' ? <View style={{ alignSelf: 'center', height: 250 }} /> : null}


    </ScrollView>
  );

}
const styles = StyleSheet.create({
  text: {
    fontWeight: '700',
    color: 'gray',
    marginLeft: 20
  },
  TextInputContainer: {
    margin: 20,
    width: '90%',
    height: 60,
    borderRadius: 10,
    backgroundColor: '#E5E5EA',
    // justifyContent:'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20
  },
})
