import React, { Component, useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import CommonHeader from '../../../Components/CommonHeader';
import { Ionicons } from '@expo/vector-icons';
import { AllBrnads } from '../../Services/Authentication';
import { ImageBasePath } from '../../Services/BasePath';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PartnerShip({ navigation, route }) {

  const [data, GetBrand] = useState(route.params.brands)

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <CommonHeader navigation={navigation} Name={'Brands'} />

        <View style={{ marginTop: 20 }} />
        <FlatList
          ListEmptyComponent={() => {
            return (
              <View style={{ marginTop: Dimensions.get('window').height / 2, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#d44325' }}>Brands List is Empty</Text>
              </View>
            )
          }}
          data={data}
          renderItem={({ item, index, separators }) => (
            <>
              <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between', marginHorizontal: 20, alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.navigate('OtherPersonProfile', {
                  personid: item.pk,
                })} style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                  <Image source={{ uri: ImageBasePath + item.fields.image }} style={{ width: 40, height: 40, borderRadius: 50, resizeMode: 'cover' }} />
                  <View style={{ marginLeft: 10 }}>
                    <Text style={{ fontWeight: 'bold' }}>{item.fields.username}</Text>
                  </View>
                </TouchableOpacity>
                <Ionicons name="chevron-forward" size={24} />
              </View>
              <View style={{ width: '90%', marginTop: 10, alignSelf: 'center', borderTopWidth: 0.5, borderColor: '#E5E6F5' }} />
            </>
          )}
        />
      </SafeAreaView>
    </View>
  );

}
