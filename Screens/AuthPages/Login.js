import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TextInput, TouchableOpacity, ActivityIndicator, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Facebook from 'expo-facebook';
import Toast from 'react-native-tiny-toast'
import { GetFollowerRecordAsync, GetUseridAsync, GetFollowingRecordAsync, GetUserRecordAsync, LoginCheck, FacebookLogin, registerForPushNotificationsAsync, GetCollaborationRequest, RetrivePartnershipRequest, ReturnUserRecordAsync } from '../Services/Authentication'
// import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-community/async-storage';
import { EmailIcon, LockIcon } from '../../assets/SvgIcons/AllIcons';
import { NotificationsBasePath } from '../Services/BasePath';
import { ThemeContext } from '../../App';
// import { MailIcon } from '../../assets/SvgIcons/AllIcons';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function App({ navigation }) {
  const [email, setemail] = useState('umarmughal6899@gmail.com')
  const [password, setpassword] = useState('aaaaaa')
  const [securetext, notsecure] = useState(true)
  const [IsLoading, setIsLoading] = useState(false)
  const [ErrorMessage, SetErrorMessage] = useState('')
  const Context = useContext(ThemeContext)
  const FbLogin = async () => {
    const data = await FacebookLogin()
    if (data) {
      alert('Login')
    } else {
      alert('else Login')
    }
  }
  //Create Socket Connection

  var ws;
  connection = (id) => {

    // alert(id)
    try {
      ws = new WebSocket(NotificationsBasePath + id + '/');

      ws.onopen = () => {
        console.log('Start Connectio notification');
        alert('Login Socket start')
      };

      ws.onmessage = e => {

        const data = JSON.parse(e.data);

        console.log('onmessage.........')
        console.log(data)
        if (data.type == 'message_count') {
          //set message count
          SetAllMessageRequest(data.count)

        }
        if (data.type == 'post_notifications') {
          //set request count

          let SetAllConnectRequest = Context[5]

          SetAllConnectRequest(data.requests_count)
          //set notification count
          let SetAllNotification = Context[4]
          SetAllNotification(data.notifications_count)
          // set notification array
          let SetNotificationArray = Context[9]
          SetNotificationArray(data.notifications)

        }
        console.log(data)
        console.log('onmessage.........')

      };
      ws.onerror = e => {
        console.log('error', JSON.stringify(e));
        //  alert('error connection for id '+id)


      };
      ws.onclose = e => {
        console.log('onclose', JSON.stringify(e));
        // connection(id)

        //  alert('close connection for id '+id)
      };

    } catch (error) {
      console.log(error);
      // Handle error
      return console.warn(error);
    }
  }
  const Login = async () => {

    try {
      if (IsLoading) {
        Toast.show('Please wait', { position: Toast.position.TOP })
      } else {
        Toast.show('Conforming Record', { position: Toast.position.TOP })
        var CheckStatus = await LoginCheck(email, password)


        if (CheckStatus.error == false) {
          GetUseridAsync(JSON.stringify(CheckStatus.user.pk))
          GetUserRecordAsync(JSON.stringify(CheckStatus.user.fields))
          GetFollowerRecordAsync(JSON.stringify(CheckStatus.followers))
          GetFollowingRecordAsync(JSON.stringify(CheckStatus.followings))
          GetCollaborationRequest(JSON.stringify(CheckStatus.collaboration_requests))
          let record = await ReturnUserRecordAsync()
          let user_id = JSON.parse(record[4])
          // alert(user)
          // connection(user_id)
          navigation.replace('Dashboard')

          setIsLoading(false)
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






  const ValidateEmail = (email) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return (true)
    }

    return (false)
  }

  const CheckValidations = () => {
    if (!ValidateEmail(email)) {
      SetErrorMessage('Email is not valid')
      return
    } else if (password.length < 6) {
      SetErrorMessage('Password is not valid')
      return
    }
    else {
      SetErrorMessage('')
      setIsLoading(true)
      Login()
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.img}>
        <Image source={require('../../assets/login_logo.png')} style={{ width: windowWidth, height: windowHeight / 5, resizeMode: 'contain', }} />
      </View>

      <View style={{ marginHorizontal: windowWidth / 20, flex: 1, }}>
        <View style={{ marginTop: 20 }}>
          <View style={{ height: 50, backgroundColor: '#e5e5ea', borderRadius: 25, flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ backgroundColor: '#3A3A3C', width: 50, height: 50, borderRadius: 30, alignItems: 'center', justifyContent: 'center' }}>
              <EmailIcon />
            </View>
            <TextInput style={{ marginLeft: 10, flex: 1, marginRight: 20 }} placeholder='Email' onChangeText={(e) => setemail(e)} placeholderTextColor={'#8e8e93'} />
          </View>
          <View style={{ height: 50, backgroundColor: '#e5e5ea', borderRadius: 25, marginTop: windowHeight / 50, flexDirection: 'row' }}>
            <View style={{ backgroundColor: '#3A3A3C', width: 50, height: 50, borderRadius: 30, alignItems: 'center', justifyContent: 'center' }}>
              <LockIcon />
            </View>
            <TextInput style={{ marginLeft: 10, flex: 1, marginRight: 20 }} secureTextEntry={securetext} placeholder='Password' onChangeText={(p) => setpassword(p)} placeholderTextColor={'#8e8e93'} />
            <TouchableOpacity onPress={() => notsecure(!securetext)} style={{ width: 40, justifyContent: 'center', }}>
              {!securetext ?
                <Ionicons name="eye" size={24} color="#3a3a3c" />

                :
                <Ionicons name="eye-off" size={24} color="#3a3a3c" />
              }
            </TouchableOpacity>
          </View>

          <Text onPress={() => navigation.navigate('ForgotPassword')} style={{ alignSelf: 'flex-end', marginRight: 10, marginTop: 20, fontWeight: 'bold' }}>Forgot Password?</Text>

        </View>
        {/* navigation.replace('Dashboard') */}
        <Text style={{ textAlign: 'center', color: 'red', marginBottom: 10 }}>{ErrorMessage}</Text>

        <TouchableOpacity onPress={() => { CheckValidations() }} style={{ borderRadius: 20, padding: 10, backgroundColor: '#fa9522', justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
          {IsLoading ?
            <ActivityIndicator color={'#fff'} />
            :
            <Text style={{ color: 'white', fontSize: 17 }}>Log-in</Text>}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => FbLogin()} style={{ borderRadius: 20, padding: 10, backgroundColor: '#4493f9', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
          <Text style={{ color: 'white', fontSize: 17 }}>Log-in with facebook</Text>
        </TouchableOpacity>
        <View style={{ marginTop: 40, justifyContent: 'center', flexDirection: 'row' }}>
          <Text>Don't have an account yet?   </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={{ color: '#4493f9', fontWeight: 'bold', borderBottomWidth: 1, borderBottomColor: '#4493f9', }}>SIGN UP</Text>
          </TouchableOpacity>
        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  img: {
    height: windowHeight / 3,
    justifyContent: 'flex-end',
    paddingBottom: 20
  }
});