import {
  Text,
  View,
  Image,
  ImageBackground,
  SafeAreaView,
  Dimensions,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {icons, images} from '../../constant';
import Greeting from '../../reusablecomponent/Greeting';
import InputField from '../../reusablecomponent/InputField';
import TextButton from '../../reusablecomponent/TextButton';
import {useNavigation} from '@react-navigation/native';

const height = Math.round(Dimensions.get('window').height);
const width = Math.round(Dimensions.get('window').width);

const ConfimPassword = ({route}) => {
  const [idData, setIdData] = useState();
  const navigation = useNavigation();
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (route && route.params && route.params.data) {
      const {data} = route.params;
      console.log('Received Data:', data);
      // Update the state with the received data
      setIdData(data);
    }
  }, [route]);

  const handlePasswordSubmit = async () => {
    const API_URL = `https://smart.techpanda.art/register/${idData.id}/`;

    try {
      const response = await fetch(API_URL, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          confirm_password: confirmPassword,
          password: password,
        }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Password updated successfully!', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('SignIn'),
          },
        ]);
      } else {
        throw new Error('Failed to update password.');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      Alert.alert('Error', 'Failed to update password. Please try again.');
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        source={images.homeBg}
        style={{
          width: '100%',
          height: '100%',
        }}
        resizeMode="cover">
        <Greeting greeting={'Update Password'} />

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
          <View style={{marginHorizontal: 20, marginTop: 50}}>
            <Text style={{fontSize: 17, fontWeight: '500', color: 'black'}}>
              New Password
            </Text>
            <InputField
              placeholder="Enter new password"
              icon={icons.lock}
              title="New password"
              maxLength={10}
              keyboardType="numeric"
              value={password}
              style={{marginTop: (height * 4) / 100}}
              onChange={text => setPassword(text)}
            />

            <Text
              style={{
                fontSize: 17,
                fontWeight: '500',
                color: 'black',
                marginTop: (height * 3) / 100,
              }}>
              Confirm Password
            </Text>
            <InputField
              placeholder="Enter confirm password"
              icon={icons.lock}
              title="Confirm password"
              maxLength={10}
              keyboardType="numeric"
              value={confirmPassword}
              style={{marginTop: (height * 4) / 100}}
              onChange={text => setConfirmPassword(text)}
            />
          </View>

          <View style={{marginTop: (width * 20) / 100}}>
            <TextButton
              title={'Submit'}
              bgColor={'#6D21A9'}
              color={'#ffffff'}
              onPress={handlePasswordSubmit}
            />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ConfimPassword;

// import React, {useState} from 'react';
// import {View, Text, TextInput, Button, Alert} from 'react-native';

// const UpdatePassword = () => {
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const handleUpdatePassword = async () => {
//     const API_URL = 'https://smart.techpanda.art/register/54/';

//     try {
//       const response = await fetch(API_URL, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           password: password,
//           confirm_password: confirmPassword,
//         }),
//       });

//       console.log('p2', password);

//       if (response.ok) {
//         Alert.alert('Success', 'Password updated successfully!');
//       } else {
//         throw new Error('Failed to update password.');
//       }
//     } catch (error) {
//       console.error('Error updating password:', error);
//       Alert.alert('Error', 'Failed to update password. Please try again.');
//     }
//   };

//   return (
//     <View>
//       <Text>New Password:</Text>
//       <TextInput
//         onChangeText={text => setPassword(text)}
//         value={password}
//         secureTextEntry
//       />

//       <Text>Confirm Password:</Text>
//       <TextInput
//         onChangeText={text => setConfirmPassword(text)}
//         value={confirmPassword}
//         secureTextEntry
//       />

//       <Button title="Update Password" onPress={handleUpdatePassword} />
//     </View>
//   );
// };

// export default UpdatePassword;
