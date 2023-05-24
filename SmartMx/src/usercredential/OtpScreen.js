import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Alert,
  Button,
} from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import {icons, images} from '../../constant';
import Greeting from '../../reusablecomponent/Greeting';
import InputField from '../../reusablecomponent/InputField';
import TextButton from '../../reusablecomponent/TextButton';

const OTPVerification = ({navigation, route}) => {
  useEffect(() => {
    if (route && route.params && route.params.data) {
      const {data} = route.params;
      console.log('Received Data     TECH:', data);
    }
  }, [route]);

  // -------------------------

  const [otp, setOTP] = useState('');

  const handleOTPChange = value => {
    setOTP(value);
  };

  const verifyOTP = () => {
    const defaultPassword = '1234';

    if (otp === defaultPassword) {
      Alert.alert('Success', 'OTP is correct!', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('ConfimPassword', {data: route.params.data});
          },
        },
      ]);
    } else {
      Alert.alert('Fail', 'OTP is incorrect!');
    }
  };

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <ImageBackground
          source={images.homeBg}
          style={{
            widht: '100%',
            height: '100%',
          }}
          resizeMode="cover">
          <Greeting
            greeting={'Verification  Code'}
            contend={
              'Enter the 4 digit number that we send to (+91) XXX-XXX-XXXX'
            }
          />
          <ScrollView>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={icons.homeIcon}
                style={{width: 106, height: 106}}
              />
            </View>
            <View style={{marginHorizontal: 20, marginTop: 50}}>
              <OTPTextInput
                handleTextChange={handleOTPChange}
                inputCount={4}
                tintColor={'blue'}
                containerStyle={{marginBottom: 20}}
              />
              <TextButton
                title={'Verify'}
                bgColor={'#6D21A9'}
                color={'#ffffff'}
                onPress={verifyOTP}
              />
            </View>
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    </View>
  );
};

export default OTPVerification;
