import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Greeting = ({greeting, contend, alignSelf}) => {
  return (
    <View style={{marginHorizontal: 20, marginTop: 20}}>
      <Text
        style={{
          fontFamily: 'Poppins-Bold',
          fontSize: 25,
          fontWeight: 800,
          lineHeight: 38,
          letterSpacing: 0.05,
          color: '#FFFFFF',
          alignSelf: alignSelf,
        }}>
        {greeting}
      </Text>
      <Text
        style={{
          fontFamily: 'Poppins-Regular',
          fontSize: 14,
          fontWeight: 400,
          lineHeight: 21,
          letterSpacing: 0.05,
          color: '#FFFFFF',
          opacity: 0.75,
          marginBottom: 100,
        }}>
        {contend}
      </Text>
    </View>
  );
};

export default Greeting;
