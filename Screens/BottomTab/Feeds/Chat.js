import React, { Component,useState ,useEffect, useRef} from 'react';
import { View,Dimensions,ScrollView, Keyboard,Animated,Text,Image,FlatList,TextInput, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MessageSendIcon } from '../../../assets/SvgIcons/AllIcons';
import CommonHeader from '../../../Components/CommonHeader';
import { ChatBasePath } from '../../Services/BasePath';
import { LinearGradient } from 'expo-linear-gradient';
import { GetChatFromRoomId, MessageSeen } from '../../Services/Authentication';
import moment from 'moment';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
var ws;
var Chat=[]
export default class Picture_Comment extends Component {

  // const [keyboardStatus, setKeyboardStatus] = useState(0);
  // const [Msg,SetMsg]=useState('')
  // const [canScroll,SetcanScroll]=useState(false)
  // const [listchat,ChatLists]=useState([])
  // const [connection_url, setconnection_url] =useState(ChatBasePath+route.params.roomid+'/')
  // const flatlistRef=useRef()

constructor(props){
  super(props);
  this.flatlistRef = React.createRef();
  this.state={
    keybordheight:0,
    connection_url:ChatBasePath+this.props.route.params.roomid+'/',
    ChatList:[],
    Msg:''
  }
  
  

  this.connection()
}

  componentDidMount(){
    this.CallSeenApi()
    Keyboard.addListener("keyboardDidShow", (e) => {
      var height=(e.endCoordinates.height<250?e.endCoordinates.height+40:e.endCoordinates.height)
      this.setState({keybordheight:height})
    });

     Keyboard.addListener("keyboardDidHide", () => {
      this.setState({keybordheight:0})
    });
  }
  CallSeenApi=async()=>{
    // let res=await MessageSeen(this.props.route.params.roomid,this.props.route.params.myid)
  //  alert(this.props.route.params.roomid+' '+this.props.route.params.myid)
    
  }

  componentWillUnmount(){
    ws.close()
  }
  
  

  connection = () => {
    
    try{
    ws = new WebSocket(this.state.connection_url);

      ws.onopen = () => {
       
        console.log('Start Connection');
        this.GetChat()   
        // setTimeout(() => {
        //   this.flatlistRef.current.scrollToEnd({animated:false})
        //   }, 4000);
      };
      ws.onmessage = e => {
        console.log('kk')
        const data = JSON.parse(e.data);
        if(data.id){
          if(data.sender != this.props.route.params.myid){
            this.state.ChatList.push(data)
            setTimeout(() => {
              this.setState({ChatList: this.state.ChatList})
              setTimeout(() => {
                this.flatlistRef.current?.scrollToEnd()
              }, 200);
            }, 200);
          }
          
        }
       
       console.log('onmessage.........')
        
      };
      ws.onerror = e => {
        console.log('error',JSON.stringify(e));
       

      };
      ws.onclose = e => {
        console.log('onclose',  JSON.stringify(e));
      
        
        // alert('error',JSON.stringify(e));

      };

    } catch (error) {
      console.log(error);
      // Handle error
      return console.warn(error);
    }
  }
  GetChat=async()=>{
   let ChatList=await GetChatFromRoomId(this.props.route.params.roomid)
   Chat =ChatList.chat
   this.setState({ChatList:Chat})
    console.log('GetChat..........')
    setTimeout(() => {
      this.flatlistRef.current?.scrollToEnd()
    }, 1000);
  //  this.flatlistRef.current.scrollToEnd()
   // ChatLists(ChatList.chat)
   // flatlistRef.current.scrollToEnd({animated:true,})
// this.refs.flatlistRef.scrollToEnd({animated:true,})
  
  }
  
  

