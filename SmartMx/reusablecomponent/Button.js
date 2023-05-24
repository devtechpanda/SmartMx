import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const Button = ({ title, active, onPress }) => {
  const [isActive, setIsActive] = React.useState(active);
  const handlePress = () => {
    setIsActive(!isActive);
    onPress(!isActive);
  };

  return (
    <TouchableOpacity
      style={{
        backgroundColor: isActive ? '#F0AA40' : '#ffffff',
        borderColor: '#F0AA40',
        borderWidth: 1,
        borderRadius: 10,
        height: 46,
        paddingHorizontal: 10,
      }}
      onPress={handlePress}>
      <Text
        style={{
          color: isActive ? '#ffffff' : '#F0AA40',
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
  )
}

export default Button

const styles = StyleSheet.create({})