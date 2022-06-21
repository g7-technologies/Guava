import React, { Component, useEffect, useState } from 'react';
import { StyleSheet,View, Modal,Text ,ScrollView,FlatList, Platform} from 'react-native';
import {  BackArrowWhite,Price139,Price699,Price1399,Price2799,Price6999,Price13999,Price34999 } from '../../../assets/SvgIcons/AllIcons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as RNIap from 'react-native-iap';
import { GooglePay } from 'react-native-google-pay';
import { isTypeAliasDeclaration } from 'typescript';
import {  BuyCoin, GetCoinsAsync, GetUserRecordAsync, GuavaCoins, ReturnUserRecordAsync, SetCoinsAsync, WalletDetail } from '../../Services/Authentication';
// import { StripeProvider } from '@stripe/stripe-react-native';
// import { CardField, useStripe } from '@stripe/stripe-react-native';

const itemSkus = Platform.select({
  ios: [
    'com.guavapoints.points'
  ],
  android: [
    'com.example.coins100'
  ]
});


export default function GuavaPoints ({navigation}) {
  const [productList,GetProductList]=useState([])
  const [UserCoins,GetUserCoins]=useState()
  const [UserID,GetUserID]=useState()
  const [modalVisible, setModalVisible] = useState(false)
  // const { confirmPayment } = useStripe();
  const [Points,GetPoints]=useState([])
useEffect(()=>{
  GetCoins()
},[])

const GetCoins=async()=>{
 let d=  await GetCoinsAsync()
 
// alert(d)
 if(d!=undefined)
 m=JSON.parse(d)
 GetPoints(m)
 
}
useEffect(()=>{
  GetID()
},[])
 const  GetID=async()=>{
   let user=await ReturnUserRecordAsync()
   GetUserID(user[4])
   
  
   GetUserCoins(user[0].coins)
    const d= await GuavaCoins()
  
    if(d.error==false){
      GetPoints(d.data)
      SetCoinsAsync(JSON.stringify(d.data))
    }
  }





  const allowedCardNetworks = ['VISA', 'MASTERCARD'];
const allowedCardAuthMethods = ['PAN_ONLY', 'CRYPTOGRAM_3DS'];

const requestData = {
    cardPaymentMethod: {
      tokenizationSpecification: {
        type: 'PAYMENT_GATEWAY',
        // stripe (see Example):
        gateway: 'stripe',
        gatewayMerchantId: '',
        stripe: {
          publishableKey: 'pk_test_51JnDPVGJ3kvZFESwbyYaEWRg1XWtzC4pQ571r4vvrpnsQTeCHJg1wOu9gVGQliLzoW4JJtFmznN1t5p57UN48XgZ00qUCUsBPc',
          version: '2018-11-08',
        },
        // other:
        gateway: 'stripe',
        gatewayMerchantId: 'pk_test_51JnDPVGJ3kvZFESwbyYaEWRg1XWtzC4pQ571r4vvrpnsQTeCHJg1wOu9gVGQliLzoW4JJtFmznN1t5p57UN48XgZ00qUCUsBPc',
      },
      allowedCardNetworks,
      allowedCardAuthMethods,
    },
    transaction: {
      totalPrice: '10',
      totalPriceStatus: 'FINAL',
      currencyCode: 'USD',
    },
    merchantName: 'Example Merchant',
  };
   

    useEffect(()=>{       
        initializeConnection()
    },[])
    const initializeConnection = async () => {
      if(Platform.OS=='android')
      {
        return
      }
      try {
        const result = await RNIap.initConnection();
        // alert('connection is => '+JSON.stringify( result));
        
        if (result) {
          // await getProducts()
          getSubscriptionss()
        }
      } catch (err) {
        console.log('error in cdm => ', err);
      }
    };
    const getSubscriptionss = async ()=> {
    
        try {
          await RNIap.getProducts(itemSkus).catch((e)=>{
            // alert('error'+e)
          }).then((res)=>{
            // alert("resultt "+res)
        })
        // GetProductList(products);
        // alert(products)
        } catch (err) {
          alert(err)
          //  alert('there is some error in requesting subscription')
        }
    };
    
    const IosPayment=async(id)=>{
       setModalVisible(true)
        // const response =await RNIap.requestSubscription(productList[com.guavapoints.points].productId)
        // console.log(response)

        
    }
    const androidPayment=(amount,coin)=>{
      
      // alert('start')
      
        GooglePay.setEnvironment(GooglePay.ENVIRONMENT_TEST);
       
        // Check if Google Pay is available
        GooglePay.isReadyToPay(allowedCardNetworks, allowedCardAuthMethods)
          .then((ready) => {
            isTypeAliasDeclaration(ready)
            if (ready) {
              // Request payment token
              GooglePay.requestPayment(requestData)
                .then(async(token) => {
                  console.log(typeof(token));
                  var r = JSON.parse(token)
              
                  // Send a token to your payment gateway
                  let d=await BuyCoin(UserID,coin,amount,r.id)
                  // alert(JSON.stringify(d))
                  GetUserRecordAsync(JSON.stringify(d.user.fields))
                  GetUserCoins(UserCoins+d.user.fields.coins)
                   SetCoinsAsync(JSON.stringify(d.user.fields.coins))
                })
                // .then((token)=> JSON.stringify( token))
                // .then((response)=> {
                //   let r=(eval( response));
                //   console.log(r)
                //   console.log(r.id)
                // })
                .catch((error) => console.log(error.code, error.message));
            }
          })
    }
  
    return (
      
          <LinearGradient
        // Button Linear Gradient
        colors={['#FC9919', '#F38645']}
        style={{flex:1}}>
     
        <View style={{margin:20,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <TouchableOpacity onPress={()=>navigation.goBack(null)}>
            <BackArrowWhite/>
            </TouchableOpacity>
            <Text style={{textAlign:'center',color:'#fff',fontWeight:'bold',fontSize:15}}> Guava Points Balance</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('Transaction')} style={{alignItems:'center',justifyContent:'center'}}>
                <MaterialCommunityIcons name="history" size={18} color="#fff" />
                <Text style={{color:'#ffff',fontSize:12}}>Transaction</Text>
            </TouchableOpacity>
        </View>
        <View style={{marginTop:30}}>
            <Text style={{textAlign:'center',color:'#fff',fontWeight:'600',fontSize:30}}>{UserCoins}</Text>
        </View>
        <View style={{flex:1,backgroundColor:'#fff',marginTop:20,borderTopLeftRadius:20,borderTopRightRadius:20}}>
            <Text style={{padding:20,marginTop:20,marginLeft:10,fontWeight:'700'}}>Buy Points</Text>
            <FlatList
                
                data={Points}
                renderItem={({ item, index, separators }) => (
                 <>
                 <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'90%',alignSelf:'center',marginTop:10}}>
                    <Text style={{marginLeft:10}}>{item.coins} coins</Text>
                    <TouchableOpacity activeOpacity={1} onPress={()=>{Platform.OS=='ios'? IosPayment(index):androidPayment(item.amount,item.coins)}}>
                    <LinearGradient
                    style={{width:90,height:50,borderRadius:10,justifyContent:'center',alignItems:'center'}}
                    colors={['#FC9919', '#F38645']}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={{fontSize:24,color:'#fff',fontWeight:'600'}}>$</Text>
                            <Text style={{fontSize:18,color:'#fff'}}> {item.amount}</Text>
                        </View>
                    </LinearGradient>
                    
                    </TouchableOpacity>
                </View>
                <View style={{borderTopWidth:0.6,borderColor:'#DADADA',marginTop:20,width:'90%',alignSelf:'center'}}/>
                 </>
                )}
            />
            {/* <ScrollView showsVerticalScrollIndicator={false} style={{flex:1,}}>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'90%',alignSelf:'center'}}>
                    <Text style={{marginLeft:10}}>65 points</Text>
                    <TouchableOpacity activeOpacity={1} onPress={()=>NativeIosPayment()}>
                    <LinearGradient
                    style={{width:90,height:50,borderRadius:10,justifyContent:'center',alignItems:'center'}}
                    colors={['#FC9919', '#F38645']}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={{fontSize:24,color:'#fff',fontWeight:'600'}}>$</Text>
                            <Text style={{fontSize:18,color:'#fff'}}> 1.39</Text>
                        </View>
                    </LinearGradient>
                    
                    </TouchableOpacity>
                </View>
                <View style={{borderTopWidth:0.6,borderColor:'#DADADA',marginTop:20,width:'90%',alignSelf:'center'}}/>
                
                <View style={{flexDirection:'row',marginTop:10,alignItems:'center',justifyContent:'space-between',width:'90%',alignSelf:'center'}}>
                    <Text style={{marginLeft:10}}>330 points</Text>
                    <Price699/>
                </View>
                <View style={{borderTopWidth:0.6,borderColor:'#DADADA',marginTop:20,width:'90%',alignSelf:'center'}}/>


                <View style={{flexDirection:'row',marginTop:10,alignItems:'center',justifyContent:'space-between',width:'90%',alignSelf:'center'}}>
                    <Text style={{marginLeft:10}}>660 points</Text>
                    <Price1399/>
                </View>
                <View style={{borderTopWidth:0.6,borderColor:'#DADADA',marginTop:20,width:'90%',alignSelf:'center'}}/>


                <View style={{flexDirection:'row',marginTop:10,alignItems:'center',justifyContent:'space-between',width:'90%',alignSelf:'center'}}>
                    <Text style={{marginLeft:10}}>1321 points</Text>
                    <Price2799/>
                </View>
                <View style={{borderTopWidth:0.6,borderColor:'#DADADA',marginTop:20,width:'90%',alignSelf:'center'}}/>


                <View style={{flexDirection:'row',marginTop:10,alignItems:'center',justifyContent:'space-between',width:'90%',alignSelf:'center'}}>
                    <Text style={{marginLeft:10}}>3303 points</Text>
                    <Price6999/>
                </View>
                <View style={{borderTopWidth:0.6,borderColor:'#DADADA',marginTop:20,width:'90%',alignSelf:'center'}}/>


                <View style={{flexDirection:'row',marginTop:10,alignItems:'center',justifyContent:'space-between',width:'90%',alignSelf:'center'}}>
                    <Text style={{marginLeft:10}}>6607 points</Text>
                    <Price13999/>
                </View>
                <View style={{borderTopWidth:0.6,borderColor:'#DADADA',marginTop:20,width:'90%',alignSelf:'center'}}/>


                <View style={{flexDirection:'row',marginTop:10,alignItems:'center',justifyContent:'space-between',width:'90%',alignSelf:'center'}}>
                    <Text style={{marginLeft:10}}>16500 points</Text>
                    <Price34999/>
                </View>
                <View style={{borderTopWidth:0.6,borderColor:'#DADADA',marginTop:20,width:'90%',alignSelf:'center'}}/>


                
            </ScrollView> */}
        </View>
        <View style={{position:'absolute'}}>
         <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={{backgroundColor:'#fff',width:'100%',padding:20,shadowOpacity:0.4,shadowOffset:{width:0.5,height:0.5}}}>
              {/* <StripeProvider
                  publishableKey={'publishableKey'}
                  merchantIdentifier="merchant.identifier"
                >

                  <CardField
                    postalCodeEnabled={true}
                    placeholder={{
                      number: '4242 4242 4242 4242',
                    }}
                    cardStyle={{
                      backgroundColor: '#FFFFFF',
                      textColor: '#000000',
                    }}
                    style={{
                      width: '100%',
                      height: 50,
                      marginVertical: 30,
                    }}
                    onCardChange={(cardDetails) => {
                      console.log('cardDetails', cardDetails);
                    }}
                    onFocus={(focusedField) => {
                      console.log('focusField', focusedField);
                    }}
                  />
              </StripeProvider> */}
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Pay []</Text>
            </TouchableOpacity>  
            </View>    
            </View>
          </Modal>
          
    </View>
    </View>
     
      </LinearGradient>
    );
  
}


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius:2,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});





