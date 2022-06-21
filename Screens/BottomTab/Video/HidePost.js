import React, { useEffect, useState } from 'react';
import { StyleSheet,Text, FlatList,View ,TextInput,Image} from 'react-native';
import { TouchableOpacity, } from 'react-native-gesture-handler';
import { BackArrow, BlankSpace, CheckedIcon } from '../../../assets/SvgIcons/AllIcons';
import { AntDesign,Feather } from '@expo/vector-icons';
import PrivateComponent from '../../../Components/PrivateComponemt'
import PrivateSearch from '../../../Components/PrivateSearch'
import { GetUserRecordAsync, ReturnUserRecordAsync } from '../../Services/Authentication';

export default function HidePost  ({navigation,params,HideModal,UserList}) {
   const [Name,SearchName]=useState(null)
   const [User,SavedUser]=useState(UserList)
   const [suser,selectuser]=useState(null)
   const [alluser,Alluser]=useState(null)

    FilterUser=(u,i)=>{ 
      var d = false;
      User.forEach((item=> {
        if(item.id == u.id){
          d = true
        }
      }))
    
      if(d){
        User.forEach((element,index) => {
          if(element.id==u.id){
            User.splice(index,1)}
        });
      
      }else{
        User.push(u)
      }
    }

    useEffect(()=>{
      GetRecod()
    },[])
    GetRecod=async()=>{
      var d=await ReturnUserRecordAsync()
      selectuser(d[1]) 
      Alluser(d[1]) 
    }

    

  const FilterUserArray = (param) => {
  
    
    var u =suser;
    var ara = [];
    for (var i = 0; i < u.length; i++) {
      var x = u[i].username.toUpperCase();
      if (x.match(param.toUpperCase())) {
        ara.push(u[i]);
      }
    }
    if (param.length == 0) {
      selectuser(alluser)
    } else {
      selectuser(ara)
    }
  };
   
  
   return( 
    <View style={{flex:1,backgroundColor:'#fff'}}>
        <View style={{padding:10,marginTop:15,flexDirection:'row',justifyContent:'space-between'}}>
        <TouchableOpacity onPress={()=>HideModal(false,User)}>
          <BackArrow/>
        </TouchableOpacity>
        <Text style={{fontWeight:'bold'}}>Private Mode</Text>
          <BlankSpace/>
        </View>
       <PrivateSearch UserName={(u)=>FilterUserArray(u)}/>
    
        <FlatList
            data={suser}
            renderItem={({ item, index, separators }) => 
              
            (
                <PrivateComponent index={index} User={item} Friends={User} SaveUser={(user,index)=>FilterUser(user,index)} />
            )
            }
        />
        
           

        {/* <View style={{marginTop:50}}/> */}
       {/* <CommonHeader Name="Private Mode" navigation={navigation}/> */}
    </View>
    )

}


const styles=StyleSheet.create({
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
  })
  