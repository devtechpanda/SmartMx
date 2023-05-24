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
import React, {useEffect, useState} from 'react';
import {icons, images} from '../../constant';
import TextButton from '../../reusablecomponent/TextButton';

const archiveIcons = {
  active: icons.archive_minus,
  inactive: icons.archive,
};

const PersonalWorkSpace = ({navigation, route}) => {
  const userData = route.params.res;

  const ref = route.params.ref;

  const [getPatient, setGetPatient] = useState([]);
  const [activeArchive, setActiveArchive] = React.useState(false);

  // ------------------------------------------------favourite

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
      headers: headers,
      body: JSON.stringify({
        bookmark1: !item.bookmark1,
      }),
    })
      .then(response => response.json())
      .then(response => {
        // Handle successful response if needed
      })
      .catch(error => {
        console.log(error);
        // Handle error if needed
      });
  };

  const PatientCards = ({item, index}) => (
    <View
      style={{
        backgroundColor: item.status ? '#06C270' : '#FFA500',
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
        onPress={() =>
          navigation.navigate('PatientDetails', {patient: item, res: userData})
        }>
        <View style={{flexDirection: 'column', marginLeft: 20}}>
          <Text style={styles.name}>{item.fullname}</Text>
          <Text>Diagnosis: {item.dignosis1}</Text>
          <Text>Location: {item.location}</Text>
        </View>
      </TouchableOpacity>

      <View
        style={{
          position: 'absolute',
          top: 40,
          right: 20,
          alignSelf: 'center',
        }}>
        <TouchableOpacity onPress={() => handleFavouritePress(item)}>
          <Image
            source={
              item.bookmark1 ? archiveIcons.active : archiveIcons.inactive
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  useEffect(() => {
    const {res, refresh} = route.params;

    handleGetdPatient(res);
  }, [route.params.res, route.params.refresh]);

  const handleGetdPatient = userData => {
    let url = `http://smart.techpanda.art/newpatient/`;
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    fetch(url, {
      method: 'GET',
      headers: headers,
    })
      .then(response => response.json())
      .then(response => {
        const filteredData = response.filter(
          patient => patient.user === userData.id,
        );
        setGetPatient(filteredData);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        source={images.dashBg}
        style={{
          widht: '100%',
          height: '100%',
        }}
        resizeMode="cover">
        <View
          style={{
            flexDirection: 'row',
            marginTop: 64,
            marginHorizontal: 17,
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={icons.arrow_back} style={styles.image} />
          </TouchableOpacity>
          <Text style={styles.heading}>Personal Workspace</Text>
        </View>
        <View
          style={{
            marginTop: 30,
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('pWorkSpace', {res: userData})}
            style={styles.buttonPersonal}>
            <Text style={styles.buttonTextPersonal}>Personal Workspace</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('UWorkSpace', {res: userData})}
            style={[
              styles.buttonPersonal,
              {backgroundColor: '#FFFFFF', marginLeft: -40},
            ]}>
            <Text style={[styles.buttonTextPersonal, {color: '#6D21A9'}]}>
              Unit Workspace
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{flex: 1, marginTop: 50}}>
          <FlatList
            data={getPatient}
            renderItem={({item}) => <PatientCards item={item} />}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 20}}
          />
        </View>
        <View style={{marginHorizontal: 20, marginBottom: 20}}>
          <TextButton
            title={'Add New Patient details'}
            bgColor={'#6D21A9'}
            color={'#ffffff'}
            icon={icons.plus}
            onPress={() => navigation.navigate('AddPatient', {res: userData})}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default PersonalWorkSpace;

const styles = StyleSheet.create({
  image: {
    width: 36,
    height: 36,
  },
  heading: {
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
  name: {
    fontFamily: 'Poppins-Bold',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.05,
    color: '#10011C',
  },
  dignosis: {
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 18,
    letterSpacing: 0.05,
    color: '#10011C',
    opacity: 0.75,
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

  buttonPersonal: {
    backgroundColor: '#6D21A9',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    elevation: 5,
  },
  buttonTextPersonal: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
