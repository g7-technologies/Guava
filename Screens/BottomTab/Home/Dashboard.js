import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home'
import ConnectDashboard from '../ConnectPages/Connect_Dashboard'
import OtherPersonProfile from '../Feeds/OtherPersonProfile'
import EditProfile from '../Setting/EditProfile'
import SinglePost from './SinglePost'
import Picture_Comment from '../Feeds/Comment'
import ReplyComment from '../Feeds/Reply';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>     
      <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
      <Stack.Screen name="ConnectDashboard" component={ConnectDashboard} options={{headerShown:false}}/>
      <Stack.Screen name="OtherPersonProfile" component={OtherPersonProfile} options={{headerShown:false}}/>
      <Stack.Screen name="EditProfile" component={EditProfile} options={{headerShown:false}}/>
      <Stack.Screen name="SinglePost" component={SinglePost} options={{headerShown:false}}/>
      <Stack.Screen name="PicComment" component={Picture_Comment}  options={{headerShown:false}}  />
      <Stack.Screen name="Reply" component={ReplyComment} options={{headerShown:false}}/> 
    </Stack.Navigator>
  );
}
export default MyStack