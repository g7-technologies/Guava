import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import CreatePostHome from './Images'
import Dashboard from './PostPage'
import CreatePost from './CreatePosts'
import TakePhoto from './TakePicture'
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CreatePost" component={CreatePost} options={{headerShown:false}}/>
      
      <Stack.Screen name="Home" component={CreatePostHome} options={{headerShown:false}}/>
      <Stack.Screen name="Dashboard" component={Dashboard} options={{headerShown:false}}/>
      <Stack.Screen name="TakePhoto" component={TakePhoto} options={{headerShown:false}}/>
     
  
    </Stack.Navigator>
  );
}
export default MyStack