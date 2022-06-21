import  React,{useState,useEffect,useContext,createContext} from 'react';
import {View,Text,TouchableOpacity ,SafeAreaView,Image} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
//websocket
import {NotificationsBasePath} from './Screens/Services/BasePath'
import { Fontisto,AntDesign,Ionicons,MaterialCommunityIcons,Entypo,MaterialIcons,FontAwesome5 } from '@expo/vector-icons';

//Screens
import Login from './Screens/AuthPages/Login'
import CheckLoginApp from './Screens/AuthPages/CheckLoginApp'
import ForgotPassword from './Screens/AuthPages/ForgotPassword';
import SignUp from './Screens/AuthPages/SignUp'
import Picture_Comment from './Screens/BottomTab/Feeds/Comment';
//Tab Pages
import Dashboard from './Screens/BottomTab/Home/Dashboard';
import FeedDashboard from './Screens/BottomTab/Feeds/Feed_Dashboard'
import VideoDashboard from './Screens/BottomTab/Video/Home'
import ConnectDashboard from './Screens/BottomTab/ConnectPages/Connect_Dashboard'
import SettingDashboard from './Screens/BottomTab/Setting/Setting_Dashboard'
import { MenuIcon,ConnectPeoPleIcon,PlayerIcon,HomeIcon,BellIcon } from './assets/SvgIcons/AllIcons';
import {  GetAllNotification,GetAllConnectRequest, ReturnUserRecordAsync } from './Screens/Services/Authentication';

import ShowLocationAddedByUser from './Screens/BottomTab/Feeds/ShowLocationAddedByUser'
import AsyncStorage from '@react-native-community/async-storage';
export const ThemeContext=createContext()
const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();


function MyTabs() {


  const Dark=useContext(ThemeContext)

  // const [Notifications,NotificationFocused]=useState(false)
  // const [Home,HomeFocused]=useState(false)
  // const [Video,VideoFocused]=useState(false)
  // const [Connect,ConnectFocused]=useState(false)
  // const [Setting,SettingFocused]=useState(false)

  return (
    // <ThemeContext.Provider value={[notification,connectrequest]}>
    <Tab.Navigator 
  
      // activeColor="#061B21"
      initialRouteName={'Home'}
      activeColor="black"
      inactiveColor="grey"
      labelStyle={{ fontSize: 12, fontWeight: "bold" }}
      tabBarOptions={{ showLabel: false }}
      barStyle={{ backgroundColor: "#E5E5E5" }}
  
    >
      <Tab.Screen
      
        options={{
          tabBarHideOnKeyboard:true,
          tabBarBadge:Dark[0]==0?null:Dark[0],
          headerShown:false,
         
          tabBarLabel: <Text style={{ fontSize: 10, color: '#5E5F71', fontWeight: 'bold',marginTop:10 }}>  </Text>,
          tabBarIcon: ({ color }) => (
            <BellIcon/>
          ),
        }}
        name="Feed" 
        component={Dashboard} 
      />
      
      <Tab.Screen
        options={{
          tabBarHideOnKeyboard:true,
          headerShown:false,
          tabBarLabel: <Text style={{ fontSize: 10, color: '#5E5F71', fontWeight: 'bold' }}>  </Text>,
          tabBarIcon: ({ color }) => (
            // <AntDesign name="home" size={24} color={color} />
            <HomeIcon/>
          ),
        }}
        name="Home" 
        component={FeedDashboard} 
      />
      
      <Tab.Screen 
       options={{
        tabBarHideOnKeyboard:true,
        headerShown:false,
        tabBarLabel: <Text style={{ fontSize: 10, color: '#5E5F71', fontWeight: 'bold' }}>  </Text>,
        tabBarIcon: ({ color }) => (
          // <Entypo name="video-camera" size={24} color={color}  />
          <PlayerIcon/>
        ),
      }}
      name="Video" 
      component={VideoDashboard} 
      />
      <Tab.Screen 
      options={{
        tabBarHideOnKeyboard:true,
      headerShown:false,
      tabBarBadge: Dark[1]==0?null:Dark[1],
        tabBarLabel: <Text style={{ fontSize: 10, color: '#5E5F71', fontWeight: 'bold' }}>  </Text>,
        tabBarIcon: ({ color }) => (
          // <MaterialCommunityIcons name="heart-plus" size={24} color={color} />
          <ConnectPeoPleIcon/>
        ),
      }}
      
      name="Connect" component={ConnectDashboard} />
      <Tab.Screen
        options={{
          headerShown:false,
          tabBarLabel: <Text style={{ fontSize: 10, color: '#5E5F71', fontWeight: 'bold' }}>  </Text>,
          tabBarIcon: ({ color }) => (
            // <Entypo name="menu" size={24} color={color}  />
            <MenuIcon/>
          ),
        }}
      name="Setting" component={SettingDashboard} />


    </Tab.Navigator>
    // </ThemeContext.Provider>
  );
}



