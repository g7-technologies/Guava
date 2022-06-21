import React, { Component,useState } from 'react';
import { StyleSheet,View, Switch,Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons,MaterialCommunityIcons,FontAwesome5,MaterialIcons ,AntDesign} from '@expo/vector-icons'; 
import { RemoveUserRecordAsync } from '../../Services/Authentication';
import { GuavaPointIcon, PrivacyPolicyIcon, ProfileSettingIcon, SetPriceIcon, WalletIcon } from '../../../assets/SvgIcons/AllIcons';

export default function HomePage ({navigation}) {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  

 async function Logout(){
    navigation.replace('CheckLoginApp')
    await RemoveUserRecordAsync()
  }
    return (
      <View style={{flex:1,backgroundColor:'#fff',}}>
        <View style={{margin:20}}>
            <View style={{justifyContent:'center',alignItems:'center',padding:10,}}>
                <Text style={{fontWeight:'bold',}}>Settings</Text>
            </View>
            <TouchableOpacity onPress={()=>navigation.navigate('ProfileSetting')}style={styles.continer}> 
                <View style={styles.subContainer}>
                    <ProfileSettingIcon/>
                    <Text style={{marginLeft:10}}>Profile Settings</Text>
                </View>
                <Ionicons name="chevron-forward" size={24}  />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('ManageAccount')}style={styles.continer}> 
                <View style={styles.subContainer}>
                <Ionicons name="person-outline" size={24} color="#3A3A3C" />
                    <Text style={{marginLeft:10}}>View Profile</Text>
                </View>
                <Ionicons name="chevron-forward" size={24}  />
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={()=>navigation.navigate('ChangePassword')} style={styles.continer}> 
                <View style={styles.subContainer}>
                    <AntDesign name="unlock" size={24} color="#3A3A3C" />
                    <Text style={{marginLeft:10}}>Change Password</Text>
                </View>
                <Ionicons name="chevron-forward" size={24}  />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('PersonalProfile')} style={styles.continer}> 
                <View style={styles.subContainer}>
                <MaterialCommunityIcons name="email-edit-outline" size={24} color="black" />

                    <Text style={{marginLeft:10}}>Change Email</Text>
                </View>
                <Ionicons name="chevron-forward" size={24}  />
            </TouchableOpacity> */}

            <TouchableOpacity onPress={()=>navigation.navigate('GuavaPoints')} style={styles.continer}> 
                <View style={styles.subContainer}>
                    <GuavaPointIcon/>
                    <Text style={{marginLeft:10}}>Guava Points</Text>
                </View>
                <Ionicons name="chevron-forward" size={24}  />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('PrivacyPolicy')} style={styles.continer}> 
                <View style={styles.subContainer}>
                    <PrivacyPolicyIcon/>
                    <Text style={{marginLeft:10}}>Privacy Policy</Text>
                </View>
                <Ionicons name="chevron-forward" size={24}  />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('SetPrice')} style={styles.continer}> 
                <View style={styles.subContainer}>
                    <SetPriceIcon/>
                    <Text style={{marginLeft:10}}>Set Price</Text>
                </View>
                <Ionicons name="chevron-forward" size={24}  />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('Wallet')} style={styles.continer}> 
                <View style={styles.subContainer}>
                    <WalletIcon/>
                    <Text style={{marginLeft:10}}>Wallet</Text>
                </View>
                <Ionicons name="chevron-forward" size={24}  />
            </TouchableOpacity>
           

            

            <TouchableOpacity  onPress={()=>Logout()} style={styles.continer}> 
                <View style={styles.subContainer}>
                    <FontAwesome5 name="door-open" size={24}  />
                    <Text style={{marginLeft:10}}>Logout</Text>
                </View>
                <AntDesign name="login" size={24} color="#FF9F0A" />
            </TouchableOpacity>
            
        </View>
        

      </View>
    );
  
}

const styles=StyleSheet.create({
    continer:{
        flexDirection:'row',
        marginTop:15,
        alignItems:'center',
        justifyContent:'space-between'
    },
    subContainer:{
        flexDirection:'row',
        alignItems:'center',
    }
})