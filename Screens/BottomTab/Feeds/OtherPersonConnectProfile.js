import { StatusBar } from 'expo-status-bar';
import React, { useEffect,useState } from 'react';
import { StyleSheet, FlatList,Text, View,Dimensions, TouchableOpacity,Image,TextInput } from 'react-native';
import { AntDesign,Feather,SimpleLineIcons,Entypo } from '@expo/vector-icons'; 
import { GuavaIconLogo,SearchIcon,ConnectIcon } from '../../../assets/SvgIcons/AllIcons';
import ConnectRequest from '../../../Components/ConnectRequest';
import { CreateReview, PartnershiporBrands, UpdateConnectRequestStatus } from '../../Services/Authentication';
import { ActivityIndicator } from 'react-native-paper';
import { ImageBasePath } from '../../Services/BasePath';
import { ScrollView } from 'react-native-gesture-handler';




const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function App({navigation,route}) {

    const [User, GetUser] = useState(route.params)
    const [Brands, GetBrands] = useState([])
    const [comment, setcomment] = useState("")
    const [Review,GetReviews]=useState(User.reviews)

    // const [isLoading,SetisLoading]=useState(true)
    

    useEffect(()=>{
        GetUserPartnerShiporBrandList()
    },[])
    const GetUserPartnerShiporBrandList=async()=>{
        const CheckData=await PartnershiporBrands(User.id)
        console.log(CheckData)
        if(CheckData.error==false){
            GetBrands(CheckData.brands)
            // SetisLoading(false)
        }else{
            console.log('Error occure')
            // console.log(CheckData)
        }
    }
    const UpdateConnectRequest=async()=>{
        
        const Checkdata=await UpdateConnectRequestStatus(User.myid,User.id)
        if(Checkdata.error==false){
            console.log(Checkdata)
        }else{
            console.log(Checkdata)
        }
    }
    const MyReview=async()=>{
        let Review=await CreateReview(User.myid,User.id,comment)
     
        setcomment("")
        if(Review.error==false){
           GetReviews((prevState)=>{
            prevState.push(Review.review)
            return [...prevState]
            // return [remove]
          }) 
        }

        // GetReviews((prevState)=>{
        //     prevState.push({
        //       "id":0,
        //       "name":'Other',
        //       "status":true
        //     })
        //     return [...prevState]
        //     // return [remove]
        //   })

    }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.header}>
            {/* <Image source={require('../assets/Guava.png')} style={{width:windowHeight/10,height:windowHeight/15,resizeMode:'contain',marginLeft:windowWidth/30}}/> */}
            <GuavaIconLogo/>
          
        </View>

        <View style={{marginHorizontal:windowHeight/40,}}>
            <View style={{marginTop:10}}>
                {/* <Image source={require('../assets/dummy.png')} style={{width:windowHeight/8,height:windowHeight/8,resizeMode:'cover'}}/> */}
                <Image source={{uri:User.image}} style={{width:windowHeight/10,height:windowHeight/10,borderRadius:100,resizeMode:'cover'}}/>
                <Text style={{fontWeight:'bold',marginLeft:10,marginTop:5,fontSize:15}}>{User.name}</Text>
                <Text style={{marginLeft:10,marginTop:5,fontSize:15}}>{User.business_description?User.business_description:User.bio}</Text>
                {Brands.length>0&&
                <Text style={{fontWeight:'bold',marginLeft:10,marginTop:10,color:'#4493f9',fontSize:15}}>{Brands.length} Partnerships</Text>}
            </View>
            <View style={{flexDirection:'row',marginTop:15,justifyContent:'space-evenly'}}>
                <ConnectRequest navigation={navigation} ChangeReqestStatus={()=>UpdateConnectRequest()} connceted={route.params.connected} requested={route.params.requested}/>
                <TouchableOpacity onPress={()=>navigation.navigate('Chat')} style={{width:windowWidth/2,height:40,borderRadius:5,borderWidth:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                <Feather name="send" size={24} color="black" />
                <Text style={{marginLeft:10,fontSize:15}}>Send a Message</Text>
                </TouchableOpacity>
            </View>
            <View style={{height:windowHeight/15,borderRadius:10,backgroundColor:'#f2f2f7',marginTop:15,flexDirection:'row',alignItems:'center'}}>
                <TextInput value={comment}  style={{marginLeft:10,flex:1,marginRight:20}}  placeholder='Say Something'  onChangeText={(e)=>setcomment(e)} placeholderTextColor={'#8e8e93'} />
                {comment.length>0?
                <TouchableOpacity onPress={()=>MyReview()} style={{width:windowWidth/3,height:windowHeight/20,borderRadius:5,flexDirection:'row',alignItems:'center',justifyContent:'center',backgroundColor:'white',margin:windowHeight/100}}>
                    <Text style={{marginLeft:10,fontSize:15,color:'#4493f9'}}>Send</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={()=>navigation.navigate('PartnerShips')} style={{width:windowWidth/3,height:windowHeight/20,borderRadius:5,flexDirection:'row',alignItems:'center',justifyContent:'center',backgroundColor:'white',margin:windowHeight/100}}>
                    <SimpleLineIcons name="diamond" size={24} color="#4493f9" />
                    <Text style={{marginLeft:10,fontSize:15,color:'#4493f9'}}>Brands</Text>
                </TouchableOpacity>}
            </View>
            
            <FlatList
            
              showsVerticalScrollIndicator={false}
                data={Review}
                renderItem={({ item, index }) => (
                  
                    <View>
                        <View style={{flexDirection:'row',alignItems:'center',marginTop:20}}>
                            <Image source={{uri:item.image}} style={{width:30,height:30,resizeMode:'cover',borderRadius:50}}/>
                            <Text style={{marginLeft:windowWidth/40,fontWeight:'bold',fontSize:17}}>{item.name}</Text>
                            <AntDesign style={{flex:1,marginLeft:10}} name="checkcircle" size={20} color="#4493f9" />
                            {/* <Entypo  name="dots-three-vertical" size={24} color="black" /> */}
                        </View>
                        <View>
                           
                            <Text style={{fontSize:15,lineHeight: 25,}}>{item.review}</Text>
                        </View>
                    </View>
                  
                  
                )}
            />
          
            

        </View>
          

       
  
       <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  header:{
    height:windowHeight/14,
    flexDirection:'row',
    alignItems:'flex-end',
    justifyContent:'space-between',
    paddingHorizontal:20,
  },

});