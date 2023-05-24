import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const TextButtonHome = ({ title, active, onPress }) => {
  const [isActive, setIsActive] = React.useState(active);
  const handlePress = () => {
    setIsActive(!isActive);
    onPress(!isActive);
  };

  return (
    <TouchableOpacity
      style={{
        backgroundColor: isActive ? '#6D21A9' : '#ffffff',
        borderColor: '#6D21A9',
        borderWidth: 1,
        borderRadius: 10,
        height: 46,
        paddingHorizontal: 10,
      }}
      onPress={handlePress}>
      <Text
        style={{
          color: isActive ? '#ffffff' : '#6D21A9',
          fontFamily: 'Poppins-Regular',
          fontSize: 18,
          fontSize: 14,
          lineHeight: 27,
          fontWeight: 600,
          letterSpacing: 1,
          padding: 10,
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default TextButtonHome;

const styles = StyleSheet.create({});
