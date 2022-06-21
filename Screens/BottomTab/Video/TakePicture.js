import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { BlankSpace } from '../../../assets/SvgIcons/AllIcons';
import { Entypo,Ionicons } from '@expo/vector-icons';
export default function App({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
const ref=React.useRef()
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const TakePicture=async()=>{
   var picture=await ref.current.takePictureAsync()
   console.log(picture)
   navigation.navigate({
    name: 'CreatePost',
    params: { post: picture.uri },
    merge: true,
  })


  }
  return (
    <View style={styles.container}>
      <Camera
      ref={ref}
       style={styles.camera} type={type}>
         <View style={{flex:1, backgroundColor: 'transparent',}}/> 
        <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
        <TouchableOpacity style={{width:50,height:50,borderRadius:100,justifyContent:'center',alignItems:'center',bottom:10,backgroundColor:'#fff'}}

            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Ionicons name="camera-reverse-sharp" size={24} color="black" />
        </TouchableOpacity>  
        <TouchableOpacity style={{width:50,height:50,borderRadius:100,justifyContent:'center',alignItems:'center',bottom:10,backgroundColor:'#fff',right:20}}>
        <Entypo name="camera" size={24} color="black" />
        </TouchableOpacity>
        <BlankSpace/>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection:'row',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});
