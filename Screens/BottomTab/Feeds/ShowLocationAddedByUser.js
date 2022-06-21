import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  ToastAndroid,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  TouchableWithoutFeedback,
  FlatList
} from "react-native";
import MapView, { Marker ,Polyline} from "react-native-maps";
import moment from 'moment'
import { FontAwesome5 ,MaterialIcons} from "@expo/vector-icons";
import Toast from "react-native-tiny-toast";
import * as Location from 'expo-location';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import CommonHeader from "../../../Components/CommonHeader";


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default class Map_get_location extends Component {
  constructor(props) {
    super(props);
    this.state = {
  
      initialRegion: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0122,
        longitudeDelta:
          (Dimensions.get("window").width / Dimensions.get("window").height) *0.0122,
      },
      currentlocationcoordinates:[],
      currentAddress:'',
      locationChoose: false,
      marginBottom: 1,
      deslati:0,
      deslongi:0,
      selected_place:'',
      autocompletedataarray: [],
      suggestion: false,
      place: "",
      isDatePickerVisible:false,
      date_modal_type:'',
      meeting_date: moment(new Date()).format('YYYY-MM-DD'),
      meeting_time:moment(new Date()).format('HH:mm:ss')
    };
   
  }

  componentDidMount() {
    this.handleUserLocation();
    this.Place_Latitude_Longtitue(`${this.props.route.location}`)
    setTimeout(() => this.setState({ marginBottom: 0 }), 200);
  }

  handleUserLocation = async() => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }

    
  };
//to convert lat lng into address
 

Place_Latitude_Longtitue = async (params) => {
  let resp = await fetch(
    `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${params}&inputtype=textquery&fields=formatted_address,geometry&key=your key`
  );
  let respJson = await resp.json();
  this.setState({
    initialRegion: {
      ...this.state.initialRegion,
      latitude:respJson.candidates[0].geometry.location.lat,
      longitude: respJson.candidates[0].geometry.location.lng,
    },
    locationChoose: true,
  });
  this.map.animateToRegion({
    ...this.state.initialRegion,
    latitude: respJson.candidates[0].geometry.location.lat,
    longitude: respJson.candidates[0].geometry.location.lng,
  });
 
};


 
 
  render(props) {
    return (
      <View style={{ flex: 1,backgroundColor:'#fff'}}>
        <View style={{padding:10}}>
         <CommonHeader Name={'Map'} navigation={this.props.navigation}/>
         </View>
         
        <MapView
          style={{ flex: 1, marginBottom: this.state.marginBottom }}
          showsUserLocation={true}
          showsMyLocationButton={false}
          initialRegion={this.state.initialRegion}
          ref={(ref) => (this.map = ref)}
          onPress={this.pickLocationHandler}
        >
          <Marker
            coordinate={{latitude:this.state.initialRegion.latitude,longitude:this.state.initialRegion.longitude}}
            title='Address'
            >
          </Marker>
        </MapView>
        

       
                  
                  
      </View>
    );
  }
}
const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
