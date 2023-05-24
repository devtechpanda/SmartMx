import {
  ImageBackground,
  ScrollView,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
  BackHandler,
  alert,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {icons, images} from '../../constant';
import {useFocusEffect} from '@react-navigation/native';
import Greeting from '../../reusablecomponent/Greeting';
import InputField from '../../reusablecomponent/InputField';
import TextButton from '../../reusablecomponent/TextButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';

const SignIn = ({navigation}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showconfirm, setShowconfirm] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [state, setState] = useState([]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePhoneChange = text => {
    setPhone(text);
  };

  // ========== backhandler ---------
  const [backPressCount, setBackPressCount] = useState(0);
  useFocusEffect(
    useCallback(() => {
      const handleBackPress = () => {
        if (backPressCount === 0) {
          setBackPressCount(1 + backPressCount);
          setTimeout(() => setBackPressCount(0), 2000);
          Alert.alert(
            'Confirm Exit',
            'Are you sure you want to exit the app?',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {text: 'Exit', onPress: () => BackHandler.exitApp()},
            ],
            {cancelable: false},
          );
        } else if (backPressCount === 1) {
          BackHandler.exitApp();
        }
        return true;
      };
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        handleBackPress,
      );
      return () => subscription.remove();
    }, [backPressCount]),
  );

  // ----- remember start ----------
  useEffect(() => {
    const showLoginDetails = async () => {
      let phone_remember = await AsyncStorage.getItem('phone');
      let password_remember = await AsyncStorage.getItem('password');
      let remember_me = await AsyncStorage.getItem('remember_me');

      console.log('phone_remember', phone_remember);
      console.log('pASSWORD_remember', password_remember);
      console.log('remember_me', remember_me);
      if (remember_me === null) {
        AsyncStorage.setItem('userData', null);
        setPhone('');
        setPassword('');
        navigation.navigate('SignIn');
      } else {
        AsyncStorage.setItem('remember_me', isChecked);
        AsyncStorage.setItem('password', password_remember);
        AsyncStorage.setItem('phone', phone_remember);
        navigation.navigate('Home', {userData: state});
      }
    };
    showLoginDetails();
  }, []);

  const handleToggle = () => {
    setIsChecked(!isChecked);
    console.log('onclick---', isChecked);
  };

  // ----- remember End ----------

  //  ============= login ==========
  const handleLogin = async () => {
    let url = `http://smart.techpanda.art/bslogin/`;
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        phone_no: phone,
        password: password,
      }),
      headers: headers,
    })
      .then(response => response.json())
      .then(response => {
        if (response.response === 'Successfully Loged In') {
          console.log('find login data', response);
          setState(JSON.stringify(response));

          AsyncStorage.setItem('userData', JSON.stringify(response));
          navigation.navigate('Home', {userData: response});
        } else {
          navigation.navigate('SignIn');
          setError(response.error_message);
        }
      })
      .catch(error => {
        console.log(error);
        Alert.alert('Error', 'Something went wrong. Please try again later.');
      });
  };

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
          contend={'Please enter your detail'}
        />

        <ScrollView showsVerticalScrollIndicator={false}>
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
            <Text style={{color: 'red', alignSelf: 'center'}}>{error}</Text>
            <InputField
              placeholder="Phone Number"
              icon={icons.user}
              title="Phone"
              maxLength={10}
              keyboardType="numeric"
              value={phone}
              onChange={handlePhoneChange}
            />
            <InputField
              placeholder="Password"
              icon={icons.lock}
              title="Password"
              value={password}
              onChange={setPassword}
              //secureTextEntry={!showPassword}
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
            <View style={{flexDirection: 'row'}}>
              <CheckBox
                value={isChecked}
                onValueChange={handleToggle}
                tintColors={{
                  true: '#6D21A9',
                  false: '#A9A9A9',
                }}
                style={{
                  borderWidth: 1,
                  borderRadius: 5,
                  width: 30,
                  height: 30,
                }}
              />
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: 0.05,
                  color: '#10011C',
                  opacity: 0.4,
                  lineHeight: 18,
                  marginLeft: 8,
                  marginTop: 5,
                }}>
                Remember Me
              </Text>

              <TouchableOpacity
                onPress={() => navigation.navigate('ForgetPwd')}
                style={{marginTop: 5}}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    fontWeight: 500,
                    fontSize: 12,
                    lineHeight: 18,
                    letterSpacing: 0.5,
                    color: '#6D21A9',
                    marginLeft: 120,
                  }}>
                  Forgot Password ?
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 50}}>
              <TextButton
                title={'Log In'}
                bgColor="#6D21A9"
                color="#ffffff"
                onPress={() => {
                  handleLogin();
                }}
              />
            </View>
          </View>

          <View>
            <TouchableOpacity onPress={() => navigation.navigate('Demo')}>
              <Text> Demo for testing</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignSelf: 'center',
              marginTop: 70,
              marginBottom: 50,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Bold',
                fontWeight: '500',
                fontSize: 12,
                lineHeight: 18,
                color: '#000000',
                letterSpacing: 1,
                marginTop: 1,
              }}>
              Don't have an account ?
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

export default SignIn;
