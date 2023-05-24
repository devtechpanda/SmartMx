import {
  ImageBackground,
  ScrollView,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {icons, images} from '../../constant';
import Greeting from '../../reusablecomponent/Greeting';
import InputField from '../../reusablecomponent/InputField';
import TextButton from '../../reusablecomponent/TextButton';
import CheckBox from '@react-native-community/checkbox';

import axios from 'axios';

const SignUp = ({navigation}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showconfirm, setShowconfirm] = useState(false);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordsVisibility = () => {
    setShowPasswords(!showPasswords);
  };

  const handlePhoneChange = text => {
    setPhone(text);
  };

  const handleConfirmPasswordChange = value => {
    setConfirmPassword(value);
    setPasswordsMatch(value === password);
  };

  const handleToggle = () => {
    setShowModal(!showModal);
  };

  const handleSign = () => {
    if (
      phone.length === 0 &&
      name.length === 0 &&
      username.length === 0 &&
      password.length === 0 &&
      confirmPassword.length === 0
    ) {
      Alert.alert('Error', 'Please fill all the required fields.');
      return;
    } else if (phone == '') {
      Alert.alert('Please fill mobile number');
      return;
    } else if (name == '') {
      Alert.alert('Please fill fullname');

      return;
    } else if (username == '') {
      Alert.alert('Please fill username');

      return;
    } else if (phone.length < 10) {
      Alert.alert('Please fill valid mobile number');

      return;
    } else if (password == '') {
      Alert.alert('Please fill password');

      return;
    } else if (password.length < 6) {
      Alert.alert('Minimum 6 character is allowed try with different password');

      return;
    } else if (!passwordsMatch) {
      Alert.alert('Passwords do not match!');

      return;
    } else if (isChecked == false) {
      Alert.alert('Please agree to Terms & Conditions!');

      return;
    } else {
      handleSignUp();
    }
  };

  //dropdown speciality api data
  const API_URL = 'http://smart.techpanda.art/speciality/';

  const handleSignUp = () => {
    setIsLoading(true);

    let url = `http://smart.techpanda.art/register/`;
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        phone_no: phone,
        fullname: name,
        username: username,
        password: password,
        confirm_password: confirmPassword,
        is_staff: true,
      }),
      headers: headers,
    })
      .then(response => response.json())
      .then(response => {
        if (response.username) {
          Alert.alert('Error', 'User already exists.');
        } else {
          console.log('User created successfully:', response);
          Alert.alert('Success', 'User created successfully.', [
            {
              text: 'OK',
              onPress: () =>
                navigation.navigate('MoreDetails', {
                  userSignupResponse: response,
                }),
            },
          ]);

          console.log('shyam10', response);
        }
      })
      .catch(error => {
        console.log(error);
        Alert.alert('Error', 'Something went wrong. Please try again later.');
      })
      .finally(() => setIsLoading(false));
  };

  //model terms and conditions
  const termsAction = () => {
    setShowModal(false);
    setIsChecked(true);
  };

  useEffect(() => {
    axios
      .get(API_URL)
      .then(response => setData(response.data))
      .catch(error => console.log(error));
  }, []);

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
          greeting={'Hi ! Welcome'}
          contend={'Lets create an account'}
        />

        <ScrollView showsHorizontalScrollIndicator={false}>
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
              placeholder="Phone Number"
              icon={icons.call}
              title="Phone"
              maxLength={10}
              keyboardType="numeric"
              value={phone}
              onChange={handlePhoneChange}
            />
            <InputField
              placeholder="Full Name"
              icon={icons.user}
              title="Name"
              value={name}
              onChange={setName}
              maxLength={20}
            />
            <InputField
              placeholder="Username"
              icon={icons.user}
              title="UserName"
              value={username}
              onChange={setUsername}
              maxLength={20}
            />

            {/* --------- PASSWORD ------ */}

            <InputField
              placeholder="Password"
              icon={icons.lock}
              title="Password"
              value={password}
              onChange={setPassword}
              secureTextEntry={!showPassword}
              appendComponent={
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <Image source={icons.eye_slash} />
                  ) : (
                    <Image source={icons.eye_show} />
                  )}
                </TouchableOpacity>
              }
            />

            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 10,
                fontWeight: '400',
                lineHeight: 15,
                letterSpacing: 0.05,
                color: '#000',
                opacity: 0.3,
                marginBottom: 10,
              }}>
              Must contain a number at least 6 characters
            </Text>

            <InputField
              placeholder="Confirm Password"
              icon={icons.lock}
              title="ConfirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              secureTextEntry={!showconfirm}
              appendComponent={
                <TouchableOpacity onPress={() => setShowconfirm(!showconfirm)}>
                  {showconfirm ? (
                    <Image source={icons.eye_slash} />
                  ) : (
                    <Image source={icons.eye_show} />
                  )}
                </TouchableOpacity>
              }
            />

            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 10,
                fontWeight: '400',
                lineHeight: 15,
                letterSpacing: 0.05,
                color: '#000',
                opacity: 0.3,
                marginBottom: 10,
              }}>
              Must contain a number and least 6 characters
            </Text>

            {passwordsMatch ? (
              <Text
                style={{fontFamily: 'Rokkitt-Regular', color: 'transparent'}}>
                Passwords match!
              </Text>
            ) : (
              <Text
                style={{fontFamily: 'Rokkitt-Regular', color: 'transparent'}}>
                Passwords do not match!
              </Text>
            )}

            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                marginTop: 20,
              }}>
              <CheckBox
                value={isChecked}
                onValueChange={handleToggle}
                tintColors={{
                  true: '#6D21A9',
                  false: '#A9A9A9',
                }}
                style={{
                  borderWidth: 1,
                  borderColor: '#6D21A9',
                  borderRadius: 5,
                  width: 30,
                  height: 30,
                }}
              />
              <View style={{marginTop: 5}}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    fontSize: 12,
                    fontWeight: 500,
                    letterSpacing: 0.05,
                    color: '#10011C',
                    lineHeight: 18,
                    marginLeft: 8,
                  }}>
                  Accept{' '}
                  <Text
                    style={{
                      color: '#6D21A9',
                      fontFamily: 'Poppins-Bold',
                      fontSize: 14,
                      fontWeight: 600,
                      letterSpacing: 0.05,
                      lineHeight: 18,
                    }}>
                    Terms and Conditions
                  </Text>
                </Text>
              </View>
            </View>

            <TouchableOpacity style={{marginTop: 20}}>
              <TextButton
                title={'Sign Up'}
                bgColor={'#6D21A9'}
                color={'#ffffff'}
                onPress={handleSign}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              marginTop: 50,
              marginBottom: 20,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Bold',
                fontWeight: '500',
                fontSize: 12,
                lineHeight: 18,
                color: '#000000',
                marginTop: 1,
                letterSpacing: 1,
              }}>
              Don't have an account ?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
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
                Log In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
      {/* Modal */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType={'slide'}
        onRequestClose={() => setShowModal(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000000AA',
          }}>
          <View
            style={{
              backgroundColor: '#FFFFFF',
              padding: 20,
              borderRadius: 10,
              marginHorizontal: 20,
            }}>
            <View style={{alignSelf: 'center'}}>
              <Text
                style={{
                  fontFamily: 'Poppins-Bold',
                  fontSize: 15,
                  marginBottom: 10,
                  fontWeight: 600,
                  lineHeight: 22,
                  letterSpacing: 0.05,
                  color: '#10011C',
                }}>
                Terms and Conditions
              </Text>
            </View>

            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 14,
                letterSpacing: 0.05,
                lineHeight: 21,
                marginTop: 10,
                color: '#000',
              }}>
              "By accepting and agreeing to the terms and conditions of this
              app, I affirm that I have obtained appropriate consent from the
              patients whose details I will be adding to the app. I understand
              and acknowledge that the information entered into the app will be
              used solely for treatment purposes and will not be shared with
              individuals who are not involved in the treatment process."
            </Text>
            <TouchableOpacity style={{marginTop: 30}}>
              <TextButton
                title={'Get Started'}
                bgColor={'#6D21A9'}
                color={'#ffffff'}
                onPress={termsAction}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default SignUp;
