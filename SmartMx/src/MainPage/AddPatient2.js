import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Alert,
  Button,
  alert,
  // -----------voice start --
  PermissionsAndroid,
  // -----------voice end--
  // -----------share start --
  Share,
  // -----------share end --
} from 'react-native';

import React, {useState, useEffect} from 'react';
import {icons, images} from '../../constant';
import InputField from '../../reusablecomponent/InputField';
//import TextButton from '../../reusablecomponent/TextButton';
import SelectDropdown from 'react-native-select-dropdown';
import DocSvg from '../../assets/svg/documenticon.svg';
import ShareSvg from '../../assets/svg/share.svg';
import VoiceSvg from '../../assets/svg/Voice.svg';
// -----------image start--
import DocumentPicker from 'react-native-document-picker';
// -----------image end--
// -----------voice start --

import {Buffer} from 'buffer';
import Permissions from 'react-native-permissions';
import AudioRecord from 'react-native-audio-record';
import RNFS from 'react-native-fs';
// -----------voice end--
import axios from 'axios';
const {width} = Dimensions.get('window');

const API_URL = 'https://smart.techpanda.art/doctorfullname/';

const AddPatient2 = ({navigation, route}) => {
  const userData = route.params.res;

  // console.log('for personalworkspace', user);

  const {res, grpId, grpName} = route.params;

  const [fullname, setFullname] = useState('');
  const [location, setLocation] = useState('');
  const [gender, setGender] = useState('');
  //pass doctor names id to user as assign
  const [user, setUser] = useState(userData.id);
  const [assign, setAssign] = useState('');
  // -------------
  const [dignosis1, setDignosis1] = useState([]);
  const [discharged, setDischarged] = useState('');
  const [investigationplaned, setInvestigationplaned] = useState('');
  const [treatmentplan, setTreatmentplan] = useState('');
  const [status, setStatus] = useState(true);
  const [assigdata, setAssigData] = useState('');
  // -------------share start--
  const [complete, setComplete] = useState('');
  // -------------share end--
  const [bookmark1, setBookmark1] = useState(false);
  const [comment, setComment] = useState('');
  const [grp, setGrp] = useState(grpId);
  // -----------voice start --
  const [audioFile, setAudioFile] = useState('');
  const [recording, setRecording] = useState(false);
  // -----------voice end--
  // -----------image start --
  const [upload, setUpload] = useState();
  // -----------image end --
  // -----------voice start --
  const [voice, setVoice] = useState();
  // -----------voice end --
  // -----------voice start --

  // console.log('upload check', upload);
  let sound = null;

  useEffect(() => {
    checkPermission();

    const options = {
      sampleRate: 16000,
      channels: 1,
      bitsPerSample: 16,
      wavFile: 'test.wav',
    };

    AudioRecord.init(options);

    AudioRecord.on('data', data => {
      const chunk = Buffer.from(data, 'base64');
      console.log('chunk size', chunk.byteLength);
    });

    return () => {
      AudioRecord.stop();
      if (sound) {
        sound.release();
        sound = null;
      }
    };
  }, []);
  // -----------voice end--
  const genderlist = [
    {title: 'Male', image: require('../../assets/icon/gender2.png')},
    {title: 'Female', image: require('../../assets/icon/gender2.png')},
    {title: 'Other', image: require('../../assets/icon/gender2.png')},
  ];

  //assignedstatus
  const [assignedData, setassignedData] = useState([]);
  useEffect(() => {
    axios
      .get(API_URL)

      .then(response => setassignedData(response.data.results))
      .catch(error => console.log('assignederror', error));
  }, []);

  const dischargedornot = [{title: 'Discharged'}, {title: 'Not Discharged'}];

  const statusArray = [
    {image: require('../../assets/icon/completeicon.png'), title: 'Complete'},
    {image: require('../../assets/icon/pendingicon.png'), title: 'Pending'},
  ];

  //const handlePostData = () => {
  // -----------voice start --
  const handlePostData = async () => {
    try {
      const existingPatientResponse = await fetch(
        'http://smart.techpanda.art/newpatient/',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (!existingPatientResponse.ok) {
        throw new Error('Failed to fetch existing patients');
      }

      const existingPatientData = await existingPatientResponse.json();

      const existingPatient = existingPatientData.find(
        patient => patient.fullname === fullname,
      );
      if (existingPatient) {
        console.log('User already exists with the same name');
        Alert.alert('User already exists');
        return;
      }

      const formData = new FormData();
      formData.append('fullname', fullname);
      formData.append('location', location);
      formData.append('gender', gender);
      formData.append('dignosis1', JSON.stringify(dignosis1));
      formData.append('discharged', discharged);
      formData.append('investigationplaned', investigationplaned);
      formData.append('treatmentplan', treatmentplan);
      formData.append('status', status);
      formData.append('bookmark1', bookmark1);
      formData.append('comment', comment);
      formData.append('user', user);
      formData.append('grp', grp);

      if (upload) {
        const fileImage = {
          uri: upload,
          name: 'image.jpg',
          type: 'image/jpeg',
        };
        formData.append('upload', fileImage);
      }

      if (voice) {
        const fileStat = await RNFS.stat(voice);
        const file = {
          uri: 'file://' + voice,
          name: 'recording.wav',
          type: 'audio/wav',
          size: fileStat.size,
        };
        formData.append('voice', file);
      }

      const createPatientResponse = await fetch(
        'http://smart.techpanda.art/newpatient/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        },
      );

      if (!createPatientResponse.ok) {
        throw new Error('Failed to create new patient');
      }

      const createPatientData = await createPatientResponse.json();

      Alert.alert('Successfully Sent');
      console.log(createPatientData);
      navigation.navigate('UnitA', {
        res: userData,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // -----------image start--
  const selectDoc = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });
      setUpload(res.uri);
      console.log('Selected image:', res.uri);
    } catch (err) {
      if (DocumentPicker.isCancel(err))
        console.log('User cancelled the upload');
      else console.log(err);
    }
  };
  // -----------image end--

  // -----------voice start--
  const checkPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        title: 'Cool Photo App Camera Permission',
        message:
          'Cool Photo App needs access to your camera' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    const p = await Permissions.check('microphone');
    console.log('permissions check', p);
    if (p === 'authorized') return;
    return requestPermission();
  };

  const requestPermission = async () => {
    const p = await Permissions.request('microphone');
    console.log('permissions request', p);
  };

  const toggleRecording = () => {
    if (recording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const startRecording = () => {
    console.log('start record');
    setAudioFile('');
    setRecording(true);
    AudioRecord.start();
  };

  const stopRecording = async () => {
    if (!recording) return;
    console.log('stop record');
    let audioFile = await AudioRecord.stop();
    console.log('audioFile', audioFile);
    //setUpload(audioFile);
    setVoice(audioFile);
    // Set the audio file path to the upload state
    //setAudioFile(audioFile);
    setRecording(false);
  };
  // -----------voice end--

  // ------------ Share ----------
  const handleShare = () => {
    const message = `Name: ${fullname}
    \nlocation: ${location}
    \nGender: ${gender}
    \nAssign: ${assigdata}
    \nDiagnosis: ${dignosis1[0]}
    \nDischarged: ${discharged}
    \nInvestigationPlan: ${investigationplaned}
    \nTreatmentPlan: ${treatmentplan}
    \nCompleteStatus: ${complete}
    \nComment: ${comment}`;
    Share.share({
      message: message,
    });
  };
  // -------------share end--

  console.log('saaaaaaaaaaaaaaaaaaaaaaaa', user);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        source={images.dashBg}
        resizeMode="cover"
        style={{
          widht: '100%',
          height: '100%',
        }}>
        <View
          style={{flexDirection: 'row', marginTop: 64, marginHorizontal: 17}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={icons.arrow_back} style={styles.image} />
          </TouchableOpacity>

          <Text style={styles.text}>Add Patient details</Text>
        </View>
        <ScrollView style={{marginTop: 30}}>
          <View style={{flex: 1, marginHorizontal: 20}}>
            <InputField
              editable={true}
              placeholder="Full Name"
              icon={icons.user}
              title="Name"
              value={fullname}
              onChange={setFullname}
            />

            <InputField
              editable={true}
              placeholder="Location"
              icon={icons.location}
              title="Location"
              value={location}
              onChange={setLocation}
            />

            {/* genderlist */}
            <View style={styles.viewContainer}>
              <SelectDropdown
                data={genderlist}
                onSelect={(selectedItem, index) => {
                  setGender(selectedItem.title);
                }}
                buttonStyle={styles.dropdown3BtnStyle}
                renderCustomizedButtonChild={(selectedItem, index) => {
                  return (
                    <View style={styles.dropdown3BtnChildStyle}>
                      {selectedItem ? (
                        <Image
                          source={selectedItem.image}
                          style={styles.dropdown3BtnImage}
                        />
                      ) : (
                        <Image
                          source={require('../../assets/icon/gender2.png')}
                        />
                      )}
                      <Text
                        style={[
                          styles.dropdown3BtnTxt,
                          {marginHorizontal: 18},
                        ]}>
                        {selectedItem ? selectedItem.title : 'Gender'}
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
                      <Text
                        style={[
                          styles.dropdown3RowTxt,
                          {marginHorizontal: 15},
                        ]}>
                        {item.title}
                      </Text>
                    </View>
                  );
                }}
              />
            </View>
            {/* ------------------------------------- */}

            {/* assignedlist */}
            <View style={styles.viewContainer}>
              <SelectDropdown
                data={assignedData}
                onSelect={(item, index) => {
                  console.log('fdfdf', item.fullname);
                  setAssigData(item.fullname);
                  setAssign(`${item.id}`);
                }}
                buttonStyle={styles.dropdown3BtnStyle}
                renderCustomizedButtonChild={(selectedItem, index) => {
                  return (
                    <View style={styles.dropdown3BtnChildStyle}>
                      <Image
                        source={require('../../assets/icon/profile.png')}
                        style={{opacity: 0.5, height: 20, width: 20}}
                      />
                      <Text
                        style={[
                          styles.dropdown3BtnTxt,
                          {marginHorizontal: 20},
                        ]}>
                        {selectedItem ? selectedItem.fullname : 'Assigned'}
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
                      <Text
                        style={[
                          styles.dropdown3RowTxt,
                          {marginHorizontal: 35},
                        ]}>
                        {item.fullname}
                      </Text>
                    </View>
                  );
                }}
              />
            </View>

            {/* ------------------------------------- */}
            {/* diagnosis */}
            <View
              style={{
                height: 56,
                width: '100%',
                borderWidth: 0.5,
                borderColor: '#FFFFFF',
                borderRadius: 10,
                marginBottom: 15,
                backgroundColor: 'rgba(178, 37, 204, 0.05)',
              }}>
              <View
                style={{
                  marginHorizontal: 17.67,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                <Image
                  source={icons.diagnosis}
                  style={{
                    tintColor: '#02141F',
                    width: 20,
                    height: 20,
                    marginRight: 12.67,
                    opacity: 0.5,
                  }}
                />

                <TextInput
                  style={{
                    flex: 1,
                    fontSize: 14,
                    lineHeight: 21,
                    fontWeight: '400',
                    fontFamily: 'Poppins-Regular',
                    color: '#10011C',
                    opacity: 0.4,
                    letterSpacing: 0.05,
                    height: 56,
                  }}
                  editable={true}
                  placeholder={`Diagnosis ${
                    dignosis1.length > 0 ? dignosis1.length : '1'
                  }`}
                  placeholderTextColor={'#10011C'}
                  value={dignosis1[0]}
                  onChangeText={text => {
                    const updatedDiagnosis = [...dignosis1];
                    updatedDiagnosis[0] = text;
                    setDignosis1(updatedDiagnosis);
                  }}
                />
              </View>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  flexDirection: 'row',
                  bottom: 10,
                  right: 20,
                }}
                onPress={() => {
                  const updatedDiagnosis = [...dignosis1, ''];
                  setDignosis1(updatedDiagnosis);
                }}>
                <Image source={icons.add} style={{marginVertical: 8}} />
              </TouchableOpacity>
            </View>
            {dignosis1.slice(1).map((item, index) => (
              <View
                key={index}
                style={{
                  height: 56,
                  width: '100%',
                  borderWidth: 0.5,
                  borderColor: '#FFFFFF',
                  borderRadius: 10,
                  marginBottom: 15,
                  backgroundColor: 'rgba(178, 37, 204, 0.03)',
                }}>
                <View
                  style={{
                    marginHorizontal: 17.67,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 5,
                  }}>
                  <Image
                    source={icons.diagnosis}
                    style={{
                      tintColor: '#02141F',
                      width: 20,
                      height: 20,
                      marginRight: 12.67,
                      opacity: 0.5,
                    }}
                  />

                  <TextInput
                    style={{
                      flex: 1,
                      fontSize: 14,
                      lineHeight: 21,
                      fontWeight: '400',
                      fontFamily: 'Poppins-Regular',
                      color: '#10011C',
                      opacity: 0.4,
                      letterSpacing: 0.05,
                      height: 56,
                    }}
                    editable
                    placeholder={`Diagnosis ${index + 2}`}
                    placeholderTextColor={'#10011C'}
                    value={item}
                    onChangeText={text => {
                      const updatedDiagnosis = [...dignosis1];
                      updatedDiagnosis[index + 1] = text;
                      setDignosis1(updatedDiagnosis);
                    }}
                  />
                </View>
              </View>
            ))}
            <View style={styles.viewContainer}>
              <SelectDropdown
                data={dischargedornot}
                defaultValueByIndex={0}
                onSelect={(selectedItem, index) => {
                  setDischarged(selectedItem.title);
                }}
                buttonStyle={styles.dropdown3BtnStyle}
                renderCustomizedButtonChild={(selectedItem, index) => {
                  return (
                    <View style={styles.dropdown3BtnChildStyle}>
                      <Text style={styles.dropdown3BtnTxt}>
                        {selectedItem ? selectedItem.title : 'Discharged'}
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
                      <Text style={styles.dropdown3RowTxt}>{item.title}</Text>
                    </View>
                  );
                }}
              />
            </View>

            <InputField
              editable={true}
              placeholder="Investigations planned"
              icon={icons.searchLight}
              value={investigationplaned}
              onChange={setInvestigationplaned}
            />

            <InputField
              editable={true}
              placeholder="Treatment planned"
              icon={icons.diagnosis}
              value={treatmentplan}
              onChange={setTreatmentplan}
            />

            <View style={styles.viewContainer}>
              <SelectDropdown
                data={statusArray}
                defaultValueByIndex={0}
                onSelect={(selectedItem, index) => {
                  setComplete(selectedItem.title);
                  console.log('compl--', selectedItem.title);
                  // setStatus(selectedItem.datag);
                }}
                buttonStyle={styles.dropdown3BtnStyle}
                renderCustomizedButtonChild={(selectedItem, index) => {
                  return (
                    <View style={styles.dropdown3BtnChildStyle}>
                      {selectedItem ? (
                        <Image
                          source={selectedItem.image}
                          style={[
                            styles.dropdown3BtnImage,
                            {marginHorizontal: 3},
                          ]}
                        />
                      ) : (
                        <Image
                          source={require('../../assets/icon/completeicon.png')}
                        />
                      )}
                      {selectedItem ? (
                        <Text
                          style={[
                            styles.dropdown3BtnTxt,
                            {
                              marginHorizontal: 13,
                              color: index === 0 ? '#06C270' : '#F0AA40',
                            },
                          ]}>
                          {selectedItem ? selectedItem.title : 'Complete'}
                        </Text>
                      ) : (
                        <Image
                          source={require('../../assets/icon/completeicon.png')}
                        />
                      )}
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
                        key={index}
                      />
                      <Text
                        key={index}
                        style={[
                          styles.dropdown3RowTxt,
                          {
                            marginHorizontal: 15,
                            color: index === 0 ? '#06C270' : '#F0AA40',
                          },
                        ]}>
                        {item.title}
                      </Text>
                    </View>
                  );
                }}
              />
            </View>

            <View
              style={{
                width: '100%',
                borderWidth: 0.5,
                borderColor: '#FFFFFF',
                borderRadius: 10,
                marginBottom: 15,
                backgroundColor: 'rgba(178, 37, 204, 0.05)',
                height: '20%',
              }}>
              <View
                style={{
                  marginHorizontal: 17.67,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={icons.sms}
                  style={{
                    tintColor: '#02141F',
                    width: 20,
                    height: 20,
                    marginRight: 12.67,
                    opacity: 0.5,
                    marginBottom: 45,
                  }}
                />

                <TextInput
                  style={{
                    flex: 1,
                    fontSize: 14,
                    lineHeight: 21,
                    fontWeight: '400',
                    fontFamily: 'Poppins-Regular',
                    color: '#10011C',
                    opacity: 0.4,
                    letterSpacing: 0.05,
                    marginBottom: 40,
                    borderWidth: 0.5,
                    borderColor: '#FFFFFF',
                    borderRadius: 10,
                    padding: 10,
                  }}
                  editable
                  placeholder="Comments"
                  placeholderTextColor="#10011C"
                  value={comment}
                  onChangeText={setComment}
                  multiline={true}
                  numberOfLines={2}
                />
              </View>
              <View
                style={{
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                  backgroundColor: 'grey',
                  marginTop: '20%',
                }}>
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    flexDirection: 'row',
                    bottom: 10,
                    right: 80,
                  }}
                  onPress={selectDoc}>
                  {/* <Image
                    source={require('../../assets/icon/document.png')}
                    style={{width: 25, height: 25, marginVertical: 5}}
                  /> */}
                  <DocSvg />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    flexDirection: 'row',
                    bottom: 10,
                    right: 45,
                  }}
                  onPress={toggleRecording}>
                  {/* <Image
                    source={require('../../assets/icon/Voice.png')}
                    style={{width: 25, height: 25, marginVertical: 5}}
                  /> */}
                  <VoiceSvg />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleShare}
                  style={{
                    position: 'absolute',
                    flexDirection: 'row',
                    bottom: 10,
                    right: 10,
                  }}>
                  {/* <Image
                    source={require('../../assets/icon/share.png')}
                    style={{width: 25, height: 25, marginVertical: 5}}
                  /> */}
                  <ShareSvg style={{marginHorizontal: 5}} />
                </TouchableOpacity>
              </View>
            </View>

            {/* ----- save btn --------- */}
            <TouchableOpacity
              style={{marginBottom: 30}}
              onPress={handlePostData}>
              <View
                style={{
                  backgroundColor: '#6D21A9',
                  borderRadius: 10,
                  height: 63,
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 10,
                  borderWidth: 1,
                  borderColor: '#6D21A9',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Bold',
                    fontSize: 18,
                    fontSize: 18,
                    lineHeight: 27,
                    letterSpacing: 0.05,
                    color: '#ffffff',
                    marginLeft: 5,
                  }}>
                  Save
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default AddPatient2;

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
    marginHorizontal: 3,
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
    opacity: 0.4,
  },
});
