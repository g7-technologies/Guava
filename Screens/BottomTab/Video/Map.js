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
    setTimeout(() => this.setState({ marginBottom: 0 }), 200);
  }

  handleUserLocation = async() => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    
    this.map.animateToRegion({
      ...this.state.initialRegion,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    this.setState({
      initialRegion: {
        ...this.state.initialRegion,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
      locationChoose: true,
    });
    this.Geo_Code(location.coords.latitude, location.coords.longitude);

    console.log('--------lat-------------')
    console.log(location)
    console.log('--------long-------------')
    console.log(location.coords.longitude)
    console.log(location),
      (err) => {
        Toast.show("Something went wrong: Please select location ");
      }
  };
//to convert lat lng into address
  Geo_Code = async (latitude, longitude) => {
    let resp = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDMlR4YuYz3KMPmTmOXSwQc7p6IS-a19Bs`
    );
    let respJson = await resp.json();
    this.setState({ selected_place: respJson.results[0].formatted_address });
  };

pickLocationHandler = event => {
  const coords = event.nativeEvent.coordinate;
  // console.log('///////////////start///////////////////')
  // console.log(event)
  // console.log('///////////////end///////////////////')

  this.map.animateToRegion({
    ...this.state.initialRegion,
    latitude: coords.latitude,
    longitude: coords.longitude,
  });
  this.setState({
    initialRegion: {
      ...this.state.initialRegion,
      latitude: coords.latitude,
      longitude:coords.longitude,
    },
    locationChoose: true,
  });
  this.Geo_Code(coords.latitude, coords.longitude);


};

autocompleteplaces = async (places) => {
  if (places == "") {
    return;
  }
  let resp = await fetch(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${places}&key=AIzaSyC_LWPOTamnTLKR0IVa5pX_w2Zxo9hE0Sw`
  );
  let respJson = await resp.json();
  this.setState({ autocompletedataarray: respJson.predictions });
  if (respJson.status == "ZERO_RESULTS") {
  }
};

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
  this.Geo_Code(
    respJson.candidates[0].geometry.location.lat,
    respJson.candidates[0].geometry.location.lng
  );
};


 send_data_to_individual_chat=(address='')=>{
  //  console.log()
  //  Toast.show(address)
  this.props.from_parent_data(address,)
}
 hideDatePicker = () => {
  this.setState({isDatePickerVisible:false});
};

 handleConfirm = (data) => {
   var n=new Date()
  console.log(moment(data).fromNow())
  var seconds = data.getTime() / 1000;
  var current_sec= n.getTime()/1000
  console.log(seconds+''+current_sec)
    if(this.state.date_modal_type=='date'){
     this.setState({meeting_date: moment(data).format('YYYY-MM-DD')})
   }else
   if(this.state.date_modal_type=='time'){
    this.setState({meeting_time:moment(data).format('HH:mm:ss')})
  }
// }
else{
alert('Previous date can not be selected')
}
  console.log("A date has been picked: ",data);
  this.hideDatePicker();
};
  render(props) {
    return (
      <View style={{ flex: 1,backgroundColor:'#FC9919'}}>
          <View style={{marginTop:20,backgroundColor:'#FC9919'}}>
            <View style={{height:60,alignItems:'center',backgroundColor:'#FC9919'}}>
              <TextInput
                onChangeText={(place) =>
                  this.setState({ place: place, suggestion: true }, () =>
                    this.autocompleteplaces(place)
                  )
                }
                placeholder="Enter Place Name"
                autoCorrect={false}
                autoCompleteType="street-address"
                //  onBlur={()=>this.setState({suggestion:false})}
                onSubmitEditing={() => this.setState({ suggestion: false })}
                style={{
                  width: "95%",
                  height:50,
                  borderColor: "#dddddd",
                  borderWidth: 1,
                  borderRadius: 10,
                  padding: 10,
                  backgroundColor: "#fcfcfc",
                }}
              />
            </View>
            <View style={{marginHorizontal:10,paddingBottom:10,marginTop:10}}>
              <Text style={{fontWeight:'bold',color:'#fff'}}>Selected location</Text>
              <Text style={{color:'#fff',marginTop:10}}>{this.state.selected_place}</Text>
            </View>
            
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
        <TouchableOpacity
        onPress={()=>{this.handleUserLocation()}}
          style={{
            top: "40%",
            left: "90%",
            marginLeft: -15,
            marginTop: -16,
            position: "absolute",
            backgroundColor:'white',
            padding:5
          }}
        >
          <MaterialIcons name="my-location" size={24} color="grey" />
        </TouchableOpacity>

        <View style={{ position: 'absolute', width: "100%",marginTop:80,alignItems:'center' }}>
                    {this.state.place.length > 0 ? (
                      this.state.suggestion ? (
                        <View
                          style={{
                            width: "100%",
                            backgroundColor: "#fff",
                          }}
                        >
                          <FlatList
                            keyExtractor={(item) => item.place_id}
                            data={this.state.autocompletedataarray}
                            contentContainerStyle={{ width: "100%" }}
                            renderItem={({ item, index, separators }) => (
                              <TouchableWithoutFeedback
                                key={item.key}
                                onPress={() => {
                                  this.Place_Latitude_Longtitue(
                                    item.description
                                  ),
                                    this.setState({ suggestion: false });
                                }}
                              >
                                <View
                                  style={{
                                    width: windowWidth,
                                    paddingVertical:5,
                                    borderBottomWidth: 0.4,
                                    borderBottomColor: "#dddddd",
                                    backgroundColor: "white",
                                  }}
                                >
                                  <Text style={{ padding: 5 }}>
                                    {item.description}
                                  </Text>
                                </View>
                              </TouchableWithoutFeedback>
                            )}
                          />
                        </View>
                      ) : null
                    ) : null}
                  </View>
                  <View style={{paddingBottom:50,marginTop:-100,flexDirection:'row',justifyContent:'space-evenly'}}>
                    <TouchableOpacity onPress={()=>this.send_data_to_individual_chat()}  style={{backgroundColor:'#fff',borderWidth:1,borderColor:'#FC9919',paddingHorizontal:30,paddingVertical:10,borderRadius:10}}>
                      <Text style={{color:'black',fontWeight:'bold'}}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>this.send_data_to_individual_chat(this.state.selected_place)} style={{backgroundColor:'#FC9919',borderWidth:1,borderColor:'#fff',paddingHorizontal:30,paddingVertical:10,borderRadius:10}}>
                      <Text style={{color:'white',fontWeight:'bold'}}>Send</Text>
                    </TouchableOpacity>
                  </View>
                  <DateTimePickerModal
                    isVisible={this.state.isDatePickerVisible}
                    mode={this.state.date_modal_type}
                    onConfirm={(e)=>this.handleConfirm(e)}
                    onCancel={()=>this.hideDatePicker()}
                  />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
