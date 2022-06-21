import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Text, View,TouchableOpacity,FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { BackArrow, BlankSpace } from '../../../assets/SvgIcons/AllIcons';
import { ReturnUserRecordAsync, TransactionHistory, WalletDetail } from '../../Services/Authentication';
import { ActivityIndicator } from 'react-native-paper';
export default function Transaction({navigation,}) {
    const [Transactions,GetTransaction]=useState(null)
    const [WalletRequest,GetWalletRequest]=useState(null)
    const [isLoading,SetisLoading]=useState(true)
    useEffect(()=>{
        GetUserInfo()
       
    },[])
    const GetUserInfo=async()=>{
        let id=await ReturnUserRecordAsync()
        GetTransactionHistory(id[4])
    }
    const GetTransactionHistory=async(id)=>{
       let detail=await WalletDetail(id)
      console.log(detail)
       var AllTransaction=[]
       detail.payments.forEach(element => {  
        AllTransaction.push(element)
       });
       detail.transactions.forEach(element => {  
        AllTransaction.push(element)
       });
       detail.walletRequests.forEach(element => {  
        AllTransaction.push(element)
       });
       const sortedArray  = AllTransaction.sort((a,b) => new moment(b.created_at).format('Y-M-d') - new moment(a.created_at).format('Y-M-d'))
       console.log('sorted array')
    //    console.log(sortedArray);
       console.log('sorted array')
       GetTransaction(sortedArray)
      setTimeout(() => {
      SetisLoading(false)
      

      }, 1000);


    }
   
    return(

    <View style={{flex:1,backgroundColor:'#fff'}}>
        <View style={{flexDirection:'row',marginHorizontal:10,marginTop:15,justifyContent:'space-between'}}>  
          <TouchableOpacity onPress={()=>navigation.goBack(null)}>
            <BackArrow/>
          </TouchableOpacity>
          <Text style={{fontWeight:'bold'}}>Transcation History</Text>
            <BlankSpace/>
        </View>
        <View style={{height:50}}/>
        {isLoading?<View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator color="#FF9F0A" size="large"/>
        </View>:
        <ScrollView>
            <FlatList
                ListEmptyComponent={()=>{
                    return(
                        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                            <Text>No transaction history yet!</Text>
                        </View>
                    )
                }}
                data={Transactions}
                renderItem={({ item, index, separators }) => (
                
                <View style={{marginTop:5}}>
                    <View style={{backgroundColor:'#F2F2F7',flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'90%',alignSelf:'center',padding:20,borderRadius:10}}>
                        <View>
                            <Text style={{color:'#3A3A3C',fontWeight:'bold'}}>{ moment(item.fields.created_at).fromNow()}</Text>
                            {item.fields?.type?
                            <Text style={{marginTop:10,fontWeight:'500'}}>{item.fields.coins} {item.fields.type}</Text>:
                            <View>
                            {item.fields?.balance?
                            <Text style={{marginTop:10,fontWeight:'500'}}>{item.fields.balance} Remaining Balance</Text>:
                            <Text style={{marginTop:10,fontWeight:'500'}}>{item.fields.amount} withdraw</Text>  
                            }
                            </View>
                            
                            }
                        </View>
                        <View>
                        <Text style={{fontSize:18,fontWeight:'bold'}}> ${item.fields.amount}</Text>
                        </View>
                    </View>

                </View>
                 
                )}
            />
            
        
        </ScrollView>}
    </View>
    )
};


