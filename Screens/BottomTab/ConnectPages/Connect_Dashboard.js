import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import PartnerShip from './PartnerShip';
import EditProfile from './BusinessProfile';
import OtherPersonProfile from '../Feeds/OtherPersonProfile'

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="PartnerShip" component={PartnerShip} options={{ headerShown: false }} />
      <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
      <Stack.Screen name="OtherPersonProfile" component={OtherPersonProfile} options={{ headerShown: false }} />


    </Stack.Navigator>
  );
}
export default MyStack