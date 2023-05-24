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
  alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {icons, images} from '../../constant';
import InputField from '../../reusablecomponent/InputField';
import SelectDropdown from 'react-native-select-dropdown';

const {width} = Dimensions.get('window');
const Edit = ({navigation, route}) => {
  const {patient} = route.params;
  console.log('data CHECK-------------------- ---', patient);

  // const [complete, setComplete] = useState('');
  const [fullname, setFullname] = useState('');
  const [location, setLocation] = useState('');
  const [gender, setGender] = useState('Male');
  // const [user, setUser] = useState(2);
  // const [assign, setAssign] = useState('');
  const [dignosis1, setDignosis1] = useState([]);
  const [discharged, setDischarged] = useState('');
  const [investigationplaned, setInvestigationplaned] = useState('');
  const [treatmentplan, setTreatmentplan] = useState('');
  const [status, setStatus] = useState(true);
  const [bookmark1, setBookmark1] = useState(false);
  const [comment, setComment] = useState('');
  // const [grp, setGrp] = useState(5);

  const genderlist = [
    {title: 'Male', image: require('../../assets/icon/gender2.png')},
    {title: 'Female', image: require('../../assets/icon/gender2.png')},
    {title: 'Other', image: require('../../assets/icon/gender2.png')},
  ];

  const dischargedornot = [{title: 'Discharged'}, {title: 'Not Discharged'}];

  const statusArray = [
    {
      image: require('../../assets/icon/completeicon.png'),
      title: 'Complete',
      datag: true,
      id: 1,
    },
    {
      image: require('../../assets/icon/pendingicon.png'),
      title: 'Pending',
      datag: false,
      id: 2,
    },
  ];

  // --------- Get data -----------

  useEffect(() => {
    fetch(`http://smart.techpanda.art/newpatient/${patient.id}`, {
      // Use backticks (`) for string interpolation
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('jj===', data);
        setFullname(data.fullname);
        setLocation(data.location);
        setGender(data.gender);
        setDignosis1(data.dignosis1);
        setDischarged(data.discharged);
        setInvestigationplaned(data.investigationplaned);
        setTreatmentplan(data.treatmentplan);
        setComment(data.comment);
      })
      .catch(error => console.log(error));
  }, [patient.id]);

  // ------------- Uplaod the data ---------------
  const upload = () => {
    let url = `http://smart.techpanda.art/newpatient/${patient.id}/`;
    const requestBody = {
      fullname: fullname,
      location: location,
      gender: gender,
      dignosis1: dignosis1[0],
      discharged: discharged,
      investigationplaned: investigationplaned,
      treatmentplan: treatmentplan,
      completeStatus: status,
      bookmark1: bookmark1,
      comment: comment,
    };

    console.log('Request body:', requestBody);

    fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(requestBody),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(response => {
        console.log('User Data Updated successfully:', response);
        Alert.alert('Success', 'User Data Updated successfully.', [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]);
      })
      .catch(error => {
        console.log(error);
        Alert.alert('Error', 'Something went wrong. Please try again later.');
      });
  };

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

          <Text style={styles.text}>Edit Profile</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{flex: 1, marginHorizontal: 20}}>
            <InputField
              editable={true}
              placeholder="Full Name"
              icon={icons.user}
              title="Full Name"
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

            {/* ---------- gender ----------- */}
            <View style={styles.viewContainer}>
              <SelectDropdown
                data={genderlist}
                onSelect={(selectedItem, index) => {
                  setGender(selectedItem.title);
                  console.log('gender changes', gender);
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
                          {marginHorizontal: 20},
                        ]}>
                        {selectedItem ? selectedItem.title : gender}
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
                  editable
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

            {/* ------ Discharged------------ */}
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
                        {selectedItem ? selectedItem.title : discharged}
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
                  console.log(selectedItem.datag);
                  setStatus(selectedItem.datag);
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
                          {selectedItem.title}
                        </Text>
                      ) : (
                        <Text style={styles.dropdown3BtnTxt}>Complete</Text>
                      )}
                    </View>
                  );
                }}
                renderDropdownIcon={isOpened => {
                  return isOpened ? null : (
                    <Image
                      source={require('../../assets/icon/arrow-down.png')}
                    />
                  );
                }}
                dropdownIconPosition={'right'}
                rowStyle={styles.dropdown3RowStyle}
                renderCustomizedRowChild={item => {
                  return (
                    <View style={styles.dropdown3RowChildStyle}>
                      <Image
                        source={item.image}
                        style={styles.dropdownRowImage}
                      />
                      <Text
                        style={[
                          styles.dropdown3RowTxt,
                          {
                            marginHorizontal: 15,
                            color: item.id === 1 ? '#06C270' : '#F0AA40',
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
            </View>

            {/* ------------ Update btn --------- */}

            <TouchableOpacity
              onPress={upload}
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
                marginBottom: 90,
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
                Update
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Edit;

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