export default function App() {
  const Context=useContext(ThemeContext)

  var ws;
connection = (id) => {

  
  try{
  ws = new WebSocket(NotificationsBasePath+id+'/');

    ws.onopen = () => {
      console.log('Start Connectio notification');
      alert('Socket start')
    };

    ws.onmessage = e => {
      
      const data = JSON.parse(e.data);
      
      console.log('onmessage.........')
      console.log(data)
      if(data.type=='message_count'){
        //set message count
        SetAllMessageRequest(data.count)
       
      }
      if(data.type=='post_notifications'){
      
        //set request count
        // let SetAllConnectRequest=Context[5]
        SetAllConnectRequest(data.requests_count)
        //set notification count
        // let SetAllNotification=Context[4]
        SetAllNotification(data.notifications_count)
        // set notification array
        // let SetNotificationArray=Context[9]
        SetNotificationArray(data.notifications)

      }
      console.log(data)
     console.log('onmessage.........')
      
    };
    ws.onerror = e => {
      console.log('error',JSON.stringify(e));
    // alert('error connection for id '+id)
    

    };
    ws.onclose = e => {
      console.log('onclose',  JSON.stringify(e));
      // connection(id)
      // alert('close connection for id '+id)
    };

  } catch (error) {
    console.log(error);
    // Handle error
    return console.warn(error);
  }
}

  const [notification,setnotification]=useState(null)
  const [connectrequest,setconnectrequest]=useState(null)
  const [messagerequest,setmessagerequest]=useState(0)
  const [NotificationArray,GetNotificationArray]=useState([])
  const SeenAllNotification=()=>{
    setnotification(null)
  }
  const SetAllNotification=(count)=>{
    setnotification(count)
  }
  const SetAllConnectRequest=(count)=>{
    setconnectrequest(count)
  }

  const SeenAllConnectRequest=()=>{
    setconnectrequest(null)
  }
  const SetAllMessageRequest=(count)=>{
    setmessagerequest(count)
  }

  const SeenAllMessageRequest=()=>{
    setmessagerequest(null)
  }

  const SetNotificationArray=(ara)=>{
    GetNotificationArray(ara)
  }
  
  useEffect(()=>{
    GetUser();
    // alert('called again')
  },[])
  const GetUser=async()=>{
    // var data= await ReturnUserRecordAsync()
    // var isloggedin=await AsyncStorage.getItem("userLoggedin")
      // if(isloggedin=="0"){
      //     alert('not logged in'+isloggedin)
      // }else{
      //   alert('now login'+isloggedin)
      //   // connection(data[4])
      // }
  }

  
    
  return (
    
    <View style={{flex:1}}>

      <SafeAreaView style={{flex:1}}>
        <ThemeContext.Provider value={[notification,connectrequest,SeenAllNotification,SeenAllConnectRequest,SetAllNotification,SetAllConnectRequest,SetAllMessageRequest,SeenAllMessageRequest,messagerequest,SetNotificationArray,NotificationArray]}>
          <NavigationContainer>
            <Stack.Navigator>

              <Stack.Screen name="CheckLoginApp" component={CheckLoginApp}  options={{headerShown:false}} />      
              <Stack.Screen name="Home" component={Login}  options={{headerShown:false}} />      
              <Stack.Screen name="Dashboard" component={MyTabs} options={{headerShown:false}}  />
              <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerShown:false}}  />
              <Stack.Screen name="SignUp" component={SignUp} options={{headerShown:false}}  />
              
              <Stack.Screen name="ShowLocationAddedByUser" component={ShowLocationAddedByUser} options={{headerShown:false}}  />
              

            </Stack.Navigator>
          </NavigationContainer>
        </ThemeContext.Provider>
      </SafeAreaView>
    </View> 
  );
}
