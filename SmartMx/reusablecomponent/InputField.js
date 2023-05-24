import {View, Text, TextInput, Image, TouchableOpacity} from 'react-native';
import React from 'react';

const InputField = ({
  placeholder,
  icon,
  value,
  onChange,
  keyboardType,
  autoCapitalize,
  multiline,
  numberOfLines,
  editable,
  autoCompleteType,
  appendComponent,
  countryCodeComponent,
  secureTextEntry,
  maxLength,
  image1,
  image2,
  image3,
}) => {
  return (
    <View
      style={{
        height: multiline ? undefined : 56,
        width: '100%',
        borderWidth: 0.5,
        borderColor: '#FFFFFF',
        borderRadius: 10,
        marginBottom: 15,
        backgroundColor: 'rgba(178, 37, 204, 0.05)',
      }}>
      <View
        style={{
          marginHorizontal: 17.67,
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 5,
        }}>
        <Image
          source={icon}
          style={{
            tintColor: '#02141F',
            width: 20,
            height: 20,
            marginRight: 12.67,
            opacity: 0.5,
          }}
        />

        {countryCodeComponent}
        <TextInput
          style={{
            flex: 1,
            fontSize: 14,
            lineHeight: 21,
            fontWeight: '400',
            fontFamily: 'Poppins-Regular',
            color: '#10011C',
            opacity: 0.4,
            letterSpacing: 0.05,
            height: multiline ? undefined : 56,
          }}
          placeholder={placeholder}
          placeholderTextColor={'#10011C'}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCompleteType={autoCompleteType}
          autoCapitalize={autoCapitalize}
          onChangeText={text => onChange(text)}
          value={value}
          multiline={multiline}
          numberOfLines={numberOfLines}
          maxLength={maxLength}
          editable={editable}
        />
        {appendComponent}
        <TouchableOpacity
          style={{
            position: 'absolute',
            flexDirection: 'row',
            bottom: 10,
            right: 20,
          }}>
          <Image source={image1} style={{width: 25, height: 25}} />
          <Image
            source={image2}
            style={{width: 25, height: 25, marginLeft: 10}}
          />
          <Image
            source={image3}
            style={{width: 25, height: 25, marginLeft: 10}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InputField;
