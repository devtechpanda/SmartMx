import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {icons, images} from '../../constant';
import Greeting from '../../reusablecomponent/Greeting';
import InputField from '../../reusablecomponent/InputField';
import TextButton from '../../reusablecomponent/TextButton';
import SelectDropdown from 'react-native-select-dropdown';
import axios from 'axios';
const {height, width} = Dimensions.get('window');

const API_URL = 'http://smart.techpanda.art/speciality/';
const API_URL2 = 'http://smart.techpanda.art/course/';

const MoreDetails = ({navigation, route}) => {
  const {userSignupResponse} = route.params;
  //for dp send request
  const [isDPLoading, setIsDPLoading] = useState(false);

  useEffect(() => {
    setUser(userSignupResponse.id);
  }, [userSignupResponse]);

  //Speciality
  const [specialityData, setspecialityData] = useState([]);
  // const [dropdownVisible, setDropdownVisible] = useState(false);
  useEffect(() => {
    axios
      .get(API_URL)
      .then(response => setspecialityData(response.data))
      .catch(error => console.log('1', error));
  }, []);

  //Course
  const [courseAPIData, setcourseAPIData] = useState([]);
  useEffect(() => {
    axios
      .get(API_URL2)
      .then(response => setcourseAPIData(response.data))
      .catch(error => console.log('2', error));
  }, []);

  const [user, setUser] = useState(81);
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState(1);
  const [specialist, setSpecialist] = useState('');
  const [college, setCollege] = useState('');
  const [registration, setRegistration] = useState('');

  const handleSubmit = () => {
    const formData = {
      user,
      email,
      course,
      specialist,
      college,
      registration,
    };
    axios
      .post('http://smart.techpanda.art/fewdetail/', formData)
      .then(response => {
        handleDPSendRequest();
        navigation.navigate('SignIn');
      })
      .catch(error => {
        console.log(error);
      });
  };

  // console.log('course', course);

  // -----------------------------------------------passing doctor id to the image api as a user
  // console.log('userSignupResponse', userSignupResponse.id);

  const handleDPSendRequest = async () => {
    setIsDPLoading(true);

    try {
      const response = await fetch('https://smart.techpanda.art/image/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: userSignupResponse.id,
        }),
      });

      if (response.ok) {
        // Request was successful
        console.log('Request sent successfully');
      } else {
        // Request failed
        console.log('Request failed');
      }
    } catch (error) {
      console.log('Error:', error);
    }

    setIsDPLoading(false);
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
        <Greeting greeting={'Few More Details'} alignSelf={'center'} />
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
              placeholder="Email ID"
              icon={icons.sms}
              title="Email"
              value={email}
              onChange={setEmail}
            />
            {/* course */}
            <View style={styles.viewContainer}>
              <SelectDropdown
                data={courseAPIData}
                onSelect={(item, index) => {
                  setCourse(`${item.id}`); // assigning data to course
                }}
                buttonStyle={styles.dropdown3BtnStyle}
                renderCustomizedButtonChild={(selectedItem, index) => {
                  return (
                    <View style={styles.dropdown3BtnChildStyle}>
                      <Image
                        source={require('../../assets/icon/teacher2.png')}
                      />
                      <Text style={styles.dropdown3BtnTxt}>
                        {selectedItem ? selectedItem.subject : 'Course'}
                      </Text>
                    </View>
                  );
                }}
                renderDropdownIcon={isOpened => {
                  return isOpened ? (
                    ''
                  ) : (
                    <Image
                      source={require('../../assets/icon/arrow-down.png')}
                    />
                  );
                }}
                dropdownIconPosition={'right'}
                rowStyle={styles.dropdown3RowStyle}
                renderCustomizedRowChild={(item, index) => {
                  return (
                    <View style={styles.dropdown3RowChildStyle}>
                      <Image
                        source={item.image}
                        style={styles.dropdownRowImage}
                      />
                      <Text style={styles.dropdown3RowTxt}>{item.subject}</Text>
                    </View>
                  );
                }}
              />
            </View>
            {/* specialist */}
            <View style={styles.viewContainer}>
              <SelectDropdown
                data={specialityData}
                onSelect={(item, index) => {
                  // console.log('se', item.id);
                  setSpecialist(`${item.id}`); //assigning data to specialist
                }}
                buttonStyle={styles.dropdown3BtnStyle}
                renderCustomizedButtonChild={(selectedItem, index) => {
                  return (
                    <View style={styles.dropdown3BtnChildStyle}>
                      <Image source={require('../../assets/icon/award2.png')} />

                      <Text style={styles.dropdown3BtnTxt}>
                        {selectedItem ? selectedItem.specialist : 'Speciality'}
                      </Text>
                    </View>
                  );
                }}
                renderDropdownIcon={isOpened => {
                  return isOpened ? (
                    ''
                  ) : (
                    <Image
                      source={require('../../assets/icon/arrow-down.png')}
                    />
                  );
                }}
                dropdownIconPosition={'right'}
                rowStyle={styles.dropdown3RowStyle}
                renderCustomizedRowChild={(item, index) => {
                  return (
                    <View style={styles.dropdown3RowChildStyle}>
                      <Text style={styles.dropdown3RowTxt}>
                        {item.specialist}
                      </Text>
                    </View>
                  );
                }}
              />
            </View>
            <InputField
              placeholder="College"
              icon={icons.building}
              title="College"
              value={college}
              onChange={setCollege}
            />
            <InputField
              placeholder="Registration No"
              icon={icons.note}
              title="Registration"
              value={registration}
              onChange={setRegistration}
            />
            <View style={{marginTop: 20}}>
              <TextButton
                title={'Get Started'}
                bgColor={'#6D21A9'}
                color={'#FFFFFF'}
                onPress={handleSubmit}
              />
            </View>
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
                letterSpacing: 1,
                marginTop: 1,
              }}>
              Have an account ?
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
    </SafeAreaView>
  );
};

