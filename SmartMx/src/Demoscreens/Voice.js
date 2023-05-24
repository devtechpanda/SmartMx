import React, {useState} from 'react';
import {View, TextInput, Button, Text, TouchableOpacity} from 'react-native';
import Voice from '@react-native-community/voice';

const Demo = () => {
  const [transcription, setTranscription] = useState('');
  const [inputText, setInputText] = useState('');
  console.log('Submitted text:', inputText);

  const startRecognition = async () => {
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  };

  const stopRecognition = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  const handleTextSubmit = () => {
    console.log('Submitted text:', transcription);
  };

  Voice.onSpeechResults = event => {
    const {value} = event;
    setTranscription(value[0]);
  };

  return (
    <View>
      <TextInput
        placeholder="Transcribed text"
        placeholderTextColor="grey"
        value={transcription}
        onChangeText={setInputText}
        style={{color: 'black'}}
      />
      <TouchableOpacity
        onPress={startRecognition}
        style={{backgroundColor: 'grey', marginBottom: 20}}>
        <Text style={{color: 'black'}}>Start Voice Recognition</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleTextSubmit}
        style={{backgroundColor: 'grey'}}>
        <Text style={{color: 'black'}}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Demo;
