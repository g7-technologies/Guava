import React,{useState} from 'react';
import { MaterialCommunityIcons,Feather } from '@expo/vector-icons';
import { View ,Image,Text,TextInput,Dimensions,ActivityIndicator,TouchableOpacity} from 'react-native';
import CommonHeader from '../../../Components/CommonHeader';
const windowHeight = Dimensions.get('window').height;
export default function componentName ({navigation}) {

  const [IsLoading,setIsLoading]=useState(false)

    return(
    <View style={{flex:1,backgroundColor:'#fff'}}>
        <CommonHeader navigation={navigation} Name={'withdraw'}/>
       
        <Image style={{width:150,height:150,alignSelf:'center'}} source={require('../../../assets/CustomerService.png')}/>
        <View style={{width:'100%',padding:10,marginVertical:5,backgroundColor:'#e6e6e6'}}>
            <Text style={{fontSize:17,fontWeight:'700'}}>Request an amount you want to withdraw</Text>
        </View>
      
        <View style={{width:'90%',alignSelf:'center',height:windowHeight/15,backgroundColor:'#e5e5ea',borderRadius:25,flexDirection:'row',alignItems:'center',marginVertical:5}}>
            <View style={{backgroundColor:'#3A3A3C',width:50,height:windowHeight/15,borderRadius:30,alignItems:'center',justifyContent:'center'}}>
                <Feather name="dollar-sign" size={24} color="#fff" />
            </View>
            <TextInput style={{marginLeft:10,flex:1,marginRight:20}}  placeholder='Amount.... 0.00'    placeholderTextColor={'#8e8e93'} />
        </View>
        <View style={{width:'90%',alignSelf:'center',height:windowHeight/15,backgroundColor:'#e5e5ea',borderRadius:25,flexDirection:'row',alignItems:'center',marginVertical:5}}>
            <View style={{backgroundColor:'#3A3A3C',width:50,height:windowHeight/15,borderRadius:30,alignItems:'center',justifyContent:'center'}}>
                <MaterialCommunityIcons name="bank-transfer-in" size={24} color="#fff" />
            </View>
            <TextInput style={{marginLeft:10,flex:1,marginRight:20}}  placeholder='Bank Account No xx.xx.x.x.x.x'    placeholderTextColor={'#8e8e93'} />
        </View>
        <View style={{alignSelf:'center',width:'80%'}}>
          <TouchableOpacity   style={{borderRadius:40,padding:10,height:50,backgroundColor:'#fa9522',justifyContent:'center',alignItems:'center',marginTop:30}}>
              {IsLoading?
              <ActivityIndicator color={'#fff'}/>
              :
              <Text style={{color:'white',fontSize:17}}>Send Request</Text>}
          </TouchableOpacity>
        </View>
    </View>)
};


