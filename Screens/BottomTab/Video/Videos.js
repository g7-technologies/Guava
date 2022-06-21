import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  FlatList,
  PermissionsAndroid,
  Platform,
  TouchableOpacity
} from 'react-native';
import * as MediaLibrary from 'expo-media-library';

export default function Videos ({Selected}) {
  
  const [data, setData] = useState('');
 

  const askPermission = async () => {
    const status=await MediaLibrary.requestPermissionsAsync()
   
    if(status!=='granted'){
      var d= await MediaLibrary.getAssetsAsync({first:60,mediaType:'video'})
   
      setData(d.assets);
    }

  };

  useEffect(() => {
    askPermission();
  }, []);

  return (
    <View>
      <FlatList
        data={data}
        numColumns={3}
        renderItem={({item}) => (
          <TouchableOpacity
          activeOpacity={1}
          onPress={()=>Selected(item,'video')}
          style={{
            width: '33%',
            height: 150,
          }}>
          <Image
            style={{
              width: '100%',
              height: 150,
            }}
            source={{uri: item.uri}}
          />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

