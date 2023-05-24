import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  Alert,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {icons, images} from '../../constant';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {useNavigation} from '@react-navigation/native';

const Home = ({navigation, route}) => {
  const {res} = route.params;

  const userData = route.params.userData;

  const [totalPatientsData, setTotalPatientsData] = useState({});
  const [totalWeekly, setTotalWeekly] = useState('');
  const [Patients, setPatients] = useState('');

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

  // ---------------------------------------------------------

  useEffect(() => {
    totalPatientsDataFetchData();
  }, []);

  const totalPatientsDataFetchData = async () => {
    try {
      const response = await axios.get(
        'https://smart.techpanda.art/patientcountfilter/2',
      );
      const data = response.data;
      setTotalWeekly(data.results[0].weekly);
      setPatients(data.results[0].totalpatient);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  useEffect(() => {
    setTotalPatientsData({totalWeekly, Patients});
  }, [totalWeekly, Patients]);

  // ---------------------------------------------------------
  const handleLogout = async () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: async () => {
            try {
              // Clear permanent storage data
              await AsyncStorage.removeItem('userData');
              // Navigate to the SignUp screen
              navigation.reset({
                index: 0,
                routes: [{name: 'SignIn'}],
              });
            } catch (error) {
              console.log('Error clearing storage data:', error);
            }
          },
        },
      ],
      {cancelable: false},
    );
  };
  const [imageData, setImageData] = useState(null);

  console.log(userData.id);

  // IMAGE FOR DP INTIGRATION
  useEffect(() => {
    fetch(`https://smart.techpanda.art/image/`)
      .then(response => {
        console.log('Response:', response);
        return response.json();
      })
      .then(data => {
        const filteredData = data.filter(item => item.user === userData.id);
        setImageData(filteredData[0]?.image);
      })
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    console.log('shyam', imageData);
  }, [imageData]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        source={images.homeBg}
        style={{
          widht: '100%',
          height: '100%',
        }}
        resizeMode="cover">
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: 20,
            marginTop: 40,
            marginBottom: 80,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile', {res: userData})}
            style={{flexDirection: 'row'}}>
            {/* DP Image CODE*/}
            {imageData ? (
              <Image
                source={{uri: imageData}}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 10,
                  marginTop: 1,
                }}
              />
            ) : (
              <Image
                source={images.personal1} // Fallback image source
                style={styles.icon}
              />
            )}

            <View
              style={{flexDirection: 'column', marginLeft: 20, marginTop: 10}}>
              <Text style={styles.heading}> {userData.fullname} </Text>
              <Text style={styles.greeting}>Welcome</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={{color: '#F5F5F5', marginRight: 30, marginTop: 20}}>
              LogOut
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
          }}>
          <TouchableOpacity onPress={() => {}}>
            <ImageBackground
              source={icons.home}
              style={{
                width: 100,
                height: 100,
              }}>
              <Text style={styles.text}>Home</Text>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('pWorkSpace', {res: userData})}>
            <ImageBackground
              source={icons.pWorkSpace}
              style={{
                width: 100,
                height: 100,
              }}></ImageBackground>
            <Text style={[styles.text, {left: 23}]}>Personal Workspace</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('UWorkSpace', {res: userData})}>
            <ImageBackground
              source={icons.UWorkSpace}
              style={{
                width: 100,
                height: 100,
              }}>
              <Text style={[styles.text, {right: 5}]}>
                {'     '}Unit Workspace
              </Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('BookMarked', {res: userData})}>
            <ImageBackground
              source={icons.bookMark}
              style={{
                width: 100,
                height: 100,
              }}>
              <Text style={styles.text}>Bookmarked Cases</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={{
            flex: 1,
            marginHorizontal: 20,
            marginTop: 50,
            marginBottom: 50,
          }}
          showsVerticalScrollIndicator={false}>
          <Text style={styles.head}>Your Statistics</Text>

          <View style={styles.patientContainer}>
            <Image style={styles.patientImage} source={images.home1} />
            <View style={styles.patientDetails}>
              <Text style={styles.patientNum}>{Patients}</Text>
              <Text style={styles.patientTotal}>Total Patient Treated</Text>
            </View>
          </View>

          <View style={[styles.patientContainer]}>
            <Image style={styles.patientImage} source={images.home2} />
            <View style={styles.patientDetails}>
              <Text style={styles.patientNum}>{totalWeekly}</Text>
              <Text style={styles.patientTotal}>Weekly Patient Treated</Text>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  heading: {
    fontFamily: 'Poppins-Regular',
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 1,
    marginLeft: -4,
    color: '#ffffff',
  },
  greeting: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 24,
    letterSpacing: 1,
    color: '#ffffff',
  },
  head: {
    fontFamily: 'Poppins-Bold',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 30,
    letterSpacing: 1,
    color: '#10011C',
  },
  patientContainer: {
    alignItems: 'center',
    borderWidth: 0.96,
    borderColor: 'rgba(16, 1, 28, 0.8)',
    borderRadius: 19.1411,
    marginTop: 20,
    padding: 20,
  },
  patientNum: {
    fontFamily: 'Poppins-Bold',
    fontStyle: 'normal',
    fontWeight: '800',
    lineHeight: 45,
    fontSize: 30,
    letterSpacing: 0.05,
    color: '#6B20A6',
    textAlign: 'center',
  },
  patientTotal: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 24,
    letterSpacing: 0.05,
    color: '#10011C',
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 0.5,
    color: '#10011C',
    position: 'absolute',
    alignSelf: 'center',
    marginTop: 90,
  },
});
