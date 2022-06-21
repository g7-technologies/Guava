import React, { Component,useContext, useState } from 'react';
import { View, Text ,FlatList} from 'react-native';
import { ThemeContext } from '../../../App';
import Notifications from '../../../Components/Notifications';
import { ReturnUserRecordAsync, SeenNotifications } from '../../Services/Authentication';

export default function Dashboard ({navigation}) {
  const [Notification,GetNotification]=useState([])
  const [UserID,GetUserID]=useState('')

  const Context=useContext(ThemeContext)
 
 React.useEffect(()=>{
  GetUserInfo()
 },[])
 const GetUserInfo=async()=>{
   let user=await ReturnUserRecordAsync()
   GetUserID(user[4])
 }
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', (e) => {
      
    var SeenAllNotification=Context[2]

    SeenAllNotification()
      let NotificationArray=Context[10]
   
    
      GetNotification(NotificationArray)

      // SeenNotifications(UserID)

    });

    return unsubscribe;
  }, [navigation]);

 
    return (
      <View style={{flex:1,backgroundColor:'#fff'}}>
        <View style={{height:50,justifyContent:'center',alignItems:'center'}}>
          <Text style={{textAlign:'center',fontWeight:'bold'}}>Notifications</Text>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={Notification}
          renderItem={({ item, index, separators }) => (
            <Notifications navigation={navigation} Myid={UserID} sender={item.sender} Message={item.notifications} index={index}/>
          )}
        />
      </View>
    );
  
}


