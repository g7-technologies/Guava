import React, { Component } from 'react';
import { StyleSheet,TouchableOpacity,View, Text } from 'react-native';
import { BackArrow, BellIcon, BlankSpace, LockIcon, ManageAccountIcon, ProfileLockIcon, ProfileSettingIcon } from '../../../assets/SvgIcons/AllIcons';
import { Ionicons,AntDesign,MaterialCommunityIcons} from '@expo/vector-icons'; 
import CommonHeader from '../../../Components/CommonHeader';

export default function ProfileSettings  ({navigation}) {
  
    return (
      <View style={{flex:1,backgroundColor:'#fff'}}>
        <View style={{marginTop:20}}/>
        <CommonHeader navigation={navigation} Name={'Profile Settings'}/>
        <TouchableOpacity onPress={()=>navigation.navigate('EditProfile')}style={styles.continer}> 
            <View style={styles.subContainer}>
                <ManageAccountIcon/>
                <Text style={{marginLeft:10,color:'#3A3A3C'}}>Manage Account</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={'#9C9FC9'} style={{marginRight:10}}  />
        </TouchableOpacity>
        <View style={{borderBottomWidth:0.5,borderColor:'#E5E6F5'}}/>
        <TouchableOpacity onPress={()=>navigation.navigate('AccountPrivacy')}style={styles.continer}> 
            <View style={styles.subContainer}>
                <ProfileLockIcon/>
                <Text style={{marginLeft:10,color:'#3A3A3C'}}>Privacy</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={'#9C9FC9'} style={{marginRight:10}}  />
        </TouchableOpacity>
        <View style={{borderBottomWidth:0.5,borderColor:'#E5E6F5'}}/>
        <TouchableOpacity onPress={()=>navigation.navigate('Notification')}style={styles.continer}> 
            <View style={styles.subContainer}>
                <BellIcon/>
                <Text style={{marginLeft:10,color:'#3A3A3C'}}>Notification</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={'#9C9FC9'}  style={{marginRight:10}} />
        </TouchableOpacity>
        <View style={{borderBottomWidth:0.5,borderColor:'#E5E6F5'}}/>

        <TouchableOpacity onPress={()=>navigation.navigate('ChangePassword')} style={styles.continer}> 
            <View style={styles.subContainer}>
                <AntDesign name="unlock" size={24} color="#3A3A3C" />
                <Text style={{marginLeft:10}}>Change Password</Text>
            </View>
            <Ionicons name="chevron-forward" size={24}  color={'#9C9FC9'}  style={{marginRight:10}}/>
        </TouchableOpacity>
        <View style={{borderBottomWidth:1,borderColor:'#E5E6F5'}}/>

        <TouchableOpacity onPress={()=>navigation.navigate('PersonalProfile')} style={styles.continer}> 
            <View style={styles.subContainer}>
                <MaterialCommunityIcons name="email-edit-outline" size={24} color="black" />

                <Text style={{marginLeft:10}}>Change Email</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={'#9C9FC9'} style={{marginRight:10}} />
        </TouchableOpacity>
        <View style={{borderBottomWidth:0.5,borderColor:'#E5E6F5'}}/>

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
        justifyContent:'center',
        padding:10,
        marginHorizontal:10
    }
})
