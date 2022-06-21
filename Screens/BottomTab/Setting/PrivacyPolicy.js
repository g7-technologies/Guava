import React, { Component } from 'react';
import { View, Text,TouchableOpacity ,ScrollView} from 'react-native';
import { BackArrow, BlankSpace } from '../../../assets/SvgIcons/AllIcons';
import CommonHeader from '../../../Components/CommonHeader';

export default function PrivacyPolicy({navigation}) {


    return (
      <View style={{flex:1,backgroundColor:'#fff'}}>
        <View style={{marginTop:20}}/>
        <CommonHeader navigation={navigation} Name={'Privacy Policy'}/>

        <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={{textAlign:'justify'}}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras feugiat, lacus quis hendrerit vestibulum, lectus nisl egestas magna, ut tempor lacus nunc a nisl. Aliquam erat volutpat. Praesent lobortis sem est. Aliquam commodo ipsum id ipsum accumsan, eget volutpat felis molestie. Nulla tempor vitae nisi eget tristique. In pretium urna nec velit consequat feugiat. Mauris vel orci ut quam condimentum maximus aliquet id nisi. In et ornare sem. In et egestas purus, mollis aliquam risus. Nunc vestibulum ornare lobortis. Aliquam hendrerit viverra libero, lobortis molestie eros facilisis non. Mauris porta enim vel vestibulum fermentum. Vestibulum ac metus sed nibh consequat efficitur. Maecenas vitae consequat orci. Proin dictum condimentum nisi vel commodo. Aenean tempor dictum erat eget posuere.

Ut mollis tortor ut malesuada venenatis. Duis dignissim sodales dignissim. Curabitur dui magna, mollis tempus posuere accumsan, rhoncus consectetur neque. Curabitur tempus aliquet elit eget iaculis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec magna felis, aliquet a egestas id, rutrum sit amet dui. Nam sed purus rhoncus, vulputate libero in, consequat nisl. Vestibulum quis faucibus magna. Vestibulum auctor ultrices turpis, ac venenatis diam molestie a. Donec eu nibh tincidunt, vulputate elit nec, aliquam lorem. Phasellus malesuada ex nisl, pretium tincidunt justo mattis sit amet. Donec rutrum mi mi, a eleifend nisl pellentesque gravida. Donec molestie tincidunt turpis, sit amet sagittis lectus laoreet sit amet. Suspendisse potenti. Donec volutpat neque dui.
        </Text>
        <Text style={{textAlign:'justify'}}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras feugiat, lacus quis hendrerit vestibulum, lectus nisl egestas magna, ut tempor lacus nunc a nisl. Aliquam erat volutpat. Praesent lobortis sem est. Aliquam commodo ipsum id ipsum accumsan, eget volutpat felis molestie. Nulla tempor vitae nisi eget tristique. In pretium urna nec velit consequat feugiat. Mauris vel orci ut quam condimentum maximus aliquet id nisi. In et ornare sem. In et egestas purus, mollis aliquam risus. Nunc vestibulum ornare lobortis. Aliquam hendrerit viverra libero, lobortis molestie eros facilisis non. Mauris porta enim vel vestibulum fermentum. Vestibulum ac metus sed nibh consequat efficitur. Maecenas vitae consequat orci. Proin dictum condimentum nisi vel commodo. Aenean tempor dictum erat eget posuere.

Ut mollis tortor ut malesuada venenatis. Duis dignissim sodales dignissim. Curabitur dui magna, mollis tempus posuere accumsan, rhoncus consectetur neque. Curabitur tempus aliquet elit eget iaculis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec magna felis, aliquet a egestas id, rutrum sit amet dui. Nam sed purus rhoncus, vulputate libero in, consequat nisl. Vestibulum quis faucibus magna. Vestibulum auctor ultrices turpis, ac venenatis diam molestie a. Donec eu nibh tincidunt, vulputate elit nec, aliquam lorem. Phasellus malesuada ex nisl, pretium tincidunt justo mattis sit amet. Donec rutrum mi mi, a eleifend nisl pellentesque gravida. Donec molestie tincidunt turpis, sit amet sagittis lectus laoreet sit amet. Suspendisse potenti. Donec volutpat neque dui.
        </Text>
        <Text style={{textAlign:'justify'}}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras feugiat, lacus quis hendrerit vestibulum, lectus nisl egestas magna, ut tempor lacus nunc a nisl. Aliquam erat volutpat. Praesent lobortis sem est. Aliquam commodo ipsum id ipsum accumsan, eget volutpat felis molestie. Nulla tempor vitae nisi eget tristique. In pretium urna nec velit consequat feugiat. Mauris vel orci ut quam condimentum maximus aliquet id nisi. In et ornare sem. In et egestas purus, mollis aliquam risus. Nunc vestibulum ornare lobortis. Aliquam hendrerit viverra libero, lobortis molestie eros facilisis non. Mauris porta enim vel vestibulum fermentum. Vestibulum ac metus sed nibh consequat efficitur. Maecenas vitae consequat orci. Proin dictum condimentum nisi vel commodo. Aenean tempor dictum erat eget posuere.

Ut mollis tortor ut malesuada venenatis. Duis dignissim sodales dignissim. Curabitur dui magna, mollis tempus posuere accumsan, rhoncus consectetur neque. Curabitur tempus aliquet elit eget iaculis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec magna felis, aliquet a egestas id, rutrum sit amet dui. Nam sed purus rhoncus, vulputate libero in, consequat nisl. Vestibulum quis faucibus magna. Vestibulum auctor ultrices turpis, ac venenatis diam molestie a. Donec eu nibh tincidunt, vulputate elit nec, aliquam lorem. Phasellus malesuada ex nisl, pretium tincidunt justo mattis sit amet. Donec rutrum mi mi, a eleifend nisl pellentesque gravida. Donec molestie tincidunt turpis, sit amet sagittis lectus laoreet sit amet. Suspendisse potenti. Donec volutpat neque dui.
        </Text>
        </ScrollView>

      </View>
    );
  
}
