import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {icons, images} from '../../constant';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    const fetchData = async () => {
      setTimeout(async () => {
        try {
          const userData = await AsyncStorage.getItem('userData');
          console.log('userData', userData);
          if (userData) {
            const userDta = JSON.parse(userData);
            navigation.navigate('Home', {userData: userDta});
          } else {
            navigation.navigate('SignIn');
          }
        } catch (error) {
          navigation.navigate('SignIn');
        }
      }, 1000);
    };

    fetchData();
  }, [navigation]);

  return (
    <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
      <ImageBackground
        style={styles.container}
        source={images.bgSplash}
        resizeMode="cover">
        <Image source={icons.splash_icon} style={styles.image} />
        <Text style={styles.text}>Smart Mx</Text>
        <View style={styles.line} />
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  image: {
    width: 122,
    height: 122,
  },
  text: {
    fontSize: 30,
    fontFamily: 'Poppins-Regular',
    fontWeight: '600',
    lineHeight: 45,
    letterSpacing: 0.05,
    color: '#fff',
    marginTop: 20,
  },
  line: {
    height: 1,
    backgroundColor: '#FFFFFF',
    width: 193,
  },
});

export default SplashScreen;

// import {
//   StyleSheet,
//   Text,
//   View,
//   ImageBackground,
//   Image,
//   TouchableOpacity,
// } from 'react-native';
// import React, {useEffect} from 'react';
// import {icons, images} from '../../constant';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const SplashScreen = ({navigation}) => {
//   useEffect(async () => {
//     setTimeout(() => {
//       AsyncStorage.getItem('userData')
//         .then(userData => {
//           console.log('userData', userData);
//           if (userData) {
//             let userDta = JSON.parse(userData);
//             navigation.navigate('Home', {userData: userDta});
//           } else {
//             navigation.navigate('SignIn');
//           }
//         })
//         .catch(error => {
//           navigation.navigate('SignIn');
//         });
//     }, 1000);
//   }, []);
//   return (
//     <TouchableOpacity
//       onPress={() => {
//         navigation.navigate('SignIn');
//       }}>
//       <ImageBackground
//         style={{
//           alignItems: 'center',
//           justifyContent: 'center',
//           widht: '100%',
//           height: '100%',
//         }}
//         source={images.bgSplash}
//         resizeMode="cover">
//         <Image source={icons.splash_icon} style={{width: 122, height: 122}} />
//         <Text style={styles.text}>Smart Mx</Text>
//         <View
//           style={{
//             height: 1,
//             backgroundColor: '#FFFFFF',
//             width: 193,
//           }}
//         />
//       </ImageBackground>
//     </TouchableOpacity>
//   );
// };

// export default SplashScreen;

// const styles = StyleSheet.create({
//   text: {
//     fontSize: 30,
//     fontFamily: 'Poppins-Regular',
//     fontWeight: 600,
//     lineHeight: 45,
//     letterSpacing: 0.05,
//     color: '#fff',
//     marginTop: 20,
//   },
// });
