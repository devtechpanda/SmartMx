import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Share,
  TouchableOpacity,
} from 'react-native';
const MyComponent = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const handleShare = () => {
    const message = `Name: ${name}\nAge: ${age}`;
    Share.share({
      message: message,
    });
  };
  return (
    <View>
      <Text>Name:</Text>
      <TextInput
        value={name}
        onChangeText={text => setName(text)}
        placeholder="Enter your name"
      />
      <Text>Age:</Text>
      <TextInput
        placeholder="Enter your age"
        value={age}
        onChangeText={text => setAge(text)}
        keyboardType="numeric"
      />
      <TouchableOpacity
        onPress={handleShare}
        style={{backgroundColor: 'blue', alignSelf: 'center', width: '80%'}}>
        <Text style={{color: 'white', textAlign: 'center'}}>Share</Text>
      </TouchableOpacity>
      <Button title="Submit" onPress={() => console.log('Form submitted')} />
    </View>
  );
};
export default MyComponent;