  SendMyMessage=async()=>{
  
    var data={
      "sender":this.props.route.params.myid,
      "receiver":this.props.route.params.otheruserid,
      "group_id":this.props.route.params.roomid,
      "message":this.state.Msg
    }
    ws.send(JSON.stringify(data))
      this.setState({Msg:''})
      this.state.ChatList.push(data)
      setTimeout(() => {
        this.setState({ChatList: this.state.ChatList})
        setTimeout(() => {
          this.flatlistRef.current.scrollToEnd()
        }, 200);
      }, 200);
   
    
  }
  
  
  // useEffect(() => {
  //   const showSubscription = Keyboard.addListener("keyboardDidShow", (e) => {
  //     setKeyboardStatus(e.startCoordinates.height<250?e.startCoordinates.height+40:e.startCoordinates.height)
  //   });
  //   const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
  //     setKeyboardStatus(0);
  //   });

  //   return () => {
  //     showSubscription.remove();
  //     hideSubscription.remove();
  //   };
  // }, []);

render(){
  return (
    <View style={{flex:1,backgroundColor:'#fff'}}>

      <CommonHeader navigation={this.props.navigation} Name={this.props.route.params.otherusername} />
     
      
      <FlatList
      // inverted
     
        ref={this.flatlistRef}
        data={this.state.ChatList}
      
        renderItem={({ item, index, separators }) => (
          <>
          {item.sender==this.props.route.params.myid?
          <TouchableOpacity  
                activeOpacity={0.9}
                style={{flexDirection:'row',marginRight:10,marginVertical:10}}
              >
              {/* <View style={{flexDirection:'row',alignSelf:'flex-end',marginRight:10,marginVertical:10}}> */}
                <View style={{maxWidth:windowWidth/1.3,marginBottom:2,paddingHorizontal:15,borderRadius:15,}}>                                    
                <View
                  style={{borderRadius:5,padding:10,backgroundColor:'#F2F2F7'}}
                >
                <Text style={{padding:3,padding:5,}} >{item.message}</Text>
                <Text>{moment(item.created_at).fromNow()}</Text>
                </View>
                    {/* <Seen item={item} /> */}
                </View>
                {/* </View> */}
          </TouchableOpacity>
          :
          <TouchableOpacity  
                activeOpacity={0.9}
                style={{flexDirection:'row',alignSelf:'flex-end',marginRight:10,marginVertical:10}}
              >
              {/* <View style={{flexDirection:'row',alignSelf:'flex-end',marginRight:10,marginVertical:10}}> */}
                <View style={{maxWidth:windowWidth/1.3,marginBottom:2,paddingHorizontal:15,borderRadius:15,}}>                                    
                <LinearGradient
                  style={{borderRadius:5,padding:10,}}
                  colors={['#FC9919', '#F38645']}
                >
                <Text style={{padding:3,color:'#fff',padding:5,}} >{item.message}</Text>
                <Text>{moment(item.created_at).fromNow()}</Text>

                </LinearGradient>
                    {/* <Seen item={item} /> */}
                </View>
                {/* </View> */}
          </TouchableOpacity>
          }
              </>
        )}
      />

            
        
        
     
      {Platform.OS=='ios'?
      <View style={{borderWidth:0.4,marginBottom:this.state.keybordheight,flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:20}}>
        <TextInput value={this.state.Msg}  onChangeText={(e)=>this.setState({Msg:e})}   placeholder={'send message'} style={{width:'90%',padding:20}}/>
        <TouchableOpacity onPress={()=>this.SendMyMessage()} style={{right:20}}>
        <MessageSendIcon/>
        </TouchableOpacity>
      </View>:
      <View style={{borderWidth:0.4,flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:20}}>
        <TextInput value={this.state.Msg}  onChangeText={(e)=>this.setState({Msg:e})}   placeholder={'send message'} style={{width:'90%',padding:20}}/>
        <TouchableOpacity onPress={()=>this.SendMyMessage()} style={{right:20}}>
          <MessageSendIcon/>
        </TouchableOpacity>
      </View>
      }
     
    </View>
  );
    }
}