const courseslist = [
  {title: 'BDS', image: require('../../assets/icon/teacher2.png')},
  {title: 'BAMS', image: require('../../assets/icon/teacher2.png')},
  {title: 'BHMS', image: require('../../assets/icon/teacher2.png')},
  {title: 'BSc. Nursing', image: require('../../assets/icon/teacher2.png')},
  {title: 'B. Pharmacy', image: require('../../assets/icon/teacher2.png')},
  {title: 'BPT', image: require('../../assets/icon/teacher2.png')},
  {title: 'Biotechnology', image: require('../../assets/icon/teacher2.png')},
];
const specialitylist = [
  {title: 'Neuro', image: require('../../assets/icon/award2.png')},
  {title: 'ENT', image: require('../../assets/icon/award2.png')},
  {title: 'Heart', image: require('../../assets/icon/award2.png')},
  {title: 'Cancer', image: require('../../assets/icon/award2.png')},
];

export default MoreDetails;
const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    width: width,
    backgroundColor: 'transparent',
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '50%',
    paddingBottom: '20%',
    borderRadius: 10,
  },
  dropdown3BtnStyle: {
    width: '90%',
    padding: 5,
    backgroundColor: 'rgba(178, 37, 204, 0.05)',
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: '#fff',
    marginBottom: 15,
  },
  dropdown3BtnChildStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    borderRadius: 10,
  },

  dropdown3BtnTxt: {
    color: '#10011C',
    textAlign: 'center',
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
    marginHorizontal: 12,
    opacity: 0.5,
  },
  dropdown3RowStyle: {
    backgroundColor: 'rgba(178, 37, 204, 0.05)',
    borderBottomColor: '#fff',
    height: 50,
    borderRadius: 10,
  },
  dropdown3RowChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 18,
    borderRadius: 10,
    backgroundColor: 'rgba(178, 37, 204, 0.02)',
  },
  dropdown3RowTxt: {
    color: '#10011C',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    marginHorizontal: 12,
    opacity: 0.4,
  },
});
