import React, {useEffect, useState} from 'react';
import axios from 'axios';

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import {icons, images} from '../../constant';
import TextButton from '../../reusablecomponent/TextButton';

const UnitA = ({navigation, route}) => {
  const userData = route.params.res;

  console.log(userData);

  // ----------------------------------GroupData
  const {res, grpId, grpName} = route.params;
  console.log('grpId:', grpId);

  // ------------------------------------------
  console.log(route.params.res.id);
  const [bookMarkedData, setBookMarkedData] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get('http://smart.techpanda.art/newpatient/')

  //     .then(response => {
  //       const filteredData = response.data.filter(
  //         item => item.user === 2 && item.bookmark1 === true && item.grp === 5,
  //       );
  //       setBookMarkedData(filteredData);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }, []);

  // useEffect(() => {
  //   axios
  //     .get('http://smart.techpanda.art/newpatient/')
  //     .then(response => {
  //       const filteredData = response.data.filter(
  //         item =>
  //           item.user === userData.id &&
  //           item.bookmark1 === true &&
  //           item.grp === grpId,
  //       );
  //       setBookMarkedData(filteredData);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }, [userData.id, grpId]);

  useEffect(() => {
    axios
      .get('http://smart.techpanda.art/newpatient/')
      .then(response => {
        const filteredData = response.data.filter(
          item =>
            item.user === userData.id &&
            item.bookmark1 === true &&
            item.grp === grpId,
        );
        setBookMarkedData(filteredData);
      })
      .catch(error => {
        console.log(error);
      });
  }, [userData.id, grpId]);

  const Item = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('PatientDetails2', {patient: item})}
      style={{
        padding: 16,
        borderRadius: 20,
        marginHorizontal: 20,
        marginTop: 15,
        borderWidth: 0.5,
        borderColor: '#10011C',
        backgroundColor: 'transparent',
      }}>
      <View style={{flexDirection: 'row'}}>
        <Image source={item.image || images.personal1} />

        <View style={{flexDirection: 'column', marginLeft: 20}}>
          <Text style={styles.name}>{item.fullname}</Text>
          <Text style={styles.dignosis}>Diagnosis: {item.dignosis1}</Text>
          <Text style={styles.dignosis}>Location: {item.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // dataGetting FlatList
  const [getPatient, setGetPatient] = useState([]);

  useEffect(() => {
    handleGetdPatient();
  }, []);

  const handleGetdPatient = () => {
    const {grpId} = route.params;
    const url = 'http://smart.techpanda.art/newpatient/';
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    fetch(url, {method: 'GET', headers})
      .then(response => response.json())
      .then(response => {
        const filteredData = response.filter(item => item.grp === grpId);
        setGetPatient(filteredData);
      })
      .catch(error => console.log(error));
  };

  const handleFavouritePress = item => {
    const updatedData = getPatient.map(patient => {
      if (patient.id === item.id) {
        return {
          ...patient,
          bookmark1: !patient.bookmark1,
        };
      }
      return patient;
    });
    setGetPatient(updatedData);

    const url = `http://smart.techpanda.art/newpatient/${item.id}/`;
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    fetch(url, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({
        bookmark1: !item.bookmark1,
      }),
    })
      .then(response => response.json())
      .catch(error => console.log(error));
  };

  const PatientCards = ({item, index}) => (
    <View
      style={{
        backgroundColor:
          index % 2 === 0
            ? 'rgba(250, 128, 128, 0.3)'
            : 'rgba(6, 194, 112, 0.3)',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 20,
        marginHorizontal: 20,
        marginTop: 15,
        ...(index % 3 === 2
          ? {
              borderWidth: 0.5,
              borderColor: '#10011C',
              backgroundColor: 'transparent',
            }
          : {}),
      }}>
      <Image
        source={images.profile}
        style={{width: 55, height: 55, resizeMode: 'contain'}}
      />
      <TouchableOpacity
        style={{flexDirection: 'row'}}
        onPress={() => navigation.navigate('PatientDetails', {patient: item})}>
        <View style={{flexDirection: 'column', marginLeft: 20}}>
          <Text style={styles.name}>{item.fullname}</Text>
          <Text>Diagnosis: {item.dignosis1}</Text>
          <Text>Location: {item.location}</Text>
        </View>
      </TouchableOpacity>
      <View
        style={{position: 'absolute', top: 40, right: 20, alignSelf: 'center'}}>
        <TouchableOpacity onPress={() => handleFavouritePress(item)}>
          <Image
            source={item.bookmark1 ? icons.archive_minus : icons.archive}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={images.dashBg}
        style={styles.imageBackground}
        resizeMode="cover">
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={icons.arrow_back} style={styles.image} />
          </TouchableOpacity>
          <Text style={styles.title}>{grpName}</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.label}>Group Admin:</Text>
          <Text style={styles.adminName}>{userData.fullname}</Text>
        </View>

        {/* ---------------------- */}

        {/* <>
          <View style={styles.noDetailsContainer}>
            <Text style={styles.noDetailsText}>No Details Found</Text>
          </View>
        </> */}
        {/* ---------------------- */}

        <FlatList
          data={getPatient}
          renderItem={({item}) => <PatientCards item={item} />}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 20}}
        />

        <View style={styles.buttonContainer}>
          <TextButton
            title="Add New Patient details"
            bgColor="#6D21A9"
            color="#ffffff"
            icon={icons.plus}
            onPress={() =>
              navigation.navigate('AddPatient2', {res: userData, grpId: grpId})
            }
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default UnitA;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    marginTop: 64,
    marginHorizontal: 17,
  },
  image: {
    width: 36,
    height: 36,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 27,
    letterSpacing: 1,
    color: '#150124',
    marginLeft: 10,
    marginTop: 5,
  },
  userInfo: {
    flexDirection: 'row',
    marginTop: 40,
    marginHorizontal: 20,
  },
  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    letterSpacing: 1,
    color: '#150124',
  },
  adminName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    letterSpacing: 1,
    color: '#150124',
  },
  noDetailsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noDetailsText: {
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontSize: 24,
    lineHeight: 36,
    letterSpacing: 1,
    color: '#6D21A9',
    opacity: 0.5,
  },
  buttonContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  name: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#10011C',
  },
});
