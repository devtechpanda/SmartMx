import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  FlatList,
  ScrollView,
  Alert,
} from 'react-native';
import {icons, images} from '../../constant';
import Divider from '../../reusablecomponent/Divider';
import EditBtn from '../../assets/svg/EditBtn.svg';
import ProfieEdit from '../../assets/svg/ProfieEdit.svg';

const Profile = ({navigation, route}) => {
  const userData = route?.params?.res;
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`https://smart.techpanda.art/userprofilefilter/${userData.id}`)
      .then(response => setData(response.data.results))
      .catch(error => console.error(error));
  }, []);

  console.log('response---', userData.id);

  const [imageData, setImageData] = useState(null);
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

  // -------------------------post new image to image api

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 64,
            marginHorizontal: 17,
            paddingVertical: 9,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home', {userData: userData})}>
            <Image source={icons.arrow_back} style={styles.image} />
          </TouchableOpacity>
          <Text style={styles.text}>Profile</Text>
        </View>

        <FlatList
          data={data}
          keyExtractor={item => item.username}
          renderItem={({item}) => (
            <>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                {imageData && (
                  <Image
                    source={{uri: imageData}}
                    style={{
                      width: 125,
                      height: 120,
                      borderRadius: 10,
                      marginTop: 1,
                    }}
                  />
                )}
                <TouchableOpacity
                  style={{position: 'absolute', top: 96}}
                  onPress={() =>
                    Alert.alert('Image Editing is currently under development.')
                  }>
                  <ProfieEdit />
                </TouchableOpacity>
              </View>
              <View style={{alignItems: 'center', marginTop: 30}}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Bold',
                    fontStyle: 'normal',
                    fontWeight: 600,
                    fontSize: 25.48,
                    lineHeight: 38,
                    letterSpacing: 0.5,
                    color: '#10011C',
                  }}>
                  {item.fullname}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    fontSize: 20,
                    lineHeight: 30,
                    letterSpacing: 0.5,
                    color: '#10011C',
                    opacity: 0.5,
                  }}>
                  Rank : 4.5
                </Text>
              </View>
              <ScrollView showsHorizontalScrollIndicator={false}>
                <View style={styles.box}>
                  <View style={{padding: 15}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={styles.diagnosis}>Username</Text>
                      <Text style={styles.treatment}>{item.username}</Text>
                    </View>

                    <Divider />
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={styles.diagnosis}>Course</Text>
                      <Text style={styles.treatment}>{item.course}</Text>
                    </View>
                    <Divider />
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={styles.diagnosis}>Speciality</Text>
                      <Text style={styles.treatment}>{item.specialist}</Text>
                    </View>
                    <Divider />
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={styles.diagnosis}>Role</Text>
                      {/* Roal api intigration */}
                      <Text style={styles.treatment}>{item.specialist}</Text>
                    </View>
                    <Divider />

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={styles.diagnosis}>Cases</Text>
                      <Text style={styles.treatment}>{item.cases}</Text>
                    </View>
                    <Divider />
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={styles.diagnosis}>College Name</Text>
                      <Text style={styles.treatment}>{item.college}</Text>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </>
          )}
        />
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 36,
    height: 36,
  },
  text: {
    fontFamily: 'Poppins-Bold',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 18,
    lineHeight: 27,
    letterSpacing: 1,
    color: '#150124',
    marginLeft: 10,
    marginTop: 5,
  },
  box: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0.957055,
    borderColor: '#10011C',
    borderRadius: 19.1411,
    shadowColor: '#10011C',
    shadowOffset: {
      width: 0,
      height: 3.82822,
    },
    shadowOpacity: 0.08,
    shadowRadius: 28.7117,
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 50,
  },

  diagnosis: {
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.05,
    color: '#10011C',
  },
  treatment: {
    fontFamily: 'Poppins-Bold',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.05,
    color: '#10011C',
    width: '60%',
    textAlign: 'right',
  },
});

export default Profile;
// ---------------------------------------
