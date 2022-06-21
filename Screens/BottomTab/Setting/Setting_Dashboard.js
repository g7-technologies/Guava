import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './HomePage';
import ManageAccount from './EditProfile';
import PrivacyPolicy from './PrivacyPolicy';
import ChangePassword from './ChangePassword';
import GuavaPoints from './GuavaPoints';
import MyFollowers from './MyFollowers';
import MyFollowings from './MyFollowings';
import EditProfile from './ManageAccount';
import ProfileSettings from './ProfileSettings';
import AccountPrivacy from './AccountPrivacy'
import Notification from './Notification'
import Transaction from './Transactions';
import SetPrice from './SetPrice'
import Wallet from './Wallet'
import EditPersonalProfile from './ChangeEmail';
import Followers from './Followers'
import WidthDraw from './WithdrawRequest'
import OtherPersonProfile from '../Feeds/OtherPersonProfile';
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomePage} options={{headerShown:false}}/>
      <Stack.Screen name="ProfileSetting" component={ProfileSettings} options={{headerShown:false}}/>

      <Stack.Screen name="ManageAccount" component={ManageAccount}  options={{headerShown:false}} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy}  options={{headerShown:false}} />
      <Stack.Screen name="ChangePassword" component={ChangePassword}  options={{headerShown:false}} />
      <Stack.Screen name="GuavaPoints" component={GuavaPoints} options={{headerShown:false}}/>
     
      <Stack.Screen name="Followers" component={Followers} options={{headerShown:false}}/>

      <Stack.Screen name="EditProfile" component={EditProfile} options={{headerShown:false}}/>
      <Stack.Screen name="AccountPrivacy" component={AccountPrivacy} options={{headerShown:false}}/>
      <Stack.Screen name="Notification" component={Notification} options={{headerShown:false}}/>
      <Stack.Screen name="Transaction" component={Transaction} options={{headerShown:false}}/>
      <Stack.Screen name="SetPrice" component={SetPrice} options={{headerShown:false}}/>
      <Stack.Screen name="Wallet" component={Wallet} options={{headerShown:false}}/>
      <Stack.Screen name="PersonalProfile" component={EditPersonalProfile} options={{headerShown:false}}/>
      
      <Stack.Screen name="WidthDraw" component={WidthDraw} options={{headerShown:false}}/>
      <Stack.Screen name="OtherPersonProfile" component={OtherPersonProfile} options={{headerShown:false}}/>
      
      


    </Stack.Navigator>
  );
}
export default MyStack