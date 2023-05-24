import React, {useEffect} from 'react';
import {
  View,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import axios from 'axios';

import {icons, images} from '../../constant';
import Greeting from '../../reusablecomponent/Greeting';
import InputField from '../../reusablecomponent/InputField';
import TextButton from '../../reusablecomponent/TextButton';

const ForgetPwd = ({navigation}) => {
  const [phone, setPhone] = React.useState('');
  const [apiData, setApiData] = React.useState([]);

  const handlePhoneChange = text => {
    setPhone(text);
  };

  useEffect(() => {
    // Code inside the useEffect hook
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://smart.techpanda.art/register/',
        );
        const responseData = response.data;
        setApiData(responseData);
      } catch (error) {
        console.error('Error fetching API data:', error);
      }
    };

    fetchData();
  }, []);

  const handleForgotPassword = () => {
    const matchingData = apiData.find(item => item.phone_no === phone);
    if (matchingData) {
      console.log('Matching Data:', matchingData);
      navigation.navigate('OtpScreen', {data: matchingData});
    }
  };

  console.log('API Data:', apiData);

  // Rest of the component code...

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        source={images.homeBg}
        style={{
          widht: '100%',
          height: '100%',
        }}
        resizeMode="cover">
        <Greeting
          greeting={'Oh, no! I forgot'}
          contend={
            'Enter your phone or username, and we will send you a link to change your password'
          }
        />
        <ScrollView>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image
              source={icons.homeIcon}
              style={{
                width: 106,
                height: 106,
              }}
            />
          </View>
          <View style={{marginHorizontal: 20, marginTop: 50}}>
            <InputField
              placeholder="Username or Phone Number"
              icon={icons.user}
              title="Phone"
              value={phone}
              maxLength={10}
              onChange={handlePhoneChange}
            />

            <View style={{marginTop: 40}}>
              <TextButton
                title={'Forgot Password'}
                bgColor={'#6D21A9'}
                color={'#ffffff'}
                onPress={handleForgotPassword}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              marginTop: 100,
              marginBottom: 50,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Bold',
                fontWeight: '500',
                fontSize: 12,
                lineHeight: 18,
                color: '#000000',
                marginTop: 1,
              }}>
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text
                style={{
                  marginLeft: 5,
                  fontFamily: 'Poppins-Bold',
                  fontWeight: '700',
                  fontSize: 12,
                  lineHeight: 18,
                  color: '#6D21A9',
                  letterSpacing: 0.05,
                }}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ForgetPwd;
