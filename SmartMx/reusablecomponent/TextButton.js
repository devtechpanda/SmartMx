import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';

const TextButton = ({ onPress, title, bgColor, color, icon = null }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          backgroundColor: bgColor,
          borderRadius: 10,
          height: 63,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10,
          borderWidth: 1,
          borderColor: '#6D21A9',
          flexDirection: 'row',
        }}>
        {icon && <Image source={icon} />}
        <Text
          style={{
            fontFamily: 'Poppins-Bold',
            fontSize: 18,
            fontSize: 18,
            lineHeight: 27,
            letterSpacing: 0.05,
            color: color,
            marginLeft: 5,
          }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TextButton;
