import React, { Component,useEffect,useState } from 'react';
import { StyleSheet,TextInput, Text, View ,Dimensions,Image, TouchableOpacity,FlatList,AsyncStorage,ActivityIndicator,Modal,ScrollView} from 'react-native';
import { AntDesign ,Ionicons} from '@expo/vector-icons';
import { BackArrow } from '../../../assets/SvgIcons/AllIcons';
import { CreateGroup, GetGroups, ReturnUserRecordAsync } from '../../Services/Authentication';
import CommonHeader from '../../../Components/CommonHeader';
import { ImageBasePath } from '../../Services/BasePath';
import PrivateSearch from '../../../Components/PrivateSearch'
import { Searchbar } from 'react-native-paper';


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default function App({navigation}) {
  const [RecentSearch, GetRecentSearch] = useState([{ title: 'Title Text', key: 'item1' },{ title: 'Title Text', key: 'item2' },{ title: 'Title Text', key: 'item3' },{ title: 'Title Text', key: 'item4' }]);
  const [UserId, GetUserId] = useState('');
  const [Userinfo, GetUser] = useState('');
  const [Messages, MessageChats] = useState([]);
  const [Messages1, MessageChats1] = useState([]);
  const [UserName, FilterUserName] = useState([]);

  


// useEffect(()=>{
//   console.log(UserName)

//   Filter_chat(UserName)
// },[UserName])

  const Filter_chat = (param) => {
   
       
   
    var Food =Messages1;
    var ara = [];
    for (var i = 0; i < Food.length; i++) {
      var x = Food[i].group.user.fields.username.toUpperCase();
     
      if (x.match(param.toUpperCase())) {
        
       console.log(Food[i].group.user.fields.username)
     

        ara.push(Food[i]);
      }
    }
    if (param.length == 0) {
      MessageChats(Messages1)
      // this.setState({ getdata1: this.state.temp1 });a
    } else {
      MessageChats(ara)
    }
  };
 

  useEffect(()=>{
    GetUserInfo()
  },[])
  const GetUserInfo=async()=>{
    let User=await ReturnUserRecordAsync()
    GetUserId(User[4])
    GetUser(User[0])
    Groups(User[4])
  }
  const Groups=async(id)=>{
    let group=await GetGroups(id)
    MessageChats(group.groups)
    MessageChats1(group.groups)
  }

  const Create_Group=async(item)=>{
    var otheruser = item.group.user.pk
    let group=await CreateGroup(UserId,otheruser)
    var params = {
      myid:UserId,
      otheruserid:otheruser,
      otherusername:item.group.user.fields.username,
      roomid:group.room_id
    }
    console.log(params)
    navigation.navigate('Chat', params)
    
  }

  return (
      <View style={{flex:1,backgroundColor:'#fff'}}>
        {/* <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:10,marginTop:10}}>
            <TouchableOpacity onPress={()=>navigation.goBack(null)}>
              <BackArrow/>
            </TouchableOpacity>
            <Text style={{fontWeight:'bold'}}>{Userinfo.username}</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('Connect')}>
              <Text style={{color:'#5B61B9'}}>50 request</Text>
            </TouchableOpacity>
        </View> */}
        <CommonHeader navigation={navigation} Name={Userinfo.name}/>
        <View>
                {/* <Searchbar
                  inputStyle={{fontSize:15}}
                  placeholder="Search"
                  iconColor="black"
                  onChangeText={Filter_chat}
                  
                  style={{
                    borderRadius: 15,
                    marginRight: 10,
                    marginLeft: 10,
                    marginBottom:windowHeight/60
                  }}
                /> */}
            </View>
        <View style={styles.SearchContainer}>
          <AntDesign name="search1" size={24} color="#5B61B9" />
          <TextInput autoFocus={true} onChangeText={Filter_chat}  placeholder="Search" placeholderTextColor="#9597AD" style={{paddingLeft:10,width:'100%',height:55}}/>
        </View>
 {/* <PrivateSearch UserName={(u)=>Filter_chat(u)}/> */}
        <FlatList
          ListEmptyComponent={()=>{return(
            <View>
              <Text style={{textAlign:'center',color:'#d44325'}}>No User Found</Text>
            </View>
          )}}
          data={Messages}
          renderItem={({ item, index, separators }) => (
            <>
            <View style={{flexDirection:'row',marginTop:10,justifyContent:'space-between',marginHorizontal:20,alignItems:'center'}}>
              <TouchableOpacity onPress={()=>Create_Group(item)} style={{flexDirection:'row',alignItems:'center',alignSelf:'center'}}>
                <Image source={{uri:ImageBasePath+item.group.user.fields.image}} style={{width:50,height:50,borderRadius:50,resizeMode:'cover'}}/>
                <View style={{marginLeft:10}}>
                  <Text style={{fontWeight:'bold'}}>{item.group.user.fields.username}</Text>
                  <Text style={{marginTop:4}}>{item.last_message}</Text>
                </View>
              </TouchableOpacity>
              <Ionicons name="chevron-forward" size={24}  />
            </View>
            <View style={{width:'90%',marginTop:10,alignSelf:'center',borderTopWidth:0.5,borderColor:'#E5E6F5'}}/>
            </>
          )}
        />
        
      </View>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c0b19',
    alignItems: 'center',
    justifyContent: 'center',
  },
  SearchContainer:{
    margin:20,
    width:'90%',
    height:60,
    borderRadius:10,
    backgroundColor:'#E5E5EA',
    // justifyContent:'center',
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:20
  },
  

});



